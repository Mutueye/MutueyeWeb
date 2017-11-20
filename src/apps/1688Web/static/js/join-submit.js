$(document).ready(function(){
    var $form = $('#form');
    var $btn_submit = $('#btn_submit');

    //icheck初始化
    $('#checkbox_agree').iCheck({
        handle: 'checkbox',
        checkboxClass: 'icheckbox_square-blue'
    }).on('ifChanged', function(e){
        console.log('checkbox状态：' + $('#checkbox_agree').is(':checked'));
    });

    window.commonTools.setDateTimeInput($('#time_group'));
    $('#time_group').on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('time', 'NOT_VALIDATED',null)
            .validateField('time');
    });

    //发布
    $btn_submit.click(function(){

        if(checkValidation()) {
            //提交成功后页面跳转
            //window.location.href = ...
        }

    });

    $form.bootstrapValidator({
        fields: {
            time: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入入驻时间'
                    }
                }
            },
            price: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入意向单价'
                    }
                }
            },
            area: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入意向面积'
                    }
                }
            },
            company: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入企业名称'
                    }
                }
            },
            name: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入预约人'
                    }
                }
            },
            phone: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入联系电话'
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
        } else {
            if($('#checkbox_agree').is(':checked')) {
                return true;
            } else {
                toastr.warning('请阅读并同意入驻规章手册才可注册');
                return false;
            }
        }

    }
});
