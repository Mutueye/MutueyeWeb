$(document).ready(function(){
    var $btn_ok = $('#btn_ok');
    var $btn_no = $('#btn_no');
    var $form = $('#form');
    
    
    //通过
    $btn_ok.click(function(){
        if(checkValidation()) {
            
            //此处提交数据，提交成功后，返回上级页面
            
            window.location.href='oa-personal-proc-approval.html';
        }
    });
    
    //退回
    $btn_no.click(function(){
        if(checkValidation()) {
            
            //此处提交数据，提交成功后，返回上级页面
            
            window.location.href='oa-personal-proc-approval.html';
        }
    });
    
    $form.bootstrapValidator({
        fields: {
            content1: {
                message: '部门主管意见验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入部门主管意见'
                    }
                }
            },
            content2: {
                message: '领导意见验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入领导意见'
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