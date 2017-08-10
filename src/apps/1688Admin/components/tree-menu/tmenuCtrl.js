/* ==================================================================================
 * tmenuCtrl.js
 * 树菜单控制
 * ================================================================================== */

var TMenuCtrl = (function(){

    var el_treemenu = $('.tree-menu');
    var el_tmenu_btns = $('.tmenu-btn');
    var el_tmenu_btn_container_lv_1 = el_treemenu.children('.tmenu-container');
    var el_body = $('body');

    //constructor
    function TMenuCtrl() {
        addMenuLevel(el_treemenu, 1);
        //openSelectedMenu(el_treemenu.find('.sel'));
        //this.setMenuSelWithIfrmeSrc($('.kg-iframe'))
        el_tmenu_btns.each(function(){
            $(this).on('click', onTMenuBtnClick);
        });

        el_treemenu.perfectScrollbar({
            suppressScrollX:true
        });

        //绑定切换选定按钮的事件
        el_body.bind('tmenu.changeSel', function(evt, el_tmenu_btn) {
            el_treemenu.find('.sel').removeClass('sel');
            openSelectedMenu(el_tmenu_btn);
            el_tmenu_btn.addClass('sel');
        });
    }

    //根据iframe的地址，指定菜单当前选定按钮
    /*
    TMenuCtrl.prototype.setMenuSelWithIfrmeSrc = function(el_iframe){
        if(el_iframe.length == 1) {
            var iframeUrl = el_iframe.attr('src');
            el_treemenu.find('.sel').removeClass('sel');
            $('[data-link="' + iframeUrl + '"]').addClass('sel');
        }
        openSelectedMenu(el_treemenu.find('.sel'));
    };*/

    //菜单按钮点击的展开收缩处理
    var onTMenuBtnClick = function(){
        var $this = $(this);
        var $thisContainer = $this.parent();
        if($thisContainer.children('.tmenu-container').length > 0) {
            $thisContainer.toggleClass('opened');
            if($thisContainer.find('.sel').length > 0 && !$thisContainer.hasClass('opened')) {
                $this.addClass('sel');
            } else {
                $this.removeClass('sel');
            }
            //刷新perfectScrollbar滚动条
            el_treemenu.perfectScrollbar('update');
        }
        /*else {
            el_treemenu.find('.sel').removeClass('sel');
            $this.addClass('sel');
            openSelectedMenu($this);
        }*/
    }

    //给菜单增加层级样式
    var addMenuLevel = function(el_parent, level) {
        var menuContainers = el_parent.children('.tmenu-container');
        if(menuContainers.length != 0) {
            el_parent.children('.tmenu-btn').addClass('is-folder');
            menuContainers.each(function(){
                var $this = $(this);
                $this.addClass('lv_' + level);
                if($this.children('.tmenu-container').length > 0) {
                    addMenuLevel($this, level + 1);
                }
            });
        }
    }

    //展开当前选定的菜单按钮
    var openSelectedMenu = function(el) {
        if(el.parent().hasClass('tmenu-container')) {
            if(el.parent().find('.tmenu-container').length > 0) {
                el.parent().addClass('opened');
            }
            openSelectedMenu(el.parent());
        }
        //刷新perfectScrollbar滚动条
        el_treemenu.perfectScrollbar('update');
    }

    return TMenuCtrl;

})();

module.exports = TMenuCtrl;
