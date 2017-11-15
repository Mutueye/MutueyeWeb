$(document).ready(function(){
    
    var $node_info = $('#node_info');
    $node_info.hide();
    
    var $tree = $('#tree');
    
    $('.auth-tree-right').scrollFix({
        fixedClass : 'isFixed',
        clearMargin : false,
        fixedZindex : 1000,
        fixedTop : 10
    });
    
    var obj_list = [
        {
            text: "协同办公",
            icon: "fa fa-key",
            type: "object", //类型： 对象
            nodes: [
                {
                    text: "人力资源",
                    icon: "fa fa-key",
                    type: "object", //类型： 对象
                    nodes: [
                        {
                            text: "招聘",
                            icon: "fa fa-key",
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
                            text: "培训",
                            icon: "fa fa-key",
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
                    text: "文档管理",
                    icon: "fa fa-key",
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
            text: "合同管理",
            icon: "fa fa-key",
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
                },
                {
                    name : '打印',
                    auth : true
                }
            ]
        },
        {
            text: "档案管理",
            icon: "fa fa-key",
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
    ];
    
    //组织结构 树型结构初始化
    $tree.treeview({
        data:obj_list, 
        levels: 5, //默认展开5层
        collapseIcon: 'fa fa-minus-square',
        expandIcon: 'fa fa-plus-square'
    });
    
    $tree.on('nodeSelected', function(event, node) {
        var selectedNode = $tree.treeview('getSelected')[0];
        if(!selectedNode.nodes) {
            $node_info.html(createAuthInfo(selectedNode.objectAuth));
            $node_info.show();
        }
    });
    
    
    $tree.on('nodeUnselected', function(event, node) {
        $node_info.empty();
        $node_info.hide();
        
    });
    
    
    
    function createAuthInfo(authArray) {
        var authHtml = '<div class="row no-bottom">';
        for(i in authArray) {
            var name = authArray[i].name;
            //var auth = authArray[i].auth;
            var authInfo = '<i class="fa fa-check-square font-green-grass"></i>';
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
    
});