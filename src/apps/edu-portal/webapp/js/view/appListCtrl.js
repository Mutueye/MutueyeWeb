/* ==================================================================================
 * edu-portal: appListCtrl.js
 * 应用列表
 * ================================================================================== */
var Variables = require('../util/variables');

var AppListCtrl = (function(){

    el_applist = $('#applist');
    el_popover_content = $('.popover-content');

    variables = new Variables();

    //constructor
    function AppListCtrl() {

    }

    AppListCtrl.prototype.setAppList = function(appListData){
        //alert(JSON.stringify(appListData));
        var appListHtml = "";
        var appPopListHtml = "";
        var popoverHtml = "<div class='popover-bg'></div>";
        //alert(appListData.length);
        for(i = 0; i < appListData.length; i++){
            var data = appListData[i];
            var appId = data.bxAppId;
            var appTitle = data.bxAppName;

            var appColorClass = data.appColor;
            var appIconClass = data.appIcon;
            var appType = data.appType;
            var appLink = data.menuLink;
            //alert(eval('(' + data.portalStyle +')'));

            var popboxHtml = "";
            var blockDiv = "<div class='bn-block appbox bn-layout-1 " + appColorClass + "' id='appid_" + appId + "'>";
            var appBtnHtml = "<div class='col-1of4'>" +
                                "<div class='col-content'>" +
                                    "<div class='appbtn popbox-dismiss' id='appbtnid_" + appId +"'  data-target='#popover_applist'>" +
                                        "<i class='iconfont " + appIconClass +"'></i>" +
                                        " " + appTitle +
                                    "</div>" +
                                "</div>" +
                            "</div>";
            if(appType != 1){
                blockDiv = "<div class='bn-block appbox bn-layout-1 " + appColorClass + "' id='appid_" + appId + "' "
                            + "data-toggle='popbox' data-target='#popover_"+ appId
                            + "'>";
                popboxHtml = "<div class='popover-box popbox-model' id='popover_" + appId + "'>" +
                                "<div class='popover-box-title'>" +
                                    "<div class='pull-left'>" +
                                        "<i class='iconfont " + appIconClass + "'></i> " +
                                        appTitle +
                                    "</div>" +
                                    "<div class='pull-right popbox-dismiss cursor-pointer' data-target='#popover_" + appId + "'>" +
                                        "<i class='fa fa-close'></i>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='popover-box-content'>" +
                                    "<iframe src='" + appLink + "' width='100%' height='100%'></iframe>" +
                                "</div>" +
                            "</div>";
            }
            var appString = blockDiv +
                                "<div class='sel-box'></div>" +
                                "<div class='bn-block-content'>" +
                                    "<i class='bn-icon iconfont " + appIconClass +"'></i>" +
                                    "<div class='bn-title'>" + appTitle + "</div>" +
                                "</div>" +
                            "</div>";
            appListHtml += appString;
            popoverHtml += popboxHtml;
            appPopListHtml += appBtnHtml;
        }
        var appPopboxHtml = "<div class='popover-box popbox-model applist' id='popover_applist'>" +
                                "<div class='popover-box-title'>" +
                                    "<div class='pull-left'>" +
                                        "选择应用" +
                                    "</div>" +
                                    "<div class='pull-right popbox-dismiss cursor-pointer' data-target='#popover_applist'>" +
                                        "<i class='fa fa-close'></i>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='popover-box-content space-20px'>" +
                                    appPopListHtml +
                                "</div>" +
                            "</div>";
        popoverHtml += appPopboxHtml;
        el_popover_content.html(popoverHtml);
        el_applist.html(appListHtml);
        el_applist.find('.bn-block').click(function(){
            appIndex = $(this).index();
            if(appListData[appIndex].appType == 1){
                window.open(appListData[appIndex].menuLink);
            } else {
                $('body').trigger('popover.show');
            }
        });
    };

    return AppListCtrl;

})();

module.exports = AppListCtrl;
