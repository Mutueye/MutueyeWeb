$(document).ready(function(){
    
    var $startDate = $('#startdate');
    var $startTime = $('#starttime');
    var $endDate = $('#enddate');
    var $endTime = $('#endtime');
    var $leaveDays = $('#leave_days');
    
    window.commonTools.setDateTimeInputSection($startDate, $endDate, '', '', 'YYYY-MM-DD HH:00');
    
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