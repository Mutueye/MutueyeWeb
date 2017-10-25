$(document).ready(function(){
    
    window.commonTools.initBSFileInput($('#invoice'));
    
    $('#btn_submit').click(function(){
        
        toastr.success('您编辑的信息已提交');
        
    });
    
});

