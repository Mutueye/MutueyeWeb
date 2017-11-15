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
    
    //权限对象数据示例
    var object_list = [
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
            text: "物资采购",
            icon: "fa fa-key",
            type: "object", //类型： 对象
            nodes: [
                {
                    text: "固定资产",
                    icon: "fa fa-key",
                    type: "object", //类型： 对象
                    nodes: [
                        {
                            text: "请购",
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
                                }
                            ]
                        },
                        {
                            text: "领用",
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
                                }
                            ]
                        },
                        {
                            text: "报废",
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
                                }
                            ]
                        },
                        {
                            text: "出售",
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
                                }
                            ]
                        }
                    ]
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
    
    var checkedData = [];
    
    
    //组织结构 树型结构初始化
    $tree.treeview({
        data:object_list, //显示剔除当前用户已有角色后的角色树列表
        levels: 2, //默认展开2层
        showCheckbox : true,
        checkboxFirst : true,
        hierarchicalCheck : true,
        collapseIcon: 'fa fa-minus-square',
        expandIcon: 'fa fa-plus-square'
    });
    
    $tree.on('nodeSelected', function(event, node) {
        dealSelectedNode();
    });
    
    $tree.on('nodeUnselected', function(event, node) {
        //nodeUnselected();
        $node_info.empty();
        $node_info.hide();
    });
    
    $tree.on('nodeChecked', function(event, data) {
        $btn_add_role.removeAttr('disabled');
        checkedData = getCheckedData(object_list);
        
    });
    
    $tree.on('nodeUnchecked', function(event, data) {
        var checkedNodes = $tree.treeview('getChecked');
        if(checkedNodes.length == 0) {
            $btn_add_role.attr('disabled','true');
        } else {
            checkedData = getCheckedData(object_list);
        }
        
    });
    
    //选中被勾选的节点的相关处理
    function dealSelectedNode() {
        var selectedNode = $tree.treeview('getSelected')[0];
        //console.log(selectedNode);
        if(selectedNode) {
            if(!selectedNode.nodes) {
                //console.log(selectedNode.objectAuth);
                $node_info.html(createAuthInfo(selectedNode.objectAuth));
                $node_info.show();
                $('.auth-checkbox').iCheck({
                    checkboxClass: 'icheckbox_square-blue'
                }).on('ifChanged', function(e){
                    var objAuth = [];
                    $('.auth-checkbox').each(function(){
                        var $this = $(this);
                        objAuth.push({
                            name : $this.attr('id'),
                            auth : $this.is(':checked')
                        });
                    });
                    if(!_.isEqual(selectedNode.objectAuth, objAuth)) {
                        selectedNode.objectAuth = objAuth;
                        var nodeIdArray = selectedNode.nodeId.split('.');
                        var targetNode = object_list;
                        //根据nodeId定位object_list中对应的节点
                        for(var i = 1; i < nodeIdArray.length; i++) {
                            if(i == 1) {
                                targetNode = targetNode[nodeIdArray[i]];
                            } else {
                                targetNode = targetNode.nodes[nodeIdArray[i]];
                            }
                        }
                        targetNode.objectAuth = objAuth;
                        console.log(object_list);
                        checkedData = getCheckedData(object_list);
                    }
                });
            } else {
                $node_info.empty();
                $node_info.hide();
            }
        } else {
            $node_info.empty();
            $node_info.hide();
        }
    }
    
    //获取勾选的数据
    function getCheckedData(data) {
        var checkedNodes = $tree.treeview('getChecked');
        var checkedDataArray = createCheckedData(data, reduceSubNodes(checkedNodes), 1);
        console.log(checkedDataArray);
        return checkedDataArray;
    }
    
    //如果某个被选中的node的父级node也被选中，则返回的数组中剔除这个node,方便后续createCheckedData使用
    function reduceSubNodes(checkedNodes) {
        var reducedNodes = [];
        for(var i in checkedNodes) {
            var thisNode = checkedNodes[i];
            if(thisNode.level == 1) {
                reducedNodes.push(thisNode);
            } else {
                var subNodes = _.find(checkedNodes,function(node){
                    //返回true,说明勾选的节点checkedNodes中，有该节点的父节点
                    return node.nodeId == thisNode.parentId;
                });
                if(typeof subNodes == 'undefined') {
                    reducedNodes.push(thisNode);
                }
            }
        }
        return reducedNodes;
    }
    
    //获取被勾选的节点，返回对应树结构的json
    function createCheckedData(data, checkedArray, level) {
        var checkedData = [];
        for(var i in checkedArray) {
            for(var j in data) {
                if(checkedArray[i].level == level) {
                    if(checkedArray[i].text == data[j].text) {
                        checkedData.push(data[j]);
                    } else {
                        if(data[j].nodes) {
                            var subNodes = createCheckedData(data[j].nodes, checkedArray, level + 1);
                            if(subNodes.length != 0) {
                                var findThisNode = _.find(checkedData, function(node) {
                                    return node.text == data[j].text;
                                });
                                if(typeof findThisNode == 'undefined') {
                                    checkedData.push({
                                        text: data[j].text,
                                        icon: "fa fa-key",
                                        type: "object",
                                        nodes: subNodes
                                    });
                                }
                            }
                        }
                    }
                } else {
                    if(data[j].nodes) {
                        var subNodes = createCheckedData(data[j].nodes, checkedArray, level + 1);
                        if(subNodes.length != 0) {
                            var findThisNode = _.find(checkedData, function(node) {
                                return node.text == data[j].text;
                            });
                            if(typeof findThisNode == 'undefined') {
                                checkedData.push({
                                    text: data[j].text,
                                    icon: "fa fa-key",
                                    type: "object",
                                    nodes: subNodes
                                });
                            }
                        }
                    }
                }
            }
        }
        return checkedData;
    }
    
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
        
            //最终得到的角色数据
            alert(JSON.stringify(checkedData));
            //提交数据成功后返回上级
            window.location.href="sys-auth-character-edit.html";
            
        }
    });
    
});