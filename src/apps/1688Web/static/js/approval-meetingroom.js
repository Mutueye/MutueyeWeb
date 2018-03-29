$(document).ready(function(){
    var $form = $('#form');
    var $btn_submit = $('#btn_submit');

    var $startTime = $('#time_start_group');
    var $startTimeInput = $('#time_start');
    var $endTime = $('#time_end_group');
    var $endTimeInput = $('#time_end');
    
    var $btn_start_am = $('#start_am');
    var $btn_start_pm = $('#start_pm');
    var $btn_end_am = $('#end_am');
    var $btn_end_pm = $('#end_pm');

    var $timeRangeLabel = $('#time_range_label');


    var availableMonths = 6; //可选范围约定为6个月
    var maxDays = 7; //会议时间最多7天

    var base_price = 100; //从服务器读取的展厅的基础价格
    var total_price = base_price; //总价格将会包含增值服务的价格


    //已经被使用的时间区段，从服务器读取的近6个月内的已经被其他用户占用的时间区段
    var usedTimeSections = [
        {
            start:{
                date : '2018-04-02',
                am_pm : 'am'
            },
            end:{
                date : '2018-04-03',
                am_pm : 'am'
            }
        },
        {
            start:{
                date : '2018-04-12',
                am_pm : 'pm'
            },
            end:{
                date : '2018-04-25',
                am_pm : 'am'
            }
        },
        {
            start:{
                date : '2018-05-10',
                am_pm : 'pm'
            },
            end:{
                date : '2018-05-18',
                am_pm : 'pm'
            }
        }
    ];

    var disabledDateSections = []; //不可用的日期区段
    var disabledDates = []; //不可用日期数组

    getDisabledDates(usedTimeSections);
    console.log(disabledDateSections);
    //根据已经占用的时间区段usedTimeSections，取得不可用的日期数组，给bootstrap-datetimepicker使用
    function getDisabledDates(timeSections) {
        for(var i in timeSections) {
            digestOneTimeSection(timeSections[i]);
        }
    }
    //解析一个时间区段
    function digestOneTimeSection(timeSection) {
        var start = timeSection.start.date;
        var start_ampm = timeSection.start.am_pm;
        var end = timeSection.end.date;
        var end_ampm = timeSection.end.am_pm;
        
        var startDate = moment(start).format('YYYY-MM-DD');
        var endDate = moment(end).format('YYYY-MM-DD');
        
        var total = moment(endDate).diff(moment(startDate),'days');
        
        if(total == 0) {
            if(start_ampm == 'am' && end_ampm == 'pm') {
                disabledDates.push(startDate);
                disabledDateSections.push({
                    start:startDate,
                    end:startDate
                });
            }
        } else if(total == 1) {
            if(start_ampm == 'am') {
                disabledDates.push(startDate);
            }
            if(end_ampm == 'pm') {
                disabledDates.push(endDate);
            }
        } else {
            for(var i = 0; i<= total; i++) {
                if((i == 0 && start_ampm == 'am') || (i == total && end_ampm == 'pm') || (i>0 && i<total)) {
                    disabledDates.push(moment(startDate).add(i,'days').format('YYYY-MM-DD'));
                }
            }
        }
        
        if(total != 0) {
            if(start_ampm == 'am' && end_ampm == 'pm') {
                disabledDateSections.push({
                    start:startDate,
                    end:endDate
                });
            } else if(start_ampm == 'am' && end_ampm == 'am') {
                disabledDateSections.push({
                    start:startDate,
                    end:moment(endDate).subtract(1,'days').format('YYYY-MM-DD')
                });
            } else if(start_ampm == 'pm' && end_ampm == 'pm') {
                disabledDateSections.push({
                    start:moment(startDate).add(1,'days').format('YYYY-MM-DD'),
                    end:endDate
                });
            } else if(start_ampm == 'pm' && end_ampm == 'am') {
                disabledDateSections.push({
                    start:moment(startDate).add(1,'days').format('YYYY-MM-DD'),
                    end:moment(endDate).subtract(1,'days').format('YYYY-MM-DD')
                });
            }
        }
        
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
        setStartAMPM(moment(e.date).format('YYYY-MM-DD'));
        var endTime = $endTime.data('DateTimePicker').date();
        if(endTime != null) {
            endTime = moment(endTime).format('YYYY-MM-DD');
            var startTime = moment(e.date).format('YYYY-MM-DD');
            var endTimeChanged = false;
            var endTimeChanged2 = false;
            for(var i in disabledDateSections) {
                //当前选择的开始和结束日期包含不可用日期区间
                if(moment(startTime).isBefore(disabledDateSections[i].start) && moment(endTime).isAfter(disabledDateSections[i].end)){
                    endTime = moment(disabledDateSections[i].start).subtract(1,'days').format('YYYY-MM-DD');
                    endTimeChanged = true;
                }
            }
            if(moment(endTime).isAfter(moment(e.date).add(maxDays-1,'days').format('YYYY-MM-DD'))) {
                endTime = moment(e.date).add(maxDays-1,'days').format('YYYY-MM-DD');
                endTimeChanged2 = true;
            }
            if(endTimeChanged || endTimeChanged2) {
                $endTime.data('DateTimePicker').date(endTime);
                setEndAMPM(moment(endTime).format('YYYY-MM-DD'));
                var txt = '您选择的开始和截止日期包含不可用日期';
                if(endTimeChanged2) txt = '会议时间最多7天';
                toastr.success(text + '，截止日期已经自动调整到' + endTime + '以避开不可用日期。');
            }
        }
        //hourSelectorCtrl(e.date, endTime);
    });
    //关联起始和截止日期，使截止日期不早于起始日期；自动调整开始日期，使日期范围避开不可用日期
    $endTime.on('dp.change',function(e) {
        $startTime.data("DateTimePicker").maxDate(e.date);
        setEndAMPM(moment(e.date).format('YYYY-MM-DD'));
        var startTime = $startTime.data('DateTimePicker').date();
        if(startTime != null) {
            startTime = moment(startTime).format('YYYY-MM-DD');
            var endTime = moment(e.date).format('YYYY-MM-DD');
            var startTimeChanged = false;
            var startTimeChanged2 = false;
            for(var i in disabledDateSections) {
                //当前选择的开始和结束日期包含不可用日期区间
                if(moment(startTime).isBefore(disabledDateSections[i].start) && moment(endTime).isAfter(disabledDateSections[i].end)){
                    startTime = moment(disabledDateSections[i].end).add(1,'days').format('YYYY-MM-DD');
                    startTimeChanged = true;
                }    
            }
            if(moment(startTime).isBefore(moment(e.date).subtract(maxDays-1,'days').format('YYYY-MM-DD'))) {
                startTime = moment(e.date).subtract(maxDays-1,'days').format('YYYY-MM-DD');
                startTimeChanged2 = true;
            }
            if(startTimeChanged || startTimeChanged2) {
                $startTime.data('DateTimePicker').date(startTime);
                setStartAMPM(moment(startTime).format('YYYY-MM-DD'));
                var txt = '您选择的开始和截止日期包含不可用日期';
                if(startTimeChanged2) txt = '会议时间最多7天';
                toastr.success(txt + '，开始日期已自动调整到' + startTime + '以避开不可用日期。');
            }
        }
        //hourSelectorCtrl(startTime, e.date);
    });

    //同时使用DateTimePicker和bootstrapValidator时，需要手动触发时间输入框的表单验证
    $startTime.on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('time_start', 'NOT_VALIDATED',null)
            .validateField('time_start');
        setTimeRangeLabel();
    });
    $endTime.on('dp.hide',function(e) {
        $form.data('bootstrapValidator')
            .updateStatus('time_end', 'NOT_VALIDATED',null)
            .validateField('time_end');
        setTimeRangeLabel();
    });
    
    //设置开始日期的“上午”“下午”按钮状态
    function setStartAMPM(startDate) {
        $btn_start_am.removeClass('disabled');
        $btn_start_am.addClass('sel');
        $btn_start_pm.removeClass('disabled');
        $btn_start_pm.addClass('sel');
        for(var i in usedTimeSections) {
            if(startDate == usedTimeSections[i].start.date) {
                $btn_start_pm.removeClass('sel');
                $btn_start_pm.addClass('disabled');
            } else if(startDate == usedTimeSections[i].end.date) {
                $btn_start_am.removeClass('sel');
                $btn_start_am.addClass('disabled');
            }
        }
    }
    //设置结束日期的“上午”“下午”按钮状态
    function setEndAMPM(endDate) {
        $btn_end_am.removeClass('disabled');
        $btn_end_am.addClass('sel');
        $btn_end_pm.removeClass('disabled');
        $btn_end_pm.addClass('sel');
        for(var i in usedTimeSections) {
            if(endDate == usedTimeSections[i].start.date) {
                $btn_end_pm.removeClass('sel');
                $btn_end_pm.addClass('disabled');
            } else if(endDate == usedTimeSections[i].end.date) {
                $btn_end_am.removeClass('sel');
                $btn_end_am.addClass('disabled');
            }
        }
    }

    function getStartTime(){
        if($startTimeInput.val() != '') {
            return $startTimeInput.val();
        } else {
            return null;
        }
    }

    function getEndTime(){
        if($endTimeInput.val() != '') {
            return $endTimeInput.val();
        } else {
            return null;
        }
    }

    function setTimeRangeLabel() {
        var start = getStartTime();
        var end = getEndTime();
        if(start != null && end != null) {
            $timeRangeLabel.text('从：' + start + ' 到：' + end + ' 共：' + getTimeRange());
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
                return parseInt(moment(end).diff(start,'hours')) + 24;
            } else {
                var days = moment(end).diff(start,'days') + 1;
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
            price : '50.00',
            unit : '台/小时',
            max: 10
        },
        {
            service_type : '白板',
            price : '10.00',
            unit : '个/小时',
            max: 2,
        },
        {
            service_type : '电视机',
            price : '30.00',
            unit : '台/小时',
            max : 4
        },
        {
            service_type : '饮水机',
            price : '6.00',
            unit : '台/小时',
            max : 8
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
                restrainQtty(id);
            });
            restrainQtty(id);
            $('#qtty_' + id).watchInput(function(){
                restrainQtty(id);
            });
        },
        afterRemove : function($container, id) {
            getTotalPrice();
            showPrice();
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

    //限制增值服务数量
    function restrainQtty(id){
        //查询对应的addValueFormData数据
        var item = _.find(addValueFormData,function(item) {
            return item.service_type == $('#service_type_' + id).val();
        });
        //如果查询到了对应的addValueFormData数据
        if(item) {
            //限制输入为数字
            var val = $('#qtty_' + id).val();
            var intVal = parseInt($('#qtty_' + id).val());
            if(isNaN(intVal)) {
                intVal = 0;
            }
            if(item.max && intVal > item.max) {
                intVal = item.max;
                toastr.warning(item.service_type + '的最大数量为：' + item.max);
            }
            $('#qtty_' + id).val(intVal);
            $('#qtty_'+id).data('originVal',intVal);
            getTotalPrice();
        }
    }

    //获取包含增值服务总单价
    function getTotalPrice() {
        var items = $('#add_value_content').find('.one-form-group');
        var total_price = base_price;
        for(var i = 0; i < items.length; i++) {
            id = parseInt(items.eq(i).attr('id').split('_')[1]);
            //查询对应的addValueFormData数据
            var item = _.find(addValueFormData,function(item) {
                return item.service_type == $('#service_type_' + id).val();
            });
            if(item) {
                //alert(parseFloat(item.price) + ' x ' + parseInt($('#qtty_' + id).val()));
                //单价*数量
                var price = parseFloat(item.price) * parseInt($('#qtty_' + id).val());
                total_price += price;
            }

        }
        $('#price').val(total_price);
        showPrice();
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

    $('#price').val(total_price);

    //发布
    $btn_submit.click(function(){
        var $this = $(this);
        if(!$this.attr('disabled')) {
            if(checkValidation()) {
                //提交成功后提示
                toastr.success('您的展厅申请提交成功!');

                $this.attr('disabled','disabled');
                setTimeout(function(){
                    $this.removeAttr('disabled');
                },3000);
            }
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

