/* ==================================================================================
 * menuCtrl.js
 * 左侧菜单控制
 * ================================================================================== */

var MenuCtrl = (function(){

    el_leftmenu = $('.leftmenu')
    el_leftmenu_btns = el_leftmenu.find('.mainmenu-btn');

    current_mainbtn = 0; //当前主菜单按钮id
    current_subbtn = 0; //当前子菜单按钮id

    //constructor
    function MenuCtrl() {
        if($('.layout2').length == 0){
            initLayout();
            menuClickCtrl();
        }
    }

    var initLayout = function() {
        //alert(el_leftmenu_btns.length);
        /*
        el_progress_bars.each(function(){
            $this = $(this);
            _progress = $this.attr('data-progress')
            if(_progress != undefined){
                $this.find('.progress-bar-bar').css('width',_progress+'%');
                $this.find('.progress-bar-tip').css('left',_progress+'%');
                $this.find('.progress-bar-tip-box').html(_progress+'%');
            }
        })*/

        el_leftmenu.perfectScrollbar({
            suppressScrollX:true
        });
    };

    //菜单按钮点击逻辑
    var menuClickCtrl = function(){
        el_leftmenu_btns.each(function(){
            var $this = $(this);
            //alert($this.index());
            $this.on('click',onMainBtnClick);
        });
    }

    //主菜单按钮按下响应
    var onMainBtnClick = function(e){
        var $this = $(this);
        var $thisContainer = $this.parent();
        //clearMenuSel();
        if($thisContainer.find('.submenu').length != 0){
            if($thisContainer.hasClass('opened')){
                $thisContainer.find('.submenu-btn').each(function(){
                    if($(this).hasClass('sel')){
                        //如果子菜单当前被选中，收起时选中对应的父级菜单按钮
                        $this.addClass('sel');
                    }
                })
                $thisContainer.removeClass('opened');
            } else {
                clearMenuOpened();
                $thisContainer.addClass('opened');
                if($this.hasClass('sel')){
                    $this.removeClass('sel');
                }
            }
        }
        //刷新滚动条
        el_leftmenu.perfectScrollbar('update');
    }

    //清除选中状态
    var clearMenuOpened = function(){
        el_leftmenu_btns.parent().each(function(){
            var $this = $(this);
            if($this.hasClass('opened')){
                $this.removeClass('opened');
                $this.find('.submenu-btn').each(function(){
                    if($(this).hasClass('sel')){
                        $this.find('.mainmenu-btn').addClass('sel');
                    }
                })
            }
        });
    }

    //清除展开状态
    var clearMenuSel = function(){
        el_leftmenu_btns.each(function(){
            $this = $(this);
            if($this.find('.mainmenu-btn').hasClass('sel')){
                $this.find('.mainmenu-btn').removeClass('sel');
            }
        });
    }

    return MenuCtrl;

})();

module.exports = MenuCtrl;
