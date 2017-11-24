$(document).ready(function(){

    window.commonTools.setDateTimeInput($('#time'), '2017-11-23');

    $('#btn_submit').click(function(){

        toastr.success('您编辑的信息已提交');

    });

});
