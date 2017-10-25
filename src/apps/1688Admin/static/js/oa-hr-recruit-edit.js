$(document).ready(function(){
    
    window.commonTools.setDateTimeInput($('#workdate'));
    
    $('#btn_submit').click(function(){
        
        //验证并提交成功后返回上级页面
        
        //此处演示业务流，跳转到审核页面
        window.location.href='oa-hr-recruit-examine-1.html';
        
    });
    
    $('#btn_save').click(function(){
        
        //验证并提交成功后返回上级页面
        
        window.location.href='oa-hr-recruit.html';
        
    });
    
});