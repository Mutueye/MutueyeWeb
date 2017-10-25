$(document).ready(function(){
    
    $('#btn_submit').click(function(){
        
        //验证并提交成功后返回上级页面
        
        //此处演示业务流，跳转到审核页面
        window.location.href='oa-hr-recruit-examine-2.html';
        
    });
    
    $('#btn_return').click(function(){
        
        //验证并提交成功后返回上级页面
        
        window.location.href='oa-hr-recruit.html';
        
    });
    
});