$(document).ready(function(){
    var $form = $('#form');
    var $btn_submit = $('#btn_submit');

    var $startTime = $('#time_start_group');
    var $startTimeInput = $('#time_start');
    var $endTime = $('#time_end_group');
    var $endTimeInput = $('#time_end');

    var $timeRangeLabel = $('#time_range_label');

    var $startHourSelector = $('#start_hour_selector');
    $startHourSelector.hide();
    var $startHourBtns = $('#start_hour_btns').find('.btn-hour');
    var startHour = null;
    var startHourMin = 0
    var startHourMax = 23;
    var oldStartDate = '';
    var $endHourSelector = $('#end_hour_selector');
    $endHourSelector.hide();
    var $endHourBtns = $('#end_hour_btns').find('.btn-hour');
    var endHour = null;
    var endHourMin = 0
    var endHourMax = 23;
    var oldEndDate = '';

    var availableMonths = 6; //可选范围约定为6个月

    //已经被使用的时间区段，从服务器读取的近6个月内的已经被其他用户占用的时间区段
    var usedTimeSections = [
        {
            start:'2018-01-23 01:00',
            end:'2018-01-26 16:00'
        },
        {
            start:'2018-02-02 13:00',
            end:'2018-03-2 18:00'
        }
    ];

    var disabledDateSections = []; //不可用的日期区段
    var disabledDates = []; //不可用日期数组

    getDisabledDates(usedTimeSections, disabledDates, disabledDateSections);
    console.log(disabledDateSections);
    //根据已经占用的时间区段usedTimeSections，取得不可用的日期数组，给bootstrap-datetimepicker使用
    function getDisabledDates(timeSections,disabledDates,disabledDateSections) {
        //alert(moment(timeSections[0].start).add(1,'days').format('YYYY-MM-DD'));
        for(var i in timeSections) {
            digestOneTimeSection(timeSections[i],disabledDates,disabledDateSections);
        }
    }
    //解析一个时间区段
    function digestOneTimeSection(timeSection, disabledDates) {
        var start = timeSection.start;
        var end = timeSection.end;
        //一般情况下，不可用的开始日期在start这天的第二天开始，因为start这天很有可能没有全部被占用，endDate同理
        var startDate = moment(start).add(1,'days').format('YYYY-MM-DD');
        var endDate = moment(end).subtract(1,'days').format('YYYY-MM-DD');
        //如果开始时间从开始日期0点开始,start这天也不可用
        if(moment(start).hours() == 0) {
            startDate = moment(start).format('YYYY-MM-DD');
        }
        //如果结束时间到结束日期的23:00，end这天也不可用
        if(moment(end).hours() == 23) {
            endDate = moment(end).format('YYYY-MM-DD');
        }
        var total = moment(endDate).diff(moment(startDate),'days');
        //alert(total);
        for(var i = 0; i<= total; i++) {
            disabledDates.push(moment(startDate).add(i,'days').format('YYYY-MM-DD'));
        }

        disabledDateSections.push({
            start:startDate,
            end:endDate
        });
    }

    //icheck初始化
    $('#checkbox_agree').iCheck({
        handle: 'checkbox',
        checkboxClass: 'icheckbox_square-blue'
    }).on('ifChanged', function(e){
        console.log('checkbox状态：' + $('#checkbox_agree').is(':checked'));
    });

    //起始日期，可选日期范围：从当前日期第二天开始的6个月
    $startTime.datetimepicker({
        viewMode: 'days',
        format: 'YYYY-MM-DD',
        allowInputToggle: true,
        minDate: moment().add(1,'days').format('YYYY-MM-DD'),
        maxDate: moment().add(availableMonths,'months').toDate(),
        disabledDates : disabledDates,
        useCurrent: false
    });
    //截止日期，可选日期范围：从当前日期第二天开始的6个月
    $endTime.datetimepicker({
        viewMode: 'days',
        format: 'YYYY-MM-DD',
        allowInputToggle: true,
        minDate: moment().add(1,'days').format('YYYY-MM-DD'),
        maxDate: moment().add(availableMonths,'months').toDate(),
        disabledDates : disabledDates,
        useCurrent: false
    });

    //关联起始和截止日期，使起始日期不晚于截止日期；自动调整结束日期，使日期范围避开不可用日期
    $startTime.on('dp.change',function(e) {
        $endTime.data("DateTimePicker").minDate(e.date);
        var endTime = $endTime.data('DateTimePicker').date();
        if(endTime != null) {
            endTime = moment(endTime).format('YYYY-MM-DD');
            var startTime = moment(e.date).format('YYYY-MM-DD');
            var endTimeChanged = false;
            for(var i in disabledDateSections) {
                //当前选择的开始和结束日期包含不可用日期区间
                if(moment(startTime).isBefore(disabledDateSections[i].start) && moment(endTime).isAfter(disabledDateSections[i].end)){
                    endTime = moment(disabledDateSections[i].start).subtract(1,'days').format('YYYY-MM-DD');
                    endTimeChanged = true;
                }
            }
            if(endTimeChanged) {
                $endTime.data('DateTimePicker').date(endTime);
                toastr.success('您选择的开始和截止日期包含不可用日期，截止日期已经自动调整到' + endTime + '以避开不可用日期。');
            }
        }
        hourSelectorCtrl(e.date, endTime);
    });
    //关联起始和截止日期，使截止日期不早于起始日期；自动调整开始日期，使日期范围避开不可用日期
    $endTime.on('dp.change',function(e) {
        $startTime.data("DateTimePicker").maxDate(e.date);
        var startTime = $startTime.data('DateTimePicker').date();
        if(startTime != null) {
            startTime = moment(startTime).format('YYYY-MM-DD');
            var endTime = moment(e.date).format('YYYY-MM-DD');
            var startTimeChanged = false;
            for(var i in disabledDateSections) {
                //当前选择的开始和结束日期包含不可用日期区间
                if(moment(startTime).isBefore(disabledDateSections[i].start) && moment(endTime).isAfter(disabledDateSections[i].end)){
                    startTime = moment(disabledDateSections[i].end).add(1,'days').format('YYYY-MM-DD');
                    startTimeChanged = true;
                }
            }
            if(startTimeChanged) {
                $startTime.data('DateTimePicker').date(startTime);
                toastr.success('您选择的开始和截止日期包含不可用日期，开始日期已自动调整到' + startTime + '以避开不可用日期。');
            }
        }
        hourSelectorCtrl(startTime, e.date);
    });

    //同时使用DateTimePicker和bootstrapValidator时，需要手动触发时间输入框的表单验证
    $startTime.on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('time_start', 'NOT_VALIDATED',null)
            .validateField('time_start');
    });
    $endTime.on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('time_end', 'NOT_VALIDATED',null)
            .validateField('time_end');
    });

    $startHourBtns.click(function(){
        //alert(parseInt($(this).text()));
        var $this = $(this);
        if(!$this.hasClass('disabled')) {
            var btnHour = parseInt($this.text());
            selectStartHour(btnHour);
        }
    });

    $endHourBtns.click(function(){
        var $this = $(this);
        if(!$this.hasClass('disabled')) {
            var btnHour = parseInt($this.text());
            selectEndHour(btnHour);
        }
    })

    function hourSelectorCtrl(startTime, endTime) {
        if($startTimeInput.val() == ''){
            $startHourSelector.hide();
            startHour = null;
            oldStartDate = '';
        } else {
            $startHourSelector.show();
            if(startTime != null) {
                setStartHourSelector(moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'));
            }
        }
        if($endTimeInput.val() == ''){
            $endHourSelector.hide();
            endHour = null;
            oldEndDate = '';
        } else {
            $endHourSelector.show();
            if(endTime != null) {
                setEndHourSelector(moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'));
            }
        }
    }

    function setStartHourSelector(startDate, endDate) {
        //alert(startDate);
        if(startDate != oldStartDate || $endTimeInput.val() == '') {
            $startHourBtns.removeClass('disabled');
            $startHourBtns.removeClass('sel');
            $startHourBtns.removeClass('current');

            startHourMin = 0;
            startHourMax = 23;

            for(var i in usedTimeSections) {
                if(startDate == moment(usedTimeSections[i].start).format('YYYY-MM-DD')) {
                    var hour = moment(usedTimeSections[i].start).hour();
                    startHourMax = hour - 1;
                    for(var j = hour; j <= 23; j++) {
                        disableHourBtn($startHourBtns.eq(j));
                    }
                }
                if(startDate == moment(usedTimeSections[i].end).format('YYYY-MM-DD')) {
                    var hour = moment(usedTimeSections[i].end).hour();
                    startHourMin = hour;
                    for(var j = 0; j < hour; j++) {
                        disableHourBtn($startHourBtns.eq(j));
                    }
                }
            }
            selectStartHour(startHourMin, startDate, endDate);
            oldStartDate = startDate;
        }
    }

    function setEndHourSelector(startDate, endDate) {
        if(endDate != oldEndDate || $startTimeInput.val() == '') {
            $endHourBtns.removeClass('disabled');
            $endHourBtns.removeClass('sel');
            $endHourBtns.removeClass('current');

            endHourMin = 0;
            endHourMax = 23;

            for(var i in usedTimeSections) {
                if(endDate == moment(usedTimeSections[i].start).format('YYYY-MM-DD')) {
                    var hour = moment(usedTimeSections[i].start).hour();
                    endHourMax = hour;
                    for(var j = hour + 1; j <= 23; j++) {
                        disableHourBtn($endHourBtns.eq(j));
                    }
                }
                if(endDate == moment(usedTimeSections[i].end).format('YYYY-MM-DD')) {
                    var hour = moment(usedTimeSections[i].end).hour();
                    endHourMin = hour;
                    for(var j = 0; j < hour; j++) {
                        disableHourBtn($endHourBtns.eq(j));
                    }
                }
            }

            selectEndHour(endHourMax, startDate, endDate);

            oldEndDate = endDate;
        }
    }

    function selectStartHour(hour, startDate, endDate) {
        _startDate = startDate ? startDate : moment($startTimeInput.val()).format('YYYY-MM-DD');
        _endDate = endDate ? endDate : moment($endTimeInput.val()).format('YYYY-MM-DD');
        startHour = hour;
        if(_startDate == _endDate) { //开始日期和结束日期在同一天的情况，特殊处理
            if(endHour != null) {
                if(endHour == 0) {
                    startHour = 0;
                    startHourMin = 0;
                    startHourMax = 0;
                } else {
                    startHourMax = endHour;
                    for(var i = endHour + 1; i<= 23; i++) {
                        disableHourBtn($startHourBtns.eq(i));
                    }
                }
                if(startHour == 23) {
                    endHour = 23;
                    endHourMin = 23;
                    endHourMax = 23;
                    for(var i = 0; i < endHourMin; i++) {
                        disableHourBtn($endHourBtns.eq(i));
                    }
                } else {
                    endHourMin = startHour;
                    for(var i= 0; i< endHourMin; i++) {
                        disableHourBtn($endHourBtns.eq(i));
                    }
                    for(var i= endHourMin; i <= endHour; i ++) {
                        selHourBtn($endHourBtns.eq(i));
                    }
                }
            }
        }
        for(var i = startHour; i <= startHourMax; i++) {
            selHourBtn($startHourBtns.eq(i));
        }
        for(var i = startHourMin; i < startHour; i++) {
            clearHourBtnState($startHourBtns.eq(i));
        }
        $startHourBtns.removeClass('current');
        currentHourBtn($startHourBtns.eq(startHour));
        $startHourSelector.find('.just-label').text('请选择开始日期当天的开始时间，当前选定的开始时间：'+ $startTimeInput.val() + ' ' + $startHourSelector.find('.current').text());
        setTimeRangeLabel();
    }

    function selectEndHour(hour, startDate, endDate) {
        _startDate = startDate ? startDate : moment($startTimeInput.val()).format('YYYY-MM-DD');
        _endDate = endDate ? endDate : moment($endTimeInput.val()).format('YYYY-MM-DD');
        endHour = hour;
        if(_startDate == _endDate) { //开始日期和结束日期在同一天的情况，特殊处理
            if(startHour != null) {
                if(endHour == 0) {
                    startHour = 0;
                    startHourMin = 0;
                    startHourMax = 0;
                    for(var i = startHourMax + 1; i<= 23; i++) {
                        disableHourBtn($startHourBtns.eq(i));
                    }
                } else {
                    startHourMax = endHour;
                    for(var i = startHourMax + 1; i<= 23; i++) {
                        disableHourBtn($startHourBtns.eq(i));
                    }
                    for(var i = startHour; i <= startHourMax; i++) {
                        selHourBtn($startHourBtns.eq(i));
                    }
                }
                if(startHour == 23) {
                    endHour = 23;
                    endHourMin = 23;
                    endHourMax = 23;
                } else {
                    endHourMin = startHour;
                    for(var j = 0; j< endHourMin; j++) {
                        disableHourBtn($endHourBtns.eq(j));
                    }
                }
            }
        }
        for(var i = endHourMin; i <= endHour; i ++) {
            selHourBtn($endHourBtns.eq(i));
        }
        for(var i = endHour + 1; i <= endHourMax; i++) {
            clearHourBtnState($endHourBtns.eq(i));
        }
        $endHourBtns.removeClass('current');
        currentHourBtn($endHourBtns.eq(endHour));
        $endHourSelector.find('.just-label').text('请选择结束日期当天的结束时间，当前选定的结束时间：'+ $endTimeInput.val() + ' ' + $endHourSelector.find('.current').text());
        setTimeRangeLabel();
    }

    function disableHourBtn($el) {
        $el.removeClass('sel current');
        if(!$el.hasClass('disabled')) {
            $el.addClass('disabled');
        }
    }

    function selHourBtn($el) {
        $el.removeClass('disabled');
        if(!$el.hasClass('sel')) {
            $el.addClass('sel');
        }
    }

    function currentHourBtn($el) {
        $el.removeClass('disabled');
        if(!$el.hasClass('current')) {
            $el.addClass('current');
        }
    }

    function clearHourBtnState($el) {
        $el.removeClass('disabled sel current');
    }

    function getStartTime(){
        if($startTimeInput.val() != '' && startHour != null) {
            return $startTimeInput.val() + ' ' + moment().hour(startHour).minute(0).format('HH:mm');
        } else {
            return null;
        }
    }

    function getEndTime(){
        if($endTimeInput.val() != '' && endHour != null) {
            return $endTimeInput.val() + ' ' + moment().hour(endHour).minute(0).format('HH:mm');
        } else {
            return null;
        }
    }

    function setTimeRangeLabel() {
        var start = getStartTime();
        var end = getEndTime();
        if(start != null && end != null) {
            $timeRangeLabel.text('从：' + start + '到：' + end + ' 共：' + getTimeRange());
        } else {
            $timeRangeLabel.text('请选择开始和结束时间');
        }
        showPrice();
    }

    //type = '小时' 返回总小时数
    //type = '天小时' 返回天数+小时数
    function getTimeRange(type) {
        var start = getStartTime();
        var end = getEndTime();
        if(start != null && end != null) {
            if(type == '小时') {
                return parseInt(moment(end).diff(start,'hours'));
            } else {
                var days = moment(end).diff(start,'days');
                var hours = moment(end).subtract(days,'days').diff(start,'hours');
                if(days > 0) {
                    if(hours > 0) {
                        return days + '天' + hours + '小时';
                    } else {
                        return days + '天';
                    }
                } else {
                    return hours + '小时';
                }
            }
            //return moment().hours(moment(end).diff(start,'hours'));
            //return moment.duration(moment(end).diff(start,'hours'),'hours').humanize();
        } else {
            return 0;
        }
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
            if(getTimeRange('小时') == 0) {
                toastr.warning('您选择的租赁总时间为0');
                return false;
            }
            if($('#checkbox_agree').is(':checked')) {
                return true;
            } else {
                toastr.warning('请阅读并同意路演规章手册才可注册');
                return false;
            }
        }

    }

    //计算价格并显示到表单里
    function showPrice(){
        var hours = getTimeRange('小时');
        var price = $('#price').val(); //价格可能根据选择不同room变动，此处逻辑请根据实际需求添加
        var fee = hours * price;
        $('#fee').val(fee);
    }
});