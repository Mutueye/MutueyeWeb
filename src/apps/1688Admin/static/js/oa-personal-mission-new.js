$(document).ready(function(){
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_draft = $('#btn_draft'); //按钮暂存
    var $form = $('#form');

    //icheck初始化
    $('#checkbox1').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
    }).on('ifChanged', function(e){
        console.log('checkbox1:状态：' + $('#checkbox1').is(':checked'));
    });

    $form.bootstrapValidator({
        fields: {
            mission_name: {
                message: '任务名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入任务名称'
                    }
                }
            },
            content: {
                message: '任务内容验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入任务内容'
                    }
                }
            }
        }
    });

    //手动表单验证
    function checkValidation() {
        var bsValidator = $form.data('bootstrapValidator');
        bsValidator.validate();
        var result = bsValidator.isValid();
        if(!result) {
            toastr.warning('您输入的表单信息验证未通过');
        }
        return result;
    }

    //以下是树形下拉菜单相关控制=======================================

    //当前选择的人员
    var selectedUserStr = "";

    //使bootstrap dropdown 插件在点击树结构时不收起
    $(document).on('click.bs.dropdown.data-api', '.dropdown .treeview-select-tree', function (e) { e.stopPropagation() });

    user_list = [
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
                    type: "个人"
                },
                {
                    text: "张部龄",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事，总经理'],
                    type: "个人"
                },
                {
                    text: "付洪涛",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事，副总经理'],
                    type: "个人"
                },
                {
                    text: "肖可峰",
                    icon: "fa fa-user-circle-o",
                    tags: ['董事'],
                    type: "个人"
                },
                {
                    text: "行政部",
                    icon: "fa fa-users",
                    type: "组织",
                    nodes: [
                        {
                            text: "张晓晓",
                            icon: "fa fa-user-circle-o",
                            tags: ['副行政部长'],
                            type: "个人"
                        },
                        {
                            text: "胡星亮",
                            icon: "fa fa-user-circle-o",
                            tags: ['主任'],
                            type: "个人"
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
                            type: "个人"
                        },
                        {
                            text: "兰于东",
                            icon: "fa fa-user-circle-o",
                            tags: ['副财政部长'],
                            type: "个人"
                        },
                        {
                            text: "赵西冷",
                            icon: "fa fa-user-circle-o",
                            tags: ['会计'],
                            type: "个人"
                        }
                    ]
                }
            ]
        }
    ];

    $('#tree').treeview({
        data:user_list,
        levels: 1, //默认展开1层
        showTags: false,
        selectable: false,
        showCheckbox : false,
        checkboxFirst : true,
        hierarchicalCheck : true,
        propagateCheckEvent : true,
        collapseIcon: 'fa fa-minus-square',
        expandIcon: 'fa fa-plus-square'
    });

    $('#tree').on('nodeSelected', function(event, data) {
        fillTreeviewSelectList($('#notice_list'), $('#btn_notice_list'), $('#tree').treeview('getSelected'), '请选择人员：');
        console.log($('#notice_list').val());
    });

    $('#tree').on('nodeUnselected', function(event, data) {
        fillTreeviewSelectList($('#notice_list'), $('#btn_notice_list'), $('#tree').treeview('getSelected'), '请选择人员：');
        console.log($('#notice_list').val());
    });

    checkTreeviewSelect($('#tree'), selectedUserStr);
    fillTreeviewSelectList($('#notice_list'), $('#btn_notice_list'), $('#tree').treeview('getSelected'), '请选择人员：');

    //根据字符串数组勾选树节点
    function checkTreeviewSelect($tree, selectedUserStr) {
        if(selectedUserStr.length > 0) {
            var selectedUserArray = selectedUserStr.split('，');
            var nodes = $tree.treeview('getNodes');
            for(var i in nodes) {
                for(var j in selectedUserArray) {
                    if(nodes[i].text == selectedUserArray[j]) {
                        //使用checkNode方法，子节点勾选，父节点不显示“部分勾选”的状态
                        //$tree.treeview('checkNode',[nodes[i], {silent:false}]);
                        $tree.treeview('selectNode',[nodes[i], {silent:false}]);
                    }
                }
            }
        }
    }

    //解析勾选的人员树节点数组，填充到人员列表input内
    //$input 不可见的input，方便表单提交数据
    //$btn 下拉菜单的触发按钮，并显示当前选择的内容，空内容显示defaultText的字符串
    //checkedNodes 当前勾选的节点数组
    //defaultText 没有勾选时$btn显示的文字内容
    function fillTreeviewSelectList($input, $btn, checkedNodes, defaultText) {
        var defaultStr = defaultText ? defaultText : '请选择';
        if(checkedNodes.length > 0) {
            var listStrArray = [];
            var listStrSeparator = "，";
            for(var i in checkedNodes) {
                if(checkedNodes[i].type == '个人') {
                    listStrArray.push(checkedNodes[i].text);
                }
            }
            if(listStrArray.length > 0) {
                var listStr = listStrArray.join(listStrSeparator);
                $input.val(listStr);
                $btn.text(listStr);
            } else {
                $input.val('');
                $btn.text(defaultStr);
            }
        } else {
            $input.val('');
            $btn.text(defaultStr);
        }

    }

    //获取nodes节点中type为‘个人’的数组
    function getCheckdPersonal(nodes) {
        var personalArray = [];
        if(nodes.length > 0) {
            for(var i in nodes) {
                if(nodes[i].type == '个人') {
                    personalArray.push(nodes[i].text);
                }
            }
        }
        return personalArray;
    }

    //以上是树形下拉菜单相关控制=======================================

    //发布
    $btn_publish.click(function(){
        //获取勾选的人员数组：
        alert('选中的人：' + $('#tree').treeview('getSelected')[0].text);
        if(checkValidation()) {

            //此处提交数据，提交成功后，返回上级页面

            //此处根据原型演示业务流程，直接跳转到反馈页面
            window.location.href='oa-personal-mission-respond.html';
        }
    });

    //暂存
    $btn_draft.click(function(){


        if(checkValidation()) {

            //此处提交数据，提交成功后，弹出如下提示

            toastr.success('您编辑的内容已暂存');
        }
    });

});
