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

    window.commonTools.setDateTimeInput($('#date_group'));
    //禁用当天之前的日期
    $('#date_group').data("DateTimePicker").minDate(new Date());
    //同时使用DateTimePicker和bootstrapValidator时，需要手动触发时间输入框的表单验证
    $('#date_group').on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('date', 'NOT_VALIDATED',null)
            .validateField('date');
            //showPrice();
    });



    //时间段选择控件===========================================
    //初始化
    $('#time_range_input').jRange({
        from: 480, //从早8:00
        to: 1200, //到晚8:00
        step:10, //最小单位10分钟
        scale: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
        format: formatHour,
        theme: 'theme-blue',
        width: $('#time_range_container').width(),
        showLabels: true,
        isRange : true,
        snap: true,
        onstatechange(){
            setTimeRange();
        }
    });

    //空间初始化后，可用如下方法动态设置禁用范围
    var disabledRanges = [ //禁用的时间区段，不可选
        [480,600],
        [800, 860],
        [1000, 1060]
    ];
    var disabledRanges1 = [
        [900,1080]
    ]
    $('#time_range_input').jRange('setDisabledRange', disabledRanges);
    //可用如下事件实现当日期改变时，获取当前日期，再通过日期向服务器取得不可用范围并动态设置
    $('#date_group').on('dp.change',function(e) {
        //alert($('#date').val());
        //此处：根据日期获取不可用范围，并动态设置
        $('#time_range_input').jRange('setDisabledRange', disabledRanges1);
    });


    //type='time' or 'length',
    function formatHour(value, pointer, type) {
        var _type = type ? type : 'time'
        var hours = Math.floor( value / 60 );
        var mins = ( value - hours*60 );
        if(_type == 'time') {
            return (hours < 10 ? "0"+hours : hours) + ":" + ( mins == 0 ? "00" : mins );
        } else {
            return hours + "小时" + mins + "分钟";
        }
    }

    function setTimeRange() {
        var timeRange = $('#time_range_input').val().split(',');
        var startTime = timeRange[0];
        var endTime = timeRange[1];
        var timeLength = endTime - startTime;
        $('#time_range_label').text(formatHour(startTime) + '到' + formatHour(endTime) +'，共' + formatHour(timeLength, '', 'length'));
        showPrice(timeLength);
    }

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
        $room_items.find('input:radio').removeAttr('checked');
        $this.find('input:radio').attr('checked','checked');
        alert($('#room_list').find("input[checked='checked']").val());
    });
    //alert($room_items.find('input:radio:checked').val());

    //发布
    $btn_submit.click(function(){

        if(checkValidation()) {
            //提交成功后提示
            toastr.success('您的会议室申请提交成功!');
        }

    });

    $form.bootstrapValidator({
        fields: {
            date: {
                message: '验证失败',
                validators: {
                    notEmpty: {
                        message: '请选择会议日期'
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
    function showPrice(minutes){
        var price = $('#price').val(); //价格可能根据选择不同room变动，此处逻辑请根据实际需求添加
        var fee = cacuFee(price, minutes);
        $('#fee').val(fee);
    }
});
