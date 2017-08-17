(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* ==================================================================================
 * Victall: carouselPrep.js
 * 轮播控制
 * ================================================================================== */

var CarouselPrep = function () {

    el_page_container = $('.vps-page-container'); //页面容器
    block_height_1 = 130; //“物料情况”和“生产进度”单个元素所占高度
    block_height_2 = 237; //“拉动看板”单个元素高度
    block_height_3 = 150; //"总体进度"个元素所占高度
    min_block_num_1 = 3; //“物料情况”和“生产进度”每个轮播页最少3个
    min_block_num_2 = 2; //“拉动看板”每个轮播页最少2个

    //constructor
    function CarouselPrep() {
        initLayout();
    }

    var initLayout = function () {
        wrapItems('.progress', block_height_1, min_block_num_1);
        wrapItems('.material', block_height_1, min_block_num_1);
        wrapItems('.overall', block_height_3, min_block_num_1);
        wrapItems('.pullboard', block_height_2, min_block_num_2);

        if ($('.progress')) {
            $('.progress').owlCarousel({
                navigation: true,
                navigationText: false,
                autoplay: false,
                singleItem: true,
                afterAction: afterProgressAction });
        }

        if ($('.material')) {
            $('.material').owlCarousel({
                navigation: true,
                navigationText: false,
                autoplay: false,
                singleItem: true,
                afterAction: afterMaterialAction });
        }

        if ($('.overall')) {
            $('.overall').owlCarousel({
                navigation: true,
                navigationText: false,
                autoplay: false,
                singleItem: true
            });
        }

        if ($('.pullboard')) {
            $('.pullboard').owlCarousel({
                navigation: true,
                navigationText: false,
                autoplay: false,
                singleItem: true
            });
        }

        if ($('.pullboard-carousel')) {
            $('.pullboard-carousel').owlCarousel({
                navigation: true,
                navigationText: false,
                autoplay: false,
                items: 3,
                itemsCustom: [[0, 1], [700, 2], [1128, 3]]
            });
        }

        //处理上工序/下工序弹窗被滚屏按钮覆盖
        $('.vps-arrow-btn-container').on('show.dp.popbox', function () {
            //$('.owl-controls').css('z-index',0);
            //$('.owl-wrapper-outer').css('z-index',1);
            $('.owl-buttons').css('opacity', 0.2);
        });
        $('.vps-arrow-btn-container').on('hidden.dp.popbox', function () {
            //$('.owl-controls').css('z-index',1);
            //$('.owl-wrapper-outer').css('z-index',0);
            $('.owl-buttons').css('opacity', 1);
        });
    };

    //20160713新增翻页同步回调
    var afterProgressAction = function (e) {
        var progressData = $('.progress').data('owlCarousel');
        var materialData = $('.material').data('owlCarousel');
        if (progressData && materialData) {
            var progressPage = progressData.getCurrent();
            var materialPage = materialData.getCurrent();
            if (progressPage != materialPage) {
                materialData.jumpTo(progressPage);
            }
        }
    };
    //20160713新增翻页同步回调
    var afterMaterialAction = function (e) {
        var progressData = $('.progress').data('owlCarousel');
        var materialData = $('.material').data('owlCarousel');
        if (progressData && materialData) {
            var progressPage = progressData.getCurrent();
            var materialPage = materialData.getCurrent();
            if (progressPage != materialPage) {
                progressData.jumpTo(materialPage);
            }
        }
    };

    var wrapItems = function (target, block_height, min_block_num) {
        if ($(target).length != 0) {
            var container_height = el_page_container.height() - 54 - 20;
            var blocks = $(target).find('.vps-box-item');
            var num_blocks = blocks.length;
            var num_per_item = Math.floor(container_height / block_height); //每个轮播item应包含的vps-box-item的数量
            if (num_per_item < min_block_num) num_per_item = min_block_num;
            var num_items = Math.ceil(num_blocks / num_per_item);
            for (var i = 0; i < num_items; i++) {
                var selectorString = "";
                for (var j = 0; j < num_per_item; j++) {
                    var current_block_num = i * num_per_item + j;
                    if (current_block_num <= num_blocks - 1) {
                        if (selectorString == "") {
                            selectorString = target + " .vps-box-item:eq(" + current_block_num + ")";
                        } else {
                            selectorString += "," + target + " .vps-box-item:eq(" + current_block_num + ")";
                        }
                    }
                }
                $(selectorString).wrapAll("<div class='item'></div>");
            }
        }
    };

    //resize时调用
    CarouselPrep.prototype.handleResize = function () {
        //刷新当前页
        //location.reload();
    };

    return CarouselPrep;
}();

module.exports = CarouselPrep;

},{}],2:[function(require,module,exports){
/* ==================================================================================
 * Victall: VpsProgress.js
 * VPS进度条控制
 * ================================================================================== */

var VpsProgress = function () {

    el_progress_bars = $('.progress-bar'); //进度条们

    //constructor
    function VpsProgress() {
        if (el_progress_bars.length > 0) {
            initLayout();
        }
    }

    var initLayout = function () {
        el_progress_bars.each(function () {
            $this = $(this);
            _progress = $this.attr('data-progress');
            if (_progress != undefined) {
                $this.find('.progress-bar-bar').css('width', _progress + '%');
                $this.find('.progress-bar-tip').css('left', _progress + '%');
                $this.find('.progress-bar-tip-box').html(_progress + '%');
            }
        });
    };

    //在进度条对应的ajax数据加载完成后调用此方法，更新进度条数据
    VpsProgress.prototype.resetProgress = function () {
        initLayout();
    };

    return VpsProgress;
}();

module.exports = VpsProgress;

},{}],3:[function(require,module,exports){
/* ==================================================================================
 * Victall: vpsToggle.js
 * 切换vps各板块页面，目前有‘物料情况’、‘生产进度’、‘拉动看板’三个板块
 * ================================================================================== */

var VpsToggle = function () {

    var el_toggle = $('.vps-toggle'); //换页按钮组容器
    var el_toggles_btns = $('.vps-toggle-btn'); //换页按钮们
    var el_toggle_sel = $('.vps-toggle-sel'); //换页按钮游标
    var el_page_container = $('.vps-page-container'); //内页容器
    var el_pages = el_page_container.find('.vps-page'); //内页们
    var el_pullobard = $('.pullboard'); //拉动看板
    var el_vps_sub_content = $('.vps-sub-content');
    var el_vps_sub_container = $('.vps-sub-container');
    var pageNum = el_pages.length; //分页数量
    var currentPage = 1; //当前页,从1计起，初始显示为第二页

    //constructor
    function VpsToggle() {
        if (el_toggle.length > 0) {
            initLayout();
        }
    }

    var initLayout = function () {
        var toggleWidth = el_toggle.width();
        el_toggle.css('marginLeft', -0.5 * toggleWidth + 'px');
        el_toggles_btns.on('click', onToggleBtnClick);

        setVpsPage(currentPage);

        el_vps_sub_container.perfectScrollbar({
            suppressScrollX: true
        });

        $(".overall-container").perfectScrollbar({
            suppressScrollY: true,
            useBothWheelAxes: true
        });

        el_vps_sub_container.on('touchstart', function () {
            el_vps_sub_container.perfectScrollbar('update');
        });
    };

    var setVpsPage = function (targetPage) {
        var fullWidth = $('.main-content').width(); //页面宽度
        var pageContainerPos = fullWidth * (1 - targetPage);
        el_page_container.css('width', fullWidth * pageNum + 'px');
        el_pages.css('width', fullWidth + 'px');
        el_toggle_sel.css('left', el_toggles_btns.eq(targetPage - 1).position().left);
        el_toggle_sel.css('width', el_toggles_btns.eq(targetPage - 1).css('width'));
        el_toggles_btns.removeClass('sel');
        el_toggles_btns.eq(targetPage - 1).addClass('sel');
        //el_page_container.css('transform','translateX('+pageContainerPos+'px)');
        el_page_container.css('left', pageContainerPos + 'px');
        currentPage = targetPage;
    };

    var onToggleBtnClick = function (e) {
        $this = $(this);
        if ($this.hasClass('sel')) return;

        setVpsPage($(this).index() + 1);
    };

    VpsToggle.prototype.handleResize = function () {
        setVpsPage(currentPage);
    };

    return VpsToggle;
}();

module.exports = VpsToggle;

},{}],4:[function(require,module,exports){
/* ==================================================================================
 * Victall: app.js
 * 主程序入口
 * ================================================================================== */

var VpsToggle = require('../../components/vps-toggle/vpsToggle');
var VpsProgress = require('../../components/vps-content/vpsProgress');
var CarouselPrep = require('../../components/vps-content/carouselPrep');
var Popbox = require('../../../../libs/dolphin/js/popbox');
var AbsCenter = require('../../../../libs/dolphin/js/absCenter');

var Webapp = function () {

    FastClick.attach(document.body);

    function Webapp() {
        popbox = new Popbox($);
        vspProgress = new VpsProgress();
        vpsToggle = new VpsToggle();
        absCenter = new AbsCenter($); //先设置进度条，再设置居中
        carouselPrep = new CarouselPrep();

        $('#material-detail').on('show.dp.popbox', function () {
            //弹窗后延时初始化表格，以保证固定表头高度计算正确
            setTimeout(function () {
                $('#table_1').bootstrapTable({
                    showHeader: true,
                    pagination: true,
                    height: 320
                });
            }, 100);
        });

        $('#material-detail-sub').on('show.dp.popbox', function () {
            //弹窗后延时初始化表格，以保证固定表头高度计算正确
            setTimeout(function () {
                $('#table_2').bootstrapTable({
                    showHeader: true,
                    pagination: true,
                    height: 320
                });
            }, 100);
        });

        $('#material-detail2').on('show.dp.popbox', function () {
            //弹窗后延时初始化表格，以保证固定表头高度计算正确
            setTimeout(function () {
                $('#table_material_detail2').bootstrapTable({
                    showHeader: true,
                    pagination: true,
                    height: 320
                });
            }, 100);
        });

        $('#material-detail3').on('show.dp.popbox', function () {
            //弹窗后延时初始化表格，以保证固定表头高度计算正确
            setTimeout(function () {
                $('#table_material_detail3').bootstrapTable({
                    showHeader: true,
                    pagination: true,
                    height: 320
                });
            }, 100);
        });

        $(window).resize(function () {
            vpsToggle.handleResize();
            carouselPrep.handleResize();
        });

        /*
        window.onload = function(){
            alert('loaded!');
        };*/
    }

    return Webapp;
}();

$(document).ready(function () {
    var app = new Webapp();
});

},{"../../../../libs/dolphin/js/absCenter":5,"../../../../libs/dolphin/js/popbox":6,"../../components/vps-content/carouselPrep":1,"../../components/vps-content/vpsProgress":2,"../../components/vps-toggle/vpsToggle":3}],5:[function(require,module,exports){
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
})(function ($) {
    'use strict';

    var hcenter = '[data-align="h-center"]'; //水平居中
    var hright = '[data-align="h-right"]'; //水平右对齐
    var vcenter = '[data-align="v-center"]'; //垂直居中

    var AbsCenter = function () {
        setAbsCenter();
    };

    function setAbsCenter() {
        $(hcenter).each(function () {
            var $this = $(this);
            $this.css({
                'marginLeft': -0.5 * $this.outerWidth() + 'px',
                'left': '50%'
            });
        });

        $(vcenter).each(function () {
            var $this = $(this);
            $this.css({
                'marginTop': -0.5 * $this.outerHeight() + 'px',
                'top': '50%'
            });
        });

        $(hright).each(function () {
            var $this = $(this);
            $this.css({
                'right': '0'
            });
        });
    }

    return AbsCenter();
});

},{}],6:[function(require,module,exports){
/* ========================================================================
 * Dolphin: popbox.js v0.0.1
 * 用于点击某元素弹出相应的提示框、模态窗口以及菜单等内容区域
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
})(function ($) {
    'use strict';

    var toggle = '[data-toggle="popbox"]';
    var backdrop = '.popbox-backdrop';
    var Popbox = function () {};

    function getParent($this) {
        var selector = $this.attr('data-target');

        if (!selector) {
            selector = $this.attr('href');
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
        }

        var $parent = selector && $(selector);

        return $parent && $parent.length ? $parent : $this.parent();
    }

    function clearPopboxes(e) {
        if (e && e.which === 3) return;
        $(backdrop).remove();
        $(toggle).each(function () {
            var $this = $(this);
            var $parent = getParent($this);
            var relatedTarget = { relatedTarget: this };

            if (!$parent.hasClass('open')) return;

            if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return;

            $parent.trigger(e = $.Event('hide.dp.popbox', relatedTarget));

            if (e.isDefaultPrevented()) return;

            $parent.removeClass('open').trigger($.Event('hidden.dp.popbox', relatedTarget));
        });
    }

    Popbox.prototype.dismiss = function (e) {
        var $this = $(this);
        var $parent = getParent($this);
        if ($parent.hasClass('open')) {
            $parent.removeClass('open');
        }
    };

    Popbox.prototype.toggle = function (e) {
        var $this = $(this);

        if ($this.is('.disabled, :disabled')) return;

        var $parent = getParent($this);
        var isActive = $parent.hasClass('open');

        //alert($this.hasClass('no-clear'));
        //alert($(e.target).hasClass('no-clear'));
        if (!$this.hasClass('no-clear')) {
            clearPopboxes();
        }

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $(document.createElement('div')).addClass('popbox-backdrop').insertAfter($(this)).on('click', clearPopboxes);
            }
            var relatedTarget = { relatedTarget: this };
            $parent.trigger(e = $.Event('show.dp.popbox', relatedTarget));

            if (e.isDefaultPrevented()) return;

            $this.trigger('focus');

            $parent.toggleClass('open').trigger($.Event('shown.dp.popbox', relatedTarget));
        }

        return false;
    };

    $(document).on('click.dp.popbox.data-api', clearPopboxes).on('click.dp.popbox.data-api', '.popbox form', function (e) {
        e.stopPropagation();
    }).on('click.dp.popbox.data-api', '.popbox-content form', function (e) {
        e.stopPropagation();
    }).on('click.dp.popbox.data-api', '.popbox-model', function (e) {
        e.stopPropagation();
    }).on('click.dp.popbox.data-api', '.dropdown-menu li', function (e) {
        e.stopPropagation();
    }).on('click.dp.popbox.data-api', '.pagination', function (e) {
        e.stopPropagation();
    }).on('click.dp.popbox.data-api', '.popbox-dismiss', Popbox.prototype.dismiss).on('click.dp.popbox.data-api', toggle, Popbox.prototype.toggle);
});

},{}]},{},[4]);
