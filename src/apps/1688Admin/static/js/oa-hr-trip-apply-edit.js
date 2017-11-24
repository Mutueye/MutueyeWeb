$(document).ready(function(){

    var $startDate = $('#startdate');
    var $startTime = $('#starttime');
    var $endDate = $('#enddate');
    var $endTime = $('#endtime');
    var $leaveDays = $('#leave_days');

    window.commonTools.setDateTimeInputSection($startDate, $endDate, '2017-11-23 09:00', '2017-11-24 18:00', 'YYYY-MM-DD HH:00');
    //计算初始时间长度
    cacuDays();
    window.commonTools.initBSFileInput($('#input_appendix'),true);

    $startDate.on("dp.hide",function(){
        cacuDays();
    });

    $endDate.on("dp.hide",function(){
        cacuDays();
    });

    //计算休假天数,并在表单显示
    function cacuDays(){
        if($startTime.val() != '' && $endTime.val() != '') {
            var date1 = new Date($startTime.val());
            var date2 = new Date($endTime.val());
            var total = (date2.getTime() - date1.getTime())/1000;
            var days = parseInt(total/(24*60*60));
            var afterDay = total - days*24*60*60;
            var hours = parseInt(afterDay/(60*60));
            $leaveDays.text(days + '天' + hours + '小时');
        }
    }

});
