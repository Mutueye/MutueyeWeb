$(document).ready(function(){
    var $user_info = $('#user_info');
    var $user_form = $('#user_form');
    var $form = $('#form');
    var $btn_edit = $('#btn_edit');
    var $btn_cancel = $('#btn_cancel');
    var $btn_save = $('#btn_save');
    $user_form.hide();
    
    window.commonTools.initBSFileInput($('#input_appendix'),true,true);
    
    $btn_edit.click(function(){
        $user_info.hide();
        $user_form.show();
    });
    
    $btn_cancel.click(function(){
        $user_info.show();
        $user_form.hide();
    });
    
    
    //icheck初始化
    /*
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
    
    $form.bootstrapValidator({
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
        
    }*/
});