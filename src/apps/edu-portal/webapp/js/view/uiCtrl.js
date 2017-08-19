/* ==================================================================================
 * edu-portal: uiCtrl.js
 * 控制页面内容切换，页面大小自适应等
 * ================================================================================== */

 var SetupToggle = require('./setupToggle');
 var ThemeCtrl = require('./themeCtrl');
 var AppListCtrl = require('./appListCtrl');
 var LayoutCtrl = require('./layoutCtrl');
 var EditLayoutCtrl = require('./editLayoutCtrl');
 var TimeCtrl = require('./timeCtrl');

var UiCtrl = (function(){

    winHeight = 0;
    winWidth = 0;
    containers = ['#container_home','#container_apps','#container_setup', '#container_addlayout'];
    btns = ['#btn_home', '#btn_apps', '#btn_setup'];
    currentContainerId = 0;

    domLoaded = false;

    el_body = $('body');

    el_topbar = $('.topbar');
    el_applist = $('#applist');
    el_btn_home = $('#btn_home');
    el_btn_setup = $('#btn_setup , #btn_return_setup');
    el_btn_apps = $('#btn_apps');

    el_loading_mask = $('.loading-mask');
    el_top_tip = $('.top-tip');
    tipTimer = null;

    el_btn_rightmenu_show = $('#btn_rightmenu_show');
    el_btn_rightmenu_hide = $('#btn_rightmenu_hide');

    el_username = $('#username');
    el_topavatar = $('#btn_rightmenu_show');
    el_rightmenu_avatar = $('#rightmenu_avatar');

    setupToggle = new SetupToggle();
    themeCtrl = new ThemeCtrl();
    appListCtrl = new AppListCtrl();
    layoutCtrl = new LayoutCtrl();
    editLayoutCtrl = new EditLayoutCtrl();
    timeCtrl = new TimeCtrl();


    //constructor
    function UiCtrl() {
        initLayout();
        this.setContainer(0);
    }

    var initLayout = function() {
        var base = this;
        setResponsive();
        el_applist.perfectScrollbar({suppressScrollX:true});
        $('.rm-menu').perfectScrollbar({suppressScrollX:true});
    };

    //事件处理
    UiCtrl.prototype.bindeEvents = function() {
        var base = this;
        //首页按钮
        el_btn_home.click(function() {
            base.setContainer(0);
        });
        //应用列表按钮
        el_btn_apps.click(function() {
            base.setContainer(1);
            el_applist.perfectScrollbar('update');
        });
        //设置按钮
        el_btn_setup.click(function() {
            base.setContainer(2);
        });
        $('#theme_setup').click(function() {
            base.setContainer(2);
            el_body.removeClass('popover-show');
            el_body.removeClass('popover-hide');
            el_body.addClass('rightmenu-hide');
            el_body.removeClass('rightmenu-show');
        });
        //新建布局按钮
        //$('#btn_addlayout').click(function(){
        //    setContainer(3);
        //});

        el_btn_rightmenu_show.click(function() {
            el_body.removeClass('popover-show');
            el_body.removeClass('popover-hide');
            el_body.removeClass('rightmenu-hide');
            el_body.addClass('rightmenu-show');
        });
        el_btn_rightmenu_hide.click(function() {
            el_body.removeClass('popover-show');
            el_body.removeClass('popover-hide');
            el_body.addClass('rightmenu-hide');
            el_body.removeClass('rightmenu-show');
        });

        el_body.bind('popover.show', function() {
            el_body.removeClass('rightmenu-show');
            el_body.removeClass('rightmenu-hide');
            el_body.addClass('popover-show');
            el_body.removeClass('popover-hide');
        });
        el_body.bind('popover.hide', function() {
            el_body.removeClass('rightmenu-show');
            el_body.removeClass('rightmenu-hide');
            el_body.removeClass('popover-show');
            el_body.addClass('popover-hide');
        })
        $('.popover-bg, .popbox-dismiss').click(function() {
            el_body.trigger('popover.hide');
        });

        el_body.bind('ui.editlayout',function(evt, layoutData, appListData, layoutId) {
            base.setContainer(3);
            editLayoutCtrl.setEditLayout(layoutData, appListData, layoutId);
        });

        el_body.bind('ui.showtoptip', function(evt,tiptext, showtime){
            base.showTopTip(tiptext,showtime);
        });

        $('#btn_logout').click(function() {
            el_body.trigger('data.logout');
        });

        $(window).resize(function() {
            setResponsive();
        });

        window.onload = function(){
            domLoaded = true;
        };
    };

    //自适应屏幕
    var setResponsive = function() {

        if(window.innerHeight) {
            winHeight = window.innerHeight;
            winWidth = window.innerWidth;
        } else if (document.body && document.body.clientHeight) {
            winHeight = document.body.clientHeight;
            winWidth = document.body.clientWidth;
        } else {
            winHeight = document.documentElement.clientHeight;
            winWidth = document.documentElement.clientWidth;
        }

        if(winWidth <= 1920)
            $("html").attr("class","screen-large");

        if(winWidth <= 1400)
            $("html").attr("class","screen-normal");

        if(winWidth <= 1200)
            $("html").attr("class","screen-small");

        if(winWidth <= 1000)
            $("html").attr("class","screen-tablet");

        if(winWidth <= 700)
            $("html").attr("class","screen-mobile");
    };

    //切换页面容器
    UiCtrl.prototype.setContainer = function(containerId) {
        if(currentContainerId != containerId) {
            $(containers[currentContainerId]).removeClass('current-container');
            $(containers[containerId]).addClass('current-container');
            if(containerId < 3){
                $(btns[currentContainerId]).removeClass('current');
                $(btns[containerId]).addClass('current');
            }
            currentContainerId = containerId;
        } else if(!$(containers[containerId]).hasClass('current-container')) {
            $(containers[containerId]).addClass('current-container');
            if(containerId < 3){
                $(btns[containerId]).addClass('current');
            }
        }

        if(containerId == 3){
            el_topbar.addClass('hide');
        } else {
            el_topbar.removeClass('hide');
        }
    };

    UiCtrl.prototype.setUserInfo = function(userData){
        el_username.html(userData.userName);
        if(userData.avatar && userData.avatar != ""){
            var imgHtml = "<img src='" + userData.avatar + "'>";
            el_topavatar.html(imgHtml);
            el_rightmenu_avatar.html(imgHtml);
        }
    };

    UiCtrl.prototype.setTheme = function (themeId) {
        themeCtrl.setTheme(themeId);
    };

    UiCtrl.prototype.setAppList = function(appListData){
        appListCtrl.setAppList(appListData);
    };

    UiCtrl.prototype.setHomeLayout = function(layoutListData, appListData, layoutId){
        layoutCtrl.setHomeLayout(layoutListData, appListData, layoutId);
    };

    UiCtrl.prototype.setLayoutList = function(layoutListData, appListData, layoutId){
        layoutCtrl.setLayoutList(layoutListData, appListData, layoutId);
    };

    UiCtrl.prototype.changeLayout = function(layoutListData, appListData, layoutId) {
        layoutCtrl.changeLayout(layoutListData, appListData, layoutId);
    };

    UiCtrl.prototype.deleteLayout = function(deleteLayoutId, appListData) {
        layoutCtrl.deleteLayout(deleteLayoutId, appListData);
    };

    UiCtrl.prototype.loadingShow = function() {
        if(!el_loading_mask.hasClass('show')){
            el_loading_mask.addClass('show');
        }
    };

    UiCtrl.prototype.loadingHide = function() {
        el_loading_mask.removeClass('show');
    };

    UiCtrl.prototype.getDomLoaded = function() {
        return domLoaded;
    };

    UiCtrl.prototype.showTopTip = function(tiptext, showtime) {
        if(!showtime) {
            showtiem = 2000;
        }
        el_top_tip.html(tiptext);
        el_top_tip.addClass('show');
        if(tipTimer != null) {
            window.clearTimeout(tipTimer);
        }
        tipTimer = window.setTimeout(function(){
            el_top_tip.removeClass('show');
            window.clearTimeout(tipTimer);
        },showtime);

    };

    return UiCtrl;

})();

module.exports = UiCtrl;
