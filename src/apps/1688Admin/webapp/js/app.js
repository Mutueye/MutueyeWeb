/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms
var ViewCtrl = require('./view/viewCtrl');

var Webapp = (function(){
    
    attachFastClick(document.body);
    
    viewCtrl = new ViewCtrl();

    function Webapp(){

    }

    return Webapp;

})();

$(document).ready(function(){
    var app = new Webapp();
});
