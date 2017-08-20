/* ==================================================================================
 * edu-portal: layoutCtrl.js
 * 块布局
 * ================================================================================== */
var Variables = require('../util/variables');

var LayoutCtrl = (function(){

    el_bn_container = $('#bn_container');
    el_layoutList_content = $('#layout_content');
    el_body = $('body');

    variables = new Variables();

    currentLayout = null;

    addNewLayoutHtml = "<div class='layout-box btn-add' id='btn_addlayout'>" +
                        "<div class='sel-box'></div>" +
                        "<i class='fa fa-plus'></i>" +
                    "</div>";

    maxLayoutNum = 6 //每个用户最多4个布局

    //constructor
    function LayoutCtrl() {

    }

    LayoutCtrl.prototype.setHomeLayout = function(layoutListData, appListData, layoutId) {
        var layoutData = null;
        var layoutHtml = "";
        for(var i = 0; i< layoutListData.length; i++){
            if(layoutListData[i]._id == layoutId){
                layoutData = layoutListData[i];
                break;
            }
        }
        if(layoutData){
            //alert(layoutData.layout.length);
            for(var i = 0; i < layoutData.layout.length; i++){
                var blockData = layoutData.layout[i];
                //alert(blockData.bxAppId);
                var appData = null;
                var appTitle = '';
                var appDesc = '';
                var appId = '';
                var appLink = '';
                var appIconClass = '';
                var appType = '';

                for(j = 0; j < appListData.length; j++){
                    if(appListData[j].bxAppId == blockData.bxAppId){
                        appData = appListData[j];
                        appTitle = appData.bxAppName;
                        appDesc = appData.description;
                        appId = appData.bxAppId;
                        appType = appData.appType;
                        appLink = appData.menuLink;
                        appIconClass = appData.appIcon;
                    }
                }

                var blockSizeClass = variables.getSizeClass(blockData.blockSize);
                var blockColorClass = variables.getColorClass(blockData.blockColor - 1);
                var blockPosColClass = 'bn-pos-col-' + blockData.blockPosCol;
                var blockPosRowClass = 'bn-pos-row-' + blockData.blockPosRow;
                var blockTypeClass = 'bn-layout-' + blockData.blockType;
                var blockDiv = "<div class='bn-block block-hover-anim " + blockSizeClass + " "
                                + blockColorClass + " "
                                + blockPosColClass + " "
                                + blockPosRowClass + " "
                                + blockTypeClass
                                + "' id='appId_" + appId + "'>";
                if(appType != 1){
                    blockDiv = "<div class='bn-block block-hover-anim " + blockSizeClass + " "
                                    + blockColorClass + " "
                                    + blockPosColClass + " "
                                    + blockPosRowClass + " "
                                    + blockTypeClass
                                    + "' id='appId_" + appId + "'"
                                    + "data-toggle='popbox' data-target='#popover_"+ appId
                                    + "'>";
                }
                var blockHtml = blockDiv +
                                    "<div class='sel-box'></div>" +
                                    "<div class='bn-new-mark'>" +
                                        "<i class='iconfont icon-new'></i>" +
                                    "</div>" +
                                    "<div class='bn-block-content'>" +
                                        "<i class='bn-icon iconfont " + appIconClass + "'></i>" +
                                        "<div class='bn-title'>" + appTitle + "</div>" +
                                        "<div class='bn-text'>" + appDesc + "</div>" +
                                    "</div>" +
                                "</div>";

                layoutHtml += blockHtml;
            }
            el_bn_container.html(layoutHtml);

            el_bn_container.find('.bn-block').click(function(){
                //alert($(this).index());
                var bxAppId = $(this).attr('id').split('_')[1];
                var thisAppData = null;
                for(var i = 0; i < appListData.length; i++) {
                    var appData = appListData[i];
                    if(appData.bxAppId == bxAppId) {
                        thisAppData = appData;
                        break;
                    }
                }
                //alert(thisAppData.bxAppName);
                if(thisAppData.appType == 1){
                    //window.open(thisAppData.menuLink);
                    el_body.trigger('ui.showtoptip', ['实际项目中点此将链接到对应的外部网站', 2500]);
                } else {
                    el_body.trigger('popover.show');
                }
            });

            el_bn_container.find('.block-hover-anim').on('mouseover',function(){
                $(this).removeClass('hover-out');
                $(this).addClass('hover-in');
            });

            el_bn_container.find('.block-hover-anim').on('mouseout',function(){
                $(this).removeClass('hover-in');
                $(this).addClass('hover-out');
            });
        }
    };

    LayoutCtrl.prototype.setLayoutList = function(layoutListData, appListData, layoutId) {
        var base = this;
        var layoutListHtml = "";
        for(var i = 0; i < layoutListData.length; i++){
            var layoutBoxData = layoutListData[i];
            var layoutData = layoutBoxData.layout;
            var thisLayoutId = layoutBoxData._id;
            var operatorId = layoutBoxData.operatorId;
            var layoutBoxHtml = "";

            if(layoutId == thisLayoutId){
                layoutBoxHtml = "<div class='layout-box has-inner-btn sel' id='id_" + thisLayoutId + "'>";
            } else {
                layoutBoxHtml = "<div class='layout-box has-inner-btn' id='id_" + thisLayoutId + "'>";
            }
            layoutBoxHtml += "<div class='sel-box'></div>";

            if(operatorId != 0){
                var innerBtnHtml =  "<div class='inner-btn-group'>" +
                                        "<div class='inner-btn btn-edit'>" +
                                            "<i class='fa fa-th'></i>" +
                                            " 编辑" +
                                        "</div> " +
                                        "<div class='inner-btn btn-delete'>" +
                                            "<i class='fa fa-trash-o'></i>" +
                                            " 删除" +
                                        "</div>" +
                                    "</div>";
                layoutBoxHtml += innerBtnHtml;
            }

            var layoutBlocksHtml = "";
            for(var j = 0; j < layoutData.length; j++) {
                var blockData = layoutData[j];
                var blockSizeClass = variables.getSizeClass(blockData.blockSize);
                var blockColorClass = variables.getColorClass(blockData.blockColor - 1);
                var blockPosColClass = 'bn-pos-col-' + blockData.blockPosCol;
                var blockPosRowClass = 'bn-pos-row-' + blockData.blockPosRow;
                var blockHtml = "<div class='bn-block " + blockSizeClass + " " + blockColorClass + " " + blockPosColClass + " " + blockPosRowClass + "'></div>";
                layoutBlocksHtml += blockHtml;
            }

            layoutBoxHtml += layoutBlocksHtml;
            layoutBoxHtml += "</div>";

            layoutListHtml += layoutBoxHtml;
        }
        if(layoutListData.length < maxLayoutNum) {
            layoutListHtml +=   addNewLayoutHtml;
        }
        el_layoutList_content.html(layoutListHtml);
        currentLayout = layoutId;
        el_layoutList_content.find('.layout-box').each(function(){
            var $this = $(this);
            var layoutIndex = $this.index();
            var thisLayoutId = $this.attr('id').split('_')[1];
            $this.find('.sel-box').click(function(){
                if(!$this.hasClass('sel') && !$this.hasClass('btn-add')){
                    el_body.trigger('data.changeLayout',[thisLayoutId]);
                } else if ($this.hasClass('btn-add')){
                    el_body.trigger('ui.editlayout',['empty', appListData, 'empty']);
                }
            });
            $this.find('.btn-edit').click(function(){
                //alert(JSON.stringify(appListData));
                el_body.trigger('ui.editlayout',[layoutListData[layoutIndex], appListData, thisLayoutId]);
            });
            $this.find('.btn-delete').click(function(){
                //alert('to delete');
                el_body.trigger('data.deleteLayout', [thisLayoutId]);
            });
        })
    };

    LayoutCtrl.prototype.changeLayout = function(layoutListData, appListData, layoutId) {
        var base = this;
        this.setHomeLayout(layoutListData,appListData,layoutId);
        $('#id_'+currentLayout).removeClass('sel');
        $('#id_'+layoutId).addClass('sel');
        currentLayout = layoutId;
    };

    LayoutCtrl.prototype.deleteLayout = function(deleteLayoutId, appListData) {
        var base = this;
        $('#id_'+deleteLayoutId).remove();
        if(el_layoutList_content.find('.btn-add').length == 0 && el_layoutList_content.find('.layout-box').length < maxLayoutNum) {
            el_layoutList_content.append(addNewLayoutHtml);
            el_layoutList_content.find('.btn-add').each(function(){
                var $this = $(this);
                $this.find('.sel-box').click(function(){
                    el_body.trigger('ui.editlayout',['empty', appListData, 'empty']);
                });
            });
        }
    }

    return LayoutCtrl;

})();

module.exports = LayoutCtrl;
