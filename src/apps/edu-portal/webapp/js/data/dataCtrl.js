/* ==================================================================================
 * edu-portal: dataCtrl.js
 * 管理数据存取和显示
 * ================================================================================== */
var UrlService = require('./urlService');
var Variables = require('../util/variables');
var _ = require('underscore');

var DataCtrl = (function(){

    var urlService = new UrlService();
    var variables = new Variables();

    var userInfo = null;
    var layoutListData = null;
    var appListData = null;

    var el_body = $('body');
    
    function finished(count, cb) {
        var complete = 0
        return function() {
            if (++complete === count) cb()
        }
    }

    //constructor
    function DataCtrl(uiCtrl) {
        loadData();
        el_body.bind('data.load', function(){
            loadData();
        });
        el_body.bind('data.changeLayout', function(evt, layoutId) {
            changeLayout(layoutId);
        });
        el_body.bind('data.changeTheme', function(evt, themeId) {
            changeTheme(themeId);
        });
        el_body.bind('data.deleteLayout', function(evt, layoutId) {
            deleteLayout(layoutId);
        });
        el_body.bind('data.updateLayout', function(evt, layoutId, layoutData) {
            updateLayout(layoutId, layoutData);
        });
        el_body.bind('data.newLayout', function(evt, layoutData) {
            newLayout(layoutData);
        });
        el_body.bind('data.logout', function(evt) {
            logout();
        });
        el_body.bind('data.resetLayoutData', function(evt, layoutId) {
            resetLayoutData(layoutId);
        });
    }

    var loadData = function(){
        var dataLoadFinished = finished(3,function(){
            setUserInfo(userInfo);
            setAppList(appListData);
            setLayout(userInfo,appListData,layoutListData);
            uiCtrl.loadingHide();
            uiCtrl.bindeEvents();
        });
        getUserInfo(dataLoadFinished);
        getLayoutListData(dataLoadFinished);
        getAppListData(dataLoadFinished);
    };

    var resetLayoutData = function(layoutId) {
        getLayoutListData(function() {
            setLayout(userInfo,appListData,layoutListData);
            var layoutData = _.findWhere(layoutListData, {_id:layoutId});

            el_body.trigger('ui.editlayout',[layoutData, appListData, layoutId]);
            uiCtrl.loadingHide();
        });
    }

    var logout = function(){
        $.ajax({
            type : 'post',
            url : urlService.getUrl("USER_LOGOUT"),
            dataType : 'json',
            success : function(data){
                if(data.resultCode == 'JSPE-200'){
                    console.log('退出成功！');
                    location.href = window.www_head;
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('退出请求失败！');
                el_body.trigger('ui.showtoptip', ['退出请求失败', 2000]);
            }
        });
    };

    var updateLayout = function(layoutId, layoutData) {
        uiCtrl.loadingShow();
        $.ajax({
            type : 'post',
            url : urlService.getUrl("UPDATE_LAYOUT"),
            data : {
                layoutId : layoutId,
                layout : JSON.stringify(layoutData)
            },
            dataType : 'json',
            success : function(data){
                if(data.resultCode == 'JSPE-200'){
                    console.log('保存布局成功！');
                    el_body.trigger('ui.showtoptip', ['保存布局成功', 2000]);
                    el_body.trigger('data.resetLayoutData',[layoutId]);
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('保存布局请求失败！');
                uiCtrl.loadingHide();
                el_body.trigger('ui.showtoptip', ['保存布局请求失败', 2000]);
            }
        });
    }

    var newLayout = function(layoutData) {
        uiCtrl.loadingShow();
        $.ajax({
            type : 'post',
            url : urlService.getUrl("NEW_LAYOUT"),
            data : {
                layout : JSON.stringify(layoutData)
            },
            dataType : 'json',
            success : function(data){
                if(data.resultCode == 'JSPE-200'){
                    console.log('保存新布局成功！');
                    el_body.trigger('ui.showtoptip', ['保存新布局成功', 2000]);
                    el_body.trigger('data.resetLayoutData',[data.resultBean]);
                    uiCtrl.setContainer(2);
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('保存新布局请求失败！');
                uiCtrl.loadingHide();
                el_body.trigger('ui.showtoptip', ['保存新布局请求失败', 2000]);
            }
        });
    }

    var changeLayout = function(layoutId){
        /*
        $.ajax({
            type : 'post',
            url : urlService.getUrl("CHANGE_USER_INFO"),
            data : {
                layoutId : layoutId,
                themeId : userInfo.themeId
            },
            dataType : 'json',
            success : function(data){
                if(data.resultCode == 'JSPE-200'){
                    console.log('更换布局成功');
                    uiCtrl.changeLayout(layoutListData, appListData, layoutId);
                    el_body.trigger('ui.showtoptip', ['更换布局成功', 2000]);
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('更换布局请求失败！');
                el_body.trigger('ui.showtoptip', ['更换布局请求失败', 2000]);
            }
        });*/
        uiCtrl.changeLayout(layoutListData, appListData, layoutId);
        el_body.trigger('ui.showtoptip', ['更换布局成功', 2000]);
    };

    var deleteLayout = function(layoutId){
        $.ajax({
            type : 'post',
            url : urlService.getUrl("DELETE_LAYOUT"),
            data : { layoutId : layoutId },
            dataType : 'json',
            success : function(data){
                if(data.resultCode == 'JSPE-200'){
                    console.log('删除布局成功');
                    uiCtrl.deleteLayout(layoutId, appListData);
                    //去掉已删除的布局数据
                    layoutListData = $.grep(layoutListData, function(cur,i){
                        return cur['_id'] != layoutId;
                    });
                    el_body.trigger('ui.showtoptip', ['删除布局成功', 2000]);
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('删除布局请求失败！');
                el_body.trigger('ui.showtoptip', ['删除布局请求失败', 2000]);
            }
        });
    };

    var changeTheme = function(themeId){
        /*
        $.ajax({
            type : 'post',
            url : urlService.getUrl("CHANGE_USER_INFO"),
            data : {
                layoutId : userInfo.layoutId,
                themeId : themeId
            },
            dataType : 'json',
            success : function(data){
                if(data.resultCode == 'JSPE-200'){
                    console.log('更换主题成功');
                    uiCtrl.setTheme(themeId);
                    el_body.trigger('ui.showtoptip', ['更换主题成功', 2000]);
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', ['data.errorMessage', 2000]);
                }
            },
            error : function(){
                console.log('更换主题请求失败！');
                el_body.trigger('ui.showtoptip', ['更换主题请求失败', 2000]);
            }
        });*/
        uiCtrl.setTheme(themeId);
        el_body.trigger('ui.showtoptip', ['更换主题成功', 2000]);
    };


    var getUserInfo = function(cb){
        $.ajax({
            type : 'get',
            //type : 'post',
            url : urlService.getDevUrl('USER_INFO'),
            //url : urlService.getUrl('USER_INFO'),
            dataType : 'json',
            success : function(data) {
                if(data.resultCode == 'JSPE-200'){
                    userInfo = data.resultBean;
                    if(userInfo.length != 0){
                        cb();
                    }
                    console.log('获取用户信息成功');
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('获取用户信息失败！');
                el_body.trigger('ui.showtoptip', ['获取用户信息失败', 2000]);
            }
        });
    };

    var getLayoutListData = function(cb){

        $.ajax({
            type : 'get',
            //type : 'post',
            url : urlService.getDevUrl('LAYOUT_LIST'),
            //url : urlService.getUrl('LAYOUT_LIST'),
            dataType : 'json',
            success : function(data) {
                if(data.resultCode == 'JSPE-200'){
                    layoutListData = digestLayoutData(data.resultBean);
                    if(layoutListData.length != 0){
                        cb();
                    }
                    console.log('获取布局列表成功');
                } else {
                    console.log(data.errorMessage);
                    uiCtrl.showTopTip(data.errorMessage,2000);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('获取布局列表失败！');
                el_body.trigger('ui.showtoptip', ['获取布局列表失败', 2000]);
            }
        });
    };

    var getAppListData = function(cb){
        $.ajax({
            type : 'get',
            //type : 'post',
            url : urlService.getDevUrl('APP_LIST'),
            //url : urlService.getUrl('APP_LIST'),
            dataType : 'json',
            success : function(data) {
                if(data.resultCode == 'JSPE-200'){
                    appListData = digestAppListData(data.resultBean);
                    if(appListData.length != 0){
                        cb();
                    }
                    console.log('获取应用列表成功');
                } else {
                    console.log(data.errorMessage);
                    el_body.trigger('ui.showtoptip', [data.errorMessage, 2000]);
                }
            },
            error : function(){
                console.log('获取应用列表失败！');
                el_body.trigger('ui.showtoptip', ['获取应用列表失败', 2000]);
            }
        });
    };

    var setUserInfo = function(data) {
        uiCtrl.setUserInfo(data);
        uiCtrl.setTheme(data.themeId);
    };

    var digestLayoutData = function(data) {
        resultData = [];
        for(var i = 0; i < data.length; i++) {
            var id = data[i]._id;
            var operatorId = data[i].operatorId;
            var layout = eval('(' + data[i].layout + ')');
            var layoutObj = {
                _id : id,
                operatorId : operatorId,
                layout : layout
            };
            resultData.push(layoutObj);
        }
        return resultData;
    }

    var digestAppListData = function(data) {
        resultData = [];
        for(var i = 0; i < data.length; i++) {
            var oneAppData = data[i];
            var appId = oneAppData.bxAppId;
            var appName = oneAppData.bxAppName;
            var appDesc = oneAppData.description;

            var appPortalStyle = eval('(' + oneAppData.protalStyle +')');
            var appIconClass = "";
            var appColorClass = "";
            var appType = "";
            var appLink = "";
            if(appPortalStyle != null){
                appIconClass = appPortalStyle.appIcon;
                appColorClass = variables.getColorClass(appPortalStyle.appColor - 1);
                appType = appPortalStyle.appType;
                appLink = appPortalStyle.appLink;
            }

            var appObj = {
                bxAppId : appId,
                bxAppName : appName,
                description : appDesc,
                appIcon : appIconClass,
                appColor : appColorClass,
                appType : appType,
                menuLink : appLink
            };

            resultData.push(appObj);
        }
        return resultData;
    };
    var setAppList = function(data) {
        uiCtrl.setAppList(data);
    };

    var setLayout = function(userInfo, appListData, layoutListData) {
        uiCtrl.setHomeLayout(layoutListData, appListData, userInfo.layoutId);
        uiCtrl.setLayoutList(layoutListData, appListData, userInfo.layoutId);
    };



    return DataCtrl;

})();

module.exports = DataCtrl;
