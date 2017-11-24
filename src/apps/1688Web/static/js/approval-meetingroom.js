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
            toastr.success('您的会议室申请提交成功!');

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
