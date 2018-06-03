/* ==================================================================================
 * viewCtrl.js
 * 界面视图相关控制
 * ================================================================================== */
var device = require('../../../../../../bower_components/device.js/lib/device.js');

var ViewCtrl = (function(){

    var winSize = {
        width : 0,
        height : 0
    }

    var maxMobileWidth = 640;
    var minMobileWidth = 320;
    var baseFontsize = 100;
    var currentFontSize = baseFontsize;
    var browserType = "";

    var el_canvas = $('#mainCanvas');
    var canvas_ratio = 1


    function ViewCtrl() {
        this.initLayout();
    }

    ViewCtrl.prototype.initLayout = function(){
        var base = this;

        base.setTouchActive();
        base.setResponsive();

        browserType = base.getBrowserType();
        if(browserType == 'IE9') {
            $('html').addClass('isIE9');
        } else if(browserType == 'IE8' || browserType == 'IE7') {
            alert('提示 ：浏览器版本过低')
        }

        $(window).resize(function() {
            base.setResponsive();
        });
    };

    ViewCtrl.prototype.setTouchActive = function() {
        $('.touch-active, .btn').on('touchstart mousedown',function(){
            $(this).addClass('active');
        });
        $('.touch-active, .btn').on('touchmove touchend mouseup',function(){
            $(this).removeClass('active');
        });
    }


    ViewCtrl.prototype.getWinSize = function() {
        if(window.innerHeight) {
            winSize.height = window.innerHeight;
            winSize.width = window.innerWidth;
        } else if (document.body && document.body.clientHeight) {
            winSize.height = document.body.clientHeight;
            winSize.width = document.body.clientWidth;
        } else {
            winSize.height = document.documentElement.clientHeight;
            winSize.width = document.documentElement.clientWidth;
        }
        return winSize;
    }

    ViewCtrl.prototype.getBrowserType = function()
    {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

        if (isIE)
        {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7)
            { return "IE7";}
            else if(fIEVersion == 8)
            { return "IE8";}
            else if(fIEVersion == 9)
            { return "IE9";}
            else if(fIEVersion == 10)
            { return "IE10";}
            else if(fIEVersion == 11)
            { return "IE11";}
            else
            { return "0"}//IE版本过低
        }//isIE end

        if (isFF) {  return "FF";}
        if (isOpera) {  return "Opera";}
        if (isSafari) {  return "Safari";}
        if (isChrome) { return "Chrome";}
        if (isEdge) { return "Edge";}
    }

    ViewCtrl.prototype.checkTouchable = function(){
        var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
        if(isTouch) {
            $('html').addClass('is-touch');
        } else {
            $('html').addClass('is-not-touch');
        }
        return isTouch;
    }

    ViewCtrl.prototype.checkMobile = function() {
        if(this.checkTouchable() && this.getWinSize().width < maxMobileWidth) {
            return true;
        }
        return false;
    }

    ViewCtrl.prototype.setResponsive = function() {
        this.getWinSize();
        if(device.mobile() || device.tablet()) {
            var winWidth = (winSize.width <= minMobileWidth) ? minMobileWidth : ((winSize.width > maxMobileWidth) ? maxMobileWidth : winSize.width );
            currentFontSize = winWidth/minMobileWidth*baseFontsize;
            $('html').css('fontSize', currentFontSize + 'px');
        }

        var canvas_width = winSize.width;
        var canvas_height = canvas_width*canvas_ratio;
        if(canvas_height > winSize.height) {
            canvas_width = winSize.height;
            canvas_height = canvas_width*canvas_ratio;
        }
        el_canvas.attr('width', canvas_width);
        el_canvas.attr('height', canvas_height);

    }

    return ViewCtrl;

})();

module.exports = ViewCtrl;
