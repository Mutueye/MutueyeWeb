$(document).ready(function(){
    
    var $workdate = $('#workdate');
    var $startDate = $('#startdate');
    var $startTime = $('#starttime');
    var $endDate = $('#enddate');
    var $endTime = $('#endtime');
    var $leaveDays = $('#leave_days');
    
    window.commonTools.setDateTimeInput($workdate);
    window.commonTools.setDateTimeInputSection($startDate, $endDate);
    
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
            var days = parseInt((date2.getTime() - date1.getTime())/(1000*24*60*60));
            $leaveDays.text(days + 1);
        }
    }
    
    $('#btn_submit').click(function(){
        
        window.location.href='oa-hr-leave.html';
        
    });
    
    $('#btn_save').click(function(){
        
        toastr.success('内容已保存');
        
    });
    
});