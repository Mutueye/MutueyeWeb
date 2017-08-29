/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms
var ViewCtrl = require('./view/viewCtrl');
var TopbarCtrl = require('../../components/topbar/topbarCtrl');
var DolphinSlider = require('./view/dolphinSlider'); 

var Webapp = (function(){
    
    attachFastClick(document.body);

    function Webapp(){
        var viewCtrl = new ViewCtrl();
        var topbarCtrl = new TopbarCtrl();
    }
    
    Webapp.prototype.getViewCtrl = function(){
        return viewCtrl;
    }

    return Webapp;

})();

$(document).ready(function(){
    window.app = new Webapp();
});
