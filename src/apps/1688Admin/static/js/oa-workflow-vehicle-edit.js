$(document).ready(function(){

    window.commonTools.setDateTimeInput($('#time'), '2018-12-13');
    window.commonTools.setDateTimeInputSection($('#start_time'), $('#end_time'), '2018-12-13 09:35', '2018-12-13 12:00', 'YYYY-MM-DD HH:mm');

    $('#btn_submit').click(function(){

        window.location.href='oa-workflow-vehicle-examine-1.html';

    });

});
