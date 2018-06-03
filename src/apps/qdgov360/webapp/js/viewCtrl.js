/* ==================================================================================
 * viewCtrl.js
 * 界面视图相关控制
 * ================================================================================== */



var ViewCtrl = (function(){
    var winSize = {
        width : 0,
        height : 0
    }

    function ViewCtrl() {
        this.initLayout();
    }

    ViewCtrl.prototype.initLayout = function(){

        $('.touch-active').on('touchstart mouseover',function(){
            $(this).addClass('active');
        });
        $('.touch-active').on('touchmove touchend mouseout',function(){
            $(this).removeClass('active');
        });

        setResponsive();
        $(window).resize(function() {
            setResponsive();
        });
    };

    var getWinSize = function(){
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

    var setResponsive = function() {
        getWinSize();
        //alert(checkMobile());
        if(checkMobile()) {
            var winWidth = (winSize.width <= 320) ? 320 : ((winSize.width >= 640) ? 640 : winSize.width );
            var baseFontsize = 80;
            var currentFontSize = winWidth/320*baseFontsize;
            //alert(currentFontSize);
            //alert(winWidth);
            $('html').css('fontSize', currentFontSize + 'px');
        }
    }

    var checkMobile = function(){
        var sUserAgent= navigator.userAgent.toLowerCase();
        //var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp= sUserAgent.match(/midp/i) == "midp";
        var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid= sUserAgent.match(/android/i) == "android";
        var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (/*bIsIpad || */bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return true;
        }
        return false;
    }

    return ViewCtrl;

})();

module.exports = ViewCtrl;
