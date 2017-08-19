/* ==================================================================================
 * edu-portal: editLayoutCtrl.js
 * 编辑布局
 * ================================================================================== */
var Variables = require('../util/variables');

var EditLayoutCtrl = (function(){

    el_body = $('body');
    el_editLayout_title = $('#editlayout_title'); //标题
    el_editlayout_content = $('.editlayout-block-container'); //块容器
    el_editlayout_size_btns = $('.editlayout-size-item'); //块大小按钮们
    el_editlayout_color_btns = $('.editlayout-color-item'); //块颜色按钮们
    el_editlayout_type_btns = $('.editlayout-type-btn'); //块类型按钮们
    el_ghost_blocks = $('.bn-block-ghost'); //辅助拖拽定位的隐形块

    currentSizeId = 0; //当前选中块的大小
    currentColorId = 0; //当前选中块的颜色
    currentTypeId = 0; //当前选中块的类型
    currentAppId = 0; //当前选中块的appid

    variables = new Variables();

    occupiedArray = new Array(); //存储每个格子是否被占据

    isNewLayout = false; //是否是新建布局
    selIndex = 0; //当前选中的块的序号
    selBlockId = 0; //当前选中的块的id
    blockTotalNum = 0; //存在过的块的总数
    originData = []; //初始布局数据
    tempData = []; //修改后的暂存数据
    appListData = []; //应用列表数据
    layoutId = 0; //布局ID

    //新建布局用的空数据
    emptyData = {
        _id : "",
        operatorId : "",
        layout : [
            {"bxAppId": "","blockSize": 0,"blockPosCol": 1,"blockPosRow": 1,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 2,"blockPosRow": 1,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 3,"blockPosRow": 1,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 4,"blockPosRow": 1,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 5,"blockPosRow": 1,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 1,"blockPosRow": 2,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 2,"blockPosRow": 2,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 3,"blockPosRow": 2,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 4,"blockPosRow": 2,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 5,"blockPosRow": 2,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 1,"blockPosRow": 3,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 2,"blockPosRow": 3,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 3,"blockPosRow": 3,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 4,"blockPosRow": 3,"blockColor": 1,"blockType": 1},
            {"bxAppId": "","blockSize": 0,"blockPosCol": 5,"blockPosRow": 3,"blockColor": 1,"blockType": 1}
        ]
    };


    //constructor
    function EditLayoutCtrl() {
        //保存
        $('#btn_save_layout').click(function(){
            if(!isNewLayout) {
                el_body.trigger('data.updateLayout',[layoutId, tempData.layout]);
            } else {
                el_body.trigger('data.newLayout',[tempData.layout]);
            }
        });
    }

    //对象深拷贝
    function clone(obj){
        var o;
        switch(typeof obj) {
            case 'undefined': break;
            case 'string': o = obj + ''; break;
            case 'number': o = obj - 0; break;
            case 'boolean': o = obj; break;
            case 'object':
                if(obj === null){
                    o = null;
                } else {
                    if(obj instanceof Array) {
                        o = [];
                        for(var i = 0, len = obj.length; i < len; i++) {
                            o.push(clone(obj[i]));
                        }
                    } else {
                        o = {};
                        for(var k in obj){
                            o[k] = clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;break;
        }
        return o;
    }

    EditLayoutCtrl.prototype.setEditLayout = function(theLayoutData, theAppListData, theLayoutId) {
        var base = this;
        selIndex = 0;
        occupiedArray = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
        appListData = theAppListData;
        layoutId = theLayoutId;
        if(theLayoutData != 'empty'){
            isNewLayout = false;
            originData = clone(theLayoutData);
            el_editLayout_title.html('编辑布局');
        } else {
            isNewLayout = true;
            originData = clone(emptyData);
            el_editLayout_title.html('新建布局');
        }
        tempData = clone(originData);

        var layoutHtml = "";
        var layoutBlockData = originData.layout;
        blockTotalNum = layoutBlockData.length;

        $('.appbtn').removeClass('used');
        $('.appbtn').removeClass('sel');

        for(var i = 0; i < layoutBlockData.length; i++){
            var blockData = layoutBlockData[i];
            var appTitle = "";
            var appDesc = "";
            var appId = "";
            var appType = "";
            var appIconClass = "";
            var appData = null;

            if(!isNewLayout){
                for(j = 0; j < theAppListData.length; j++){
                    if(theAppListData[j].bxAppId == blockData.bxAppId){
                        appData = theAppListData[j];
                        break;
                    }
                }
                appTitle = appData.bxAppName;
                appDesc = appData.description;
                appId = appData.bxAppId;
                $('#appbtnid_' + appId).addClass('used');
                appType = appData.appType;
                appIconClass = appData.appIcon;
            }

            var blockSizeClass = variables.getSizeClass(blockData.blockSize);
            var blockColorClass = variables.getColorClass(blockData.blockColor - 1);
            var blockPosColClass = 'bn-pos-col-' + blockData.blockPosCol;
            var blockPosRowClass = 'bn-pos-row-' + blockData.blockPosRow;
            var blockTypeClass = 'bn-layout-' + blockData.blockType;

            if(appTitle != "") {
                setOccupied(blockData.blockPosRow-1, blockData.blockPosCol-1,blockData.blockSize);
            }

            var blockDiv = "<div class='bn-block " + blockSizeClass + " "
                            + blockColorClass + " "
                            + blockPosColClass + " "
                            + blockPosRowClass + " "
                            + blockTypeClass + "'>";

            var blockHtml = blockDiv +
                                "<div class='sel-box'></div>" +
                                "<div class='editlayout-popbox'>" +
                                    "<div class='editlayout_popbtn editlayout_popbtn_1' data-toggle='popbox' data-target='#popover_applist'>选择应用</div>" +
                                    "<div class='editlayout_popbtn editlayout_popbtn_2'>删除</div>" +
                                    "<div class='editlayout_poparrow'></div>" +
                                "</div>" +
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

        el_editlayout_content.html(layoutHtml);

        base.setEditLayoutBlocks();

        //复位
        $('#btn_reset_layout').click(function(){
            base.setEditLayout(originData, appListData, layoutId);
        });

    }

    EditLayoutCtrl.prototype.setEditLayoutBlocks = function(){
        el_editlayout_content.find('.bn-block').each(function(){
            if($(this).index() == selIndex){
                selectOneBlock(el_editlayout_content.find('.bn-block'), $(this).index());
            };
            addBlockActions($(this), $(this).index());
        });

        //更改颜色
        el_editlayout_color_btns.click(function(){
            $this = $(this);
            var thisIndex = $this.index();
            var blockData = tempData.layout[selIndex];
            if(blockData.blockColor - 1 != thisIndex) {
                blockData.blockColor = thisIndex + 1;
                setColorBtns(thisIndex);
                setBlockCss();
            }
        });

        //更改块的布局类型
        el_editlayout_type_btns.click(function(){
            $this = $(this);
            var thisIndex = $this.index();
            var blockData = tempData.layout[selIndex];
            if(blockData.blockType - 1 != thisIndex) {
                blockData.blockType = thisIndex + 1;
                setTypeBtns(thisIndex);
                setBlockCss();
            }
        });

        //更改块的大小
        el_editlayout_size_btns.click(function(){
            $this = $(this);
            var thisIndex = $this.index();
            var blockData = tempData.layout[selIndex];
            if(blockData.blockSize != thisIndex) {
                blockData.blockSize = thisIndex;
                setSizeBtns(thisIndex);
                setBlockCss();
            }
        });

        $('.appbtn').click(function(){
            var $this = $(this);
            var blockData = tempData.layout[selIndex];
            var oldAppId = blockData.bxAppId;
            if(!$this.hasClass('sel') && !$this.hasClass('used')) {
                appId = $this.attr('id').split('_')[1];
                $('#appbtnid_' + oldAppId).removeClass('used');
                $('#appbtnid_' + appId).addClass('used');
                setAppBtn(appId);
                blockData.bxAppId = appId;
                setBlockApp(appId);
            }
        });

    };

    //给一个block设置选中、拖动、选择app、删除等操作
    var addBlockActions = function(el_block,blockIndex) {
        //鼠标按下，选中块，并执行拖拽运算
        el_block.find('.sel-box').mousedown(function(e){
            selectOneBlock(el_editlayout_content.find('.bn-block'), blockIndex);
            var InitPositionX = el_block.position().left;
            var InitPositionY = el_block.position().top;
            var mouseDownPosiX = e.pageX;
            var mouseDownPosiY = e.pageY;
            $(this).bind("mousemove",function(ev){
                el_block.addClass('is-dragging');
                var tempX = parseInt(ev.pageX) - parseInt(mouseDownPosiX) + parseInt(InitPositionX);
                var tempY = parseInt(ev.pageY) - parseInt(mouseDownPosiY) + parseInt(InitPositionY);
                el_block.css({'left':tempX+'px', 'top':tempY+'px'});
            })
        });

        el_block.find('.sel-box').mouseup(function(){
            $(this).unbind("mousemove");
            el_block.removeClass('is-dragging');
            el_block.attr('style','');
            getNearestPosition(el_block.position().left, el_block.position().top);
        });

        el_block.find(".editlayout_popbtn_1").click(function(){
            selectOneBlock(el_editlayout_content.find('.bn-block'), blockIndex);
            $('body').trigger('popover.show');
        });

        el_block.find(".editlayout_popbtn_2").click(function(){
            selectOneBlock(el_editlayout_content.find('.bn-block'), blockIndex);
            deleteBlock();
        });
    }

    //选择某一个block
    var selectOneBlock = function(el_blocks, blockIndex) {
        el_blocks.eq(selIndex).removeClass('sel');
        el_blocks.eq(blockIndex).addClass('sel');
        selIndex = blockIndex;

        var blockData = tempData.layout[blockIndex];
        var sizeId = blockData.blockSize;
        var colorId = blockData.blockColor - 1;
        var typeId = blockData.blockType - 1;
        var appId = blockData.bxAppId;

        setBlockState(sizeId, colorId, typeId, appId);
    };

    var setBlockState = function(sizeId, colorId, typeId, appId) {
        setSizeBtns(sizeId);
        setColorBtns(colorId);
        setTypeBtns(typeId);
        setAppBtn(appId);
    };

    var setSizeBtns = function(sizeId) {
        if(currentSizeId != sizeId){
            el_editlayout_size_btns.eq(currentSizeId).removeClass('current');
            el_editlayout_size_btns.eq(sizeId).addClass('current');
            currentSizeId = sizeId;
        } else {
            el_editlayout_size_btns.eq(currentSizeId).addClass('current');
        }
    };

    var setColorBtns = function(colorId) {
        if(currentColorId != colorId){
            el_editlayout_color_btns.eq(currentColorId).removeClass('current');
            el_editlayout_color_btns.eq(colorId).addClass('current');
            currentColorId = colorId;
        } else {
            el_editlayout_color_btns.eq(currentColorId).addClass('current');
        }
    };

    var setTypeBtns = function(typeId) {
        if(currentTypeId != typeId){
            el_editlayout_type_btns.eq(currentTypeId).removeClass('current');
            el_editlayout_type_btns.eq(typeId).addClass('current');
            currentTypeId = typeId;
        } else {
            el_editlayout_type_btns.eq(currentTypeId).addClass('current');
        }
    };

    var setAppBtn = function(appId) {
        if(appId && appId != '') {
            if(currentAppId != appId) {
                $('#appbtnid_' + currentAppId).removeClass('sel');
                $('#appbtnid_' + appId).addClass('sel');
                currentAppId = appId;
            } else {
                $('#appbtnid_' + currentAppId).addClass('sel');
            }
        }
    };

    var setBlockCss = function() {
        var blockData = tempData.layout[selIndex];
        var blockSizeClass = variables.getSizeClass(blockData.blockSize);
        var blockColorClass = variables.getColorClass(blockData.blockColor - 1);
        var blockPosColClass = 'bn-pos-col-' + blockData.blockPosCol;
        var blockPosRowClass = 'bn-pos-row-' + blockData.blockPosRow;
        var blockTypeClass = 'bn-layout-' + blockData.blockType;

        var blockClass = 'bn-block ' + blockSizeClass + ' ' + blockColorClass + ' ' + blockPosColClass + ' ' +
            blockPosRowClass + ' ' + blockTypeClass + ' ' + 'sel';

        $('.editlayout-block-container').find('.bn-block').eq(selIndex).attr('class',blockClass);
    };

    var setBlockApp = function(appId) {
        appData = $.grep(appListData, function(cur,i){
            return cur['bxAppId'] == appId;
        });
        var el_block = $('.editlayout-block-container').find('.bn-block').eq(selIndex);
        el_block.find('.bn-title').html(appData[0].bxAppName);
        var iconClass = 'bn-icon iconfont ' + appData[0].appIcon;
        el_block.find('.bn-icon').attr('class',iconClass);
        el_block.find('.bn-text').html(appData[0].description);
    }

    var setOccupied = function(row, col, sizeId) {
        occupiedArray[row][col] = 1;
        if(sizeId == 1) {
            occupiedArray[row+1][col] = 1;
        } else if(sizeId == 2) {
            occupiedArray[row][col+1] = 1;
        } else if (sizeId == 3) {
            occupiedArray[row+1][col] = 1;
            occupiedArray[row][col+1] = 1;
            occupiedArray[row+1][col+1] = 1;
        }
    }

    //获得当前块最近的网格位置
    var getNearestPosition = function(blockPosX, blockPosY) {
        var distance = null;
        var targetId = 0;
        el_ghost_blocks.each(function(){
            var $this = $(this);
            var thisIndex = $this.index();
            var posX = $this.position().left;
            var posY = $this.position().top;
            var distX = blockPosX - posX;
            var distY = blockPosY - posY;
            var thisDistance = Math.pow((distX * distX + distY * distY), 0.5);
            if(distance == null) {
                distance = thisDistance;
            } else if(distance > thisDistance) {
                distance = thisDistance;
                targetId = thisIndex;
            }
        });
        var attrId = el_ghost_blocks.eq(targetId).attr('id').split('_');
        var rowId = attrId[1];
        var colId = attrId[2];
        var blockData = tempData.layout[selIndex];
        if(rowId == 3 && (blockData.blockSize == 1 || blockData.blockSize == 3)) {
            rowId = 2;
        }
        if(colId == 5 && (blockData.blockSize == 2 || blockData.blockSize == 3)) {
            colId = 4;
        }

        blockData.blockPosCol = colId;
        blockData.blockPosRow = rowId;
        setBlockCss();
    }

    //删除当前选中的块
    var deleteBlock = function() {
        el_editlayout_content.find('.bn-block').eq(selIndex).remove();
        //alert(tempData.layout.length);
        tempData.layout.splice(selIndex,1);
        //alert(tempData.layout.length);
        selIndex = 0;
        selectOneBlock(el_editlayout_content.find('.bn-block'), selIndex);
        //base.setEditLayoutBlocks();
    }

    return EditLayoutCtrl;

})();

module.exports = EditLayoutCtrl;
