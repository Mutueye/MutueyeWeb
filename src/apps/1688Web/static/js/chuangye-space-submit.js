$(document).ready(function(){
    var $form = $('#form');
    var $btn_submit = $('#btn_submit');

    //icheck初始化
    $('#checkbox_agree').iCheck({
        handle: 'checkbox',
        checkboxClass: 'icheckbox_square-blue'
    }).on('ifChanged', function(e){
        console.log('checkbox状态：' + $('#checkbox_agree').is(':checked'));
    });

    //发布
    $btn_submit.click(function(){

        if(checkValidation()) {
            //提交成功后页面跳转到孵化器详情页
            //window.location.href = ...

        }

    });

    $form.bootstrapValidator({
        fields: {
            industry: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入所属行业'
                    }
                }
            },
            name: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入联系人姓名'
                    }
                }
            },
            phone: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入联系电话'
                    }
                }
            },
            email: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入邮箱地址'
                    }
                }
            },
            address: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入地址'
                    }
                }
            },
            desc: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入项目描述'
                    }
                }
            },
            team: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入团队信息'
                    }
                }
            }
        }
    });



    //判断必填项是否都已填入内容
    function checkValidation() {
        var bsValidator = $form.data('bootstrapValidator');
        bsValidator.validate();
        var result = bsValidator.isValid();
        if(!result) {
            toastr.warning('您输入的表单信息验证未通过');
        } else {
            if($('#checkbox_agree').is(':checked')) {
                return true;
            } else {
                toastr.warning('请阅读并同意入孵规章手册才可注册');
                return false;
            }
        }

    }
});
