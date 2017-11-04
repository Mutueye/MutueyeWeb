/* ==================================================================================
 * procBuilder.js
 * 流程管理流程图构建&控制
 * 依赖 jquery.min.js, underscore-min.js, toastr.min.js, BSModal.js, common.js
 * css 依赖index.css , font-awesome.min.css
 * ================================================================================== */

var procBuilder = (function(){

    /**
     * Constructor 读取数据创建流程图
     * @param Object $container jquery选择器 流程图的dom容器
     * @param Array proc_data 流程数据
     * @param Object form_data 新增/编辑节点的表单数据
     * @param String mode 模式； 编辑模式='edit',查看模式='view'
     **/
    function procBuilder($container, proc_data, form_data, mode) {
        var base = this;
        this.procContainer = $container;
        this.procData = proc_data ? proc_data : [];
        this.procFormData = form_data ? form_data : {};
        this.procMode = mode ? mode : 'edit';
        this.procHtmlString =    '<div class="proc-content">' +
                                    '<div class="proc-item-container proc-item-start">' +
                                        '<div class="proc-item">' +
                                            '流&nbsp;程&nbsp;开&nbsp;始' +
                                            '<br>' +
                                            '<i class="fa fa-angle-down"></i>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="proc-item-container proc-item-end">' +
                                        '<div class="proc-item">流&nbsp;程&nbsp;结&nbsp;束</div>' +
                                    '</div>' +
                                '</div>';
        //新增或编辑节点的弹窗的html字符串
        this.procItemModalHtml = '<div class="row-space-10">' +
                                    '<form class="row no-bottom">' +
                                        '<div class="col-xs-12">' +
                                            '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                                '<div class="input-group">' +
                                                    '<div class="input-group-addon addon-label">节点名称：</div>' +
                                                    '<input class="form-control proc-item-name" type="text">' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12">' +
                                            '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                                '<div class="input-group">' +
                                                    '<div class="input-group-addon addon-label">任务类型：</div>' +
                                                    '<select class="form-control proc-item-type">' +
                                                    '</select>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12">' +
                                            '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                                '<div class="input-group">' +
                                                    '<div class="input-group-addon addon-label">任务行为：</div>' +
                                                    '<select class="form-control proc-item-action">' +
                                                    '</select>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12">' +
                                            '<div class="box-form has-title">' +
                                                '<div class="box-form-title">选择负责人</div>' +
                                                '<div class="row no-bottom">' +
                                                    '<div class="col-xs-12">' +
                                                        '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                                            '<div class="input-group">' +
                                                                '<div class="input-group-addon addon-label">部门：</div>' +
                                                                '<select class="form-control proc-item-dep">' +
                                                                '</select>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="col-xs-12">' +
                                                        '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                                            '<div class="input-group">' +
                                                                '<div class="input-group-addon addon-label">负责人：</div>' +
                                                                '<select class="form-control proc-item-examiner">' +
                                                                '</select>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</form>' +
                                '</div>';
                        
        this.procContainer.append(this.procHtmlString);
        
        if(this.procData.length == 0) { //流程图空数据
            if(this.procMode == 'edit') { //编辑模式添加初始的“点击添加节点”按钮
                this.addProcNewBtn();
            } else { //查看模式，显示空数据提示
                emptyHtml = '<div class="proc-item-container">' +
                                '<div class="proc-item">流程数据为空！</div>' +
                            '</div>';
                this.procContainer.find('.proc-item-start').eq(0).after(emptyHtml);
            }
        } else { //流程图非空数据
            var itemsHtml = '';
            for(var i = 0; i < this.procData.length; i++) { //读取流程图数据，遍历创建流程节点
                (function(i) {
                    itemsHtml += base.createOneProcItemString(base.procData[i], i);
                })(i);
            }
            this.procContainer.find('.proc-item-start').eq(0).after(itemsHtml); //添加到dom结构中
            if(this.procMode == 'edit') { //编辑模式下
                var procItemNodes = this.procContainer.find('.proc-item-node');
                procItemNodes.each(function(){ //给各个节点添加编辑按钮
                    base.addBtnActions($(this));
                });
            }
        }
    }
    
    /**
     * 生成一个流程节点的html字符串
     * @param Array data 节点数据
     * @param Number index 序号
     **/
    procBuilder.prototype.createOneProcItemString = function(data, index) {
        var staticClass = 'proc-item-static';
        var nodeClass = 'proc-item-node';
        var itemContent = data.name; //非固定节点的节点内容只显示节点名称
        var dataIndex = '';
        if(typeof index != "undefined") {
            dataIndex = this.procMode == 'edit' ? 'data-index="' + index + '"' : ''; //流程序号
        }
        if(typeof data.examiner == 'undefined') {
            staticClass = '';
        } else {
            var examinerString = data.examiner.name;
            //指定了负责人的固定节点，节点内容带上负责人信息
            itemContent += '<br><span class="small-text">负责人：' + examinerString + '</span>';
        }
        var editHtmlString =    '<div class="btn-container btn-top-container">' +
                                    '<div class="btn btn-theme btn-add-before" ' + dataIndex + '><i class="fa fa-plus"></i>&nbsp;前添加</div>' +
                                '</div>' +
                                '<div class="btn-container btn-bottom-container">' +
                                    '<div class="btn btn-theme btn-add-after" ' + dataIndex + '><i class="fa fa-plus"></i>&nbsp;后添加</div>' +
                                '</div>' +
                                '<div class="btn-container btn-left-container">' +
                                    '<div class="btn bg-red bg-hover-darken font-white btn-remove" ' + dataIndex + '><i class="fa fa-remove"></i>&nbsp;删除</div>' +
                                '</div>' +
                                '<div class="btn-container btn-right-container">' +
                                    '<div class="btn btn-theme btn-edit" ' + dataIndex + '><i class="fa fa-edit"></i>&nbsp;编辑</div>' +
                                '</div>';
        if(this.procMode != 'edit') {
            editHtmlString = '';
            nodeClass = '';
        }
        return  '<div class="proc-item-container ' + nodeClass + ' ' + staticClass + '" ' + dataIndex + '>' +
                    '<div class="proc-item">' + 
                        '<div class="proc-item-text">' +
                            itemContent + 
                        '</div>' +
                        '<div class="proc-item-btns">' +
                            editHtmlString + 
                        '</div>' +
                    '</div>' +
                '</div>';
    }
    
    /**
     * 刷新流程节点序号，并根据节点数量调整显示内容：
     * 节点数量为空，显示添加节点按钮，节点数量不为空删除这个按钮
     **/
    procBuilder.prototype.refreshProcIndex = function() {
        var procNodes = this.procContainer.find('.proc-item-node');
        var procNewBtns = this.procContainer.find('.proc-item-btn');
        //判断节点数量是否为空，如果为空且没有“点击添加新节点”的按钮，添加这个按钮，
        //如果不为空且这个按钮存在，则删除这个按钮;刷新节点index
        if(procNodes.length == 0) {
            if(procNewBtns.length == 0) {
                this.addProcNewBtn();
            }
        } else {
            procNodes.each(function(i){
                $(this).attr('data-index', i);
                $(this).find('.btn-add-before, .btn-add-after, .btn-remove, .btn-edit').attr('data-index', i);
            });
            if(procNewBtns.length != 0) {
                procNewBtns.remove();
            }
        }
    }
    
    /**
     * 流程为空时，添加“点击添加流程节点”的按钮
     **/
    procBuilder.prototype.addProcNewBtn = function() {
        var base = this;
        var newBtnHtml =    '<div class="proc-item-container proc-item-btn">' +
                                '<div class="proc-item">点击添加流程节点</div>' +
                            '</div>';
        this.procContainer.find('.proc-item-start').eq(0).after(newBtnHtml);
        //添加按钮交互
        this.procContainer.find('.proc-item-btn .proc-item').click(function(){
            base.addOneProcItem(base.procContainer.find('.proc-item-start').eq(0), 'after');
        });
    }
    
    /**
     * 弹出添加节点窗口，添加流程节点
     * @param Object $referenceItem 参考节点的jquery选择器对象，将基于此参考节点的前或后添加新节点
     * @param String addPosition 前添加='before'，后添加='after'
     **/
    procBuilder.prototype.addOneProcItem = function($referenceItem, addPosition) {
        var base = this;
        BSModal.confirm({ 
            title : "添加节点", 
            content : base.procItemModalHtml, 
            width : "460px", 
            btnOKDismiss : false,
            afterInit : function($modal){ //弹窗初始化完成后，添加相关表单控制
                setProcFormData($modal, base.procFormData);
            }
        }).on(function (e, id) {
            if (!e) {
                return;
            }
            $modal = $('#' + id);
            if($modal.find('.proc-item-name').eq(0).val().length == 0) {
                toastr.warning('请输入节点名称');
            } else {
                var procItemData = {
                    name : $modal.find('.proc-item-name').eq(0).val(),
                    type : $modal.find('.proc-item-type').eq(0).val(),
                    action : $modal.find('.proc-item-action').eq(0).val()
                };
                var examinerVal = $modal.find('.proc-item-examiner').eq(0).val();
                if(examinerVal && examinerVal.length != 0) {
                    procItemData.examiner = {
                        name : '',
                        dep : ''
                    };
                    procItemData.examiner.name = examinerVal;
                    procItemData.examiner.dep = $modal.find('.proc-item-dep').eq(0).val();
                }
                var targetIndex = 0;
                if($referenceItem.attr('data-index')){ //如果有data-index属性，说明原流程图节点数量不为0
                    targetIndex = $referenceItem.attr('data-index');
                    if(addPosition == 'after') {
                        targetIndex = parseInt(targetIndex);
                        targetIndex += 1;
                        $referenceItem.after(base.createOneProcItemString(procItemData));
                    } else {
                        $referenceItem.before(base.createOneProcItemString(procItemData));
                    }
                    base.procData.splice(targetIndex, 0, procItemData); //插入新节点数据
                } else { //如果没有data-index属性，说明添加的是第一条节点数据，直接push
                    hasDataIndex = false;
                    if(addPosition == 'after') {
                        $referenceItem.after(base.createOneProcItemString(procItemData));
                    } else {
                        $referenceItem.before(base.createOneProcItemString(procItemData));
                    }
                    base.procData.push(procItemData);
                }
                base.refreshProcIndex(); //刷新dom里的节点index,与添加后的节点数据同步
                base.addBtnActions(base.procContainer.find('.proc-item-node').eq(targetIndex)); //添加节点的按钮交互
                $modal.modal('hide');
            }
        });
    }
    
    /**
     * 删除一个流程节点
     * @param Object $procItemNode 节点的jquery选择器对象，将基于此参考节点的前或后添加新节点
     **/
    procBuilder.prototype.removeOneProcItem = function($procItemNode) {
        var base = this;
        BSModal.confirm({ 
            title : "删除节点", 
            content : '确认要删除该流程节点吗？', 
            width : "320px",
            btnOKDismiss : false
        }).on(function (e, id) {
            if (!e) {
                return;
            }
            var index = $procItemNode.attr('data-index');
            base.procData.splice(index,1);
            $procItemNode.remove();
            base.refreshProcIndex();
            $('#' + id).modal('hide');
        });
    }
    
    /**
     * 编辑一个流程节点
     * @param Object $procItemNode 节点的jquery选择器对象，将基于此参考节点的前或后添加新节点
     **/
    procBuilder.prototype.editOneProcItem = function($procItemNode) {
        var base = this;
        var procItemNodeData = this.procData[$procItemNode.attr('data-index')];
        BSModal.confirm({ 
            title : "编辑节点", 
            content : base.procItemModalHtml, 
            width : "460px",
            btnOKDismiss : false,
            afterInit : function($modal) { //弹窗初始化完成后，添加相关表单控制
                var selectedData = procItemNodeData.examiner;
                setProcFormData($modal, base.procFormData, selectedData);
                $modal.find('.proc-item-name').eq(0).val(procItemNodeData.name);
            }
        }).on(function (e, id) {
            if (!e) {
                return;
            }
            $modal = $('#' + id);
            if($modal.find('.proc-item-name').eq(0).val().length == 0) {
                toastr.warning('请输入节点名称');
            } else {
                var procItemData = {
                    name : $modal.find('.proc-item-name').eq(0).val(),
                    type : $modal.find('.proc-item-type').eq(0).val(),
                    action : $modal.find('.proc-item-action').eq(0).val()
                };
                var examinerVal = $modal.find('.proc-item-examiner').eq(0).val();
                if(examinerVal && examinerVal.length != 0) {
                    procItemData.examiner = {
                        name : '',
                        dep : ''
                    };
                    procItemData.examiner.name = examinerVal;
                    procItemData.examiner.dep = $modal.find('.proc-item-dep').eq(0).val();
                }
                //使用underscore的isEqual方法来判断数据是否修改
                if(_.isEqual(procItemData, procItemNodeData)) {
                    toastr.warning('节点数据未修改');
                } else {
                    var procItemText = procItemData.name;
                    if(typeof procItemData.examiner != 'undefined') {
                        if(!$procItemNode.hasClass('proc-item-static')) {
                            $procItemNode.addClass('proc-item-static');
                        };
                        procItemText += '<br><span class="small-text">负责人：' + procItemData.examiner.name + '</span>';
                    } else {
                        $procItemNode.removeClass('proc-item-static');
                    }
                    $procItemNode.find('.proc-item-text').eq(0).html(procItemText);
                    base.procData.splice($procItemNode.attr('data-index'), 1, procItemData); //替换节点数据
                    $modal.modal('hide');
                }
            }
        });
    }
    
    /**
     * 添加一个节点的添加、编辑、删除按钮功能
     * @param Object $procItemNode 节点的jquery选择器对象，将基于此参考节点的前或后添加新节点
     **/
    procBuilder.prototype.addBtnActions = function($procItemNode) {
        var base = this;
        var btnAddBefore = $procItemNode.find('.btn-add-before').eq(0);
        var btnAddAfter = $procItemNode.find('.btn-add-after').eq(0);
        var btnRemove = $procItemNode.find('.btn-remove').eq(0);
        var btnEdit = $procItemNode.find('.btn-edit').eq(0);
        btnAddBefore.click(function(){
            base.addOneProcItem($procItemNode, 'before');
        });
        btnAddAfter.click(function(){
            base.addOneProcItem($procItemNode, 'after');
        });
        btnRemove.click(function(){
            base.removeOneProcItem($procItemNode);
        });
        btnEdit.click(function(){
            base.editOneProcItem($procItemNode);
        });
    }
    
    /**
     * 负责人选择相关表单控制
     * @param Object $modal 当前弹窗的jquery选择器对象
     * @param Array examinerData 负责人列表数据
     * @param Object selectedData 需要填入的选定的数据，"编辑节点"弹窗使用
     **/
    function setProcFormData($modal, formData, selectedData) {
        var depList = [{value : '不选择', text : '不选择'}];
        var examinerData = formData.examiner_data;
        var typeOptionData = formData.type_options;
        var actionOptionData = formData.action_options;
        var $itemType = $modal.find('.proc-item-type').eq(0); //任务类型下拉选择
        var $itemAction = $modal.find('.proc-item-action').eq(0); //任务行为下拉选择
        var $selectDep = $modal.find('.proc-item-dep').eq(0); //负责人-选择部门
        var $selectExaminer = $modal.find('.proc-item-examiner').eq(0); //负责人-选择负责人
        window.commonTools.addSelectOptions($itemType, typeOptionData);
        window.commonTools.addSelectOptions($itemAction, actionOptionData);
        for(i in examinerData) {
            depList.push({
                value : examinerData[i].dep,
                text : examinerData[i].dep
            });
        }
        window.commonTools.addSelectOptions($selectDep, depList);
        
        var setExaminerSel = function(){
            if($selectDep.val() == '不选择') {
                $selectExaminer.html('');
                $selectExaminer.attr('disabled','true');
            } else {
                $selectExaminer.removeAttr("disabled");
                var examinerList = window.commonTools.getSubArrayByObjValue(examinerData, 'dep', $selectDep.val())[0].list;
                var examinerSelList = [];
                for(i in examinerList) {
                    var examinerOption = examinerList[i].name + '（' + examinerList[i].post + '）';
                    examinerSelList.push({
                        value : examinerOption,
                        text : examinerOption
                    });
                }
                //console.log(examinerList);
                $selectExaminer.html('');
                window.commonTools.addSelectOptions($selectExaminer, examinerSelList);
            }
        }
        setExaminerSel();
        $selectDep.change(function(){
            setExaminerSel();
        });
        if(typeof selectedData != 'undefined') {
            $selectDep.val(selectedData.dep);
            setExaminerSel();
            $selectExaminer.val(selectedData.name);
        }
    }

    return procBuilder;

})();
