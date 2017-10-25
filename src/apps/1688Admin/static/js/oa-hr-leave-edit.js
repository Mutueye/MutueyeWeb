$(document).ready(function(){
    
    var $workdate = $('#workdate');
    var $startDate = $('#startdate');
    var $endDate = $('#enddate');
    
    
    window.commonTools.setDateTimeInput($workdate);
    window.commonTools.setDateTimeInputSection($startDate, $endDate);
    
    $('#btn_submit').click(function(){
        
        window.location.href='oa-hr-leave.html';
        
    });
    
    $('#btn_save').click(function(){
        
        toastr.success('内容已保存');
        
    });
    
});