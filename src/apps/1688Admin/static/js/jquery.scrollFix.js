/*!
 * jquery.scrollFix
 * @Description Set an element's position to fix when window scrolled to certain position.
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
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
})(function($){
    'use strict';

    var SFix = {
        init : function(options, el){
            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.scrollFix.options, base.$elem.data(), options);
            base.userOptions = options;

            base.spaceHeight = base.$elem.innerHeight();
            base.spaceMarginTop = base.$elem.css('margin-top');
            base.spaceMarginBottom = base.$elem.css('margin-bottom');
            base.spacePaddingTop = base.$elem.css('padding-top');
            base.spacePaddingBottom = base.$elem.css('padding-bottom');
            base.fillEmptySpace();

            base.initPos = base.$elem.offset().top - base.options.fixedTop;
            base.isFixed = false;

            base.setFix();
            base.handleFix();
        },

        handleFix : function(){
            var base = this;

            base.whenScroll = function(){
                base.setFix();
            };
            $(window).scroll(base.whenScroll);

            base.whenLoaded = function(){
                base.setFix();
            };
            $(window).load(base.whenLoaded);
        },

        setFix : function(){
            var base = this;
            if($(window).scrollTop() >= base.initPos){
                if(!base.isFixed){
                    base.$elem.css({
                        'position' : 'fixed',
                        'top' : base.options.fixedTop + 'px',
                        'z-index' : base.options.fixedZindex,
                    });
                    if(base.options.clearMargin){
                        base.$elem.css({
                            'margin-top' : '0px',
                            'margin-bototm' : '0px'
                        });
                    }
                    if(base.options.fixedClass != ''){
                        base.$elem.addClass(base.options.fixedClass);
                    }
                    if(base.emptySpace){
                        base.emptySpace.show();
                    }
                    if (typeof base.options.onFixed === "function") {
                        base.options.onFixed.apply(this,[base.$elem]);
                    }
                    base.isFixed = true;
                }
            } else {
                if(base.isFixed){
                    base.$elem.removeAttr('style');
                    base.$elem.removeClass(base.options.fixedClass);
                    if(base.emptySpace){
                        base.emptySpace.hide();
                    }
                    if (typeof base.options.onUnfixed === "function") {
                        base.options.onUnfixed.apply(this,[base.$elem]);
                    }
                    base.isFixed = false;
                }
            }
        },

        fillEmptySpace : function(){
            var base = this;
            if(base.options.fillEmptySpace){
                base.emptySpace = $('<div><div/>');
                base.emptySpace.css({
                    'width' : '100%',
                    'height' : base.spaceHeight,
                    'margin-top' : base.spaceMarginTop,
                    'margin-bottom' : base.spaceMarginBottom,
                    'padding-top' : base.spacePaddingTop,
                    'padding-bottom' : base.spacePaddingBottom,
                    'display' : 'none'
                });
                base.$elem.after(base.emptySpace);
            }
        }
    };
    $.fn.scrollFix = function(options){
        return this.each(function() {
            if($(this).data("sfix-init") === true){
                return false;
            }
            $(this).data("sfix-init", true);
            var sfix = Object.create( SFix );
            sfix.init( options, this );
            $.data( this, "scrollfix", sfix );
        });
    }
    $.fn.scrollFix.options = {
        fixedTop : 0,                //position:fixed之后的top值
        fixedZindex : 999999,        //固定后的z-index
        fixedClass : '',            //固定后附加的class
        clearMargin : true,            //固定后是否清除目标的margin值
        fillEmptySpace : true,        //是否创建一个空div用于元素固定后占据其空出来的位置
        onFixed : false,            //onFixed : someFunction, 当元素固定时调用someFunction
        onUnfixed : false            //onUnFixed : somefunction, 当元素接触固定时调用someFunction
    }
});
