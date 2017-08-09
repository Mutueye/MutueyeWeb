/* ==================================================================================
 * viewCtrl.js
 * 界面视图相关控制
 * ================================================================================== */

var ViewCtrl = (function(){

    var winSize = {
        width : 0,
        height : 0
    }
    
    var currentFontSize = 100;

    function ViewCtrl() {
        this.initLayout();
    }

    ViewCtrl.prototype.initLayout = function(){
        
        $('.touch-active').on('touchstart',function(){
            $(this).addClass('active');
        });
        $('.touch-active').on('touchmove touchend',function(){
            $(this).removeClass('active');
        });

        setResponsive();
        checkTouchable();
        

        $(window).resize(function() {
            setResponsive();
        });
    };
    
    

    var getWinSize = function() {
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
    }
    
    var checkTouchable = function(){
        var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;
        if(isTouch) {
            $('html').addClass('is-touch');
        }
    }

    var setResponsive = function() {

        getWinSize();

        var winWidth = (winSize.width <= 320) ? 320 : ((winSize.width > 640) ? 320 : winSize.width );
        var baseFontsize = 100;
        currentFontSize = winWidth/320*100;
        $('html').css('fontSize', currentFontSize + 'px');
    }

    return ViewCtrl;

})();

module.exports = ViewCtrl;
