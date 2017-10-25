/*!
 * jquery.toTop
 * @Description Controller of a scroll to top button
 * @Depend on jquery.scrollTo.js
 * @Author Du Peng
 * @Version 0.01
 * Licensed under MIT
 */

if ( typeof Object.create !== "function" ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(jQuery);
    } else {
        // Global
        factory(jQuery);
    }

})(function($){
    'use strict';

    var ToTopProto = {
        init : function(options, el){
            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.toTop.options, base.$elem.data(), options);
            base.userOptions = options;

            base.$elem.data("owl-originalStyles", base.$elem.attr("style"));
            base.$elem.data("owl-originalClasses", base.$elem.attr("class"));

            if(base.options.checkNecessary){
                if(base.checkIfNecessary()){
                    base.handleVisibility();
                    base.handleClick();
                } else {
                    base.$elem.hide();
                }
            } else {
                base.handleVisibility();
                base.handleClick();
            }
        },
        setVisibility : function(){
            var base = this;
            //alert($(window).scrollTop() + ' ' + $(document).height() + ' ' + $(window).height());
            if($(window).scrollTop() > base.options.visibleOffset){
                if(base.options.toggleClass === ''){
                    base.$elem.show();
                } else {
                    base.$elem.addClass(base.options.toggleClass);
                }
                if (typeof base.options.onToTopShow === "function") base.options.onToTopShow.apply(this,[base.$elem]);
                base.active = true;
            } else {
                if(base.options.toggleClass === ''){
                    base.$elem.hide();
                } else {
                    base.$elem.removeClass(base.options.toggleClass);
                }
                if (typeof base.options.onToTopHide === "function") base.options.onToTopHide.apply(this,[base.$elem]);
                base.active = false;
            }
        },
        handleVisibility : function(){
            var base = this;

            base.setVisibility();

            
            base.whenScroll = function(){
                base.setVisibility();
            };
            $(window).scroll(base.whenScroll);
            
            
            base.whenLoaded = function(){
                base.setVisibility();
            };
            $(window).load(base.whenLoaded);
            
        },
        handleClick : function(){
            var base = this;

            base.$elem.click(function(){
                $.scrollTo('body',base.options.duration);
            });
        },
        checkIfNecessary : function(){
            var base = this;

            if(($(document).height() / $(window).height()) >= base.options.necessaryParam){
                return true;
            } else {
                return false;
            }
        }
    };
    $.fn.toTop = function(options){
        return this.each(function() {
            if($(this).data("toTop-init") === true){
                return false;
            }
            $(this).data("toTop-init", true);
            var toTop = Object.create( ToTopProto );
            toTop.init( options, this );
            $.data( this, "toTop", toTop );
        });
    }
    $.fn.toTop.options = {
        checkNecessary : true,      //是否检测需不需要启用返回顶部按钮
        necessaryParam : 2.5,       //当页面长度除以显示窗口高度>=此值时，启用返回顶部按钮
        toggleClass : 'totop-show', //返回顶部按钮显示时的class
        duration : 500,             //滚动到顶部动画的时间
        visibleOffset : 200,        //当滚动到距离页面顶部>=此值时显示返回顶部按钮
        
        onToTopShow : false,
        onToTopHide : false
    }
});
