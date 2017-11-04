$(document).ready(function(){
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $form = $('#form');
    
    //流程数据示例
    var proc_data = []; //新建流程初始数据为空
    /*
    var proc_data = [
        {
            name : '财务审批', //节点名称
            type : '上级协调', //节点类型
            action : '审批' //任务行为
        },
        {
            name : '部门经理审批', //节点名称
            type : '上级协调', //节点类型
            action : '审批', //任务行为
            examiner : { //负责人
                name : '章点非（总经理）',
                dep : '行政部'
            } 
        }
    ];*/
    //存储初始流程数据
    var original_proc_data = proc_data.slice(0);
    
    //负责人列表数据示例
    var examiners = [
        {
            dep : '行政部',
            list : [
                {
                    name : '章点非',
                    post : '总经理'
                },
                {
                    name : '鲁飞',
                    post : '副总经理',
                },
                {
                    name : '高栾平',
                    post : '经理'
                }
            ]
        },
        {
            dep : '财务部',
            list : [
                {
                    name : '李爽',
                    post : '总经理'
                },
                {
                    name : '夏晓峰',
                    post : '副总经理'
                },
                {
                    name : '赵费清',
                    post : '经理'
                }
            ]
        }
    ];
    
    //任务类型 下拉菜单选项数据示例
    var procTypeOptions = [
        {
            value : '上级协调',
            text : '上级协调'
        },
        {
            value : '同级协作',
            text : '同级协作'
        },
        {
            value : '指派专员',
            text : '指派专员'
        }
    ];
    
    //任务行为 下拉菜单选项数据示例
    var procActionOptions = [
        {
            value : '审批',
            text : '审批'
        },
        {
            value : '审批并用印',
            text : '审批并用印'
        },
        {
            value : '协作',
            text : '协作'
        },
        {
            value : '指派',
            text : '指派'
        },
        {
            value : '回复',
            text : '回复'
        }
    ];
    
    //新增/编辑节点的表单数据示例
    var formData = {
        examiner_data : examiners, //负责人列表数据
        type_options : procTypeOptions, //任务类型 选项数据
        action_options : procActionOptions //任务行为 选项数据
    }
    
    /* ==================================================================================
     * procBuilder.js
     * 流程管理流程图的构建&控制
     * 依赖 jquery.min.js, underscore-min.js, toastr.min.js, BSModal.js, common.js
     * json数据格式参考上面的示例，
     * 具体开发时请根据后台提供数据和前端业务逻辑，对json格式和procBuilder.js代码进行调整
     * ================================================================================== */
    var processBuilder = new procBuilder($('#proc_container'), proc_data, formData, 'edit');
    
    $btn_publish.click(function(){
        if(checkValidation()) {
            alert(JSON.stringify(proc_data));
            //此处提交数据，提交成功后，返回上级页面
            window.location.href='sys-proc.html';
        }
    });
    
    $form.bootstrapValidator({
        fields: {
            title: {
                message: '流程名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入流程名称'
                    }
                }
            },
            desc: {
                message: '流程描述验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入流程描述'
                    }
                }
            }
        }
    });
    
    //判断必填项是否都已填入内容
    function checkValidation() {
        if(proc_data.length == 0) {
            toastr.warning('流程为空，请添加流程节点');
            return false;
        } else {
            if(_.isEqual(original_proc_data,proc_data)) {
                toastr.warning('流程未修改，无需提交');
                return false;
            }
        }
        
        var bsValidator = $form.data('bootstrapValidator');
        bsValidator.validate();
        var result = bsValidator.isValid();
        if(!result) {
            toastr.warning('您输入的表单信息验证未通过');
        }
        return result;
    }

});