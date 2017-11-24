$(document).ready(function(){

    window.commonTools.setDateTimeInput($('#time'));

    //填充当前日期到“申请时间”
    var date = moment().year() + '-' + (moment().month() + 1) + '-' + moment().date();
    $('#apply_date').text(date);

    $('#btn_submit').click(function(){

        toastr.success('您编辑的信息已提交');

    });

});
