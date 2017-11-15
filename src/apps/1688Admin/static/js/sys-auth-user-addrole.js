$(document).ready(function(){
    
    var $btn_add_role = $('#btn_add_role');
    $btn_add_role.attr('disabled','true');
    var $node_info = $('#node_info');
    $node_info.hide();
    
    var $tree = $('#tree');
    
    $('.auth-tree-right').scrollFix({
        fixedClass : 'isFixed',
        clearMargin : false,
        fixedZindex : 1000,
        fixedTop : 10
    });
    
    //角色列表数据示例
    var role_list = [
        {
            text: "项目经理",
            icon: "fa fa-id-card",
            type: "role", //类型：角色
            nodes: [
                {
                    text: "协同办公",
                    icon: "fa fa-key",
                    hideCheckbox : true,
                    type: "object", //类型： 对象
                    nodes: [
                        {
                            text: "人力资源",
                            icon: "fa fa-key",
                            hideCheckbox : true,
                            type: "object", //类型： 对象
                            nodes: [
                                {
                                    text: "招聘",
                                    icon: "fa fa-key",
                                    hideCheckbox : true,
                                    type: "object", //类型： 对象
                                    objectAuth : [
                                        {
                                            name : '新增',
                                            auth : true
                                        },
                                        {
                                            name : '编辑',
                                            auth : true
                                        },
                                        {
                                            name : '删除',
                                            auth : false
                                        },
                                        {
                                            name : '查看',
                                            auth : true
                                        }
                                    ]
                                },
                                {
                                    text: "培训",
                                    icon: "fa fa-key",
                                    hideCheckbox : true,
                                    type: "object", //类型： 对象
                                    objectAuth : [
                                        {
                                            name : '新增',
                                            auth : false
                                        },
                                        {
                                            name : '编辑',
                                            auth : false
                                        },
                                        {
                                            name : '删除',
                                            auth : false
                                        },
                                        {
                                            name : '查看',
                                            auth : true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            text: "文档管理",
                            icon: "fa fa-key",
                            hideCheckbox : true,
                            type: "object", //类型： 对象
                            objectAuth : [
                                {
                                    name : '新增',
                                    auth : true
                                },
                                {
                                    name : '编辑',
                                    auth : true
                                },
                                {
                                    name : '删除',
                                    auth : true
                                },
                                {
                                    name : '查看',
                                    auth : true
                                }
                            ]
                        },
                        {
                            text: "信息发布",
                            icon: "fa fa-key",
                            hideCheckbox : true,
                            type: "object", //类型： 对象
                            objectAuth : [
                                {
                                    name : '新增',
                                    auth : true
                                },
                                {
                                    name : '编辑',
                                    auth : true
                                },
                                {
                                    name : '删除',
                                    auth : false
                                },
                                {
                                    name : '查看',
                                    auth : true
                                }
                            ]
                        }
                    ]
                },
                {
                    text: "合同管理",
                    icon: "fa fa-key",
                    hideCheckbox : true,
                    type: "object", //类型： 对象
                    objectAuth : [
                        {
                            name : '新增',
                            auth : false
                        },
                        {
                            name : '编辑',
                            auth : false
                        },
                        {
                            name : '删除',
                            auth : true
                        },
                        {
                            name : '查看',
                            auth : false
                        },
                        {
                            name : '打印',
                            auth : false
                        }
                    ]
                }
            ]
        },
        {
            text: "会计",
            icon: "fa fa-id-card",
            type: "role", //类型：角色
            nodes: [
                {
                    text: "物资采购",
                    icon: "fa fa-key",
                    hideCheckbox : true,
                    type: "object", //类型： 对象
                    nodes: [
                        {
                            text: "固定资产",
                            icon: "fa fa-key",
                            hideCheckbox : true,
                            type: "object", //类型： 对象
                            nodes: [
                                {
                                    text: "请购",
                                    icon: "fa fa-key",
                                    hideCheckbox : true,
                                    type: "object", //类型： 对象
                                    objectAuth : [
                                        {
                                            name : '新增',
                                            auth : true
                                        },
                                        {
                                            name : '编辑',
                                            auth : true
                                        }
                                    ]
                                },
                                {
                                    text: "领用",
                                    icon: "fa fa-key",
                                    hideCheckbox : true,
                                    type: "object", //类型： 对象
                                    objectAuth : [
                                        {
                                            name : '新增',
                                            auth : true
                                        },
                                        {
                                            name : '编辑',
                                            auth : true
                                        }
                                    ]
                                },
                                {
                                    text: "报废",
                                    icon: "fa fa-key",
                                    hideCheckbox : true,
                                    type: "object", //类型： 对象
                                    objectAuth : [
                                        {
                                            name : '新增',
                                            auth : true
                                        },
                                        {
                                            name : '编辑',
                                            auth : true
                                        }
                                    ]
                                },
                                {
                                    text: "出售",
                                    icon: "fa fa-key",
                                    hideCheckbox : true,
                                    type: "object", //类型： 对象
                                    objectAuth : [
                                        {
                                            name : '新增',
                                            auth : true
                                        },
                                        {
                                            name : '编辑',
                                            auth : true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            text: "业务经理",
            icon: "fa fa-id-card",
            type: "role", //类型：角色
            nodes: [
                {
                    text: "合同管理",
                    icon: "fa fa-key",
                    hideCheckbox : true,
                    type: "object", //类型： 对象
                    objectAuth : [
                        {
                            name : '新增',
                            auth : false
                        },
                        {
                            name : '编辑',
                            auth : true
                        },
                        {
                            name : '删除',
                            auth : false
                        },
                        {
                            name : '查看',
                            auth : true
                        },
                        {
                            name : '打印',
                            auth : false
                        }
                    ]
                },
                {
                    text: "档案管理",
                    icon: "fa fa-key",
                    hideCheckbox : true,
                    type: "object", //类型： 对象
                    objectAuth : [
                        {
                            name : '新增',
                            auth : true
                        },
                        {
                            name : '编辑',
                            auth : true
                        },
                        {
                            name : '删除',
                            auth : true
                        },
                        {
                            name : '查看',
                            auth : true
                        }
                    ]
                }
            ]
        },
        {
            text: "业务员",
            icon: "fa fa-id-card",
            type: "role", //类型：角色
            nodes: [
                {
                    text: "合同管理",
                    icon: "fa fa-key",
                    hideCheckbox : true,
                    type: "object", //类型： 对象
                    objectAuth : [
                        {
                            name : '新增',
                            auth : true
                        },
                        {
                            name : '编辑',
                            auth : true
                        },
                        {
                            name : '删除',
                            auth : false
                        },
                        {
                            name : '查看',
                            auth : true
                        },
                        {
                            name : '打印',
                            auth : false
                        }
                    ]
                },
                {
                    text: "档案管理",
                    icon: "fa fa-key",
                    hideCheckbox : true,
                    type: "object", //类型： 对象
                    objectAuth : [
                        {
                            name : '新增',
                            auth : false
                        },
                        {
                            name : '编辑',
                            auth : false
                        },
                        {
                            name : '删除',
                            auth : true
                        },
                        {
                            name : '查看',
                            auth : true
                        }
                    ]
                }
            ]
        }
    ];
    
    //该用户已有的角色示例，此处假定该用户已有角色为"会计"，用于前端演示
    var already_has_roles = ["会计"];
    
    //从角色列表中剔除该用户已经有的角色
    var finalRoleList = [];
    for(var i in role_list) {
        var okToPush = true;
        for(var j in already_has_roles) {
            if(role_list[i].text == already_has_roles[j]) {
                okToPush = false;
            }
        }
        if(okToPush) {
            finalRoleList.push(role_list[i]);
        }
    }
    console.log(finalRoleList);
    
    //组织结构 树型结构初始化
    $tree.treeview({
        data:finalRoleList, //显示剔除当前用户已有角色后的角色树列表
        levels: 2, //默认展开2层
        showCheckbox : true,
        checkboxFirst : true,
        collapseIcon: 'fa fa-minus-square',
        expandIcon: 'fa fa-plus-square'
    });
    
    $tree.on('nodeSelected', function(event, node) {
        var selectedNode = $tree.treeview('getSelected')[0];
        if(!selectedNode.nodes) {
            console.log(selectedNode.objectAuth);
            $node_info.html(createAuthInfo(selectedNode.objectAuth));
            $node_info.show();
        }
        
    });
    
    
    $tree.on('nodeUnselected', function(event, node) {
        //nodeUnselected();
        $node_info.empty();
        $node_info.hide();
    });
    
    $tree.on('nodeChecked', function(event, data) {
        $btn_add_role.removeAttr('disabled');
    });
    
    $tree.on('nodeUnchecked', function(event, data) {
        var checkedNodes = $tree.treeview('getChecked');
        if(checkedNodes.length == 0) {
            $btn_add_role.attr('disabled','true');
        }
    });
    
    function createAuthInfo(authArray) {
        var authHtml = '<div class="row no-bottom">';
        for(i in authArray) {
            var name = authArray[i].name;
            var auth = authArray[i].auth;
            var authInfo = '<i class="fa fa-square font-gray-d6"></i>';
            if(auth) {
                authInfo = '<i class="fa fa-check-square font-green-grass"></i>';
            }
            authHtml += '<div class="col-xs-12 col-sm-6">' +
                            '<div class="form-group cool-form-group form-group-sm cool-form-input-group">' +
                                '<div class="input-group">' +
                                    '<div class="input-group-addon addon-label">' + name + '：</div>' +
                                    '<div class="cool-form-content">' + authInfo + '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        }
        authHtml += '</div>';
        return authHtml;
    }
    
    $btn_add_role.click(function(){
        if(!$(this).attr('disabled')) {
            //添加角色成功后，返回上级页面
            window.location.href="sys-auth-user.html";
        }
    })
    
    
    
    
    /*
    function hideBtns(){
        $btn_remove_user.hide()
        $btn_add_role.hide()
        $btn_remove_role.hide()
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
                                        "<div class='control-label cool-form-label text-right'>请选择角色：</div>" +
                                        "<select class='form-control selectpicker' type='text' id='user_list' name='user_list' title='请选择用户'>" +
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
    
    
    
    $btn_add_role.click(function(){
        window.location.href = 'sys-auth-user-addrole.html'
    });
    */
    /*
    
    $tree.on('rendered', function(event, nodes) {
        console.log(nodes);
    });
    
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
    
    function disableToolbar() {
        $btn_add_before.attr('disabled', 'true');
        $btn_add_after.attr('disabled', 'true');
        $btn_add_sub.attr('disabled', 'true');
        $btn_remove.attr('disabled', 'true');
        $btn_edit.attr('disabled', 'true');
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
    }*/
    
    
    
});