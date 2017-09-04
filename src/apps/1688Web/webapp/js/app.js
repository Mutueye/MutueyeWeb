/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms
var DolphinSlider = require('./lib/dolphinSlider');
var ScrollTo = require('./lib/jquery.scrollTo.js'); 
var ToTop = require('./lib/jquery.toTop.js');  

var ViewCtrl = require('./view/viewCtrl');


var TopbarCtrl = require('../../components/topbar/topbarCtrl');

var Webapp = (function(){
    
    attachFastClick(document.body);
    var viewCtrl = new ViewCtrl();
    var topbarCtrl = new TopbarCtrl();
    
    function Webapp(){
        
    }
    
    Webapp.prototype.getViewCtrl = function(){
        return viewCtrl;
    }

    return Webapp;

})();

$(document).ready(function(){
    window.app = new Webapp();
});
