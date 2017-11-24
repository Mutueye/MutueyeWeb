$(document).ready(function(){

    window.commonTools.initBSFileInput($('#input_appendix'));

    //填充当前日期到“呈请时间”
    var date = moment().year() + '-' + add0(moment().month() + 1) + '-' + add0(moment().date()) + ' ' + add0(moment().hour()) + ':' + add0(moment().minute()) + ':' + add0(moment().second());
    $('#apply_date').text(date);

    function add0(str) {
        var _str = str.toString();
        if(_str.length == 1) {
            return '0' + _str;
        } else {
            return _str;
        }
    }

    $('#btn_submit').click(function(){

        window.location.href='oa-workflow-report-examine-1.html';

    });

});
