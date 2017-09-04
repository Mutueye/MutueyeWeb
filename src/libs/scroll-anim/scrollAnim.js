/*!
 * ScrollAnim
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

    var ScrollAnimProto = {
        init : function(options, el){
            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.scrollAnim.options, base.$elem.data(), options);
            base.userOptions = options;

            base.animIn = false;
            base.handleScroll();
            //alert(base.$elem.offset().top + '---' + $(window).scrollTop() + '----' + $(window).height());
            $(window).scroll(function(){
                base.handleScroll();
            });
        },

        handleScroll : function(){
            var base = this;
            var scrollDistance = $(window).scrollTop() + $(window).height();
            if((scrollDistance > base.$elem.offset().top) && !base.animIn){
                base.$elem.addClass(base.options.animInClass);
                base.animIn = true;
            }
            else if( base.animIn && (scrollDistance <= base.$elem.offset().top) && !base.options.onlyOnce){
                base.$elem.removeClass(base.options.animInClass);
                base.animIn = false;
            }
        }
    };

    $.fn.scrollAnim = function(options){
        return this.each(function() {
            if($(this).data("scrollAnim-init") === true){
                return false;
            }
            $(this).data("scrollAnim-init", true);
            var scrollAnim = Object.create( ScrollAnimProto );
            scrollAnim.init( options, this );
            $.data( this, "scrollAnim", scrollAnim );
        });
    }
    $.fn.scrollAnim.options = {
        animInClass : 'anim-in',
        onlyOnce : false
    }
});
