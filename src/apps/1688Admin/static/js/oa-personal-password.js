$(document).ready(function(){

    var $form = $('#form');
    var $btn_save = $('#btn_save');

    //发布
    $btn_save.click(function(){

        if(checkValidation()) {
            toastr.success('修改密码成功！');
        }

    });

    $form.bootstrapValidator({
        fields: {
            pass_old: {
                message: '旧密码验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入旧密码'
                    }
                }
            },
            pass_new: {
                message: '新密码验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入新密码'
                    }
                }
            },
            pass_renew: {
                message: '新密码验证失败',
                validators: {
                    notEmpty: {
                        message: '请再次输入新密码'
                    },
                    identical: {
                        message: '两次输入的新密码不一致',
                        field : 'pass_new'
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
        }
        return result;

    }

});
