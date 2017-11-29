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

    window.commonTools.setDateTimeInputSection($('#time_start_group'), $('#time_end_group'), '', '', 'YYYY-MM-DD HH:mm');
    //同时使用DateTimePicker和bootstrapValidator时，需要手动触发时间输入框的表单验证
    $('#time_start_group').on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('time_start', 'NOT_VALIDATED',null)
            .validateField('time_start');
            showPrice();
    });
    $('#time_end_group').on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('time_end', 'NOT_VALIDATED',null)
            .validateField('time_end');
            showPrice();
    });

    //会议设备选择控制======================================
    var addValueFormData = [
        {
            service_type : '投影仪',
            price : '2300.00',
            unit : '每人'
        },
        {
            service_type : '白板',
            price : '1200.00',
            unit : '每天'
        },
        {
            service_type : '电视机',
            price : '200.00',
            unit : '平米'
        },
        {
            service_type : '饮水机',
            price : '600.00',
            unit : '每小时'
        }
    ];

    function getServiceTypeOptions(formData) {
        var selectData = [];
        for(i in formData) {
            selectData.push({
                value : formData[i].service_type,
                text : formData[i].service_type
            });
        }
        return selectData;
    }

    var serviceTypeOptions = getServiceTypeOptions(addValueFormData);

    window.commonTools.duplicateFormCtrl({
        container : $('#add_value_content'),
        html :  '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<select class="form-control" id="service_type"></select>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">价格：</div>' +
                            '<div class="cool-form-content" id="price"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">单位：</div>' +
                            '<div class="cool-form-content" id="unit"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="qtty">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' +
                    '</div>' +
                '</div>',
        ids : ['service_type', 'price', 'unit', 'qtty', 'btn_delete'],
        btn_delete_id : 'btn_delete',
        btn_add_id : 'btn_add',
        btn_add_container_id : 'btn_add_container',
        btn_add_html :  '<div id="btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的增值服务</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' +
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 0,
        max_number : 4,
        afterAdd : function($container, id) {
            console.log(serviceTypeOptions);
            //新增表单组时，初始化物品类型下拉菜单数据
            window.commonTools.addSelectOptions($('#service_type_' + id), serviceTypeOptions);
            //根据select选择，填充带出的表单数据
            fillAddValueFormData(addValueFormData, 'service_type', $('#service_type_' + id).val(), id);
            $('#service_type_' + id).change(function(){
                fillAddValueFormData(addValueFormData, 'service_type', $('#service_type_' + id).val(), id);
            });
        }
    });

    //填充增值服务表单中，服务类型select带出的表单内容
    //formData 表单数据的对象数组
    //key 表单数据数组对象中已知的对象的某一属性
    //selectVal select选中的值，与已知的对象的某一属性对应的值相同
    function fillAddValueFormData(formData, key, selectVal, id){
        var data = window.commonTools.getSubArrayByObjValue(formData, key, selectVal)[0];
        $('#price_' + id).text(data.price + '元');
        $('#unit_' + id).text(data.unit);
    }

    //房间选择控制================================
    var $room_items = $('#room_list').find('.room-item');
    var $room_pic_items = $('#room_list').find('.rcs-pic-item');
    //初始化或筛选后，默认选择第一个房间
    $room_items.eq(0).find('.rcs-pic-item').addClass('sel');
    $room_items.eq(0).find('input:radio').attr('checked','true');
    $room_items.click(function(){
        //alert($(this).index());
        var $this = $(this);
        $room_pic_items.removeClass('sel');
        $this.find('.rcs-pic-item').addClass('sel');
        $this.find('input:radio').attr('checked','true');
        alert($('#room_list').find('input:radio:checked').val());
    });
    //alert($room_items.find('input:radio:checked').val());

    //发布
    $btn_submit.click(function(){

        if(checkValidation()) {
            //提交成功后提示
            toastr.success('您的展厅申请提交成功!');

        }

    });

    $form.bootstrapValidator({
        fields: {
            time_start: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入开始时间'
                    }
                }
            },
            time_end: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请输入结束时间'
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
                toastr.warning('请阅读并同意路演规章手册才可注册');
                return false;
            }
        }

    }

    //计算分钟数，计算价格
    function cacuMinute($startTime, $endTime){
        if($startTime.val() != '' && $endTime.val() != '') {
            var date1 = new Date($startTime.val());
            var date2 = new Date($endTime.val());
            var total = (date2.getTime() - date1.getTime())/1000;
            return parseInt(total/60);
        }
    }
    //计算价格
    function cacuFee(price, minutes) {
        if(minutes) {
            //alert(price*minutes/60);
            //四舍五入取整
            return Math.round(price*minutes/60);
        } else {
            return 0;
        }


    }
    //计算价格并显示到表单里
    function showPrice(){
        var minutes = cacuMinute($('#time_start'), $('#time_end'));
        var price = $('#price').val(); //价格可能根据选择不同room变动，此处逻辑请根据实际需求添加
        var fee = cacuFee(price, minutes);
        $('#fee').val(fee);
    }
});
