$(document).ready(function(){
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_preview = $('#btn_preview');
    var $input_appendix = $("#input_appendix");
    
    var $form = $('#form');
    
    window.commonTools.initBSFileInput($input_appendix);
    window.commonTools.setDateTimeInput($('#in_date'));
    $('#birth_date').datetimepicker({
        viewMode: 'months',
        format: 'YYYY-MM',
        allowInputToggle: true
    });
    $('#in_date').on('dp.hide',function(){
        $form.data('bootstrapValidator')  
            .updateStatus('in_date', 'NOT_VALIDATED',null)  
            .validateField('in_date'); 
    });
    $('#birth_date').on('dp.hide',function(){
        $form.data('bootstrapValidator')  
            .updateStatus('birth_date', 'NOT_VALIDATED',null)  
            .validateField('birth_date'); 
    });
    
    //发布
    $btn_publish.click(function(){
        if(checkValidation(true)) {
            //此处提交数据，提交成功后，返回上级页面
            window.location.href='party-world.html';
        }
    });
    
    //预览
    $btn_preview.click(function(){
        
        if(checkValidation(false)) {
            //取图片地址，如空，取默认图片 
            var logoUrl = commonTools.getFilePath($("#input_appendix"));
            if(logoUrl == '' || !logoUrl) {
                if($input_appendix.fileinput('getPreview').content.length > 0) {
                    logoUrl = $input_appendix.fileinput('getPreview').content[0];
                } else {
                    logoUrl = '../images/rcs-empty.jpg';
                }
            }
            
            var htmlStr =   '<div class="row-space-10">' +
                                '<div class="row no-bottom">' +
                                    '<div class="oa-hr-photo-form">' +
                                        '<div class="oa-hr-photo">' + 
                                            '<img src=' + logoUrl + '>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-6">' +
                                            '<div class="form-group cool-form-group form-group-sm">' +
                                                '<div class="cool-form-label text-right control-label">党员姓名：</div>' +
                                                '<div class="cool-form-content">' + $('#name').val() + '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-6">' +
                                            '<div class="form-group cool-form-group form-group-sm">' +
                                                '<div class="cool-form-label text-right control-label">出生年月：</div>' +
                                                '<div class="cool-form-content">' + $('#birth_date').val() + '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-6">' +
                                            '<div class="form-group cool-form-group form-group-sm">' +
                                                '<div class="cool-form-label text-right control-label">入党时间：</div>' +
                                                '<div class="cool-form-content">' + $('#in_date').val() + '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12 col-sm-6">' +
                                            '<div class="form-group cool-form-group form-group-sm">' +
                                                '<div class="cool-form-label text-right control-label">单位：</div>' +
                                                '<div class="cool-form-content">' + $('#org').val() + '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12">' +
                                            '<div class="form-group cool-form-group form-group-sm">' +
                                                '<div class="cool-form-label text-right control-label">备注：</div>' +
                                                '<div class="cool-form-content">' + $('#ps').val() + '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12">' +
                                            '<div class="form-group cool-form-group form-group-sm">' +
                                                '<div class="cool-form-label text-right control-label">简介：</div>' +
                                                '<div class="cool-form-content">' + $('#intro').val() + '</div>' +
                                            '</div>' +
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
        
    });
    
    $form.bootstrapValidator({
        fields: {
            name: {
                message: '党员姓名验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入党员姓名'
                    }
                }
            },
            birth_date: {
                message: '出生年月验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入出生年月'
                    }
                }
            },
            in_date: {
                message: '入党时间验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入入党时间'
                    }
                }
            },
            org: {
                message: '单位验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入单位'
                    }
                }
            },
            intro: {
                message: '简介验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入简介'
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
                    toastr.warning('请选择要上传的图片');
                    return false;
                } else {
                    if($input_appendix.fileinput('getFileStack').length != 0) {
                        toastr.warning('您有未上传的图片');
                        return false;
                    }
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