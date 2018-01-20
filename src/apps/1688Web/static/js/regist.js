$(document).ready(function(){
    var $form = $('#regist_form');
    var $btn_submit = $('#btn_submit');
    var countDownNum = 60;
    var countDownInterval = undefined;

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
            //提交成功后页面跳转
            window.location.href = "index-logined.html"
        }

    });

    $('#btn_get_vcode').click(function(){
        if(!$(this).attr('disabled')) {
            if($form.data('bootstrapValidator').updateStatus('phone', 'NOT_VALIDATED').validateField('phone').isValidField('phone')){
                toastr.success('验证码已发送，请关注手机短信');
                startCountDown();
            }else {
                toastr.warning('请输入正确的手机号');
            }
        }
    });

    function startCountDown() {
        $('#btn_get_vcode').attr('disabled','true');
        countDownInterval = window.setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        if(countDownNum > 0) {
            countDownNum -= 1;
            $('#btn_get_vcode').html('已发送(' + countDownNum + ')');
        } else {
            window.clearInterval(countDownInterval);
            countDownNum = 60;
            $('#btn_get_vcode').html('发送验证码');
            $('#btn_get_vcode').removeAttr('disabled');
        }
    }

    $form.bootstrapValidator({
        verbose: false,
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    }
                }
            },
            phone: {
                message: '手机号验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入手机号'
                    },
                    stringLength: {
                         min: 11,
                         max: 11,
                         message: '请输入11位手机号码'
                     },
                     regexp: {
                         regexp: /^1[3|5|8]{1}[0-9]{9}$/,
                         message: '请输入正确的手机号码'
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
            vpassword: {
                message: '再次输入密码验证失败',
                validators: {
                    notEmpty: {
                        message: '请再次输入密码'
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
                toastr.warning('请阅读并同意使用条例才可注册');
                return false;
            }
        }

    }
});
