$(document).ready(function(){
    var $form = $('#form');
    var $btn_submit = $('#btn_submit');

    //发布
    $btn_submit.click(function(){

        if(checkValidation()) {
            //提交成功后提示
            toastr.success('您的企业诉求已提交成功!');

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
            desc: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入企业诉求'
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
