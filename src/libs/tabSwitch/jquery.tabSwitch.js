/*!
 * jquery.tabSwith
 * @Description Simply switch content when tab btns pressed
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

    var TabSwitchProto = {
        init : function(options, el){
            var base = this;
            base.$elem = $(el);
            base.options = $.extend({}, $.fn.tabSwitch.options, base.$elem.data(), options);
            base.userOptions = options;

            base.currentId = 0;
            base.targetId = 0;

            base.$tabBtns = base.$elem.find('.'+base.options.tabBtnClass);
            base.$tabItems = $('body').find('.'+base.options.tabItemClass);

            base.$tabBtns.each(function(){
                var $this = $(this);
                //alert($this.index());
                if($this.hasClass(base.options.tabBtnActiveClass)){
                    base.targetId = $this.index();
                    //alert(base.targetId);
                }
            })
            //if(base.$tabBtns.find('.'+base.options.tabBtnActiveClass)){
            //}
            //alert(base.targetId);
            if(base.options.hasTabAll){
                base.$tabAllBtn = base.$elem.find('.'+base.options.tabBtnAllClass);
                base.switchTab('all')
            } else {
                if(base.options.tabItemActiveClass == ''){
                    base.$tabItems.hide();
                }
                alert(base.targetId);
                base.switchTab(base.targetId);
            }
            base.setTabBtns();
        },

        switchTab : function(id){
            var base = this;
            if(id != base.currentId){
                if(id != 'all'){
                    if(base.currentId == 'all'){
                        base.$tabAllBtn.removeClass(base.options.tabBtnActiveClass);
                        base.$tabBtns.eq(id).addClass(base.options.tabBtnActiveClass);
                        if(base.options.tabItemActiveClass != ''){
                            base.$tabItems.removeClass(base.options.tabItemActiveClass);
                            base.$tabItems.eq(id).addClass(base.options.tabItemActiveClass);
                        } else {
                            base.$tabItems.hide();
                            base.$tabItems.eq(id).show();
                        }
                    } else {
                        base.$tabBtns.eq(base.currentId).removeClass(base.options.tabBtnActiveClass);
                        base.$tabBtns.eq(id).addClass(base.options.tabBtnActiveClass);
                        if(base.options.tabItemActiveClass != ''){
                            base.$tabItems.eq(base.currentId).removeClass(base.options.tabItemActiveClass);
                            base.$tabItems.eq(id).addClass(base.options.tabItemActiveClass);
                        } else {
                            base.$tabItems.eq(base.currentId).hide();
                            base.$tabItems.eq(id).show();
                        }
                    }
                } else {
                    base.$tabBtns.removeClass(base.options.tabBtnActiveClass);
                    base.$tabAllBtn.addClass(base.options.tabBtnActiveClass);
                    if(base.options.tabItemActiveClass != ''){
                        base.$tabItems.addClass(base.options.tabItemActiveClass);
                    } else {
                        base.$tabItems.show();
                    }
                }
                base.currentId = id;
            }
        },

        setTabBtns : function(){
            var base = this;
            if(base.options.tabSwitchEvent == 'click'){
                base.$tabBtns.each(function(i){
                    $(this).click(function(){
                        base.switchTab(i);
                    });
                });
                if(base.options.hasTabAll){
                    base.$tabAllBtn.click(function(){
                        base.switchTab('all');
                    });
                }
            } else if(base.options.tabSwitchEvent == 'hover'){
                base.$tabBtns.each(function(i){
                    $(this).mouseover(function(){
                        base.switchTab(i);
                    });
                });
                if(base.options.hasTabAll){
                    base.$tabAllBtn.mouseover(function(){
                        base.switchTab('all');
                    });
                }
            }
        }
    };
    $.fn.tabSwitch = function(options){
        return this.each(function() {
            if($(this).data("ts-init") === true){
                return false;
            }
            $(this).data("ts-init", true);
            var obj = Object.create( TabSwitchProto );
            obj.init( options, this );
            $.data( this, "tabSwitch", obj );
        });
    }
    $.fn.tabSwitch.options = {
        hasTabAll : false, //是否有一个“全部显示”的标签按钮
        tabBtnClass : 'stab-btn',
        tabBtnAllClass : 'stab-btn-all',
        tabBtnActiveClass : 'active',
        tabItemClass : 'stab-Item',
        tabItemActiveClass : '',
        tabSwitchEvent : 'click' //'click' & 'hover'
    }
});
