/* ==================================================================================
 * edu-portal: timeCtrl.js
 * 设置切换
 * ================================================================================== */

var TimeCtrl = (function(){


    days = ['周日','周一','周二','周三','周四','周五','周六'];


    //constructor
    function TimeCtrl() {
        setInterval(function () {
            setTimeText();
        }, 100);
    }

    function setTimeText() {
        var myDate = new Date();

        var monthNum = myDate.getMonth() + 1
        var month = (monthNum < 10 ? '0' + monthNum : monthNum) + '月';
        var date = myDate.getDate() + '日 ';
        var day = days[myDate.getDay()] + ' ';
        var hour = myDate.getHours() + ':';
        var minute = myDate.getMinutes() < 10 ? '0'+myDate.getMinutes() : myDate.getMinutes();
        var second = ':' + (myDate.getSeconds() < 10 ? '0'+ myDate.getSeconds() : myDate.getSeconds());

        var dateText = month + date + day + hour + minute + second;
        //alert(dateText);
        $('#date').html(dateText);
    }

    return TimeCtrl;

})();

module.exports = TimeCtrl;
