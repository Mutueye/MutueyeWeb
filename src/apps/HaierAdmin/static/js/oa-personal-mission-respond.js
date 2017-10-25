$(document).ready(function(){
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_draft = $('#btn_draft'); //按钮暂存
    var $form = $('#form');
    
    
    //发布
    $btn_publish.click(function(){
        if(checkValidation()) {
            
            //此处提交数据，提交成功后，返回上级页面
            
            window.location.href='oa-personal-mission.html';
        }
    });
    
    //暂存
    $btn_draft.click(function(){
        if(checkValidation()) {
            
            //此处提交数据，提交成功后，弹出如下提示
            
            toastr.success('您编辑的内容已暂存');
        }
    });
    
    $form.bootstrapValidator({
        fields: {
            respond: {
                message: '反馈内容验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入反馈内容'
                    }
                }
            }
        }
    });
    
    //手动表单验证
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