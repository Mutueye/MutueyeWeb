$(document).ready(function(){
    var $form = $('#form');
    var $btn_submit = $('#btn_submit');

    $btn_submit.click(function(){

        if(checkValidation()) {
            //提交成功后页面跳转页面
            //window.location.href = ...

        }

    });

    $form.bootstrapValidator({
        fields: {
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
            company: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入单位名称'
                    }
                }
            },
            count: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入人数'
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
