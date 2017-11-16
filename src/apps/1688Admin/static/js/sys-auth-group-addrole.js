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
    
    //该权限组已有的角色示例，此处假定该权限组已有角色为"会计"，用于前端演示
    var already_has_roles = ["会计"];
    
    //从角色列表中剔除该权限组已经有的角色
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
            window.location.href="sys-auth-group.html";
        }
    })
    
    
    
    
    
    
    
    
});