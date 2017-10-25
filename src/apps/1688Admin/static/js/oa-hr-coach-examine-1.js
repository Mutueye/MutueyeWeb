$(document).ready(function(){
    
    //icheck初始化
    $('.name_check').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
    }).on('ifChanged', function(e){
        console.log('checkbox1:状态：' + $('#checkbox1').is(':checked') + ' ' + 'checkbox2:状态：' + $('#checkbox2').is(':checked'));
    });
    
    $('#check_all').click(function(){
        $('.name_check').iCheck('check');
    });
    
    $('#uncheck_all').click(function(){
        $('.name_check').iCheck('uncheck');
    });
    
    $('#btn_submit').click(function(){
        
        //验证并提交成功后返回上级页面
        
        //此处演示业务流，跳转到审核页面
        window.location.href='oa-hr-coach-examine-2.html';
        
    });
    
    $('#btn_return').click(function(){
        
        //验证并提交成功后返回上级页面
        
        window.location.href='oa-hr-coach.html';
        
    });
    
});