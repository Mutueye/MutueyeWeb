$(document).ready(function(){
    
    var $time = $('#time');
    
    var $btn_new = $('#toolbtn_new');
    var $btn_edit = $('#toolbtn_edit');
    var $btn_preview = $('#toolbtn_preview');
    var $btn_remove = $('#toolbtn_remove');
    var $table = $('#table');
    
    window.commonTools.setDateTimeInput($time);
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
        pagination : true,
        showPaginationSwitch : false,
        clickToSelect : true,
        columns: [
            {
                field: 'check',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'id',
                title: '序号',
                sortable: true,
                halign: 'center',
                align: 'right',
                width: 30
            }, 
            {
                field: 'objname',
                title: '物品名称',
                halign: 'center'
            }, 
            {
                field: 'unit',
                title: '单位',
                halign: 'center'
            }, 
            {
                field: 'num',
                title: '数量',
                halign: 'center'
            },
            {
                field: 'price',
                title: '入库价格（元）',
                sortable: true,
                halign: 'center'
            }, 
            {
                field: 'applier',
                title: '领用人',
                halign: 'center'
            },
            {
                field: 'dep',
                title: '领用部门',
                halign: 'center'
            },
            {
                field: 'creator',
                title: '创建人',
                halign: 'center'
            },
            {
                field: 'time1',
                title: '缴费时间',
                halign: 'center',
                align: 'center'
            },
            {
                field: 'time2',
                title: '最后编辑时间',
                halign: 'center',
                align: 'center'
            }
        ],
        data: [
            {
                id : 1,
                objname : '鲜花',
                unit : '束',
                num : '1',
                price : '8',
                applier : '王小二',
                dep : '财务',
                creator : '王小二',
                time1 : '2018-09-09',
                time2 : '2018-10-01'
            },
            {
                id : 2,
                objname : '球形阀',
                unit : '个',
                num : '5',
                price : '23',
                applier : '王小二',
                dep : '维修',
                creator : '王小二',
                time1 : '2018-03-28',
                time2 : '2018-04-03'
            },
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //新增&编辑弹窗的表单模板
    var modalHtml = "<div class='row-space-10'>" +
                        "<form class='row no-bottom'>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>领用品名称：</div>" +
                                    "<select class='form-control' id='item_name'>" +
                                    "</select>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>入库单号：</div>" +
                                    "<input class='form-control' type='text' id='stock_num' value='2018301240123' disabled>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>在库数：</div>" +
                                    "<input class='form-control' type='text' id='in_stock_num' value='20' disabled>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>入库价格：</div>" +
                                    "<div class='input-group'>" +
                                        "<input class='form-control' type='text' id='stock_price' value='30' disabled>" + 
                                        "<div class='input-group-addon'>元</div>" +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>领用人：</div>" +
                                    "<input class='form-control' type='text' id='applier'>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>单位：</div>" +
                                    "<input class='form-control' type='text' id='unit' value='束' disabled>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>数量：</div>" +
                                    "<input class='form-control' type='text' id='atty'>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>用途：</div>" +
                                    "<textarea class='form-control textarea' id='usage' rows='3'></textarea>" + 
                                "</div>" +
                            "</div>" +
                        "</form>" +
                    "</div>";
    
    //预览弹窗的表单模板
    var modalPreviewHtml = "<div class='row-space-10'>" +
                        "<div class='row no-bottom'>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>领用品名称：</div>" +
                                    "<div class='cool-form-content'>鲜花</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>领用人：</div>" +
                                    "<div class='cool-form-content'>王小二</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>入库单号：</div>" +
                                    "<div class='cool-form-content'>201895293847</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>在库数：</div>" +
                                    "<div class='cool-form-content'>20</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>入库价格：</div>" +
                                    "<div class='cool-form-content'>30</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>单位：</div>" +
                                    "<div class='cool-form-content'>束</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>数量：</div>" +
                                    "<div class='cool-form-content'>20</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>用途：</div>" +
                                    "<div class='cool-form-content'>海尔鲜花更换<br>海尔鲜花更换</div>" + 
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    
    //弹窗初始化后，给表单赋初始值,type区分新增或编辑
    function modalInit(type){
        
        //获取押金类型选项，此处直接给出用户前端展示
        var itemNameOptionData = [
            {
                value:'鲜花',
                text:'鲜花'
            },
            {
                value:'球形阀',
                text:'球形阀'
            }
        ];
        window.commonTools.addSelectOptions($('#item_name'), itemNameOptionData);
        
        if(type == '新增') {
            //新增弹窗需要处理的一些逻辑
        } else if(type == '编辑') {
            //编辑弹窗需要处理的一些逻辑，比如载入初始表单数据
        }
    }
    
    
    //新增
    $btn_new.click(function () {
        
        BSModal.confirm({
            title : '新增',
            content : modalHtml,
            width : '600px',
            maxHeight : '400px',
            btnOKDismiss : false,
            btnOK : '提交',
            afterInit: function(){
                modalInit('新增');
            }
        }).on(function(e, id) {
            if (!e) {
                return;
            }
            //提交成功后，刷新表格数据:
            //$table.bootstrapTable('load', data);
            
            $('#'+id).modal('hide');
            toastr.success('您新增的数据已提交！');
        });
    });
    
    //编辑
    $btn_edit.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            BSModal.confirm({
                title : '编辑',
                content : modalHtml,
                width : '600px',
                maxHeight : '400px',
                btnOKDismiss : false,
                btnOK : '提交',
                afterInit: function(){
                    modalInit('编辑');
                }
            }).on(function(e, id) {
                if (!e) {
                    return;
                }
                //提交成功后，刷新表格数据:
                //$table.bootstrapTable('load', data);
                
                $('#'+id).modal('hide');
                toastr.success('您编辑的数据已提交！');
                
            });
        }
    });
    
    //查看
    $btn_preview.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            BSModal.confirm({
                title : '查看',
                content : modalPreviewHtml,
                width : '600px',
                maxHeight : '400px',
                btnOKDismiss : true,
                btnOK : '确定',
                btnCancel: ''
            });
        }
    });
    
    //删除
    $btn_remove.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }

            BSModal.confirm({ content: "确认要删除选择的数据吗？" }).on(function (e) {
                if (!e) {
                    return;
                }
                
                //ajax删除数据...
                
                //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                var ids = getIdSelections();
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                setToolBtnDisableState();
                toastr.success('删除的数据已提交成功！');
                
            });
        }
    });
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_remove.attr('disabled', !tableSelections.length);
        $btn_edit.attr('disabled', tableSelections.length != 1);
        $btn_preview.attr('disabled', tableSelections.length != 1);
    }
    
});