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

})(function($) {
    
    var TreeMenu = {
        Initialize :function(options, el) {
            var base = this;

            base.$elem = $(el);

            base.options = $.extend({}, $.fn.treeMenu.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },
        
        loadContent : function() {
            var base = this;

            if (typeof base.options.beforeInit === "function") base.options.beforeInit.apply(this,[base.$elem]);
            
            if (typeof base.options.jsonPath === "string") {
                var url = base.options.jsonPath;
                function getData(data) {
                    if (typeof base.options.jsonSuccess === "function") base.options.jsonSuccess.apply(this,[data]);
                    base.loadData(data);
                    base.Init();
                }
                $.getJSON(url,getData);
            } else {
                if(base.options.jsonData) {
                    base.loadData(base.options.jsonData);
                }
                base.Init();
            }
        },
        
        Init : function(action) {
            var base = this;
            base.$elem.data("tm-originalStyles", base.$elem.attr("style"))
                      .data("tm-originalClasses", base.$elem.attr("class"));

            base.btnInit();
            base.btnActions();
            base.bindEvents();
            
            if (typeof base.options.afterInit === "function") base.options.afterInit.apply(this,[base.$elem]);
        },
        
        loadData : function(jsonData) {
            var base = this;
            
            //根据jsonData组装dom
            function wrapDom(data, level) {
                var htmlString = "";
                for(i in data) {
                    var isFolderCls = data[i].submenu ? base.options.isFolderClass : "";
                    var isSelectedClass = data[i].selected ? base.options.selectedClass : "";
                    htmlString +=   "<div class='" + base.options.tmContainerClass + " " + base.options.levelClass + level + "'>" +
                                        "<div class='" + base.options.tmBtnClass + " " + isFolderCls + " " + isSelectedClass + "' " + data[i].btn_props + ">" +
                                            "<i class='" + data[i].icon_class + "'></i>&nbsp;" +
                                            data[i].title +
                                            data[i].btn_addon + 
                                        "</div>";
                    if(data[i].submenu && data[i].submenu.length > 0) {
                        htmlString += wrapDom(data[i].submenu, level + 1);
                    }
                    htmlString += "</div>";
                }
                return htmlString;
            }
            base.$elem.append(wrapDom(jsonData, 1));
        },
        
        btnInit : function() {
            var base = this;
            
            var em_sel = base.$elem.find('.' + base.options.selectedClass);
            if(em_sel.length == 0) {
                base.$elem.find('.' + base.options.tmBtnClass).each(function(){
                    var $this = $(this);
                    var $thisContainer = $this.parent();
                    if($thisContainer.children('.' + base.options.tmContainerClass).length == 0) {
                        $this.addClass('sel');
                        base.openSelected($this);
                        return false;
                    }
                });
            } else {
                base.openSelected(em_sel);
            }
        },
        
        btnActions : function() {
            var base = this;
            //按钮点击控制
            base.$elem.find('.' + base.options.tmBtnClass).each(function(){
                $(this).on('click tap',function(){
                    var $this = $(this);
                    var $thisContainer = $this.parent();
                    if($thisContainer.children('.' + base.options.tmContainerClass).length > 0) {
                        $thisContainer.toggleClass(base.options.openedClass);
                        if($thisContainer.find('.' + base.options.selectedClass).length > 0 && !$thisContainer.hasClass(base.options.openedClass)) {
                            $this.addClass(base.options.selectedClass);
                        } else {
                            $this.removeClass(base.options.selectedClass);
                        }
                        if (typeof base.options.onFolderBtnClick === "function") base.options.onFolderBtnClick.apply(this,[base.$elem]);
                    } else if(!base.options.onlyFolderAction) {
                        
                        base.$elem.find('.' + base.options.selectedClass).removeClass(base.options.selectedClass);
                        $this.addClass(base.options.selectedClass);
                        if(base.options.foldUnselected) {
                            base.$elem.find('.' + base.options.openedClass).removeClass(base.options.openedClass);
                            base.openSelected($this);
                        }
                        if (typeof base.options.onLinkBtnClick === "function") base.options.onLinkBtnClick.apply(this,[base.$elem]);
                    }
                });
            });
        },
        
        bindEvents : function(){
            var base = this;
            //绑定切换选定按钮的事件
            $('body').bind('tmenu.changeSel', function(evt, el_tmenu_btn) {
                base.$elem.find('.' + base.options.selectedClass).removeClass(base.options.selectedClass);
                el_tmenu_btn.addClass(base.options.selectedClass);
                if(base.options.foldUnselected) {
                    base.$elem.find('.' + base.options.openedClass).removeClass(base.options.openedClass);
                }
                base.openSelected(el_tmenu_btn);
                if (typeof base.options.onLinkBtnClick === "function") base.options.onLinkBtnClick.apply(this,[base.$elem]);
            });
        },
        
        openSelected : function(el) {
            var base = this;
            if(el.parent().hasClass(base.options.tmContainerClass)) {
                if(el.parent().find('.' + base.options.tmContainerClass).length > 0) {
                    el.parent().addClass(base.options.openedClass);
                }
                base.openSelected(el.parent());
            }
        }
    }
    
    $.fn.treeMenu = function( options ) {
        return this.each(function() {
            if($(this).data("tm-init") === true) return false;
            $(this).data("tm-init", true);
            var tMenu = Object.create( TreeMenu );
            tMenu.Initialize( options, this );
            $.data( this, "treeMenu", tMenu );
        });
    };
    
    $.fn.treeMenu.options = {
        tmContainerClass : "tmenu-container",
        tmBtnClass : "tmenu-btn",
        levelClass : "lv_",
        isFolderClass : "is-folder",
        selectedClass : "sel",
        openedClass : "opened",
        
        foldUnselected : false, //点击某一项菜单时，折叠未被选择的层级
        onlyFolderAction : false, //ture的话，只有展开/收缩菜单的按钮功能，没有点击按钮切换选中的功能，该功能通过tmenu.changeSel有外部代码触发来改变菜单切换选中按钮。
        
        jsonPath : false,
        jsonSuccess : false,
        jsonData : false,
        
        beforeInit : false,
        afterInit : false,
        onFolderBtnClick : false,
        onLinkBtnClick : false,
    };
});