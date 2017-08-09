/* ========================================================================
 * Dolphin: absCenter.js v0.0.1
 * 用于绝对定位元素相对位置的居中
 * ======================================================================== */

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory;
    } else {
        // Global
        factory();
    }

})(function($){
    'use strict';

    var hcenter = '[data-align="h-center"]'; //水平居中
    var hright = '[data-align="h-right"]'; //水平右对齐
    var vcenter = '[data-align="v-center"]'; //垂直居中

    var AbsCenter = function(){
        setAbsCenter();
    };

    function setAbsCenter(){
        $(hcenter).each(function() {
            var $this = $(this);
            $this.css({
                'marginLeft' : -0.5*$this.outerWidth()+'px',
                'left' : '50%'
            });
        });

        $(vcenter).each(function() {
            var $this = $(this);
            $this.css({
                'marginTop' : -0.5*$this.outerHeight()+'px',
                'top' : '50%'
            });
        });

        $(hright).each(function() {
            var $this = $(this);
            $this.css({
                'right' : '0'
            });
        });
    }

    return AbsCenter();

});
