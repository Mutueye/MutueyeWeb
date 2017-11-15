$(document).ready(function(){
    
    var $btn_save_role = $('#btn_save_role');
    var $btn_add_object = $('#btn_add_object');
    var $btn_remove_object = $('#btn_remove_object');
    var $btn_remove_object_container = $('#btn_remove_object_container');
    $btn_remove_object_container.hide();
    var $node_info = $('#node_info');
    $node_info.hide();
    var $form = $('#new_role_form');

    $form.bootstrapValidator({
        fields: {
            role_name: {
                message: '角色名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入角色名称'
                    }
                }
            },
            role_desc: {
                message: '角色描述验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入角色描述'
                    }
                }
            }
        }
    });
    
    var $tree = $('#tree');
    
    $('.auth-tree-right').scrollFix({
        fixedClass : 'isFixed',
        clearMargin : false,
        fixedZindex : 1000,
        fixedTop : 10
    });
    
    //当前角色的权限对象数据示例
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
                                    auth : false
                                },
                                {
                                    name : '删除',
                                    auth : true
                                },
                                {
                                    name : '查看',
                                    auth : false
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
                            auth : false
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
                            auth : false
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
        }
    ];
    
    var original_object_list = [];
    //深度拷贝初始数据到original_object_list
    $.extend(true, original_object_list, object_list);
    //合成初始角色数据
    var original_role_data =  {
        text: $('#role_name').val(),
        icon: "fa fa-id-card",
        type: "role", //类型：角色
        desc: $('#role_desc').val(),
        nodes:  original_object_list
    }
    
    
    //树型结构初始化
    $tree.treeview({
        data:object_list, //显示剔除当前用户已有角色后的角色树列表
        levels: 2, //默认展开2层
        collapseIcon: 'fa fa-minus-square',
        expandIcon: 'fa fa-plus-square'
    });
    
    $tree.on('nodeSelected', function(event, node) {
        dealSelectedNode();
        $btn_remove_object_container.show();
    });
    
    $tree.on('nodeUnselected', function(event, node) {
        //nodeUnselected();
        $node_info.empty();
        $node_info.hide();
        $btn_remove_object_container.hide();
    });
    /*
    $tree.on('nodeChecked', function(event, data) {
        checkedData = getCheckedData(object_list);
        dealSelectedNode();
    });
    
    $tree.on('nodeUnchecked', function(event, data) {
        var checkedNodes = $tree.treeview('getChecked');
        if(checkedNodes.length != 0) {
            checkedData = getCheckedData(object_list);
        }
        dealSelectedNode();
    });*/
    
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
    
    /*
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
    }*/
    
    function createAuthInfo(authArray) {
        var authHtml = '<div class="row no-bottom">';
        for(i in authArray) {
            var name = authArray[i].name;
            var auth = authArray[i].auth;
            var authInfo = '<input type="checkbox" class="auth-checkbox" id="' + name + '">';
            if(auth) {
                authInfo = '<input type="checkbox" class="auth-checkbox" id="' + name + '" checked>';;
            }
            authHtml += '<div class="col-xs-12 col-sm-6">' +
                            '<div class="form-group cool-form-group form-group-sm cool-form-input-group">' +
                                '<div class="input-group">' +
                                    '<div class="input-group-addon addon-label">' + name + '：</div>' +
                                    '<div class="cool-form-content icheck-label">' + 
                                        '<label>' +
                                            authInfo + 
                                        '</label>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
        }
        authHtml += '</div>';
        return authHtml;
    }
    
    //合成最后的角色数据
    function combineFinalData() {
        return {
            text: $('#role_name').val(),
            icon: "fa fa-id-card",
            type: "role", //类型：角色
            desc: $('#role_desc').val(),
            nodes: object_list
        }
    }
    
    $btn_save_role.click(function(){
        if(!$(this).attr('disabled')) {
            var bsValidator = $form.data('bootstrapValidator');
            bsValidator.validate();
            var result = bsValidator.isValid();
            if(result) {
                if(_.isEqual(original_role_data, combineFinalData())) {
                    toastr.warning('未修改，无需保存');
                } else {
                    //最终得到的角色数据
                    alert(JSON.stringify(combineFinalData()));
                    //提交数据成功后提示
                    toastr.success('编辑的角色信息已提交保存');
                }
            }
        }
    });
    
    $btn_add_object.click(function(){
        if(_.isEqual(original_role_data, combineFinalData())) {
            //没有修改内容，直接跳转到添加对象页面
            window.location.href="sys-auth-character-edit-addobject.html";
        } else {//有修改内容，弹出确认窗口
            BSModal.confirm({ 
                width: '460px',
                content:    "即将跳转的添加对象页面，您修改的内容还未保存。" +
                            "<br>" +
                            "1.您可以点击取消，保存修改后再添加对象；" +
                            "<br>" +
                            "2.或者点击确定，不保存修改内容，直接跳转到添加对象页面。"
            }).on(function (e) {
                if (!e) {
                    return;
                }
                
                window.location.href="sys-auth-character-edit-addobject.html";
                
            });
        }
        
    })
    
    $btn_remove_object.click(function(){
        
        var selectedNodes = $tree.treeview('getSelected');
        if(selectedNodes.length == 0) {
            toastr.warning('请选择节点删除');
        } else {
            var node = selectedNodes[0];
            BSModal.confirm({ content: "确认要删除该权限对象吗？" }).on(function (e) {
                if (!e) {
                    return;
                }
                
                //前端删除数据，此处不提交，待点击“保存修改”按钮时统一提交修改后的数据
                $tree.treeview('removeNode', [ node, { silent: true } ]);
                //object_list删除对应节点数据
                if(node.level == 1) {
                    object_list = _.reject(object_list, function(object){
                        return object.text == node.text;
                    });
                } else {
                    var nodeIdArray = node.parentId.split('.');
                    var parentNode = object_list;
                    //根据nodeId定位object_list中对应的节点
                    for(var i = 1; i < nodeIdArray.length; i++) {
                        if(i == 1) {
                            parentNode = parentNode[nodeIdArray[i]];
                        } else {
                            parentNode = parentNode.nodes[nodeIdArray[i]];
                        }
                    }
                    parentNode.nodes = _.reject(parentNode.nodes, function(object){
                        return object.text == node.text;
                    });
                }
                console.log(object_list);
                
                $btn_remove_object_container.hide();
                toastr.success('权限对象删除完成！');
            });
        }
    });
    
});