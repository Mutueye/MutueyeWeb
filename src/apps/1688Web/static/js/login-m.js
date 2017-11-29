//登录
$(document).ready(function(){

    $('#form_login').bootstrapValidator({
        fields: {
            username: {
                message: '用户名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    }
                }
            },
            password: {
                message: '密码验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    }
                }
            },
            vcode: {
                message: '验证码验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入验证码'
                    }
                }
            }
        }
    });

    $('#login_btn').click(function(){
        var bsValidator = $('#form_login').data('bootstrapValidator');
        bsValidator.validate();
        var result = bsValidator.isValid();
        if(result) {
            window.location.href = 'm-personal-notice.html';
        }
    });
});
