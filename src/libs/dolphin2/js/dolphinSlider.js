/*!
 * jquery.dolphinSlider
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

;(function (factory) {
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

})(function($) {
    'use strict';

    var DSliderProto = {

        init : function(options, el){
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.dolphinSlider.options, base.$elem.data(), options);
            base.userOptions = options;

            base.$elem.data("dp-originalStyles", base.$elem.attr("style"));
            base.$elem.data("dp-originalClasses", base.$elem.attr("class"));

            base.checkBrowser();
            base.setVars();
        },

        setVars : function(){
            var base = this;

            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.currentPage = 0;

            if(base.itemsAmount >= 2){
                if(base.options.navigation){
                    base.createNavigation();
                }
                if(base.options.pagination){
                    base.createPagination();
                }

                if(base.options.slideType === 'basic'){
                    base.$userItems.css(base.cssOpacity(0));
                    if(base.browser.support3d === true){
                        base.$userItems.css(base.cssTransition(base.options.animDuration));
                    }
                } else if(base.options.slideType === 'carousel') {
                    base.$userItems.css(base.cssTransform3d('100%',0,0));
                }
                base.changePage(base.currentPage,'next');
                base.autoRun();
            } else {
                base.changePage(0,'next');
            }
        },

        autoRun : function(){
            var base = this;
            window.clearInterval(base.slideInterval);
            base.slideInterval = window.setInterval(function(){
                base.nextPage();
            },base.options.duration);
        },

        nextPage : function(){
            var base = this;
            var targetPage = base.currentPage + 1;
            if(base.currentPage === (base.itemsAmount-1)){
                targetPage = 0;
            }
            base.changePage(targetPage,'next');
        },

        prevPage : function(){
            var base = this;
            var targetPage = base.currentPage - 1;
            if(base.currentPage === 0){
                targetPage = base.itemsAmount - 1;
            }
            base.changePage(targetPage,'prev');
        },

        changePage : function(targetPage,direction){
            var base = this;
            if(targetPage != base.currentPage){
                base.$userItems.eq(targetPage).addClass(base.options.activeClass);
                base.$userItems.eq(base.currentPage).removeClass(base.options.activeClass);
                if(base.options.pagination){
                    base.$paginationDots.eq(targetPage).addClass(base.options.paginationActiveClass);
                    base.$paginationDots.eq(base.currentPage).removeClass(base.options.paginationActiveClass);
                }
                if(base.options.slideType === 'basic'){
                    if(base.browser.support3d === true){
                        base.$userItems.eq(targetPage).css(base.cssOpacity(1));
                        base.$userItems.eq(base.currentPage).css(base.cssOpacity(0));
                    } else {
                        base.$userItems.eq(targetPage).stop().animate(
                            base.cssOpacity(1),
                            {
                                duration : base.options.animDuration
                            }
                        );
                        base.$userItems.eq(base.currentPage).stop().animate(
                            base.cssOpacity(0),
                            {
                                duration : base.options.animDuration
                            }
                        );
                    }
                    base.currentPage = targetPage;
                } else if (base.options.slideType === 'carousel') {
                    if(base.browser.support3d === true){
                        if(direction === 'prev'){
                            base.$userItems.eq(targetPage).css(base.cssTransition(0));
                            base.$userItems.eq(targetPage).css(base.cssTransform3d('-100%',0,0));
                            window.setTimeout(function(){
                                base.$userItems.eq(targetPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(base.currentPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(targetPage).css(base.cssTransform3d('0%',0,0));
                                base.$userItems.eq(base.currentPage).css(base.cssTransform3d('100%',0,0));
                                base.currentPage = targetPage;
                            },1);
                        } else {
                            base.$userItems.eq(targetPage).css(base.cssTransition(0));
                            base.$userItems.eq(targetPage).css(base.cssTransform3d('100%',0,0));
                            window.setTimeout(function(){
                                base.$userItems.eq(targetPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(base.currentPage).css(base.cssTransition(base.options.animDuration));
                                base.$userItems.eq(targetPage).css(base.cssTransform3d('0%',0,0));
                                base.$userItems.eq(base.currentPage).css(base.cssTransform3d('-100%',0,0));
                                base.currentPage = targetPage;
                            },1);
                        }
                    } else {

                    }
                } else if (base.options.slideType === 'customcss') {
                    base.$userItems.removeClass(base.options.nextInClass);
                    base.$userItems.removeClass(base.options.nextOutClass);
                    base.$userItems.removeClass(base.options.prevInClass);
                    base.$userItems.removeClass(base.options.prevOutClass);
                    if(direction === 'prev'){
                        base.$userItems.eq(targetPage).addClass(base.options.prevInClass);
                        base.$userItems.eq(base.currentPage).addClass(base.options.prevOutClass);
                    } else {
                        base.$userItems.eq(targetPage).addClass(base.options.nextInClass);
                        base.$userItems.eq(base.currentPage).addClass(base.options.nextOutClass);
                    }
                    base.currentPage = targetPage;
                }
            } else {
                base.$userItems.eq(base.currentPage).addClass(base.options.activeClass);
                if(base.options.slideType === 'basic'){
                    base.$userItems.eq(base.currentPage).css(base.cssOpacity(1));
                } else if (base.options.slideType === 'carousel'){
                    base.$userItems.eq(base.currentPage).css(base.cssTransform3d('0%',0,0));
                }
                if(base.options.pagination){
                    base.$paginationDots.eq(base.currentPage).addClass(base.options.paginationActiveClass);
                }
            }
        },

        createNavigation : function(){
            var base = this;
            base.$navPrev = $('<div class="' + base.options.navigationPrevClass + '"></div>');
            base.$navNext = $('<div class="' + base.options.navigationNextClass + '"></div>');
            base.$elem.append(base.$navPrev);
            base.$elem.append(base.$navNext);
            base.$navPrev.click(function(){
                base.prevPage();
                if(base.options.autoRun){
                    base.autoRun();
                }
            });
            base.$navNext.click(function(){
                base.nextPage();
                if(base.options.autoRun){
                    base.autoRun();
                }
            });
        },

        createPagination : function(){
            var base = this;
            base.$pagination = $('<ul class="' + base.options.paginationClass + '"></ul>');
            for(var i = 0; i< base.itemsAmount; i++){
                if(base.options.paginationNumbers){
                    var pageNumber = i+1;
                    base.$pagination.append("<li>" + pageNumber + "</li>");
                } else {
                    base.$pagination.append("<li></li>");
                }
            }
            base.$elem.append(base.$pagination);
            base.$paginationDots = base.$pagination.find('li');
            base.$paginationDots.eq(base.currentPage).addClass(base.options.paginationActiveClass);
            if(base.options.paginationHCenter){
                var paginationWidth = base.$pagination.width();
                base.$pagination.css({
                    'position' : 'absolute',
                    'left' : '50%',
                    'margin-left' : -0.5*paginationWidth + 'px'
                });
            }
            base.$paginationDots.click(function(){
                var direction = 'next';
                var targetPage = $(this).index();
                if(targetPage < base.currentPage){
                    direction = 'prev'
                }
                base.changePage(targetPage,direction);
                base.autoRun();
            });
        },

        //tool functions
        //------------------------------------------------------------------------------------------------------

        checkBrowser : function(){
            var base = this;

            //Check css 3d support
            var    translate3D = "translate3d(0px, 0px, 0px)";
            var tempElem = document.createElement("div");

            tempElem.style.cssText= "  -moz-transform:"    + translate3D +
                                    "; -ms-transform:"     + translate3D +
                                    "; -o-transform:"      + translate3D +
                                    "; -webkit-transform:" + translate3D +
                                    "; transform:"         + translate3D;
            var    regex = /translate3d\(0px, 0px, 0px\)/g;
            var asSupport = tempElem.style.cssText.match(regex);
            var support3d = (asSupport !== null && asSupport.length === 1);

            //Check touch support
            var isTouch = "ontouchstart" in window || navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            }
        },

        cssOpacity : function(opacity){
            return {
                'opacity' : opacity,
                'filter':'Alpha(Opacity='+opacity*100+')'
            };
        },

        cssTransition : function(speed){
            return {
                "-webkit-transition": "all "+ speed +"ms ease",
                "-moz-transition": "all "+ speed +"ms ease",
                "-o-transition": "all "+ speed +"ms ease",
                "transition": "all "+ speed +"ms ease"
            };
        },

        cssTransform3d : function(x,y,z){
            return {
                "-webkit-transform": "translate3d("+x+", "+y+", "+z+")",
                "-moz-transform": "translate3d("+x+", "+y+", "+z+")",
                "-o-transform": "translate3d("+x+", "+y+", "+z+")",
                "-ms-transform": "translate3d("+x+", "+y+", "+z+")",
                "transform": "translate3d("+x+", "+y+", "+z+")"
            };
        }
    };

    $.fn.dolphinSlider = function(options){
        return this.each(function() {
            if($(this).data("ds-init") != true){
                $(this).data("ds-init", true);
                var ds = Object.create( DSliderProto );
                ds.init( options, this );
                $.data( this, "dolphinSlider", ds );
            }
        });
    }

    $.fn.dolphinSlider.options = {
        activeClass : 'active',             //指定当前页面的class
        duration : 4000,                    //切换页面时间间隔
        animDuration : 300,           //'basic'模式切换动画的持续时间
        autoRun : true,                     //是否自动播放

        pagination : true,                  //是否显示页码
        paginationClass : 'slider-pagination',     //页码class
        paginationActiveClass : 'active',   //指定当前页码的class
        paginationNumbers : false,          //是否显示页码数字
        paginationHCenter : true,           //是否强制页码水平居中

        navigation : true,                  //是否显示翻页按钮
        navigationPrevClass : 'navi-prev',  //上一页按钮class
        navigationNextClass : 'navi-next',  //下一页按钮class

        slideType : 'basic',                //'basic','carousel','customcss'
        nextInClass : 'next-in',            //customcss 向后翻页时下一页进入的class
        nextOutClass : 'next-out',          //customcss  向后翻页时当前页离开的class
        prevInClass : 'prev-in',            //customcss 向前翻页时前一页进入的class
        prevOutClass : 'prev-out'           //customcss 向前翻页时当前页离开的class
    }
});
