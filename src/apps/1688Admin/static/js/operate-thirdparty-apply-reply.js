$(document).ready(function(){
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    
    var $form = $('#form');
    
    //发布
    $btn_publish.click(function(){
        
        if(checkValidation()) {
            //此处提交数据，提交成功后，返回上级页面
            window.location.href='operate-thirdparty-apply.html';
        }
        
    });
    
    
    
    $form.bootstrapValidator({
        fields: {
            reply: {
                message: '回复验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入回复内容'
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