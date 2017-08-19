/* ==================================================================================
 * edu-portal: browserCtrl.js
 * 检测浏览器运行环境，对动画、触摸的支持等
 * ================================================================================== */

var BrowserCtrl = (function(){

    browser = {};

    //constructor
    function BrowserCtrl() {
        checkBrowser();
    }

    //代理检测
    var checkBrowser = function(){
        var supportAnim = supportCss3('animation');

        var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

        browser = {
            "supportAnim" : supportAnim,
            "isTouch" : isTouch
        }

        if(supportAnim) {
            $("body").addClass('support-anim');
        } else {
            $("body").addClass('no-support-anim');
        }

        if(isTouch){
            $("body").addClass('is-touch');
        } else {
            $("body").addClass('no-touch');
        }
    };

    //检测css3属性是否支持
    var supportCss3 = function(style) {
        var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };
 
        for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));
 
        humpString.push(_toHumb(style));
 
        for (i in humpString)
        if (humpString[i] in htmlStyle) return true;
 
        return false;
    };

    BrowserCtrl.prototype.getBrowserSupport = function(){
        return browser;
    };

    return BrowserCtrl;

})();

module.exports = BrowserCtrl;
