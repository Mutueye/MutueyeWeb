$(document).ready(function(){
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $input_appendix = $("#input_appendix");
    
    var $form = $('#form');
    
    window.commonTools.initBSFileInput($input_appendix);
    //发布
    $btn_publish.click(function(){
        if(checkValidation()) {
            //此处提交数据，提交成功后，返回上级页面
            window.location.href='operate-adv.html';
        }
    });
    
    $form.bootstrapValidator({
        fields: {
            title: {
                message: '标题验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入标题'
                    }
                }
            },
            position: {
                message: '位置验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入位置'
                    }
                }
            },
            url: {
                message: 'url验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入rul'
                    }
                }
            }
        }
    });
    
    //判断必填项是否都已填入内容
    function checkValidation() {
        //console.log($input_appendix.fileinput('getPreview').content); //获取初始预览的图片的对象数组
        //console.log($input_appendix.fileinput('getFileStack')); //获取未上传的图片的对象数组
        //console.log($input_appendix.fileinput('getFilesCount')); //获取上传和未上传的图片的数量
        
        //判断初始预览图片数量是否为0，如果为0，则验证是否选择并上传了图片
        if($input_appendix.fileinput('getPreview').content.length == 0) {
            if($input_appendix.fileinput('getFilesCount') == 0) {
                toastr.warning('请选择要上传的图片');
                return false;
            } else {
                if($input_appendix.fileinput('getFileStack').length != 0) {
                    toastr.warning('您有未上传的图片');
                    return false;
                }
            }
        }
        
        var bsValidator = $form.data('bootstrapValidator');
        bsValidator.validate();
        var result = bsValidator.isValid();
        if(!result) {
            toastr.warning('您输入的表单信息验证未通过');
        }
        return result;
        
        
    }
    
});