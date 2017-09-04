/* ==================================================================================
 * topbarCtrl.js
 * 顶部菜单栏控制
 * ================================================================================== */

var TopbarCtrl = (function(){

    var el_mbtn = $('#mbtn');
    var el_main_content = $('.main-content');
    var el_body_mask = $('.body-mask');

    function TopbarCtrl() {
        this.initLayout();
    }

    TopbarCtrl.prototype.initLayout = function(){
        var base = this;
        
        if(device.mobile() || device.tablet()) {
            //创建左侧菜单iscroll实例
            var menuScroll = new IScroll('#menu', {
                scrollbars: 'custom',
                mouseWheel: true,
                interactiveScrollbars: true,
                shrinkScrollbars: 'scale',
                fadeScrollbars: true,
                click: iScrollClick()
            });
        }
        
        el_mbtn.on('click', function(){
            el_main_content.toggleClass('showmenu');
        });
        
        el_body_mask.on('click', function(){
            el_main_content.removeClass('showmenu');
        });
        
        /*
        el_body_mask.on('touchstart', function() {
            
            el_body_mask.on('touchmove', function(event) {
                event.preventDefault();     
            }, false);
        });*/
        /*
        el_body_mask.on(' touchend', function() {
            el_body_mask.unbind('touchmove');
            el_main_content.removeClass('showmenu');
        });*/
        
    };
    
    //处理iscroll的click兼容性bug
    function iScrollClick (){
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
            var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,4);
            return parseFloat(s[0]+s[3]) < 44 ? false : true
        }
    }

    return TopbarCtrl;

})();

module.exports = TopbarCtrl;
