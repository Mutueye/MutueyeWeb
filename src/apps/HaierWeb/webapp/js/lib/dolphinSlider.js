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

;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jQuery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(jQuery);
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    'use strict';

    var DSliderProto = {

        Initialize : function(options, el){
            var base = this;
            base.timerStep = 20;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.dolphinSlider.options, base.$elem.data(), options);
            base.userOptions = options;

            base.$elem.data("dp-originalStyles", base.$elem.attr("style"));
            base.$elem.data("dp-originalClasses", base.$elem.attr("class"));

            base.checkBrowser();
            //base.createSlider();
            base.loadContent();
        },
        
        loadContent : function() {
            var base = this;

            if (typeof base.options.beforeInit === "function") base.options.beforeInit.apply(this,[base.$elem]);
            
            if(base.options.jsonData) {
                if (typeof base.options.jsonData === "string") {
                    var url = base.options.jsonData;
                    var getData = function(data) {
                        if (typeof base.options.jsonSuccess === "function") base.options.jsonSuccess.apply(this,[data]);
                        base.buildItems(data);
                        base.createSlider();
                    }
                    $.getJSON(url,getData);
                } else {
                    base.buildItems(base.options.jsonData);
                    base.createSlider();
                }
            } else {
                console.error('dolphinSlider插件:无json数据');
            }
            
        },
        
        buildItems : function(data) {
            var base = this;
            
            base.sliderData = data;
            
            //根据jsonData组装dom
            var htmlString = "";
            for(var i in base.sliderData) {
                htmlString +=   "<div class='" + base.options.itemClass + "'>" +
                                    "<div class='" + base.options.itemImageClass + "'>" +
                                        "<img src='" + data[i].imageurl + "'>" +
                                    "</div>" +
                                "</div>";
            }
            base.$elem.append(htmlString);
        },

        createSlider : function(){
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
            }
            
            if (typeof base.options.afterInit === "function") base.options.afterInit.apply(this,[base.$elem]);
        },
        
        createNavigation : function(){
            var base = this;
            base.$navPrev = $('<div class="' + base.options.navigationPrevClass + '"></div>');
            base.$navNext = $('<div class="' + base.options.navigationNextClass + '"></div>');
            base.$elem.append(base.$navPrev);
            base.$elem.append(base.$navNext);
            base.$navPrev.click(function(){
                base.prevPage();
            });
            base.$navNext.click(function(){
                base.nextPage();
            });
        },

        createPagination : function(){
            var base = this;
            base.$pagination = $('<div class="' + base.options.paginationClass + '"></div>');
            function appendItems($parent) {
                for(var i = 0; i< base.itemsAmount; i++){
                    var pageNumber = i+1;
                    var paginationItemHtml = '<div class="' + base.options.paginationItemClass + '">';
                    if(base.options.paginationType == 'fancy') {
                        if(base.options.paginationHasTimer)
                            paginationItemHtml += '<div class="' + base.options.paginationTimerClass + '"></div>';
                        if(base.options.paginationHasDivider && i < base.itemsAmount - 1)
                            paginationItemHtml += '<div class="' + base.options.paginationDividerClass + '"></div>';
                        if(base.options.paginationHasContent) {
                            var infoHtml = '<div class="' + base.options.paginationContentClass + '">' +
                                                '<div class="' + base.options.paginationTitleClass + '">' + base.sliderData[i].title + '</div>';
                            if(base.options.paginationHasInfo) {
                                infoHtml += '<div class="' + base.options.paginationInfoClass + '">' + base.sliderData[i].info + '</div>';
                            }
                            infoHtml += '</div>';
                            paginationItemHtml += infoHtml;
                        }
                        if(base.options.paginationHasNumbers) {
                            paginationItemHtml += '<div class="' + base.options.paginationNumberClass + '">' + pageNumber + '</div>';
                        }
                    } else {
                        if(base.options.paginationHasNumbers){
                            paginationItemHtml += pageNumber;
                        }
                    }
                    paginationItemHtml += '</div>';
                    $parent.append(paginationItemHtml);
                }
            }
            if(base.options.paginationType == 'fancy') {
                base.$paginationContainer = $('<div class="' + base.options.paginationContainerClass + '"></div>');
                appendItems(base.$paginationContainer);
                base.$pagination.append(base.$paginationContainer)
                
            } else {
                appendItems(base.$pagination);
            }
            base.$elem.append(base.$pagination);
            
            base.$paginationDots = base.$pagination.find('.' + base.options.paginationItemClass);
            base.$paginationDots.eq(base.currentPage).addClass(base.options.paginationCurrentClass);
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
                if(targetPage == base.currentPage) return;
                if(targetPage < base.currentPage) direction = 'prev';
                base.changePage(targetPage,direction);
            });
        },
        
        setTimer : function() {
            var base = this;
            if(base.remainTime > 0) {
                base.remainTime -= base.timerStep;
            } else {
                base.remainTime = 0;
            }
            if(base.remainTime == 0) {
                base.nextPage();
            }
            if(base.options.paginationHasTimer) {
                var $currentPaginationItem = base.$paginationDots.eq(base.currentPage).find('.' + base.options.paginationTimerClass).eq(0);
                var pct = (base.options.duration - base.remainTime)/base.options.duration*100;
                if(pct > 98) {
                    pct = 100;
                }
                $currentPaginationItem.css('width', pct + '%');
            }
        },

        autoRun : function() {
            var base = this;
            var base = this;
            base.remainTime = base.options.duration;
            window.clearInterval(base.timerInterval);
            base.timerInterval = window.setInterval(function(){
                base.setTimer();
            }, base.timerStep);
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
                base.$userItems.eq(targetPage).addClass(base.options.currentClass);
                base.$userItems.eq(base.currentPage).removeClass(base.options.currentClass);
                if(base.options.pagination){
                    base.$paginationDots.eq(targetPage).addClass(base.options.paginationCurrentClass);
                    base.$paginationDots.eq(base.currentPage).removeClass(base.options.paginationCurrentClass);
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
                    base.$userItems.addClass(base.options.waitInClass);
                    base.$userItems.eq(targetPage).removeClass(base.options.waitInClass);
                    base.$userItems.eq(base.currentPage).removeClass(base.options.waitInClass);
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
                base.$userItems.eq(base.currentPage).addClass(base.options.currentClass);
                if(base.options.slideType === 'basic'){
                    base.$userItems.eq(base.currentPage).css(base.cssOpacity(1));
                } else if (base.options.slideType === 'carousel'){
                    base.$userItems.eq(base.currentPage).css(base.cssTransform3d('0%',0,0));
                }
                if(base.options.pagination){
                    base.$paginationDots.eq(base.currentPage).addClass(base.options.paginationCurrentClass);
                }
            }
            if(base.options.autoRun) {
                base.autoRun();
            }
            if(base.options.paginationType == 'fancy' && base.options.paginationHasDivider && base.options.paginationHidePrevDivider) {
                base.$elem.find('.' + base.options.paginationDividerClass).removeClass('hidden');
                if(base.currentPage != 0) {
                    base.$paginationDots.eq(base.currentPage - 1).find('.' + base.options.paginationDividerClass).addClass('hidden');
                }
            }
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
                ds.Initialize( options, this );
                $.data( this, "dolphinSlider", ds );
            }
        });
    }

    $.fn.dolphinSlider.options = {
        itemClass : 'item',                 //单个幻灯的class
        itemImageClass : 'item-bg',         //幻灯图片容器的class
        currentClass : 'current',             //指定当前页面的class
        duration : 4000,                    //切换页面时间间隔
        animDuration : 300,                 //'basic'模式切换动画的持续时间
        autoRun : true,                     //是否自动播放

        pagination : true,                  //是否显示页码
        paginationType : 'basic',           //页码类型'basic','fancy'
        paginationClass : 'slider-pagination',     //页码class
        paginationContainerClass : 'slider-pagination-container', //'fancy'类型的多嵌套一层div
        paginationItemClass : 'slider-pagination-item', //页码单个class
        paginationCurrentClass : 'current',   //指定当前页码的class
        paginationHasContent : false,
        paginationContentClass : 'slider-pagination-content',
        paginationTitleClass : 'slider-pagination-title',
        paginationHasInfo : false,
        paginationInfoClass : 'slider-pagination-info',
        paginationHasTimer : false,         //'fancy'类型可选择带timer进度条
        paginationTimerClass : 'slider-pagination-timer', //'fancy'类型的带timer进度条的class
        paginationHasDivider : false,       //'fancy'类型的是否带分割线
        paginationHidePrevDivider : false,  //隐藏当前页码的前一个页码的分割线
        paginationDividerClass : 'slider-pagination-divider', //'fancy'类型分割线的class
        paginationHasNumbers : false,          //是否显示页码数字
        paginationNumberClass : 'slider-pagination-number',
        paginationHCenter : false,          //是否强制页码水平居中

        navigation : true,                  //是否显示翻页按钮
        navigationPrevClass : 'navi-prev',  //上一页按钮class
        navigationNextClass : 'navi-next',  //下一页按钮class

        slideType : 'basic',                //'basic','carousel','customcss'
        nextInClass : 'next-in',            //customcss 向后翻页时下一页进入的class
        nextOutClass : 'next-out',          //customcss  向后翻页时当前页离开的class
        prevInClass : 'prev-in',            //customcss 向前翻页时前一页进入的class
        prevOutClass : 'prev-out',          //customcss 向前翻页时当前页离开的class
        waitInClass : 'wait-in',            //customcss 当前没有动作，等待进入的class
        
        jsonData : false,
        jsonSuccess : false,
        
        beforeInit : false,
        afterInit : false
    }
});
