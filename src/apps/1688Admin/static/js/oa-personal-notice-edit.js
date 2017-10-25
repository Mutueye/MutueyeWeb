$(document).ready(function(){
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_draft = $('#btn_draft'); //按钮暂存
    var $form = $('#form');
    
    //bootstrap-select取值示例
    $('#notice_list').on('changed.bs.select', function(){
        alert($('#notice_list').selectpicker('val'));
    });
    
    //检测是公告还是通知，公告不显示通知名单
    checkType();
    $('#type').change(function(){
        checkType()
    });
    
    function checkType() {
        if($('#type').val() == '公告') {
            $('#notice_list_container').hide();
        } else {
            $('#notice_list_container').show();
        }
    }
    
    //发布
    $btn_publish.click(function(){
        if(checkValidation()) {
            
            //此处提交数据，提交成功后，返回上级页面
            
            window.location.href='oa-personal-notice.html';
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
            mission_name: {
                message: '标题验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入标题'
                    }
                }
            },
            content: {
                message: '内容验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入内容'
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