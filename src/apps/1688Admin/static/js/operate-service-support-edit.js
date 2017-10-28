$(document).ready(function(){
    var isUeReady = false; //ueditor编辑器是否初始化完成
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_preview = $('#btn_preview'); //按钮预览
    var $input_appendix = $("#input_appendix");
    
    $btn_publish.attr('disabled','disabled');
    $btn_preview.attr('disabled','disabled');
    
    var $form = $('#form');
    
    window.commonTools.initBSFileInput($input_appendix, true, true);
    
    //实例化ueditor编辑器
    var ue = UE.getEditor('container');
    //初始化完成后，解除按钮禁用状态
    ue.ready(function(){
        isUeReady = true;
        $btn_publish.attr('disabled',false);
        $btn_preview.attr('disabled',false);
        
        //加载编辑内容
        ue.setContent('<b>内容信息...</b>');
    });
    
    //发布
    $btn_publish.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation(true)) {
                //此处提交数据，提交成功后，返回上级页面
                window.location.href='operate-service-support.html';
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });
    
    //预览
    $btn_preview.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation(false)) {
                var logoUrl = commonTools.getFilePath($("#input_appendix"));
                if(logoUrl == '' || !logoUrl) {
                    if($input_appendix.fileinput('getPreview').content.length > 0) {
                        logoUrl = $input_appendix.fileinput('getPreview').content[0];
                    } else {
                        logoUrl = '../images/rcs-empty.jpg';
                    }
                }
                
                var htmlStr =   '<div class="row-space-common">' +
                                    '<div class="row">' +
                                        '<div class="col-xs-12">' +
                                            '<div class="org-li static">' +
                                                '<div class="org-li-img">' +
                                                    '<img src="' + logoUrl + '">' +
                                                '</div>' +
                                                '<div class="org-li-content">' +
                                                    '<div class="org-li-title">' + $('#title').val() + '</div>' +
                                                    '<div class="org-li-info">简介：' + $('#intro').val() + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12">' +
                                            '<div class="section-title">' +
                                                '<div class="section-title-icon"></div>' +
                                                '<div class="section-title-text">详细内容</div>' +
                                            '</div>' +
                                            '<div class="article-content">' +
                                                ue.getContent() +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
                BSModal.confirm({
                    title : '预览',
                    content : htmlStr,
                    width : '90%',
                    btnOK : '确定',
                    btnCancel : '',
                    maxHeight: '450px'
                });
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });
    
    $form.bootstrapValidator({
        fields: {
            title: {
                message: '名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入园区配套名称'
                    }
                }
            },
            intro: {
                message: '简介验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入园区配套简介'
                    }
                }
            }
        }
    });
    
    //判断必填项是否都已填入内容
    function checkValidation(checkImageUpload) {
        
        //console.log($input_appendix.fileinput('getPreview').content); //获取初始预览的图片的对象数组
        //console.log($input_appendix.fileinput('getFileStack')); //获取未上传的图片的对象数组
        //console.log($input_appendix.fileinput('getFilesCount')); //获取上传和未上传的图片的数量
        if(checkImageUpload) { 
            //判断初始预览图片数量是否为0，如果为0，则验证是否选择并上传了图片
            if($input_appendix.fileinput('getPreview').content.length == 0) {
                if($input_appendix.fileinput('getFilesCount') == 0) {
                    toastr.warning('请选择前台展示图片');
                    return false;
                } else {
                    if($input_appendix.fileinput('getFileStack').length != 0) {
                        toastr.warning('您有未上传的图片');
                        return false;
                    }
                }
            }
        }
        
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