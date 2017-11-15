$(document).ready(function(){
    var $form = $('#story_form');
    var $btn_submit = $('#btn_submit');
    $btn_submit.attr('disabled','disabled');

    //实例化ueditor编辑器
    var ue = UE.getEditor('container');
    ue.ready(function(){
        $btn_submit.attr('disabled',false);
    });
    
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
            author: {
                message: '投稿人验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入投稿人'
                    }
                }
            }
        }
    });
    
    //判断必填项是否都已填入内容
    function checkValidation() {
        if(ue.getContent().length == 0) {
            toastr.warning('请输入编辑内容');
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