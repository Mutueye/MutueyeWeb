$(document).ready(function(){
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_preview = $('#btn_preview'); //按钮预览
    
    var $form = $('#form');
    
    //icheck初始化
    $('.fuli_check').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
    }).on('ifChanged', function(e){
        console.log('checkbox1:状态：' + $('#checkbox1').is(':checked') + ' ' + 'checkbox2:状态：' + $('#checkbox2').is(':checked'));
    });
    
    $('#check_all').click(function(){
        $('.fuli_check').iCheck('check');
    });
    
    $('#uncheck_all').click(function(){
        $('.fuli_check').iCheck('uncheck');
    });
    
    //发布
    $btn_publish.click(function(){
        
        if(checkValidation()) {
            //此处提交数据，提交成功后，返回上级页面
            window.location.href='operate-service-life.html';
        }
        
    });
    
    //预览
    $btn_preview.click(function(){
        
        if(checkValidation()) {
            //获取福利字符串
            var fuli = '';
            var $fulis = $('#check_list').find('.fuli_check');
            var $fuliChecked = $('#check_list').find(':checked');
            var checkedNum = 0;
            var $texts = $('#check_list').find('.icheck-text');
            $fulis.each(function(index){
                var divider = '，';
                if(true == $(this).is(':checked')){
                    checkedNum += 1;
                    if(checkedNum == $fuliChecked.length) {
                        divider = '';
                    }
                    fuli += $texts.eq(index).text() + divider;
                };
            });
            
            var htmlStr =   '<div class="row-space-10">' +
                                '<div class="row no-bottom">' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">职位名称：</div>' +
                                            '<div class="cool-form-content">' + $('#post').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">公司名称：</div>' +
                                            '<div class="cool-form-content">' + $('#orgname').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">工作地点：</div>' +
                                            '<div class="cool-form-content">' + $('#location').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">薪资：</div>' +
                                            '<div class="cool-form-content">' + $('#salary').val() + '元</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">企业性质：</div>' +
                                            '<div class="cool-form-content">' + $('#company_spec').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">公司人数：</div>' +
                                            '<div class="cool-form-content">' + $('#company_num').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">行业：</div>' +
                                            '<div class="cool-form-content">' + $('#industry').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">工作年限：</div>' +
                                            '<div class="cool-form-content">' + $('#work_time').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">福利：</div>' +
                                            '<div class="cool-form-content">' + fuli + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">联系方式：</div>' +
                                            '<div class="cool-form-content">' + $('#contact').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12 col-sm-6">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">电子邮箱：</div>' +
                                            '<div class="cool-form-content">' + $('#email').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">地址：</div>' +
                                            '<div class="cool-form-content">' + $('#address').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">职位描述：</div>' +
                                            '<div class="cool-form-content">' + $('#intro').val() + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-xs-12">' +
                                        '<div class="form-group cool-form-group form-group-sm">' +
                                            '<div class="cool-form-label text-right control-label">公司介绍：</div>' +
                                            '<div class="cool-form-content">' + $('#intro2').val() + '</div>' +
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
            post: {
                message: '职位名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入职位名称'
                    }
                }
            },
            orgname: {
                message: '公司名称验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入公司名称'
                    }
                }
            },
            location: {
                message: '工作地点验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入工作地点'
                    }
                }
            },
            salary: {
                message: '薪资验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入薪资'
                    }
                }
            },
            contact: {
                message: '联系方式验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入联系方式'
                    }
                }
            },
            email: {
                message: '电子邮箱验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入电子邮箱'
                    }
                }
            },
            address: {
                message: '地址验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入地址'
                    }
                }
            },
            intro: {
                message: '职位描述验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入职位描述'
                    }
                }
            },
            intro2: {
                message: '公司介绍验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入公司介绍'
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