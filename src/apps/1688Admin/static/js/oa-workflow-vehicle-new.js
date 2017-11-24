$(document).ready(function(){
    
    window.commonTools.setDateTimeInput($('#time'));
    window.commonTools.setDateTimeInputSection($('#start_time'), $('#end_time'), '', '', 'YYYY-MM-DD HH:mm');
    
    $('#btn_submit').click(function(){
        
        window.location.href='oa-workflow-vehicle-examine-1.html';
        
    });
    
});

