/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms
var ViewCtrl = require('./view/viewCtrl');
var IFrameLinker = require('./iframeLinker');

var Webapp = (function(){
    
    attachFastClick(document.body);

    function Webapp(){
        viewCtrl = new ViewCtrl();
        iframeLinker = new IFrameLinker();
    }
    
    Webapp.prototype.getViewCtrl = function(){
        return viewCtrl;
    }
    
    Webapp.prototype.setIframeLinks = function(){
        iframeLinker.setIframeLinks();
    }
    
    //处理iscroll的click兼容性bug
    Webapp.prototype.iScrollClick = function(){
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
            var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,4);
            return parseFloat(s[0]+s[3]) < 44 ? false : true
        }
    }

    return Webapp;

})();

$(document).ready(function(){
    window.app = new Webapp();
});
