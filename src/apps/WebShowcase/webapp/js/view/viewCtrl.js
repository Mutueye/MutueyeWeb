/* ==================================================================================
 * viewCtrl.js
 * 界面视图相关控制
 * ================================================================================== */
//var device = require('device.js');
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

    function ViewCtrl() {
        this.initLayout();
    }

    ViewCtrl.prototype.initLayout = function(){
        var base = this;
        
        $('.touch-active, .btn').on('touchstart',function(){
            $(this).addClass('active');
        });
        $('.touch-active, .btn').on('touchmove touchend',function(){
            $(this).removeClass('active');
        });
        
        //console.log(device.windows());
        if(device.windows()) {
            console.log(jQuery.browser);
        }
        
        //device.addClasses(document.getElementsByTagName("body")[0]);

        base.setResponsive();
        //base.checkTouchable();
        

        $(window).resize(function() {
            base.setResponsive();
        });
    };
    
    

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
        var winWidth = (winSize.width <= minMobileWidth) ? minMobileWidth : ((winSize.width > maxMobileWidth) ? minMobileWidth : winSize.width );
        currentFontSize = winWidth/minMobileWidth*baseFontsize;
        $('html').css('fontSize', currentFontSize + 'px');
    }

    return ViewCtrl;

})();

module.exports = ViewCtrl;
