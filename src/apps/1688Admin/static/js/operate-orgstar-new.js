$(document).ready(function(){
    var isUeReady = false; //ueditor编辑器是否初始化完成
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_draft = $('#btn_draft'); //按钮暂存
    var $btn_preview = $('#btn_preview'); //按钮预览
    
    $btn_publish.attr('disabled','disabled');
    $btn_draft.attr('disabled','disabled');
    $btn_preview.attr('disabled','disabled');
    
    var $form = $('#form');
    
    window.commonTools.initBSFileInput($('#input_appendix'));
    
    //实例化ueditor编辑器
    var ue = UE.getEditor('container');
    //初始化完成后，解除按钮禁用状态
    ue.ready(function(){
        isUeReady = true;
        $btn_publish.attr('disabled',false);
        $btn_draft.attr('disabled',false);
        $btn_preview.attr('disabled',false);
    });
    
    //发布
    $btn_publish.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation()) {
                //此处提交数据，提交成功后，返回上级页面
                window.location.href='operate-orgstar.html';
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });
    
    //暂存
    $btn_draft.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation()) {
                //此处提交数据，提交成功后，弹出如下提示
                toastr.success('您编辑的内容已暂存');
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });
    
    //预览
    $btn_preview.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation()) {
                //取图片地址，如空，取默认图片 
                var logoUrl = commonTools.getFilePath($("#input_appendix"));
                if(logoUrl == '' || !logoUrl) logoUrl = '../images/rcs-empty.jpg';
                
                //获取专业领域内容
                var field_1 = $('#field_1').val();
                var field_2 = $('#field_2').val();
                var field_3 = $('#field_3').val();
                field_1 = field_1.length == 0 ? '' : field_1 + '，';
                field_2 = field_2.length == 0 ? '' : field_2 + '，';
                var fields = field_1 + field_2 + field_3;
                var fields_info = '<div class="org-li-info">企业领域：' + field_1 + field_2 + field_3 + '</div>';
                if(fields.length == 0) {
                    fields_info = '';
                }
                
                var htmlStr =   '<div class="row-space-common">' +
                                    '<div class="row">' +
                                        '<div class="col-xs-12">' +
                                            '<div class="org-li static">' +
                                                '<div class="org-li-img">' +
                                                    '<img src="' + logoUrl + '">' +
                                                '</div>' +
                                                '<div class="org-li-content">' +
                                                    '<div class="org-li-title">' + $('#orgname').val() + '</div>' +
                                                    '<div class="org-li-info">企业行业：' + $('#industry').val() + '</div>' +
                                                    fields_info +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-xs-12">' +
                                            '<div class="section-title">' +
                                                '<div class="section-title-icon"></div>' +
                                                '<div class="section-title-text">企业详情介绍</div>' +
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
            industry: {
                message: '企业行业验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入企业行业'
                    }
                }
            },
            orgname: {
                message: '企业名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入企业名称'
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