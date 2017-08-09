/*!
 * treeMenu
 * @Author Du Peng
 * @Date 2017.08.09
 * Licensed under MIT
 */

if ( typeof Object.create !== "function" ) {
    Object.create = function( obj ) {
        function F() {};
        F.prototype = obj;
        return new F();
    };
}

;(function (factory) {
    'use strict';

    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }

})(function($) {
    
    var TreeMenu = {
        init :function(options, el){
            var base = this;

            base.$elem = $(el);

            // options passed via js override options passed via data attributes
            base.options = $.extend({}, $.fn.treeMenu.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },
        
        loadContent : function(){
            var base = this;

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this,[base.$elem]);
            }
            
            if (typeof base.options.jsonPath === "string") {
                var url = base.options.jsonPath;

                function getData(data) {
                    if (typeof base.options.jsonSuccess === "function") {
                        base.options.jsonSuccess.apply(this,[data]);
                    } else {
                        for(var i in data){
                            console.log(data[i]);
                        }
                        //base.$elem.html(content);
                    }
                    base.logIn();
                }
                $.getJSON(url,getData);
            } else {
                base.logIn();
            }
            
        },
        
        logIn : function(action){
            var base = this;

            base.$elem.data("tm-originalStyles", base.$elem.attr("style"))
                      .data("tm-originalClasses", base.$elem.attr("class"));

        },
    }
    
    $.fn.treeMenu = function( options ){
        return this.each(function() {
            if($(this).data("tm-init") === true) return false;
            $(this).data("tm-init", true);
            var tMenu = Object.create( TreeMenu );
            tMenu.init( options, this );
            $.data( this, "treeMenu", tMenu );
        });
    };
    
    $.fn.treeMenu.options = {
        jsonPath : false,
        jsonSuccess : false,
        
        beforeInit : false,
        afterInit : false
    };
});