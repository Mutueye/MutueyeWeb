/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms

var ViewCtrl = require('./view/viewCtrl');

var Webapp = (function(){

    attachFastClick(document.body);
    var viewCtrl = new ViewCtrl();

    function Webapp(){
        $('#btn_personal').click(function(){
            //判断是否登录，此处默认未登录，演示登录页面
            var isUsrLogin = false;
            if(isUsrLogin) {
                window.location.href="m-personal-notice.html";
            } else {
                window.location.href="m-login.html";
            }
        })
    }

    Webapp.prototype.getViewCtrl = function(){
        return viewCtrl;
    }

    return Webapp;

})();

$(document).ready(function(){
    window.app = new Webapp();
});
