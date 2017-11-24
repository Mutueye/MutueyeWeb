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
            //提交成功后提示
            toastr.success('您的报修信息已提交成功!');

        }

    });

    $form.bootstrapValidator({
        fields: {
            orgname: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入企业名称'
                    }
                }
            },
            type: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入故障类型'
                    }
                }
            },
            desc: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入故障描述'
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
                toastr.warning('请阅读并同意路演规章手册才可注册');
                return false;
            }
        }

    }
});
