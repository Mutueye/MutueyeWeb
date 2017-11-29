$(document).ready(function(){

    $btn_add_before = $('#btn_add_before');
    $btn_add_after = $('#btn_add_after');
    $btn_add_sub = $('#btn_add_sub');
    $btn_remove = $('#btn_remove');
    $btn_edit = $('#btn_edit');
    $btn_boss = $('#btn_boss');
    $toolbtns = $('#toolbtns');
    $tooltip = $('#tooltip');

    $tree = $('#tree-zzjg');

    //新增/编辑弹窗模板
    var modalHtml = '<div class="row-space-10">' +
                        '<form class="row no-bottom">' +
                            '<div class="col-xs-12">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="input-group">' +
                                        '<div class="input-group-addon addon-label">节点类型：</div>' +
                                        '<select class="form-control" id="node_type" type="text">' +
                                            '<option>组织</option>' +
                                            '<option>个人</option>' +
                                        '</select>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="input-group">' +
                                        '<div class="input-group-addon addon-label">节点名称：</div>' +
                                        '<input class="form-control" id="node_text" type="text">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12" id="post_container">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="input-group">' +
                                        '<div class="input-group-addon addon-label">人员职位：</div>' +
                                        '<input class="form-control" id="post" type="text">' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</form>' +
                    '</div>';

    disableToolbar();
    hideTool();

    $('.structure-toolbar').scrollFix({
        fixedClass : 'isFixed',
        clearMargin : false,
        fixedZindex : 1000
    });

    var treeData = [
        {
            text: "董事局",
            icon: "fa fa-users",
            type: "组织",
            root: true,
            nodes: [
                {
                    text: "黄任勋",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事局主席'],
                    type: "个人",
                    isboss: true
                },
                {
                    text: "张部龄",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事，总经理'],
                    type: "个人",
                    isboss: false
                },
                {
                    text: "付洪涛",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事，副总经理'],
                    type: "个人",
                    isboss: false
                },
                {
                    text: "肖可峰",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事'],
                    type: "个人",
                    isboss: false
                },
                {
                    text: "行政部",
                    icon: "fa fa-users",
                    type: "组织",
                    nodes: [
                        {
                            text: "肖可峰",
                            icon: "fa fa-user-circle-o",
                            tags: ['行政部长'],
                            type: "个人",
                            isboss: true
                        },
                        {
                            text: "张晓晓",
                            icon: "fa fa-user-circle-o",
                            tags: ['副行政部长'],
                            type: "个人",
                            isboss: false
                        },
                        {
                            text: "胡星亮",
                            icon: "fa fa-user-circle-o",
                            tags: ['主任'],
                            type: "个人",
                            isboss: false
                        }
                    ]
                },
                {
                    text: "财政部",
                    icon: "fa fa-users",
                    type: "组织",
                    nodes: [
                        {
                            text: "周一博",
                            icon: "fa fa-user-circle-o",
                            tags: ['财政部长'],
                            type: "个人",
                            isboss: true
                        },
                        {
                            text: "兰于东",
                            icon: "fa fa-user-circle-o",
                            tags: ['副财政部长'],
                            type: "个人",
                            isboss: false
                        },
                        {
                            text: "赵西冷",
                            icon: "fa fa-user-circle-o",
                            tags: ['会计'],
                            type: "个人",
                            isboss: false
                        }
                    ]
                }
            ]
        }
    ];

    //组织结构 树型结构初始化
    $tree.treeview({
        data:treeData,
        levels: 5,
        showTags: true,
        collapseIcon: 'fa fa-angle-up',
        expandIcon: 'fa fa-angle-down'
    });

    //console.log($tree.treeview('getNodes'));
    //添加部门负责人标志
    addBossLabel($tree.treeview('getNodes'));

    $tree.on('nodeSelected', function(event, node) {
        nodeSelected(node);
    });



    $tree.on('nodeUnselected', function(event, node) {
        nodeUnselected();
    });


    $tree.on('rendered', function(event, nodes) {
        //console.log(nodes);
        //每次渲染时都需要重新设置部门负责人标签
        addBossLabel(nodes);
    });

    $btn_boss.click(function(){
        if(!$(this).attr('disabled')) {
            console.log($tree.treeview('getSelected'));
            var selectedNodes = $tree.treeview('getSelected');
            if(selectedNodes.length == 0) {
                toastr.warning('请选择节点');
            } else {
                var selNode = selectedNodes[0];
                //alert(JSON.stringify(selNode));
                var parentId = selNode.parentId;
                var nodes = $tree.treeview('getNodes');
                for(var i in nodes) {
                    if(nodes[i].parentId == parentId && nodes[i].isboss) {
                        nodes[i].isboss = false;
                    }
                }
                selNode.isboss = true;
                addBossLabel(nodes);
            }
        }
    })

    $btn_add_before.click(function(){
        if(!$(this).attr('disabled')) {
            console.log($tree.treeview('getSelected'));
            var selectedNodes = $tree.treeview('getSelected');
            if(selectedNodes.length == 0) {
                toastr.warning('请选择节点');
            } else {
                BSModal.confirm({
                    title : "前添加节点",
                    content : modalHtml,
                    width : "460px",
                    btnOKDismiss : false,
                    afterInit : function($modal){ //弹窗初始化完成后，添加相关表单控制
                        var switchPostContainer = function() {
                            if($('#node_type').val() == '组织') {
                                $('#post_container').hide();
                            } else {
                                $('#post_container').show();
                            }
                        }
                        switchPostContainer();
                        $('#node_type').change(function(){
                            switchPostContainer();
                        });

                    }
                }).on(function (e, id) {
                    if (!e) {
                        return;
                    }
                    $modal = $('#' + id);
                    var validation = true;
                    if($('#node_text').val().length == 0) {
                        toastr.warning('请输入节点名称');
                        validation = false;
                    }
                    if($('#node_type').val() == '个人' && $('#post').val().length == 0) {
                        toastr.warning('请输入人员职位');
                        validation = false;
                    }
                    if(validation) {
                        var node_type = $('#node_type').val();
                        var node_data = {
                            text : $('#node_text').val(),
                            type : node_type
                        };
                        if(node_type == '个人') {
                            node_data.icon = 'fa fa-user-circle-o';
                            node_data.tags = [$('#post').val()];
                        } else {
                            node_data.icon = 'fa fa-users';
                        }
                        console.log(node_data);
                        $tree.treeview('addNodeBefore', [ node_data, selectedNodes[0], { silent: true } ]);
                        $tree.treeview('selectNode', [ node_data, { silent: false } ]);
                        $modal.modal('hide');
                    }
                });
            }
        }
    });

    $btn_add_after.click(function(){
        if(!$(this).attr('disabled')) {
            console.log($tree.treeview('getSelected'));
            var selectedNodes = $tree.treeview('getSelected');
            if(selectedNodes.length == 0) {
                toastr.warning('请选择节点');
            } else {
                BSModal.confirm({
                    title : "后添加节点",
                    content : modalHtml,
                    width : "460px",
                    btnOKDismiss : false,
                    afterInit : function($modal){ //弹窗初始化完成后，添加相关表单控制
                        var switchPostContainer = function() {
                            if($('#node_type').val() == '组织') {
                                $('#post_container').hide();
                            } else {
                                $('#post_container').show();
                            }
                        }
                        switchPostContainer();
                        $('#node_type').change(function(){
                            switchPostContainer();
                        });

                    }
                }).on(function (e, id) {
                    if (!e) {
                        return;
                    }
                    $modal = $('#' + id);
                    var validation = true;
                    if($('#node_text').val().length == 0) {
                        toastr.warning('请输入节点名称');
                        validation = false;
                    }
                    if($('#node_type').val() == '个人' && $('#post').val().length == 0) {
                        toastr.warning('请输入人员职位');
                        validation = false;
                    }
                    if(validation) {
                        var node_type = $('#node_type').val();
                        var node_data = {
                            text : $('#node_text').val(),
                            type : node_type
                        };
                        if(node_type == '个人') {
                            node_data.icon = 'fa fa-user-circle-o';
                            node_data.tags = [$('#post').val()];
                        } else {
                            node_data.icon = 'fa fa-users';
                        }
                        console.log(node_data);
                        $tree.treeview('addNodeAfter', [ node_data, selectedNodes[0], { silent: true } ]);
                        $tree.treeview('selectNode', [ node_data, { silent: false } ]);
                        $modal.modal('hide');
                    }
                });
            }
        }
    });

    $btn_add_sub.click(function(){
        if(!$(this).attr('disabled')) {
            console.log($tree.treeview('getSelected'));
            var selectedNodes = $tree.treeview('getSelected');
            if(selectedNodes.length == 0) {
                toastr.warning('请选择节点');
            } else {
                BSModal.confirm({
                    title : "添加子节点",
                    content : modalHtml,
                    width : "460px",
                    btnOKDismiss : false,
                    afterInit : function($modal){ //弹窗初始化完成后，添加相关表单控制
                        var switchPostContainer = function() {
                            if($('#node_type').val() == '组织') {
                                $('#post_container').hide();
                            } else {
                                $('#post_container').show();
                            }
                        }
                        switchPostContainer();
                        $('#node_type').change(function(){
                            switchPostContainer();
                        });

                    }
                }).on(function (e, id) {
                    if (!e) {
                        return;
                    }
                    $modal = $('#' + id);
                    var validation = true;
                    if($('#node_text').val().length == 0) {
                        toastr.warning('请输入节点名称');
                        validation = false;
                    }
                    if($('#node_type').val() == '个人' && $('#post').val().length == 0) {
                        toastr.warning('请输入人员职位');
                        validation = false;
                    }
                    if(validation) {
                        var node_type = $('#node_type').val();
                        var node_data = {
                            text : $('#node_text').val(),
                            type : node_type
                        };
                        if(node_type == '个人') {
                            node_data.icon = 'fa fa-user-circle-o';
                            node_data.tags = [$('#post').val()];
                        } else {
                            node_data.icon = 'fa fa-users';
                        }
                        console.log(node_data);
                        $tree.treeview('addNode', [ node_data, selectedNodes[0], 0, { silent: true } ]);
                        $tree.treeview('selectNode', [ node_data, { silent: false } ]);
                        $modal.modal('hide');
                    }
                });
            }
        }
    });

    $btn_edit.click(function(){
        if(!$(this).attr('disabled')) {
            console.log($tree.treeview('getSelected'));
            var selectedNodes = $tree.treeview('getSelected');
            var original_node_data = selectedNodes[0];
            if(selectedNodes.length == 0) {
                toastr.warning('请选择节点');
            } else {
                BSModal.confirm({
                    title : "添加子节点",
                    content : modalHtml,
                    width : "460px",
                    btnOKDismiss : false,
                    afterInit : function($modal){ //弹窗初始化完成后，添加相关表单控制
                        var switchPostContainer = function() {
                            if($('#node_type').val() == '组织') {
                                $('#post_container').hide();
                            } else {
                                $('#post_container').show();
                            }
                        }

                        //填充初始数据

                        $('#node_type').val(original_node_data.type);
                        $('#node_text').val(original_node_data.text);
                        if(original_node_data.type == '个人') {
                            $('#post').val(original_node_data.tags[0]);
                        }

                        switchPostContainer();
                        $('#node_type').change(function(){
                            switchPostContainer();
                        });

                    }
                }).on(function (e, id) {
                    if (!e) {
                        return;
                    }
                    $modal = $('#' + id);
                    var validation = true;
                    if($('#node_text').val().length == 0) {
                        toastr.warning('请输入节点名称');
                        validation = false;
                    }
                    if($('#node_type').val() == '个人' && $('#post').val().length == 0) {
                        toastr.warning('请输入人员职位');
                        validation = false;
                    }
                    if(validation) {
                        var node_type = $('#node_type').val();
                        var node_data = {
                            text : $('#node_text').val(),
                            type : node_type
                        };
                        if(node_type == '个人') {
                            node_data.icon = 'fa fa-user-circle-o';
                            node_data.tags = [$('#post').val()];
                        } else {
                            node_data.icon = 'fa fa-users';
                        }
                        if(checkNodeDataEqual(original_node_data, node_data)) {
                            toastr.warning('节点数据未做修改');
                        } else {
                            $tree.treeview('updateNode', [ original_node_data, node_data, { silent: true } ]);
                            $tree.treeview('selectNode', [ node_data, { silent: false } ]);
                            $modal.modal('hide');
                        }
                    }
                });
            }
        }
    });

    $btn_remove.click(function(){
        if(!$(this).attr('disabled')) {
            var selectedNodes = $tree.treeview('getSelected');
            if(selectedNodes.length == 0) {
                toastr.warning('请选择节点删除');
            } else {
                var node = selectedNodes[0];
                BSModal.confirm({ content: "确认要删除选择的数据吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }

                    //ajax提交删除...

                    //此处仅是前端演示后端删除后的效果：删除条目，重置工具栏状态，显示删除成功的提示
                    $tree.treeview('removeNode', [ node, { silent: true } ]);
                    disableToolbar();
                    toastr.success('删除的数据已提交成功！');
                });
            }
        }
    });

    function nodeSelected(node) {
        //当前的设定是，只有组织可以添加子节点，个人不可以添加子节点，开发时，请根据具体需求调整
        if(!node.root) { //根节点不可前添加/后添加/删除
            $btn_add_before.removeAttr('disabled');
            $btn_add_after.removeAttr('disabled');
            $btn_remove.removeAttr('disabled');
            //个人&&非负责人节点，可以设为部门负责人
            if(node.type == '个人' && !node.isboss) {
                $btn_boss.removeAttr('disabled');
            }
        }

        $btn_edit.removeAttr('disabled');

        if(node.type == '组织') { //组织才可添加子节点
            $btn_add_sub.removeAttr('disabled');
        }

        showTool();
    }

    function nodeUnselected() {
        disableToolbar();
        hideTool();
    }

    //添加部门负责人标志
    function addBossLabel(nodes){
        for(var i in nodes) {
            if(nodes[i].isboss) {
                if(nodes[i].$el.find('.boss').length == 0) {
                    nodes[i].$el.append('<span class="boss font-yellow-bronze">&nbsp;[部门负责人]</span>');
                }
            } else {
                nodes[i].$el.find('.boss').remove();
            }
        }
    }

    function disableToolbar() {
        $btn_add_before.attr('disabled', 'true');
        $btn_add_after.attr('disabled', 'true');
        $btn_add_sub.attr('disabled', 'true');
        $btn_remove.attr('disabled', 'true');
        $btn_edit.attr('disabled', 'true');
        $btn_boss.attr('disabled','true');
    }

    function showTool() {
        $toolbtns.show();
        $tooltip.hide();
    }

    function hideTool() {
        $toolbtns.hide();
        $tooltip.show();
    }

    function checkNodeDataEqual(nodeA, nodeB) {
        if(nodeA.text == nodeB.text && nodeA.type == nodeB.type && nodeA.icon == nodeB.icon) {
            if(nodeA.type == '个人') {
                if(nodeA.tags[0] == nodeB.tags[0]) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }



});
