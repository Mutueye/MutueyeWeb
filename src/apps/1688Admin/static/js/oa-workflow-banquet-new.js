$(document).ready(function(){
    
    window.commonTools.setDateTimeInput($('#time'));
    
    $('#btn_submit').click(function(){
        
        toastr.success('您编辑的信息已提交');
        
    });
    
});

