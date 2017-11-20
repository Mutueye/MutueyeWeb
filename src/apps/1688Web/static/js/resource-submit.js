$(document).ready(function(){
    var $form = $('#story_form');
    var $btn_submit = $('#btn_submit');
    var $input_appendix = $('#input_appendix');
    $btn_submit.attr('disabled','disabled');

    //实例化ueditor编辑器
    var ue = UE.getEditor('container');
    ue.ready(function(){
        $btn_submit.attr('disabled',false);
    });

    //附件上传 初始化fileinput插件
    window.commonTools.initBSFileInput($input_appendix);

    //发布
    $btn_submit.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation()) {
                //提交成功后提示
                toastr.success('您编辑的内容已成功提交!');
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });

    $form.bootstrapValidator({
        fields: {
            orgname: {
                message: '公司名称验证失败',
                validators: {
                    notEmpty: {
                        message: '公司名称不能为空'
                    }
                }
            },
            orgintro: {
                message: '公司简介验证失败',
                validators: {
                    notEmpty: {
                        message: '公司简介不能为空'
                    }
                }
            }
        }
    });

    //判断必填项是否都已填入内容
    function checkValidation() {
        if(ue.getContent().length == 0) {
            toastr.warning('请输入公司介绍');
            return false;
        } else {
            var bsValidator = $form.data('bootstrapValidator');
            bsValidator.validate();
            var result = bsValidator.isValid();
            if(!result) {
                toastr.warning('您输入的表单信息验证未通过');
            }
            return result;
        }

    }
});
