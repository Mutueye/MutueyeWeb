//一些通用的基本设置

//toastr提示框插件设置
toastr.options = { positionClass: "toast-top-center mt-space" }


window.commonTools = {
    getUserName : function() {
        //获取当前登录的用户名
        //此处直接返回'admin'字符串，用于静态页面演示
        return 'admin';
    },
    
    getLocalTime : function() {
        var myDate = new Date();
        var year = myDate.getFullYear() + '.'
        var monthNum = myDate.getMonth() + 1
        var month = (monthNum < 10 ? '0' + monthNum : monthNum) + '.';
        var date = myDate.getDate() + ' ';
        var hour = myDate.getHours() + ':';
        var minute = myDate.getMinutes() < 10 ? '0'+myDate.getMinutes() : myDate.getMinutes();
        var second = ':' + (myDate.getSeconds() < 10 ? '0'+ myDate.getSeconds() : myDate.getSeconds());

        return year + month + date + hour + minute + second;
    }
};