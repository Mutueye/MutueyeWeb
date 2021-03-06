$(document).ready(function(){
    
    var $btn_add_user = $('#btn_add_user');
    var $btn_remove_user = $('#btn_remove_user');
    var $btn_remove_user_container = $('#btn_remove_user_container');
    var $btn_add_role = $('#btn_add_role');
    var $btn_add_role_container = $('#btn_add_role_container');
    var $btn_remove_role = $('#btn_remove_role');
    var $btn_remove_role_container = $('#btn_remove_role_container');
    
    var $tree = $('#tree');
    
    $('.auth-tree-right').scrollFix({
        fixedClass : 'isFixed',
        clearMargin : false,
        fixedZindex : 1000,
        fixedTop : 10
    });
    
    var treeData = [
        {
            text: "刘小武",
            icon: "fa fa-user-circle-o",
            type: "user", //类型：用户
            nodes: [
                {
                    text: "项目经理",
                    icon: "fa fa-id-card",
                    type: "role", //类型：角色
                    fromGroup: "运营管理部"
                },
                {
                    text: "会计",
                    icon: "fa fa-id-card",
                    type: "role" //类型：角色
                }
            ]
        },
        {
            text: "王大文",
            icon: "fa fa-user-circle-o",
            type: "user", //类型：用户
            nodes: [
                {
                    text: "会计",
                    icon: "fa fa-id-card",
                    type: "role" //类型：角色
                }
            ]
        }
    ];
    
    //组织结构 树型结构初始化
    $tree.treeview({
        data:treeData,
        levels: 2, //默认展开两层
        collapseIcon: 'fa fa-minus-square',
        expandIcon: 'fa fa-plus-square'
    });
    
    hideBtns();
    
    $tree.on('nodeSelected', function(event, node) {
        nodeSelected(node);
    });
    
    
    $tree.on('nodeUnselected', function(event, node) {
        nodeUnselected();
    });
    
    function nodeSelected(node) {
        if(node.type == "user") {
            $btn_remove_user_container.show();
            $btn_add_role_container.show();
        } else if(node.type == "role") {
            $btn_remove_role_container.show();
        }
        
    }
    
    function nodeUnselected() {
        hideBtns();
    }
    
    function hideBtns(){
        $btn_remove_user_container.hide()
        $btn_add_role_container.hide()
        $btn_remove_role_container.hide()
    }
    
    $btn_remove_user.click(function(){
        if(!$(this).attr('disabled')) {
            var selectedNodes = $tree.treeview('getSelected');
            if(selectedNodes.length == 0) {
                toastr.warning('请选择节点删除');
            } else {
                var node = selectedNodes[0];
                BSModal.confirm({ content: "确认要删除该用户吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }
                    
                    //ajax提交删除...
                    
                    //此处仅是前端演示后端删除后的效果：删除条目，重置工具栏状态，显示删除成功的提示
                    $tree.treeview('removeNode', [ node, { silent: true } ]); 
                    hideBtns();
                    toastr.success('用户删除完成！');
                });
            }
             
            
        }
    });
    
    $btn_remove_role.click(function(){
        var selectedNodes = $tree.treeview('getSelected');
        var node = selectedNodes[0];
        if(selectedNodes.length == 0) {
            toastr.warning('请选择节点删除');
        } else if(node.fromGroup){
            toastr.warning('删除失败！该用户还在' + node.fromGroup + '权限组里，先将该用户移除所在权限组后才能删除。');
        } else {
            BSModal.confirm({ content: "确认要删除该角色吗？" }).on(function (e) {
                if (!e) {
                    return;
                }
                
                //ajax提交删除...
                
                //此处仅是前端演示后端删除后的效果：删除条目，重置工具栏状态，显示删除成功的提示
                $tree.treeview('removeNode', [ node, { silent: true } ]); 
                
                hideBtns();
                toastr.success('角色删除完成！');
            });
        }
    });
    
    //选择用户下拉菜单数据示例
    var userList = [
        {
            value : '张伞',
            text : '张伞'
        },
        {
            value : '李思',
            text : '李思'
        },
        {
            value : '王悟',
            text : '王悟'
        },
        {
            value : '赵留',
            text : '赵留'
        }
    ]
    
    $btn_add_user.click(function(){
        BSModal.confirm({ 
            title : "新增用户", 
            content:    "<div class='row-space-10'>" +
                            "<form class='row no-bottom'>" +
                                "<div class='col-xs-12'>" +
                                    "<div class='form-group form-group-sm cool-form-group'>" +
                                        "<div class='control-label cool-form-label text-right'>请选择用户：</div>" +
                                        "<select class='form-control selectpicker' id='user_list' name='user_list' title='请选择用户'>" +
                                        "</select>" +
                                    "</div>" +
                                "</div>" +
                            "</form>" +
                        "</div>",
            width : "460px", 
            btnOKDismiss : false,
            afterInit : function($modal){ //弹窗初始化完成后，添加相关表单控制
                window.commonTools.addSelectOptions($('#user_list'), userList);
                $('#user_list').selectpicker({
                    liveSearch : true,
                    liveSearchPlaceholder : '搜索用户...'
                });
            }
        }).on(function (e, id) {
            if (!e) {
                return;
            }
            $modal = $('#' + id);
            
            var selectedUser = $('#user_list').selectpicker('val');
            if(!selectedUser || selectedUser.length == 0) {
                toastr.warning('请选择用户');
            } else {
                console.log(selectedUser);
                node_data = {
                    text: selectedUser,
                    icon: "fa fa-user-circle-o",
                    type: "user" //类型：用户
                };
                $tree.treeview('addNode', [ node_data, false, 0, { silent: true } ]);
                $tree.treeview('selectNode', [ node_data, { silent: false } ]);
                $modal.modal('hide');
                toastr.success('添加用户成功');
            }
        });
    });
    
    
    
    
    
});