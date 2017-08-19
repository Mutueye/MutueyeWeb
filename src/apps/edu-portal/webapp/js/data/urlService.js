/* ==================================================================================
 * edu-portal: urlService.js
 * 管理ajax访问地址
 * ================================================================================== */

var UrlService = (function(){

    //var urlRoot = "http://manager.i3618.com.cn";
    var urlRoot = window.core_remote;
    var urlLogout = window.system_remote;
    var urlDevRoot = "../data";

    var urls = {
        USER_INFO : "portal/webConfig", //获取用户信息
        CHANGE_USER_INFO : "portal/changeConfig", //修改用户信息
        LAYOUT_LIST : "portal/layoutList", //获取布局列表
        APP_LIST : "bx/subapp/findCanSubApp", //获取应用列表
        DELETE_LAYOUT : "portal/deleteLayout", //删除布局
        NEW_LAYOUT : "portal/newLayout", //新建布局
        UPDATE_LAYOUT : "portal/updateLayout", //修改布局
        USER_LOGOUT :  "user/logOut", //退出
    };

    var devUrls = {
        USER_INFO : "/userinfo.json",
        LAYOUT_LIST : '/layoutlist.json',
        APP_LIST : "/applist.json",
    };

    //constructor
    function UrlService() {}

    UrlService.prototype.getUrl = function(urlname){
        if(urlname != 'USER_LOGOUT') {
            return urlRoot + urls[urlname];
        } else {
            return urlLogout + urls[urlname];
        }
    };

    UrlService.prototype.getDevUrl = function(urlname){
        return urlDevRoot + devUrls[urlname];
    };

    return UrlService;

})();

module.exports = UrlService;
