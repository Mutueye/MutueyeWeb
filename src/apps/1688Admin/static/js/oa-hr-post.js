$(document).ready(function(){
    
    window.commonTools.setDateTimeInput($('#workdate'));
    window.commonTools.setDateTimeInput($('#workdate2'));
    
    $('#btn_submit').click(function(){
        
        window.location.href='oa-hr-info.html';
        
    });
    
});