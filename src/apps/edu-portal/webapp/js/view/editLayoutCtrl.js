/* ==================================================================================
 * edu-portal: editLayoutCtrl.js
 * 编辑布局
 * ================================================================================== */
var Variables = require('../util/variables');
var _ = require('underscore');

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

    selBlockId = 0; //当前选中的块的id
    blockTotalNum = 0; //存在过的块的总数
    blockDomDataArray = []; //存在过的所有块的数据

    originData = []; //初始布局数据
    tempData = []; //修改后的暂存数据
    appListData = []; //应用列表数据
    layoutId = 0; //布局ID

    //新建布局用的空数据
    emptyData = {
        _id : "",
        operatorId : "",
        layout : [
            {"bxAppId": "","blockSize": 0,"blockPosCol": 1,"blockPosRow": 1,"blockColor": 1,"blockType": 1}
        ]
    };


    //constructor
    function EditLayoutCtrl() {

        //保存
        $('#btn_save_layout').click(function(){
            if(checkSaveable()){
                if(!isNewLayout) {
                    el_body.trigger('data.updateLayout',[layoutId, tempData.layout]);
                } else {
                    el_body.trigger('data.newLayout',[tempData.layout]);
                }
            };
        });

        handleAddNewBlock();
    }

    //对象深拷贝
    var clone = function(obj){
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

    //设置编辑布局页面
    EditLayoutCtrl.prototype.setEditLayout = function(theLayoutData, theAppListData, theLayoutId) {
        var base = this;

        //初始化编辑布局的状态
        selBlockId = 0;
        blockTotalNum = 0;
        el_editlayout_content.html('');
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

        $('.appbtn').removeClass('used');
        $('.appbtn').removeClass('sel');

        //根据布局数据设置编辑布局页面内容
        for(var i = 0; i < layoutBlockData.length; i++){
            var blockData = layoutBlockData[i];
            var appTitle = "";
            var appDesc = "";
            var appId = "";
            var appIconClass = "";
            var appData = null;

            if(!isNewLayout){
                for(j = 0; j < theAppListData.length; j++){
                    if(parseInt(theAppListData[j].bxAppId) == parseInt(blockData.bxAppId)){
                        appData = theAppListData[j];
                        break;
                    }
                }
                if(appData != null){
                    appTitle = appData.bxAppName;
                    appDesc = appData.description;
                    appId = appData.bxAppId;
                    $('#appbtnid_' + appId).addClass('used');
                    appIconClass = appData.appIcon;
                }
            }

            var blockSizeClass = variables.getSizeClass(blockData.blockSize);
            var blockColorClass = variables.getColorClass(blockData.blockColor - 1);
            var blockPosColClass = 'bn-pos-col-' + blockData.blockPosCol;
            var blockPosRowClass = 'bn-pos-row-' + blockData.blockPosRow;
            var blockTypeClass = 'bn-layout-' + blockData.blockType;


            var blockDomData = {
                appTitle : appTitle,
                appDesc : appDesc,
                appId : appId,
                appIconClass : appIconClass,
                blockSizeClass : variables.getSizeClass(blockData.blockSize),
                blockColorClass : variables.getColorClass(blockData.blockColor - 1),
                blockPosColClass : 'bn-pos-col-' + blockData.blockPosCol,
                blockPosRowClass : 'bn-pos-row-' + blockData.blockPosRow,
                blockTypeClass : 'bn-layout-' + blockData.blockType
            }
            addOneBlockDom(blockDomData);
        }

        base.setEditLayoutBlocks();

        //复位
        $('#btn_reset_layout').click(function(){
            base.setEditLayout(theLayoutData, appListData, layoutId);
        });

    }

    var addOneBlockDom = function(blockDomData){
        blockTotalNum ++;
        blockDomData.blockId = blockTotalNum - 1;
        blockDomDataArray.push(blockDomData);
        var blockHtml = "<div class='bn-block "
                        + blockDomData.blockSizeClass + " "
                        + blockDomData.blockColorClass + " "
                        + blockDomData.blockPosColClass + " "
                        + blockDomData.blockPosRowClass + " "
                        + blockDomData.blockTypeClass + "' id='blockid_" + blockDomData.blockId + "'>" +
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
                                "<i class='bn-icon iconfont " + blockDomData.appIconClass + "'></i>" +
                                "<div class='bn-title'>" + blockDomData.appTitle + "</div>" +
                                "<div class='bn-text'>" + blockDomData.appDesc + "</div>" +
                            "</div>" +
                        "</div>";
        el_editlayout_content.append(blockHtml);
        addOneBlockActions($('#blockid_' + blockDomData.blockId));
    };

    //设置选定块的相关交互操作
    var addOneBlockActions = function(el_block) {
        //如果是当前选中的块，设置被选中状态
        if(selBlockId == el_block.attr('id').split('_')[1]){
            selectBlock(selBlockId);
        }

        //鼠标按下，选中块，并执行拖拽运算
        el_block.find('.sel-box').mousedown(function(e){
            selectBlock(el_block.attr('id').split('_')[1]);
            var InitPositionX = el_block.position().left;
            var InitPositionY = el_block.position().top;
            var mouseDownPosiX = e.pageX;
            var mouseDownPosiY = e.pageY;
            $(this).bind("mousemove",function(ev){
                var tempX = parseInt(ev.pageX) - parseInt(mouseDownPosiX) + parseInt(InitPositionX);
                var tempY = parseInt(ev.pageY) - parseInt(mouseDownPosiY) + parseInt(InitPositionY);
                getNearestPosition(el_block.position().left, el_block.position().top);
                el_block.css({'left':tempX+'px', 'top':tempY+'px'});
                el_block.addClass('is-dragging');
            });
        });

        el_block.find('.sel-box').mouseup(function(){
            $(this).unbind("mousemove");
            el_block.removeClass('is-dragging');
            //todo 获得最近的位置
            //getNearestPosition(el_block.position().left, el_block.position().top);
            el_block.attr('style','');
        });

        el_block.find(".editlayout_popbtn_1").click(function(){
            selectBlock(el_block.attr('id').split('_')[1]);
            $('body').trigger('popover.show');
        });

        el_block.find(".editlayout_popbtn_2").click(function(){
            selectBlock(el_block.attr('id').split('_')[1]);
            deleteBlock();
        });
    };

    //点击添加新磁贴
    var handleAddNewBlock = function(){
        el_ghost_blocks.click(function(){
            var $this = $(this);
            var newBlockData = {
                bxAppId: "",
                blockSize : 0,
                blockPosCol: parseInt($this.attr('id').split('_')[2]),
                blockPosRow : parseInt($this.attr('id').split('_')[1]),
                blockColor : 1,
                blockType: 1
            };
            tempData.layout.push(newBlockData);
            var blockDomData = {
                appTitle : "",
                appDesc : "",
                appId : "",
                appIconClass : "",
                blockSizeClass : variables.getSizeClass(newBlockData.blockSize),
                blockColorClass : variables.getColorClass(newBlockData.blockColor - 1),
                blockPosColClass : 'bn-pos-col-' + newBlockData.blockPosCol,
                blockPosRowClass : 'bn-pos-row-' + newBlockData.blockPosRow,
                blockTypeClass : 'bn-layout-' + newBlockData.blockType
            };
            addOneBlockDom(blockDomData);
            selectBlock(blockDomData.blockId);
        });
    };

    //设置更改颜色、布局类型、块大小等板块的功能
    EditLayoutCtrl.prototype.setEditLayoutBlocks = function(){
        //更改颜色
        el_editlayout_color_btns.click(function(){
            $this = $(this);
            var thisIndex = $this.index();
            var blockIndex = getBlockIndexById(selBlockId);
            var blockData = tempData.layout[blockIndex];
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
            var blockIndex = getBlockIndexById(selBlockId);
            var blockData = tempData.layout[blockIndex];
            if(blockData.blockType - 1 != thisIndex) {
                blockData.blockType = thisIndex + 1;
                setTypeBtns(thisIndex);
                setBlockCss();
            }
        });

        //更改块的大小
        el_editlayout_size_btns.click(function(){
            $this = $(this);
            if(!$this.hasClass('disabled')){
                var thisIndex = $this.index();
                var blockIndex = getBlockIndexById(selBlockId);
                var blockData = tempData.layout[blockIndex];
                var blockCol = blockData.blockPosCol - 1;
                var blockRow = blockData.blockPosRow - 1;
                if(blockData.blockSize != thisIndex) {
                    if(blockData.blockSize == 0 ) { //当前选中块大小为1x1时
                        if(thisIndex == 1) { //目标大小1x2
                            if(checkPosOccupied(blockRow + 1, blockCol) && !checkPosOccupied(blockRow - 1, blockCol)) {
                                blockData.blockPosRow -= 1;
                            }
                        }
                        if(thisIndex == 2) { //目标大小2x1
                            if(checkPosOccupied(blockRow, blockCol + 1) && !checkPosOccupied(blockRow, blockCol - 1)) {
                                blockData.blockPosCol -= 1;
                            }
                        }
                        if(thisIndex == 3) { //目标大小2x2
                            if(!checkPosOccupied(blockRow, blockCol + 1) && !checkPosOccupied(blockRow + 1, blockCol) && !checkPosOccupied(blockRow + 1, blockCol + 1)){

                            } else if(!checkPosOccupied(blockRow, blockCol + 1) && !checkPosOccupied(blockRow - 1, blockCol) && !checkPosOccupied(blockRow - 1, blockCol + 1)){
                                blockData.blockPosRow -= 1;
                            } else if(!checkPosOccupied(blockRow, blockCol - 1) && !checkPosOccupied(blockRow - 1, blockCol) && !checkPosOccupied(blockRow - 1, blockCol - 1)){
                                blockData.blockPosRow -= 1;
                                blockData.blockPosCol -= 1;
                            } else if(!checkPosOccupied(blockRow, blockCol - 1) && !checkPosOccupied(blockRow + 1, blockCol) && !checkPosOccupied(blockRow + 1, blockCol - 1)){
                                blockData.blockPosCol -= 1;
                            }
                        }
                    } else if(blockData.blockSize == 1) { //当选中块大小为1x2时
                        if(thisIndex == 2) { //目标大小2x1
                            if(!checkPosOccupied(blockRow, blockCol + 1)) {

                            } else if(!checkPosOccupied(blockRow + 1, blockCol + 1)) {
                                blockData.blockPosRow += 1;
                            } else if(!checkPosOccupied(blockRow, blockCol - 1)) {
                                blockData.blockPosCol -= 1;
                            } else if(!checkPosOccupied(blockRow + 1, blockCol - 1)) {
                                blockData.blockPosCol -= 1;
                                blockData.blockPosRow += 1;
                            }
                        } else if(thisIndex == 3) { //目标大小2x2
                            if(!checkPosOccupied(blockRow, blockCol + 1) && !checkPosOccupied(blockRow + 1, blockCol + 1)) {

                            } else if(!checkPosOccupied(blockRow, blockCol - 1) && !checkPosOccupied(blockRow + 1, blockCol - 1)) {
                                blockData.blockPosCol -= 1;
                            }
                        }
                    } else if(blockData.blockSize == 2) { //当选中块大小为2x1时
                        if(thisIndex == 1) { //目标大小1x2
                            if(!checkPosOccupied(blockRow + 1, blockCol)){

                            } else if(!checkPosOccupied(blockRow + 1, blockCol + 1)) {
                                blockData.blockPosCol += 1;
                            } else if(!checkPosOccupied(blockRow - 1, blockCol)) {
                                blockData.blockPosRow -= 1;
                            } else if(!checkPosOccupied(blockRow - 1, blockCol + 1)) {
                                blockData.blockPosRow -= 1;
                                blockData.blockPosCol += 1;
                            }
                        } else if(thisIndex == 3) { //目标大小2x2
                            if(!checkPosOccupied(blockRow + 1, blockCol) && !checkPosOccupied(blockRow + 1, blockCol + 1)) {

                            } else if(!checkPosOccupied(blockRow - 1, blockCol) && !checkPosOccupied(blockRow - 1, blockCol + 1)) {
                                blockData.blockPosRow -= 1;
                            }
                        }
                    }
                    blockData.blockSize = thisIndex;
                    setSizeBtns(thisIndex, blockData.blockPosCol, blockData.blockPosRow);
                    setBlockCss();
                }
            }
        });

        //选择app
        $('.appbtn').click(function(){
            var $this = $(this);
            var blockIndex = getBlockIndexById(selBlockId);
            var blockData = tempData.layout[blockIndex];
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

    //根据blockId获取blockIndex(序号)
    var getBlockIndexById = function(blockId) {
        var blockIndex = null;
        el_editlayout_content.find('.bn-block').each(function(){
            var $this = $(this);
            if(blockId == $this.attr('id').split('_')[1]) {
                blockIndex = $this.index();
            }
        });
        return blockIndex;
    }

    //根据block的col和row获取blockIndex
    var getBlockIdByPos = function(row, col) {
        var blockId = null;
        var targetBlock = el_editlayout_content.find('.bn-pos-col-'+ col + '.bn-pos-row-' + row);
        if(targetBlock.length > 0){
            //alert(targetBlock.length);
            //alert('row: ' + row +'   col: '+ col + '      ' + targetBlock.eq(0).attr('id'));
            blockId = targetBlock.eq(0).attr('id').split('_')[1];
            //alert(blockIndex);
        }
        return blockId;
    }

    //根据blockId选择block
    var selectBlock = function(blockId) {
        if(blockId == selBlockId) {
            $('#blockid_' + blockId).addClass('sel');
        } else {
            $('#blockid_' + selBlockId).removeClass('sel');
            $('#blockid_' + blockId).addClass('sel');
            selBlockId = blockId;
        }
        var blockIndex = getBlockIndexById(blockId);
        if(blockIndex != null) {
            var blockData = tempData.layout[blockIndex];
            setBlockState(blockData);
        }
    }

    //设置块状态
    var setBlockState = function(blockData) {

        var sizeId = blockData.blockSize;
        var colorId = blockData.blockColor - 1;
        var typeId = blockData.blockType - 1;
        var appId = blockData.bxAppId;
        var posCol = blockData.blockPosCol;
        var posRow = blockData.blockPosRow;

        setSizeBtns(sizeId, posCol, posRow);
        setColorBtns(colorId);
        setTypeBtns(typeId);
        setAppBtn(appId);
    };

    var setSizeBtns = function(sizeId, posCol, posRow) {

        if(currentSizeId != sizeId){
            el_editlayout_size_btns.eq(currentSizeId).removeClass('current');
            el_editlayout_size_btns.eq(sizeId).addClass('current');
            currentSizeId = sizeId;
        } else {
            el_editlayout_size_btns.eq(currentSizeId).addClass('current');
        }

        el_editlayout_size_btns.each(function(){
            $(this).removeClass('disabled');
        });

        var row = posRow - 1;
        var col = posCol - 1;

        //当块大小为1x1时
        if(currentSizeId == 0){

            //判断1x2按钮是否可用
            if(checkPosOccupied(row + 1, col) && checkPosOccupied(row - 1, col)){
                el_editlayout_size_btns.eq(1).addClass('disabled');
            }

            //判断2x1按钮是否可用
            if(checkPosOccupied(row, col + 1) && checkPosOccupied(row, col - 1)) {
                el_editlayout_size_btns.eq(2).addClass('disabled');
            }

            //判断2x2按钮是否可用
            if((checkPosOccupied(row, col + 1) || checkPosOccupied(row + 1, col + 1) || checkPosOccupied(row + 1, col))
                && (checkPosOccupied(row, col + 1) || checkPosOccupied(row - 1, col + 1) || checkPosOccupied(row - 1, col))
                && (checkPosOccupied(row, col - 1) || checkPosOccupied(row - 1, col - 1) || checkPosOccupied(row - 1, col))
                && (checkPosOccupied(row, col - 1) || checkPosOccupied(row + 1, col - 1) || checkPosOccupied(row + 1, col))){

                el_editlayout_size_btns.eq(3).addClass('disabled');

            }

        } else if (currentSizeId == 1) { //当块大小为1x2时

            //判断2x1按钮是否可用
            if(checkPosOccupied(row, col + 1) && checkPosOccupied(row + 1, col + 1) && checkPosOccupied(row, col - 1) && checkPosOccupied(row + 1, col - 1)) {
                el_editlayout_size_btns.eq(2).addClass('disabled');
            }

            //判断2x2按钮是否可用
            if(!(!checkPosOccupied(row, col + 1) && !checkPosOccupied(row + 1, col + 1)) && !(!checkPosOccupied(row, col - 1) && !checkPosOccupied(row + 1, col - 1))) {
                el_editlayout_size_btns.eq(3).addClass('disabled');
            }
        } else if (currentSizeId == 2) { //当块大小为2x1时

            //判断1x2按钮是否可用
            if(checkPosOccupied(row + 1, col) && checkPosOccupied(row + 1, col + 1) && checkPosOccupied(row - 1, col) && checkPosOccupied(row - 1, col + 1)) {
                el_editlayout_size_btns.eq(1).addClass('disabled');
            }

            //判断2x2按钮是否可用
            if(!(!checkPosOccupied(row - 1, col) && !checkPosOccupied(row - 1, col + 1)) && !(!checkPosOccupied(row + 1, col) && !checkPosOccupied(row + 1, col + 1))) {
                el_editlayout_size_btns.eq(3).addClass('disabled');
            }
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
        } else {
            $('.appbtn').removeClass('sel');
        }
    };

    var setBlockCss = function() {
        var blockIndex = getBlockIndexById(selBlockId);
        var blockData = tempData.layout[blockIndex];
        var blockSizeClass = variables.getSizeClass(blockData.blockSize);
        var blockColorClass = variables.getColorClass(blockData.blockColor - 1);
        var blockPosColClass = 'bn-pos-col-' + blockData.blockPosCol;
        var blockPosRowClass = 'bn-pos-row-' + blockData.blockPosRow;
        var blockTypeClass = 'bn-layout-' + blockData.blockType;
        var blockClass = 'bn-block ' + blockSizeClass + ' ' + blockColorClass + ' ' + blockPosColClass + ' ' +
            blockPosRowClass + ' ' + blockTypeClass + ' ' + 'sel';

        $('#blockid_' + selBlockId).attr('class', blockClass);
    };

    var setBlockCssById = function(blockId){
        var blockIndex = getBlockIndexById(blockId);
        var blockData = tempData.layout[blockIndex];
        var blockSizeClass = variables.getSizeClass(blockData.blockSize);
        var blockColorClass = variables.getColorClass(blockData.blockColor - 1);
        var blockPosColClass = 'bn-pos-col-' + blockData.blockPosCol;
        var blockPosRowClass = 'bn-pos-row-' + blockData.blockPosRow;
        var blockTypeClass = 'bn-layout-' + blockData.blockType;
        var blockClass = 'bn-block ' + blockSizeClass + ' ' + blockColorClass + ' ' + blockPosColClass + ' ' +
            blockPosRowClass + ' ' + blockTypeClass;

        if(blockId == selBlockId) {
            blockClass += ' sel';
        }

        $('#blockid_' + blockId).attr('class', blockClass);
    }

    var setBlockApp = function(appId) {
        appData = $.grep(appListData, function(cur,i){
            return cur['bxAppId'] == appId;
        });
        var el_block = $('#blockid_'+selBlockId);
        el_block.find('.bn-title').html(appData[0].bxAppName);
        var iconClass = 'bn-icon iconfont ' + appData[0].appIcon;
        el_block.find('.bn-icon').attr('class',iconClass);
        el_block.find('.bn-text').html(appData[0].description);
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
            //console.log(thisDistance);
        });
        //获取最近ghostblock的id，通过id获得其row和col值
        var attrId = el_ghost_blocks.eq(targetId).attr('id').split('_');
        var rowId = attrId[1];
        var colId = attrId[2];
        var blockIndex = getBlockIndexById(selBlockId);
        var blockData = tempData.layout[blockIndex];
        var selblockSize = blockData.blockSize; //选中的块的大小
        var selBlockPosRow = blockData.blockPosRow; //选中块的行位置
        var selBlockPosCol = blockData.blockPosCol; //选中块的列位置
        if(rowId == 3 && (selblockSize == 1 || selblockSize == 3)) {
            rowId = 2;
        }
        if(colId == 5 && (selblockSize == 2 || selblockSize == 3)) {
            colId = 4;
        }

        /***********
        /* 移动块时被占据的块的移动控制
        ************/
        var targetRow = parseInt(rowId); //目标位置行
        var targetCol = parseInt(colId); //目标位置列
        var canMove = false; //选中的块可否移动

        //当目标位置不是当前选中块的基准位置时
        if(selBlockPosRow != targetRow || selBlockPosCol != targetCol) {
            //选中的块是1x1时+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if(selblockSize == 0) {
                var targetBlockInfo = getBlockInfoByPos(targetRow, targetCol);
                if(targetBlockInfo == false) { //目标位置为空
                    canMove = true;
                } else { //目标位置不为空
                    //相对位置信息
                    var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);

                    //目标位置有块的基准点
                    if(targetBlockInfo.blockStartsHere) {
                        //目标位置块大小1x1
                        if(targetBlockInfo.blockData.blockSize == 0) {
                            if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                            } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                            } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, -1, 0);
                            } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                            } else {
                                moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                            }
                            canMove = true;
                        }
                        //目标位置大小1x2
                        else if(targetBlockInfo.blockData.blockSize == 1) {
                            if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                                canMove = true;
                            } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                                canMove = true;
                            } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                                canMove = true;
                            } else {
                                if(selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol - 1)) {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                    canMove = true;
                                }
                            }
                        }
                        //目标位置大小2x1
                        else if(targetBlockInfo.blockData.blockSize == 2) {
                            if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                                canMove = true;
                            } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, -1, 0);
                                canMove = true;
                            } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                                canMove = true;
                            } else {
                                if(selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol)) {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                    canMove = true;
                                }
                            }
                        }
                        //目标位置大小2x2
                        else if(targetBlockInfo.blockData.blockSize == 3) {
                            if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                                canMove = true;
                            } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                                canMove = true;
                            } else {
                                if((selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ){
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                } else if((selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol))
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                ){
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol) && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow, selBlockPosCol)) {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                    canMove = true;
                                }
                            }
                        }
                    } else { //目标位置没有基准点
                        //目标位置基准点在左侧
                        if(targetBlockInfo.blockOffset == 'left') {
                            //大小为2x1
                            if(targetBlockInfo.blockData.blockSize == 2) {
                                if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2)) {
                                        moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol - 1);
                                        canMove = true;
                                    }
                                }
                            }
                            //大小为2x2
                            else if(targetBlockInfo.blockData.blockSize == 3) {
                                if((selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                    || (relInfo.relCol == 'left' && canStepLeft(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if((selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol))
                                    || (relInfo.relRow == 'down' && canStepDown(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1)) {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol - 1);
                                    canMove = true;
                                }
                            }
                        } else if(targetBlockInfo.blockOffset == 'topleft') { //目标位置在左上方
                            //大小为2x2
                            if(targetBlockInfo.blockData.blockSize == 3) {
                                if((relInfo.relCol == 'left' && canStepLeft(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if((relInfo.relRow == 'top' && canStepTop(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1)) {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow - 1, selBlockPosCol - 1);
                                    canMove = true;
                                }
                            }
                        } else if(targetBlockInfo.blockOffset == 'top') { //目标位置在上方
                            //大小为1x2
                            if(targetBlockInfo.blockData.blockSize == 1) {
                                if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else {
                                    if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    } else if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                                if(canStepRight(targetBlockInfo)
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo)
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                }
                            }
                        }
                    }
                }
            }
            //选中的块是1x2时+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            else if(selblockSize == 1) {
                var targetBlockInfo = getBlockInfoByPos(targetRow, targetCol);
                //目标位置下方位置的块信息
                var targetBlockBottomInfo = getBlockInfoByPos(targetRow + 1, targetCol);
                //向上移动一格
                if(targetRow == selBlockPosRow - 1 && targetCol == selBlockPosCol) {
                    //目标位置为空
                    if(!targetBlockInfo) {
                        canMove = true;
                    } else if(targetBlockInfo.blockStartsHere) {
                        var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);
                        if(targetBlockInfo.blockData.blockSize == 0) {//1x1
                            if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                            } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                            } else {
                                moveBlockBy(targetBlockInfo, 2, 0);
                            }
                            canMove = true;
                        } else if(targetBlockInfo.blockData.blockSize == 2) {//2x1
                            if(canStepRight(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol)) {
                                moveBlockBy(targetBlockInfo, 2, 0);
                                canMove = true;
                            }
                        }
                    } else {//块的基准点不在目标位置
                        if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                            if(canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol - 2)) {
                                moveBlockBy(targetBlockInfo, 2, 0);
                                canMove = true;
                            }
                        }
                    }
                }
                //向下移动一格
                else if(targetRow == selBlockPosRow + 1 && targetCol == selBlockPosCol) {
                    if(!targetBlockBottomInfo) {//位置为空
                        canMove = true;
                    } else if(targetBlockBottomInfo.blockStartsHere) {
                        var relInfo = getPosRelative(targetBlockBottomInfo, blockPosX, blockPosY);
                        if(targetBlockBottomInfo.blockData.blockSize == 0) {//1x1
                            if(relInfo.relCol == 'left' && canStepLeft(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockBottomInfo, 0, -1);
                            } else if(relInfo.relCol == 'right' && canStepRight(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockBottomInfo, 0, 1);
                            } else {
                                moveBlockBy(targetBlockBottomInfo, -2, 0);
                            }
                            canMove = true;
                        } else if(targetBlockBottomInfo.blockData.blockSize == 2) {//2x1
                            if(canStepRight(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockBottomInfo, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol)) {
                                moveBlockBy(targetBlockBottomInfo, -2, 0);
                            }
                        }
                    } else {
                        if(targetBlockBottomInfo.blockData.blockSize == 2) { //2x1
                            if(canStepLeft(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockBottomInfo, 0, -1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2)) {
                                moveBlockBy(targetBlockBottomInfo, -2, 0);
                                canMove = true;
                            }
                        }
                    }
                } else { //其它移动状态
                    if(!targetBlockInfo && !targetBlockBottomInfo) {
                        canMove = true;
                    } else if(targetBlockInfo.blockData == targetBlockBottomInfo.blockData) {
                        var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);
                        //1x2
                        if(targetBlockInfo.blockData.blockSize == 1) {
                            if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                            } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                            } else {
                                if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                } else if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                } else {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                }
                            }
                            canMove = true;
                        } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                            if(targetBlockInfo.blockStartsHere) {
                                if(canStepRight(targetBlockInfo)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2)
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                }
                            } else {
                                if(canStepLeft(targetBlockInfo)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2)
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        }
                    }
                    //目标位置下方位置的块不为空，上方也不为空，且是两个不同的块
                    else if(targetBlockInfo && targetBlockBottomInfo) {
                        var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);
                        var relBottomInfo = getPosRelative(targetBlockBottomInfo, blockPosX, blockPosY);
                        if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 0) { //1x1 & 1x1
                            if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                                moveBlockBy(targetBlockBottomInfo, 0, -1);
                                canMove = true;
                            } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockInfo, 0, 1);
                                moveBlockBy(targetBlockBottomInfo, 0, 1);
                                canMove = true;
                            } else {
                                if(selBlockPosRow == targetRow && selBlockPosCol == targetCol - 1) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(selBlockPosRow == targetRow && selBlockPosCol == targetCol + 1) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else if(targetBlockInfo.blockStartsHere && targetBlockBottomInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 1) { //1x1 & 1x2
                                if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1)){
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockBottomInfo, 0, -1);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1)) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        moveBlockBy(targetBlockBottomInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 2) { //1x1 & 2x1
                                if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && canStepRight(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 3) { //1x1 & 2x2
                                if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && canStepRight(targetBlockInfo) && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 0) { //2x1 & 1x1
                                if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                    || (canStepRight(targetBlockBottomInfo) && selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2)
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 2) { //2x1 & 2x1
                                if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2)
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 1) { //2x1 & 1x2
                                if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && canStepRight(targetBlockBottomInfo))
                                    || (canStepRight(targetBlockInfo) && selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1)
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 3) { //2x1 & 2x2
                                if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            }

                        } else if(targetBlockInfo.blockStartsHere && !targetBlockBottomInfo.blockStartsHere) {//1x1 && (2x1 || 2x2)
                            if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 2) { //1x1 & 2x1
                                if((canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && canStepLeft(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 1 && canStepLeft(targetBlockBottomInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 3) { //1x1 & 2x2
                                if((canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && canStepLeft(targetBlockInfo) && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2 && canStepLeft(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        } else if(!targetBlockInfo.blockStartsHere && targetBlockBottomInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 1 && targetBlockBottomInfo.blockData.blockSize == 0) { //1x2 & 1x1
                                if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                } else {
                                    if((selBlockPosRow == targetRow && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockBottomInfo, 0, -1);
                                        canMove = true;
                                    } else if((selBlockPosRow == targetRow && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        moveBlockBy(targetBlockBottomInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 1 && targetBlockBottomInfo.blockData.blockSize == 2) { //1x2 & 2x1
                                if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && canStepRight(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && canStepRight(targetBlockBottomInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3 && targetBlockBottomInfo.blockData.blockSize == 2) { //2x2 & 2x1
                                if(targetBlockInfo.blockData.blockPosCol == targetCol) {
                                    if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && canStepRight(targetBlockBottomInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        moveBlockBy(targetBlockBottomInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3 && targetBlockBottomInfo.blockData.blockSize == 0) { //2x2 & 1x1
                                if(targetBlockInfo.blockData.blockPosCol == targetCol) {
                                    if((canStepRight(targetBlockInfo) && canStepRight(targetBlockBottomInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && canStepRight(targetBlockBottomInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        moveBlockBy(targetBlockBottomInfo, 0, 1);
                                        canMove = true;
                                    }
                                } else if(targetBlockInfo.blockData.blockPosCol == targetCol - 1) {
                                    if((canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && canStepLeft(targetBlockBottomInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockBottomInfo, 0, -1);
                                        canMove = true;
                                    }
                                }
                            }
                        } else if(!targetBlockInfo.blockStartsHere && !targetBlockBottomInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 2) { //2x1 & 2x1
                                if((canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2)
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 3) { //2x1 & 2x2
                                if((canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3 && targetBlockBottomInfo.blockData.blockSize == 2) { //2x2 & 2x1
                                if((canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        }

                    }
                    else if(targetBlockInfo && !targetBlockBottomInfo) { //下方块为空
                        var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);
                        if(targetBlockInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0) { //1x1
                                if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo)){
                                     moveBlockBy(targetBlockInfo, -1, 0);
                                     canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow && selBlockPosCol == targetCol - 1) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow && selBlockPosCol == targetCol + 1) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                                if(canStepRight(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else {
                                    if((selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2)
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2)
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            }
                        } else { //基准点不在目标位置
                            if(targetBlockInfo.blockData.blockSize == 1) { //1x2
                                if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 1);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow && selBlockPosCol == targetCol + 1  && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1)){
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                                if(targetBlockInfo.blockData.blockPosCol == targetCol - 1) {
                                    if(canStepLeft(targetBlockInfo)
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2)
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    }
                                } else if(targetBlockInfo.blockData.blockPosCol == targetCol) {
                                    if(canStepRight(targetBlockInfo)
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2)
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else {
                                    if((selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2)
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2)
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    }
                                }
                            }
                        }
                    }
                    else if(!targetBlockInfo && targetBlockBottomInfo) { //目标位置为空，下方不为空
                        var relBottomInfo = getPosRelative(targetBlockBottomInfo, blockPosX, blockPosY);
                        if(targetBlockBottomInfo.blockStartsHere) { //基准点在目标下方位置
                            if(targetBlockBottomInfo.blockData.blockSize == 0) { //1x1
                                if(relBottomInfo.relCol == 'left' && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(relBottomInfo.relCol == 'right' && canStepRight(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                } else if(relBottomInfo.relRow == 'down' && canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    canMove = true;
                                } else {
                                    if(canStepLeft(targetBlockBottomInfo)) {
                                        moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    } else if(canStepRight(targetBlockBottomInfo)) {
                                        moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    } else if(canStepDown(targetBlockBottomInfo)) {
                                        moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    } else {
                                        moveBlockTo(targetBlockBottomInfo, selBlockPosRow + 1, selBlockPosCol);
                                    }
                                    canMove = true;
                                }
                            } else if(targetBlockBottomInfo.blockData.blockSize == 1) { //1x2
                                if(relBottomInfo.relCol == 'left' && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(relBottomInfo.relCol == 'right' && canStepRight(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow && selBlockPosCol == targetCol - 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1)) {
                                        moveBlockBy(targetBlockBottomInfo, 0, -1);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow && selBlockPosCol == targetCol + 1 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1)) {
                                        moveBlockBy(targetBlockBottomInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockBottomInfo.blockData.blockSize == 2) { //2x1
                                if(canStepRight(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    canMove = true;
                                } else if((selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2)
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2)
                                ) {
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockBottomInfo.blockData.blockSize == 3) { //2x2
                                if(canStepRight(targetBlockBottomInfo)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2)
                                ) {
                                    moveBlockBy(targetBlockBottomInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else { //基准点不在目标下方位置
                            if(targetBlockBottomInfo.blockData.blockSize == 2) { //2x1
                                if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    canMove = true;
                                } else {
                                    if((selBlockPosRow == targetRow || selBlockPosRow == targetRow + 1) && selBlockPosCol == targetCol - 2) {
                                        moveBlockBy(targetBlockBottomInfo, 0, -1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockBottomInfo.blockData.blockSize == 3) { //2x2
                                if(canStepLeft(targetBlockBottomInfo)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2)
                                ) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        }
                    }
                }
            }
            //当选中的块是2x1时
            else if(selblockSize == 2) {
                var targetBlockInfo = getBlockInfoByPos(targetRow, targetCol);
                //目标位置下方位置的块信息
                var targetBlockRightInfo = getBlockInfoByPos(targetRow, targetCol + 1);
                //向左移动一格
                if(targetRow == selBlockPosRow && targetCol == selBlockPosCol - 1) {
                    //目标位置为空
                    if(!targetBlockInfo) {
                        canMove = true;
                    } else if(targetBlockInfo.blockStartsHere) { //目标基准点在此位置
                        if(targetBlockInfo.blockData.blockSize == 0) { //1x1
                            if(canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                            } else if(canStepTop(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, -1, 0);
                            } else if(canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                            } else {
                                moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol + 1)
                            }
                            canMove = true;
                        } else if(targetBlockInfo.blockData.blockSize == 1) { //1x2
                            if(canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                                canMove = true;
                            } else if(canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol)) {
                                moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol + 1);
                            }
                        }
                    } else {
                        if(targetBlockInfo.blockData.blockSize == 1) { //1x2
                            if(canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                                canMove = true;
                            } else if(canStepTop(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, -1, 0);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 2, selBlockPosCol)) {
                                moveBlockTo(targetBlockInfo, selBlockPosRow - 1, selBlockPosCol + 1);
                            }
                        } else if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                            if(canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                                canMove = true;
                            } else if(canStepTop(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, -1, 0);
                                canMove = true;
                            } else if(canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                                canMove = true;
                            }
                        } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                            if(targetBlockInfo.blockData.blockPosRow == targetRow) {
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepDown(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                }
                            } else {
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                }
                            }
                        }
                    }
                }
                //向右移动一格
                else if(targetRow == selBlockPosRow && targetCol == selBlockPosCol + 1) {
                    if(!targetBlockRightInfo) {
                        canMove = true;
                    } else if(targetBlockRightInfo.blockStartsHere) {
                        if(targetBlockRightInfo.blockData.blockSize == 0) { //1x1
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                            } else if(canStepTop(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, -1, 0);
                            } else if(canStepDown(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 1, 0);
                            } else {
                                moveBlockTo(targetBlockRightInfo, selBlockPosRow, selBlockPosCol)
                            }
                            canMove = true;
                        } else if(targetBlockRightInfo.blockData.blockSize == 1) { //1x2
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                canMove = true;
                            } else if(canStepDown(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 1, 0);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol - 1)) {
                                moveBlockTo(targetBlockRightInfo, selBlockPosRow, selBlockPosCol);
                                canMove = true;
                            }
                        } else if(targetBlockRightInfo.blockData.blockSize == 2) { //2x1
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                canMove = true;
                            } else if(canStepTop(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, -1, 0);
                                canMove = true;
                            } else if(canStepDown(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 1, 0);
                                canMove = true;
                            }
                        } else if(targetBlockRightInfo.blockData.blockSize == 3) { //2x2
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                canMove = true;
                            } else if(canStepDown(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 1, 0);
                                canMove = true;
                            }
                        }
                    } else { //基准点不在此位置
                        if(targetBlockRightInfo.blockData.blockSize == 1) { //1x2
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                canMove = true;
                            } else if(canStepTop(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, -1, 0);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1)) {
                                moveBlockTo(targetBlockRightInfo, selBlockPosRow - 1, selBlockPosCol);
                            }
                        } else if(targetBlockRightInfo.blockData.blockSize == 3) { //2x2
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                canMove = true;
                            } else if(canStepTop(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, -1, 0);
                                canMove = true;
                            }
                        }
                    }
                }
                //其他移动状态
                else {
                    if(!targetBlockInfo && !targetBlockRightInfo) {
                        canMove = true;
                    } else if (targetBlockInfo.blockData == targetBlockRightInfo.blockData) {
                        var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);
                        if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                            if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, -1, 0);
                                canMove = true;
                            } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 1, 0);
                                canMove = true;
                            } else if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo) && !checkPosOccupied(targetRow - 1, targetCol - 3)){
                                moveBlockBy(targetBlockInfo, 0, -2);
                                canMove = true;
                            } else if(relInfo.relCol == 'right' && canStepRight(targetBlockInfo) && !checkPosOccupied(targetRow - 1, targetCol + 2)) {
                                moveBlockBy(targetBlockInfo, 0, 2);
                                canMove = true;
                            } else {
                                moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                canMove = true;
                            }
                        } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                            if(targetBlockInfo.blockStartsHere) {
                                if(canStepDown(targetBlockInfo)
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol)
                                ) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                } else if((selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                ){
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                } else if((selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                ){
                                    moveBlockBy(targetBlockInfo, 0, -2);
                                }
                            } else {
                                if(canStepTop(targetBlockInfo)
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol)
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                ){
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                } else if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                ){
                                    moveBlockBy(targetBlockInfo, 0, -2);
                                }
                            }
                        }
                    }
                    //目标位置的块不为空，右侧也不为空，且是两个不同的块
                    else if(targetBlockInfo && targetBlockRightInfo) {
                        var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);
                        var relRightInfo = getPosRelative(targetBlockRightInfo, blockPosX, blockPosY);
                        if(targetBlockInfo.blockStartsHere && targetBlockRightInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0 && targetBlockRightInfo.blockData.blockSize == 0) { //1x1 & 1x1
                                if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else {
                                    if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else {
                                        moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                        moveBlockTo(targetBlockRightInfo, selBlockPosRow, selBlockPosCol + 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 0 && targetBlockRightInfo.blockData.blockSize == 1) { //1x1 & 1x2
                                if(canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && canStepDown(targetBlockInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1 && canStepDown(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 1 && targetBlockRightInfo.blockData.blockSize == 0) { //1x2 & 1x1
                                if(canStepDown(targetBlockRightInfo) && canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && canStepDown(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && canStepDown(targetBlockInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 0 && targetBlockRightInfo.blockData.blockSize == 2) { //1x1 & 2x1
                                if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                    moveBlockTo(targetBlockRightInfo, selBlockPosRow, selBlockPosCol + 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 1 && targetBlockRightInfo.blockData.blockSize == 2) { //1x2 & 2x1
                                if(canStepLeft(targetBlockInfo) && canStepDown(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && canStepDown(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && canStepDown(targetBlockInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    }  else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 0 && targetBlockRightInfo.blockData.blockSize == 3) { //1x1 & 2x2
                                if(canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else if(canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepDown(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else {
                                    if(selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol) {
                                        if(canStepDown(targetBlockInfo)){
                                            if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                                moveBlockBy(targetBlockInfo, 1, 0);
                                                moveBlockBy(targetBlockRightInfo, 1, 0);
                                                canMove = true;
                                            } else if(canStepRight(targetBlockRightInfo)) {
                                                moveBlockBy(targetBlockInfo, 1, 0);
                                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                                canMove = true;
                                            }
                                        } else if(canStepLeft(targetBlockInfo)) {
                                            if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                                moveBlockBy(targetBlockInfo, 0, -1);
                                                moveBlockBy(targetBlockRightInfo, 1, 0);
                                                canMove = true;
                                            } else if(canStepRight(targetBlockRightInfo)) {
                                                moveBlockBy(targetBlockInfo, 0, -1);
                                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                                canMove = true;
                                            }
                                        }
                                    } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1){
                                        if(canStepDown(targetBlockRightInfo)) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if(canStepRight(targetBlockRightInfo)) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        }
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 1 && targetBlockRightInfo.blockData.blockSize == 1) { //1x2 & 1x2
                                if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol)
                                ) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 1 && targetBlockRightInfo.blockData.blockSize == 3) { //1x2 & 2x2
                                if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                ) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                }
                            }
                        } else if(targetBlockInfo.blockStartsHere && !targetBlockRightInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0) { //目标位置1x1
                                if(targetBlockRightInfo.blockData.blockSize == 1) { //目标右侧1x2
                                    if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && canStepTop(targetBlockInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    } else if((canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && canStepLeft(targetBlockInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && canStepLeft(targetBlockInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else if((canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && canStepTop(targetBlockInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && canStepTop(targetBlockInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else if((canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && canStepLeft(targetBlockInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 3) { //目标右侧2x2
                                    if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && canStepTop(targetBlockInfo) && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else if(canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else if(canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 1) { //目标位置1x2
                                if(targetBlockRightInfo.blockData.blockSize == 1) { //目标右侧1x2
                                    if((canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                        || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 3) { //目标右侧2x2
                                    if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    }
                                }
                            }
                        } else if(!targetBlockInfo.blockStartsHere && targetBlockRightInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 1) { //目标位置1x2
                                if(targetBlockRightInfo.blockData.blockSize == 0) { //目标右侧1x1
                                    if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    } else if(canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else if(canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 1) { //目标右侧1x2
                                    if((canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol) && canStepRight(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol) && canStepRight(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && canStepLeft(targetBlockInfo))
                                        || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && canStepLeft(targetBlockInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 2) { //目标右侧2x1
                                    if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    } else if((canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol) && canStepTop(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol) && canStepTop(targetBlockRightInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 3) { //目标右侧2x2
                                    //不需要处理
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2) { //目标位置2x1
                                if(targetBlockRightInfo.blockData.blockSize == 0) { //目标右侧1x1
                                    if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    } else {
                                        if(selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2)) {
                                            moveBlockBy(targetBlockInfo, -1, 0);
                                            moveBlockBy(targetBlockRightInfo, -1, 0);
                                            canMove = true;
                                        } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2)) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if(selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol && canStepLeft(targetBlockInfo)) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, -1, 0);
                                            canMove = true;
                                        } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol && canStepLeft(targetBlockInfo)) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        }
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 1) { //目标右侧1x2
                                    if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && canStepDown(targetBlockInfo))
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol + 1 && canStepDown(targetBlockInfo))
                                        || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1 && canStepDown(targetBlockRightInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if((canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                        || (canStepDown(targetBlockInfo) && selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                        || (canStepDown(targetBlockInfo) && selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 2) { //目标右侧2x1
                                    if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        moveBlockBy(targetBlockRightInfo, -1, 0);
                                        canMove = true;
                                    } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo)) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else {
                                        if(selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                            moveBlockBy(targetBlockInfo, -1, 0);
                                            moveBlockBy(targetBlockRightInfo, -1, 0);
                                            canMove = true;
                                        } else if(selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        }
                                    }
                                } else if(targetBlockRightInfo.blockData.blockSize == 3) { //目标右侧2x2
                                    if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1) && canStepDown(targetBlockInfo))
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol + 1 && canStepDown(targetBlockInfo))
                                        || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1 && canStepDown(targetBlockRightInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    } else if((canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        moveBlockBy(targetBlockRightInfo, 0, 1);
                                        canMove = true;
                                    } else if((canStepLeft(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1) && canStepLeft(targetBlockInfo))
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        moveBlockBy(targetBlockRightInfo, 1, 0);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3) { //目标位置2x2
                                if(targetBlockInfo.blockData.blockPosRow == targetRow) { //基准点在左侧
                                    if(targetBlockRightInfo.blockData.blockSize == 0) { //目标右侧1x1
                                        if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && canStepDown(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if((canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        } else if((canStepLeft(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        }
                                    } else if(targetBlockRightInfo.blockData.blockSize == 1) { //目标右侧1x2
                                        if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && canStepDown(targetBlockRightInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if((canStepLeft(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && canStepLeft(targetBlockInfo))
                                            || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 3 && !checkPosOccupied(selBlockPosRow, selBlockPosCol) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 3 && !checkPosOccupied(selBlockPosRow -2, selBlockPosCol) && canStepDown(targetBlockRightInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if((canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosRow == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1) && canStepDown(targetBlockInfo))
                                            || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1) && canStepDown(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        }
                                    } else if(targetBlockRightInfo.blockData.blockSize == 2) { //目标右侧2x1
                                        if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1 && canStepDown(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if((canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        }
                                    } else if(targetBlockRightInfo.blockData.blockSize == 3) { //目标右侧2x2
                                        if((canStepDown(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol + 1 && canStepDown(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        } else if((canStepDown(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 1, 0);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        } else if((canStepLeft(targetBlockInfo) && canStepDown(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1) && canStepLeft(targetBlockInfo))
                                            || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, 1, 0);
                                            canMove = true;
                                        }
                                    }
                                } else { //基准点在左上方
                                    if(targetBlockRightInfo.blockData.blockSize == 0) { //目标右侧1x1
                                        if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepTop(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, -1, 0);
                                            moveBlockBy(targetBlockRightInfo, -1, 0);
                                            canMove = true;
                                        } else if((canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, -1, 0);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        } else if(canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo)) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, -1, 0);
                                            canMove = true;
                                        } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        }
                                    } else if(targetBlockRightInfo.blockData.blockSize == 1) { //目标右侧1x2
                                        //不需要处理
                                    } else if(targetBlockRightInfo.blockData.blockSize == 2) { //目标右侧2x1
                                        if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepTop(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, -1, 0);
                                            moveBlockBy(targetBlockRightInfo, -1, 0);
                                            canMove = true;
                                        } else if((canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepRight(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, -1, 0);
                                            moveBlockBy(targetBlockRightInfo, 0, 1);
                                            canMove = true;
                                        } else if((canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                            || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                        ) {
                                            moveBlockBy(targetBlockInfo, 0, -1);
                                            moveBlockBy(targetBlockRightInfo, -1, 0);
                                            canMove = true;
                                        }
                                    } else if(targetBlockRightInfo.blockData.blockSize == 3) { //目标右侧2x2
                                        //不需要处理
                                    }
                                }
                            }
                        } else if(!targetBlockInfo.blockStartsHere && !targetBlockRightInfo.blockStartsHere) {
                            //1x2 & 1x2
                            if(targetBlockInfo.blockData.blockSize == 1 && targetBlockRightInfo.blockData.blockSize == 1) {
                                if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol)
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if((canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if((canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && cslBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                            //1x2 & 2x2
                            else if(targetBlockInfo.blockData.blockSize == 1 && targetBlockRightInfo.blockData.blockSize == 3) {
                                if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if((canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && canStepRight(targetBlockRightInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if((canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                            //2x2 & 1x2
                            else if(targetBlockInfo.blockData.blockSize == 3 && targetBlockRightInfo.blockData.blockSize == 1) {
                                if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if((canStepTop(targetBlockInfo) && canStepRight(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepRight(targetBlockRightInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if((canStepLeft(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && canStepLeft(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepLeft(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3 && targetBlockRightInfo.blockData.blockSize == 3) {
                                if((canStepTop(targetBlockInfo) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1 && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1 && canStepTop(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1) && canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepTop(targetBlockInfo))
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                }
                            }
                        }
                    }
                    //目标位置不为空，右侧为空
                    else if(targetBlockInfo && !targetBlockRightInfo) {
                        var relInfo = getPosRelative(targetBlockInfo, blockPosX, blockPosY);
                        if(targetBlockInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0) { //1x1
                                if(relInfo.relCol == 'left' && canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                } else {
                                    moveBlockTo(targetBlockInfo, selBlockPosRow, selBlockPosCol);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 1) { //1x2
                                if((relInfo.relCol == 'left' && canStepLeft(targetBlockInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if((relInfo.relRow == 'down' && canStepDown(targetBlockInfo))
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol)
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1)
                                ) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(targetBlockInfo.blockData.blockSize == 1) { //1x2
                                if((relInfo.relCol == 'left' && canStepLeft(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                ) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if((relInfo.relRow == 'top' && canStepTop(targetBlockInfo))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol)
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1)
                                ) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(relInfo.relRow == 'top' && canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                } else if(relInfo.relRow == 'down' && canStepDown(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 1, 0);
                                    canMove = true;
                                } else {
                                    if((selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol)
                                        || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 1)
                                    ){
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        canMove = true;
                                    } else if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol)
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 1)
                                    ){
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        canMove = true;
                                    }
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                                if(targetBlockInfo.blockData.blockPosRow == targetRow) {
                                    if(canStepDown(targetBlockInfo)
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                        || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol - 1)
                                    ) {
                                        moveBlockBy(targetBlockInfo, 1, 0);
                                        canMove = true;
                                    } else if(canStepLeft(targetBlockInfo)
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 3 && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                        || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 3 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    }
                                } else if(targetBlockInfo.blockData.blockPosRow == targetRow - 1) {
                                    if(canStepTop(targetBlockInfo)
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2))
                                        || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol - 1)
                                    ) {
                                        moveBlockBy(targetBlockInfo, -1, 0);
                                        canMove = true;
                                    } else if(canStepLeft(targetBlockInfo)
                                        || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 3 && !checkPosOccupied(selBlockPosRow, selBlockPosCol))
                                        || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 3 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol))
                                    ) {
                                        moveBlockBy(targetBlockInfo, 0, -1);
                                        canMove = true;
                                    }
                                }
                            }
                        }
                    }
                    //目标位置为空，右侧不为空
                    else if(!targetBlockInfo && targetBlockRightInfo) {
                        //TODO
                        var relRightInfo = getPosRelative(targetBlockRightInfo, blockPosX, blockPosY);
                        if(targetBlockRightInfo.blockStartsHere) {
                            if(targetBlockRightInfo.blockData.blockSize == 0) { //1x1
                                if(relRightInfo.relCol == 'right' && canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                } else if(relRightInfo.relRow == 'top' && canStepTop(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                } else if(relRightInfo.relRow == 'down' && canStepDown(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                } else{
                                    moveBlockTo(targetBlockRightInfo, selBlockPosRow, selBlockPosCol + 1)
                                }
                                canMove = true;
                            } else if(targetBlockRightInfo.blockData.blockSize == 1) { //1x2
                                if((relRightInfo.relCol == 'right' && canStepRight(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepDown(targetBlockRightInfo)
                                    || (selBlockPosRow == targetRow + 2 && (selBlockPosCol == targetCol || selBlockPosCol == targetCol - 1))
                                ) {
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                }
                            } else if(targetBlockRightInfo.blockData.blockSize == 2) { //2x1
                                if(canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if(relRightInfo.relRow == 'top' && canStepTop(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if(relRightInfo.relRow == 'down' && canStepDown(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else if((selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 1)
                                ) {
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if((selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 1)
                                ) {
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                }
                            } else if(targetBlockRightInfo.blockData.blockSize == 3) { //2x2
                                if(canStepDown(targetBlockRightInfo)
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                    || (selBlockPosRow == targetRow + 2 && selBlockPosCol == targetCol + 1)
                                ) {
                                    moveBlockBy(targetBlockRightInfo, 1, 0);
                                    canMove = true;
                                } else if(canStepRight(targetBlockRightInfo)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 3 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 3 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(targetBlockRightInfo.blockData.blockSize == 1) { //1x2
                                if(canStepRight(targetBlockRightInfo)
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if((canStepTop(targetBlockRightInfo))
                                    || (selBlockPosRow == targetRow - 2 && (selBlockPosCol == targetCol || selBlockPosCol == targetCol + 1))
                                ) {
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                }
                            } else if(targetBlockRightInfo.blockData.blockSize == 3) { //2x2
                                if(canStepTop(targetBlockRightInfo)
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1))
                                    || (selBlockPosRow == targetRow - 2 && selBlockPosCol == targetCol + 1)
                                ) {
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                } else if(canStepRight(targetBlockRightInfo)
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 3 && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 1))
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 3 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                        }
                    }
                }
            }
            //当选中的块是2x2时
            else if(selblockSize == 3) {

                var targetBlockInfo = getBlockInfoByPos(targetRow, targetCol);
                var targetBlockRightInfo = getBlockInfoByPos(targetRow, targetCol + 1);
                var targetBlockBottomInfo = getBlockInfoByPos(targetRow + 1, targetCol);
                var targetBlockBottomRightInfo = getBlockInfoByPos(targetRow + 1, targetCol + 1);

                //向左移动一格
                if(targetRow == selBlockPosRow && targetCol == selBlockPosCol - 1) {
                    if(!targetBlockInfo && !targetBlockBottomInfo) {
                        canMove = true;
                    } else if(targetBlockInfo.blockData == targetBlockBottomInfo.blockData) {
                        if(targetBlockInfo.blockData.blockSize == 1) { //1x2
                            if(canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                            } else {
                                moveBlockBy(targetBlockInfo, 0, 2);
                            }
                            canMove = true;
                        } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                            if(canStepLeft(targetBlockInfo)) {
                                moveBlockBy(targetBlockInfo, 0, -1);
                                canMove = true;
                            }
                        }
                    } else if(targetBlockInfo && !targetBlockBottomInfo) {
                        if(targetBlockInfo.blockStartsHere) { //基准点在此
                            if(targetBlockInfo.blockData.blockSize == 0) { //1x1
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                } else if(canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                } else {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                }
                                canMove = true;
                            }
                        } else {
                            if(targetBlockInfo.blockData.blockSize == 1) { //1x2
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 2, selBlockPosCol)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3) { //2x2
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        }
                    } else if(!targetBlockInfo && targetBlockBottomInfo) {
                        if(targetBlockBottomInfo.blockStartsHere) { //基准点在此
                            if(targetBlockBottomInfo.blockData.blockSize == 0) { //1x1
                                if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                } else if(canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                } else {
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                }
                                canMove = true;
                            } else if(targetBlockBottomInfo.blockData.blockSize == 1) { //1x2
                                if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow + 1, selBlockPosCol)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(targetBlockBottomInfo.blockData.blockSize == 2) { //2x1
                                if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    canMove = true;
                                }
                            } else if(targetBlockBottomInfo.blockData.blockSize == 3) { //2x2
                                if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        }
                    } else if(targetBlockInfo && targetBlockBottomInfo) {
                        if(targetBlockInfo.blockStartsHere && targetBlockBottomInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0 &&　targetBlockBottomInfo.blockData.blockSize == 0) { //1x1 & 1x1
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                } else if(canStepLeft(targetBlockInfo) && canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                } else if(canStepTop(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                } else {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                }
                                canMove = true;
                            } else if(targetBlockInfo.blockData.blockSize == 0 &&　targetBlockBottomInfo.blockData.blockSize == 1) { //1x1 & 1x2
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow + 1, selBlockPosCol)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        } else if(targetBlockInfo.blockStartsHere && !targetBlockBottomInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 2) { //1x1 & 2x1
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                } else if(canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 0 && targetBlockBottomInfo.blockData.blockSize == 3) { //1x1 & 2x2
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        } else if(!targetBlockInfo.blockStartsHere && targetBlockBottomInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 1 && targetBlockBottomInfo.blockData.blockSize == 0) { //1x2 && 1x1
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 2, selBlockPosCol)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 0) { //2x1 & 1x1
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 1) { //2x1 & 1x2
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 3 && targetBlockBottomInfo.blockData.blockSize == 0) { //2x2 & 1x1
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, 2);
                                    canMove = true;
                                }
                            }
                        } else if(!targetBlockInfo.blockStartsHere && !targetBlockBottomInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 1 && targetBlockBottomInfo.blockData.blockSize == 2) { //1x2 & 2x1
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockBottomInfo) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol)) {
                                    moveBlockBy(targetBlockInfo, 0, 2);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            } else if(targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 2) { //2x1 & 2x1
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                } else if(canStepLeft(targetBlockInfo) && canStepDown(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 1, 0);
                                    canMove = true;
                                } else if(canStepTop(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, -1, 0);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            } else if((targetBlockInfo.blockData.blockSize == 3 && targetBlockBottomInfo.blockData.blockSize == 2)
                                || (targetBlockInfo.blockData.blockSize == 2 && targetBlockBottomInfo.blockData.blockSize == 3)
                            ) { //(2x2 & 2x1) || (2x1 & 2x2)
                                if(canStepLeft(targetBlockInfo) && canStepLeft(targetBlockBottomInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                    moveBlockBy(targetBlockBottomInfo, 0, -1);
                                    canMove = true;
                                }
                            }
                        }
                    }
                }
                //向右移动一格
                else if(targetRow == selBlockPosRow && targetCol == selBlockPosCol + 1) {
                    if(!targetBlockRightInfo && !targetBlockBottomRightInfo) {
                        canMove = true;
                    } else if(targetBlockRightInfo.blockData == targetBlockBottomRightInfo.blockData) {
                        if(targetBlockRightInfo.blockData.blockSize == 1) { //1x2
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                            } else {
                                moveBlockBy(targetBlockRightInfo, 0, -2);
                            }
                            canMove = true;
                        } else if(targetBlockRightInfo.blockData.blockSize == 3) { //2x2
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                            }
                        }
                    } else if(targetBlockRightInfo && !targetBlockBottomRightInfo) {
                        if(targetBlockRightInfo.blockStartsHere) {
                            if(targetBlockRightInfo.blockData.blockSize == 0) { //1x1
                                if(canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                } else if(canStepTop(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                } else {
                                    moveBlockBy(targetBlockRightInfo, 0, -2);
                                }
                                canMove = true;
                            } else if(targetBlockRightInfo.blockData.blockSize == 2) { //2x1
                                if(canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepTop(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, -1, 0);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(targetBlockRightInfo.blockData.blockSize == 1) { //1x2
                                if(canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1)) {
                                    moveBlockBy(targetBlockRightInfo, 0, -2);
                                    canMove = true;
                                }
                            } else if(targetBlockRightInfo.blockData.blockSize == 3) { //2x2
                                if(canStepRight(targetBlockRightInfo)) {
                                    moveBlockBy(targetBlockRightInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                        }
                    } else if(!targetBlockRightInfo && targetBlockBottomRightInfo) {
                        if(targetBlockBottomRightInfo.blockStartsHere) {
                            if(targetBlockBottomRightInfo.blockData.blockSize == 0) { //1x1
                                if(canStepRight(targetBlockBottomRightInfo)) {
                                    moveBlockBy(targetBlockBottomRightInfo, 0, 1);
                                } else if(canStepDown(targetBlockBottomRightInfo)) {
                                    moveBlockBy(targetBlockBottomRightInfo, 1, 0);
                                } else {
                                    moveBlockBy(targetBlockBottomRightInfo, 0, -2);
                                }
                                canMove = true;
                            } else if(targetBlockBottomRightInfo.blockData.blockSize == 1) { //1x2
                                if(canStepRight(targetBlockBottomRightInfo)) {
                                    moveBlockBy(targetBlockBottomRightInfo, 0, 1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1)) {
                                    moveBlockBy(targetBlockBottomRightInfo, 0, -2);
                                    canMove = true;
                                }
                            } else if(targetBlockBottomRightInfo.blockData.blockSize == 2) { //2x1
                                if(canStepRight(targetBlockBottomRightInfo)) {
                                    moveBlockBy(targetBlockBottomRightInfo, 0, 1);
                                    canMove = true;
                                } else if(canStepDown(targetBlockBottomRightInfo)) {
                                    moveBlockBy(targetBlockBottomRightInfo, 1, 0);
                                    canMove = true;
                                }
                            } else if(targetBlockBottomRightInfo.blockData.blockSize == 3) { //2x2
                                if(canStepRight(targetBlockBottomRightInfo)) {
                                    moveBlockBy(targetBlockBottomRightInfo, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else {
                            //目前没有这种情况
                        }
                    } else if(targetBlockRightInfo && targetBlockBottomRightInfo) {
                        var tbr = targetBlockRightInfo;
                        var tbbr = targetBlockBottomRightInfo;
                        var tbrs = tbr.blockData.blockSize;
                        var tbbrs = tbbr.blockData.blockSize;
                        if(tbr.blockStartsHere && tbbr.blockStartsHere) {
                            if(tbrs == 0 && tbbrs == 0) { //1x1 & 1x1
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                } else if(canStepRight(tbr) && canStepDown(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 1, 0);
                                } else if(canStepTop(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, -1, 0);
                                    moveBlockBy(tbbr, 0, 1);
                                } else {
                                    moveBlockBy(tbr, 0, -2);
                                    moveBlockBy(tbbr, 0, -2);
                                }
                                canMove = true;
                            } else if(tbrs == 0 && tbbrs == 1) { //1x1 & 1x2
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1)) {
                                    moveBlockBy(tbr, 0, -2);
                                    moveBlockBy(tbbr, 0, -2);
                                    canMove = true;
                                }
                            } else if(tbrs == 0 && tbbrs == 2) { //1x1 & 2x1
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbr) && canStepDown(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 1, 0);
                                    canMove = true;
                                } else if(canStepTop(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, -1, 0);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, -2);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepDown(tbbr)) {
                                    moveBlockBy(tbr, 0, -2);
                                    moveBlockBy(tbbr, 1, 0);
                                    canMove = true;
                                }
                            } else if(tbrs == 0 && tbbrs == 3) { //1x1 & 2x2
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, -2);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                }
                            } else if(tbrs == 2 && tbbrs == 0) { //2x1 && 1x1
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbr) && canStepDown(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 1, 0);
                                    canMove = true;
                                } else if(canStepTop(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, -1, 0);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                }  else if(canStepRight(tbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, -2);
                                    canMove = true;
                                } else if(canStepTop(tbr)) {
                                    moveBlockBy(tbr, -1, 0);
                                    moveBlockBy(tbbr, 0, -2);
                                    canMove = true;
                                }
                            } else if(tbrs == 2 && tbbrs == 1) { //2x1 & 1x2
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbr) && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, -2);
                                    canMove = true;
                                }
                            } else if(tbrs == 2 && tbbrs == 2) { //2x1 & 2x1
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbr) && canStepDown(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 1, 0);
                                    canMove = true;
                                } else if(canStepTop(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, -1, 0);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                }
                            } else if(tbrs == 2 && tbrrs == 3) { //2x1 & 2x2
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else if(tbr.blockStartsHere && !tbbr.blockStartsHere) {
                            //没有此种情况
                        } else if(!tbr.blockStartsHere && tbbr.blockStartsHere) {
                            if(tbrs == 1 && tbbrs == 0) { //1x2 && 1x1
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(!checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1)) {
                                    moveBlockBy(tbr, 0, -2);
                                    moveBlockBy(tbbr, 0, -2);
                                    canMove = true;
                                }
                            } else if(tbrs == 1 && tbbrs == 2) { //1x2 && 2x1
                                if(canStepRight(tbr) && canStepRight(tbbr)) {
                                    moveBlockBy(tbr, 0, 1);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbbr) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1)) {
                                    moveBlockBy(tbr, 0, -2);
                                    moveBlockBy(tbbr, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else if(!tbr.blockStartsHere && !tbbr.blockStartsHere) {
                            //没有此种情况
                        }
                    }
                }
                //向上移动一格
                else if(targetRow == selBlockPosRow - 1 && targetCol == selBlockPosCol) {
                    if(!targetBlockInfo && !targetBlockRightInfo) {
                        canMove = true;
                    } else if(targetBlockInfo.blockData == targetBlockRightInfo.blockData) {
                        if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                            moveBlockBy(targetBlockInfo, 2, 0);
                            canMove = true;
                        }
                    } else if(targetBlockInfo && !targetBlockRightInfo) {
                        if(targetBlockInfo.blockStartsHere) {
                            if(targetBlockInfo.blockData.blockSize == 0) { //1x1
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                } else {
                                    moveBlockBy(targetBlockInfo, 2, 0);
                                }
                                canMove == true;
                            }
                        } else {
                            if(targetBlockInfo.blockData.blockSize == 2) { //2x1
                                if(canStepLeft(targetBlockInfo)) {
                                    moveBlockBy(targetBlockInfo, 0, -1);
                                } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol - 2)) {
                                    moveBlockBy(targetBlockInfo, 2, 0);
                                }
                            }
                        }
                    } else if(!targetBlockInfo && targetBlockRightInfo) {
                        if(targetBlockRightInfo.blockData.blockSize == 0) { //1x1
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                            } else {
                                moveBlockBy(targetBlockRightInfo, 2, 0);
                            }
                            canMove == true;
                        } else if(targetBlockRightInfo.blockData.blockSize == 2) { //2x1
                            if(canStepRight(targetBlockRightInfo)) {
                                moveBlockBy(targetBlockRightInfo, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol + 1)) {
                                moveBlockBy(targetBlockRightInfo, 2, 0);
                                canMove = true;
                            }
                        }
                    } else if(targetBlockInfo && targetBlockRightInfo) {
                        var tbi = targetBlockInfo;
                        var tbri = targetBlockRightInfo;
                        var tbs = tbi.blockData.blockSize;
                        var tbrs = tbri.blockData.blockSize;
                        if(tbs == 0 && tbrs == 0) { //1x1 & 1x1
                            if(canStepLeft(tbi) && canStepRight(tbri)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbri, 0, 1);
                                canMove = true;
                            } else {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbri, 2, 0);
                                canMove = true;
                            }
                        } else if(tbs == 0 && tbrs == 2) { //1x1 & 2x1
                            if(canStepLeft(tbi) && canStepRight(tbri)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbri, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol + 1)) {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbri, 2, 0);
                                canMove = true;
                            } else if(canStepRight(tbri)) {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbri, 0, 1);
                                canMove = true;
                            }
                        } else if(tbs == 2 && tbrs == 0) { //2x1 & 1x1
                            if(canStepLeft(tbi) && canStepRight(tbri)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbri, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol - 2)) {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbri, 2, 0);
                                canMove = true;
                            } else if(canStepLeft(tbi)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbri, 2, 0);
                                canMove = true;
                            }
                        } else if(tbs == 2 && tbrs == 2) { //2x1 & 2x1
                            if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow, selBlockPosCol + 1)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbri, 2, 0);
                                canMove = true;
                            } else if(canStepRight(tbri) && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 2)) {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbri, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow, selBlockPosCol + 1) && !checkPosOccupied(selBlockPosRow, selBlockPosCol - 2)) {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbri, 2, 0);
                                canMove = true;
                            }
                        }
                    }
                }
                //向下移动一格
                else if(targetRow == selBlockPosRow + 1 && targetCol == selBlockPosCol) {
                    if(!targetBlockBottomInfo && !targetBlockBottomRightInfo) {
                        canMove = true;
                    } else if(targetBlockBottomInfo.blockData == targetBlockBottomRightInfo.blockData) {
                        if(targetBlockBottomInfo.blockData.blockSize == 2) {
                            moveBlockBy(targetBlockBottomInfo, -2, 0);
                            canMove = true;
                        }
                    } else if(targetBlockBottomInfo && !targetBlockBottomRightInfo) {
                        if(targetBlockBottomInfo.blockData.blockSize == 0) { //1x1
                            if(canStepLeft(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockBottomInfo, 0, -1);
                            } else {
                                moveBlockBy(targetBlockBottomInfo, -2, 0);
                            }
                            canMove = true;
                        } else if(targetBlockBottomInfo.blockData.blockSize == 2) { //2x1
                            if(canStepLeft(targetBlockBottomInfo)) {
                                moveBlockBy(targetBlockBottomInfo, 0, -1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2)) {
                                moveBlockBy(targetBlockBottomInfo, -2, 0);
                                canMove = true;
                            }
                        }
                    } else if(!targetBlockBottomInfo && targetBlockBottomRightInfo) {
                        var tbbi = targetBlockBottomRightInfo;
                        var tbbs = tbbi.blockData.blockSize;
                        if(tbbs == 0) { //1x1
                            if(canStepRight(tbbi)) {
                                moveBlockBy(tbbi, 0, 1);
                            } else {
                                moveBlockBy(tbbi, -2, 0);
                            }
                            canMove = true;
                        } else if(tbbs == 2) { //2x1
                            if(canStepRight(tbbi)) {
                                moveBlockBy(tbbi, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 1 , selBlockPosCol + 1)) {
                                moveBlockBy(tbbi, -2, 0);
                                canMove = true;
                            }
                        }
                    } else if(targetBlockBottomInfo && targetBlockBottomRightInfo) {
                        var tbbi = targetBlockBottomInfo;
                        var tbbs = tbbi.blockData.blockSize;
                        var tbbri = targetBlockBottomRightInfo;
                        var tbbrs = tbbri.blockData.blockSize;
                        if(tbbs == 0 && tbbrs == 0) { //1x1 & 1x1
                            if(canStepLeft(tbbi) && canStepRight(tbbri)) {
                                moveBlockBy(tbbi, 0, -1);
                                moveBlockBy(tbbri, 0, 1);
                            } else {
                                moveBlockBy(tbbi, -2, 0);
                                moveBlockBy(tbbri, -2, 0);
                            }
                            canMove = true;
                        } else if(tbbs == 0 && tbbrs == 2) { //1x1 & 2x1
                            if(canStepLeft(tbbi) && canStepRight(tbbri)) {
                                moveBlockBy(tbbi, 0, -1);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                moveBlockBy(tbbri, -2, 0);
                                if(canStepLeft(tbbi)) {
                                    moveBlockBy(tbbi, 0, -1);
                                } else {
                                    moveBlockBy(tbbi, -2, 0);
                                }
                                canMove == true;
                            } else if(canStepRight(tbbri)) {
                                moveBlockBy(tbbi, -2, 0);
                                moveBlockBy(tbbri, 0, 1);
                            }
                        } else if(tbbs == 2 && tbbrs == 0) { //2x1 && 1x1
                            if(canStepLeft(tbbi) && canStepRight(tbbri)) {
                                moveBlockBy(tbbi, 0, -1);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2)) {
                                moveBlockBy(tbbi, -2, 0);
                                if(canStepRight(tbbri)) {
                                    moveBlockBy(tbbri, 0, 1);
                                } else {
                                    moveBlockBy(tbbri, -2, 0);
                                }
                                canMove == true;
                            } else if(canStepLeft(tbbi)) {
                                moveBlockBy(tbbi, 0, -1);
                                moveBlockBy(tbbri, -2, 0);
                                canMove = true;
                            }
                        } else if(tbbs == 2 && tbbrs == 2) { //2x1 & 2x1
                            if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2)  &&  !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                moveBlockBy(tbbi, -2, 0);
                                moveBlockBy(tbbri, -2, 0);
                                canMove = true;
                            } else if(!checkPosOccupied(selBlockPosRow - 1, selBlockPosCol - 2) && canStepRight(tbbri)) {
                                moveBlockBy(tbbi, -2, 0);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else if(canStepLeft(tbbi) && !checkPosOccupied(selBlockPosRow - 1, selBlockPosCol + 1)) {
                                moveBlockBy(tbbi, 0, -1);
                                moveBlockBy(tbbri, -2, 0);
                                canMove = true;
                            }
                        }
                    }
                }
                //向左上方移动一格
                else if(targetRow == selBlockPosRow - 1 && targetCol == selBlockPosCol - 1) {
                    var tbi =  targetBlockInfo;
                    var tbri = targetBlockRightInfo;
                    var tbbi = targetBlockBottomInfo;
                    if(!tbi && !tbri && !tbbi) {
                        canMove = true;
                    }
                    else if(tbi && !tbri && !tbbi) {
                        if(tbi.blockData.blockSize == 0) {
                            if(canStepLeft(tbi)) {
                                moveBlockBy(tbi, 0, -1);
                            } else {
                                moveBlockBy(tbi, 1, 2)
                            }
                            canMove = true;
                        } else if(tbi.blockData.blockSize == 2) {
                            if(canStepLeft(tbi)) {
                                moveBlockBy(tbi, 0, -1);
                                canMove = true;
                            }
                        }
                    }
                    else if(!tbi && tbri && !tbbi) {
                        if(tbri.blockData.blockSize == 0) {
                            moveBlockBy(tbri, 2, 0);
                            canMove = true;
                        } else if(tbri.blockData.blockSize == 2) { //2x1
                            if(canStepRight(tbri)) {
                                moveBlockBy(tbri, 0, 1);
                            } else {
                                moveBlockBy(tbri, 2, 0);
                            }
                            canMove = true;
                        }
                    }
                    else if(!tbi && !tbri && tbbi) {
                        if(tbbi.blockData.blockSize == 0) {
                            if(canStepLeft(tbbi)) {
                                moveBlockBy(tbbi, 0, -1);
                            } else {
                                moveBlockBy(tbbi, 0, 2);
                            }
                            canMove = true;
                        } else if(tbbi.blockData.blockSize == 2) {
                            if(canStepLeft(tbbi)) {
                                moveBlockBy(tbbi, 0, -1);
                                canMove = true;
                            }
                        }
                    }
                    else if(tbi.blockData == tbri.blockData) {
                        if(!tbbi) {
                            if(tbi.blockData.blockSize == 2) {
                                if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 4)) {
                                    moveBlockBy(tbi, 0, -2);
                                    canMove = true;
                                } else if(canStepRight(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol + 1)) {
                                    moveBlockBy(tbi, 0, 2);
                                    canMove = true;
                                } else {
                                    moveBlockBy(tbi, 2, 1);
                                }
                            }
                        } else {
                            if(tbbi.blockData.blockSize == 0) {
                                if(tbi.blockData.blockSize == 2) {
                                    if(canStepLeft(tbbi)) {
                                        if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 4)) {
                                            moveBlockBy(tbi, 0, -2);
                                            moveBlockBy(tbbi, 0, -1);
                                            canMove = true;
                                        } else if(canStepRight(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol + 1)) {
                                            moveBlockBy(tbi, 0, 2);
                                            moveBlockBy(tbbi, 0, -1);
                                            canMove = true;
                                        } else {
                                            moveBlockBy(tbi, 2, 1);
                                            moveBlockBy(tbbi, 0, -1);
                                            canMove = true;
                                        }
                                    } else {
                                        if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 4)) {
                                            moveBlockBy(tbi, 0, -2);
                                            moveBlockBy(tbbi, 0, 2);
                                            canMove = true;
                                        } else if(canStepRight(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol + 1)) {
                                            moveBlockBy(tbi, 0, 2);
                                            moveBlockBy(tbbi, 0, 2);
                                            canMove = true;
                                        } else {
                                            moveBlockBy(tbi, 2, 1);
                                            moveBlockBy(tbbi, 0, 2);
                                            canMove = true;
                                        }
                                    }

                                }
                            } else if(tbbi.blockData.blockSize == 2) {
                                if(canStepLeft(tbbi)) {
                                    if(canStepLeft(tbi)) {
                                        moveBlockBy(tbi, 0, -2);
                                        moveBlockBy(tbbi, 0, -1);
                                        canMove = true;
                                    } else if(canStepRight(tbi)) {
                                        moveBlockBy(tbi, 0, 2);
                                        moveBlockBy(tbbi, 0, -1);
                                        canMove = true;
                                    } else {
                                        moveBlockBy(tbi, 2, 1);
                                        moveBlockBy(tbbi, 0, -1);
                                        canMove = true;
                                    }
                                }
                            }
                        }
                    } else if(tbi.blockData == tbbi.blockData) {
                        if(!tbri) {
                            if(tbi.blockStartsHere) {
                                if(tbi.blockData.blockSize == 1) { //1x2
                                    if(canStepLeft(tbi)) {
                                        moveBlockBy(tbi, 0, -1);
                                        canMove = true;
                                    } else {
                                        moveBlockBy(tbi, 1, 2);
                                        canMove = true;
                                    }
                                }
                            } else {
                                if(tbi.blockData.blockSize == 3) { //2x2
                                    if(canStepLeft(tbi)) {
                                        moveBlockBy(tbi, 0, -1);
                                        canMove = true;
                                    }
                                }
                            }
                        } else {
                            if(tbri.blockData.blockSize == 0) {
                                if(tbi.blockStartsHere) {
                                    if(tbi.blockData.blockSize == 1) { //1x2
                                        if(canStepLeft(tbi)) {
                                            moveBlockBy(tbi, 0, -1);
                                            moveBlockBy(tbri, 2, 0);
                                            canMove = true;
                                        } else {
                                            moveBlockBy(tbi, 1, 2);
                                            moveBlockBy(tbri, 2, 0);
                                            canMove = true;
                                        }
                                    }
                                } else {
                                    if(tbi.blockData.blockSize == 3) { //2x2
                                        if(canStepLeft(tbi)) {
                                            moveBlockBy(tbi, 0, -1);
                                            moveBlockBy(tbri, 2, 0);
                                            canMove = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if(tbi && tbri && !tbbi) {
                        if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0) {
                            moveBlockBy(tbi, 2, 1);
                            moveBlockBy(tbri, 2, 1);
                            canMove = true;
                        }
                    }
                    else if(tbi && !tbri && tbbi) {
                        if(tbi.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0) {
                            if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbbi, 0, -1);
                                canMove = true;
                            } else {
                                moveBlockBy(tbi, 1, 2);
                                moveBlockBy(tbbi, 1, 2);
                                canMove = true;
                            }
                        } else if(tbi.blockData.blockSize == 0 && tbbi.blockData.blockSize == 2) { //1x1 & 2x1
                            if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbbi, 0, -1);
                                canMove = true;
                            } else if(canStepLeft(tbbi)) {
                                moveBlockBy(tbi, 1, 2);
                                moveBlockBy(tbbi, 0, -1);
                                canMove = true;
                            }
                        } else if(tbi.blockData.blockSize == 2 && tbbi.blockData.blockSize == 0) { //2x1 & 1x1
                            if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbbi, 0, -1);
                                canMove = true;
                            } else if(canStepLeft(tbi)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbbi, 0, 2);
                                canMove = true;
                            }
                        } else if(tbi.blockData.blockSize == 2 && tbbi.blockData.blockSize == 2) { //2x1 & 2x1
                            if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                moveBlockBy(tbi, 0, -1);
                                moveBlockBy(tbbi, 0, -1);
                                canMove = true;
                            }
                        }
                    }
                    else if(!tbi && tbri && tbbi) {
                        if(tbri.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0) {
                            if(canStepRight(tbri) && canStepLeft(tbbi)) {
                                moveBlockBy(tbri, 0, 1);
                                moveBlockBy(tbbi, 0, -1);
                            } else if(canStepLeft(tbbi)) {
                                moveBlockBy(tbbi, 0, -1);
                                moveBlockBy(tbri, 2, 0);
                            } else if(canStepRight(tbri)) {
                                moveBlockBy(tbbi, 0, 2);
                                moveBlockBy(tbri, 0, 1);
                            } else {
                                moveBlockBy(tbbi, 0, 2);
                                moveBlockBy(tbri, 2, 0);
                            }
                            canMove = true;
                        }
                    }
                    else if(tbi && tbri && tbbi) {
                        if(tbi.blockStartsHere) {
                            //1x1 & 1x1 & 1x1
                            if(tbi.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0) {
                                if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                    moveBlockBy(tbbi, 0, -1);
                                    moveBlockBy(tbri, 2, 0);
                                } else if(canStepLeft(tbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                    moveBlockBy(tbbi, 0, 2);
                                    moveBlockBy(tbri, 2, 0);
                                } else if(canStepLeft(tbbi)) {
                                    moveBlockBy(tbi, 1, 2);
                                    moveBlockBy(tbbi, 0, -1);
                                    moveBlockBy(tbri, 2, 0);
                                } else {
                                    moveBlockBy(tbi, 1, 2);
                                    moveBlockBy(tbbi, 1, 2);
                                    moveBlockBy(tbri, 2, 0);
                                }
                                canMove = true;
                            }
                            //1x1 & 2x1 & 1x1
                            else if(tbi.blockData.blockSize == 0 && tbbi.blockData.blockSize == 2 && tbri.blockData.blockSize == 0) {
                                if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                    moveBlockBy(tbbi, 0, -1);
                                    moveBlockBy(tbri, 2, 0);
                                    canMove = true;
                                } else if(canStepLeft(tbbi)) {
                                    moveBlockBy(tbi, 1, 2);
                                    moveBlockBy(tbbi, 0, -1);
                                    moveBlockBy(tbri, 2, 0);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(tbi.blockData.blockSize == 2 && tbbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0) {
                                if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                    moveBlockBy(tbbi, 0, -1);
                                    moveBlockBy(tbri, 2, 0);
                                    canMove = true;
                                } else if(canStepLeft(tbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                    moveBlockBy(tbbi, 0, 2);
                                    moveBlockBy(tbri, 2, 0);
                                    canMove = true;
                                }
                            } else if(tbi.blockData.blockSize == 2 && tbbi.blockData.blockSize == 2 && tbri.blockData.blockSize == 0) {
                                if(canStepLeft(tbi) && canStepLeft(tbbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                    moveBlockBy(tbbi, 0, -1);
                                    moveBlockBy(tbri, 2, 0);
                                    canMove = true;
                                }
                            }
                        }
                    }
                }
                //向右上方移动一格
                else if(targetRow == selBlockPosRow - 1 && targetCol == selBlockPosCol + 1) {
                    var tbi =  targetBlockInfo;
                    var tbri = targetBlockRightInfo;
                    var tbbri = targetBlockBottomRightInfo;
                    if(!tbi && !tbri && !tbbri) {
                        canMove = true;
                    }
                    else if(tbi && !tbri && !tbbri) {
                        if(tbi.blockData.blockSize == 0) { //1x1
                            moveBlockBy(tbi, 2, 0);
                            canMove = true;
                        } else if(tbi.blockData.blockSize == 2) {
                            moveBlockBy(tbi, 2, 0);
                            canMove = true;
                        }
                    }
                    else if(!tbi && tbri &&! tbbri) {
                        if(tbri.blockData.blockSize == 0) { //1x1
                            if(canStepRight(tbri)) {
                                moveBlockBy(tbri, 0, 1);
                                canMove = true;
                            } else {
                                moveBlockBy(tbri, 2, -1);
                                canMove = true;
                            }
                        } else if(tbri.blockData.blockSize == 2) { //2x1
                            if(canStepRight(tbri)) {
                                moveBlockBy(tbri, 0, 1);
                                canMove = true;
                            }
                        }
                    }
                    else if(!tbi && !tbri && tbbri) {
                        if(tbbri.blockData.blockSize == 0) {
                            if(canStepRight(tbbri)) {
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else {
                                moveBlockBy(tbbri, 0, -2);
                                canMove = true;
                            }
                        } else if(tbbri.blockData.blockSize == 2) {
                            if(canStepRight(tbbri)) {
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            }
                        }
                    }
                    else if(tbi.blockData == tbri.blockData) {
                        if(!tbbri) {
                            if(canStepRight(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol + 3)) {
                                moveBlockBy(tbi, 0, 2);
                            } else if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 2)){
                                moveBlockBy(tbi, 0, -2);
                            } else {
                                moveBlockBy(tbi, 2, -1);
                            }
                            canMove = true;
                        } else {
                            if(tbbri.blockData.blockSize == 0) {
                                if(canStepRight(tbbri)) {
                                    moveBlockBy(tbbri, 0, 1);
                                    if(canStepRight(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol + 3)) {
                                        moveBlockBy(tbi, 0, 2);
                                    } else if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 2)){
                                        moveBlockBy(tbi, 0, -2);
                                    } else {
                                        moveBlockBy(tbi, 2, -1);
                                    }
                                    canMove = true;
                                } else {
                                    moveBlockBy(tbbri, 0, -2);
                                    if(canStepRight(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol + 3)) {
                                        moveBlockBy(tbi, 0, 2);
                                    } else if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 2)){
                                        moveBlockBy(tbi, 0, -2);
                                    } else {
                                        moveBlockBy(tbi, 2, -1);
                                    }
                                    canMove = true;
                                }

                            } else if(tbbri.blockData.blockSize == 2) {
                                if(canStepRight(tbbri)) {
                                    if(canStepRight(tbbri) && canStepRight(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol + 3)) {
                                        moveBlockBy(tbi, 0, 2);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    } else if(canStepLeft(tbi) && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 2)){
                                        moveBlockBy(tbi, 0, -2);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    } else {
                                        moveBlockBy(tbi, 2, -1);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    }
                                }
                            }
                        }
                    } else if(tbri.blockData == tbbri.blockData) {
                        if(!tbi) {
                            if(tbri.blockData.blockSize == 1) { //1x1
                                if(canStepRight(tbri)) {
                                    moveBlockBy(tbri, 0, 1);
                                } else {
                                    moveBlockBy(tbri, 1, -2);
                                }
                                canMove = true;
                            } else if(tbri.blockData.blockSize == 3) { //2x2
                                if(canStepRight(tbri)) {
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(tbi.blockData.blockSize == 0) {
                                if(tbri.blockData.blockSize == 1) { //1x1
                                    moveBlockBy(tbi, 2, 0);
                                    if(canStepRight(tbri)) {
                                        moveBlockBy(tbri, 0, 1);
                                    } else {
                                        moveBlockBy(tbri, 1, -2);
                                    }
                                    canMove = true;
                                } else if(tbri.blockData.blockSize == 3) { //2x2
                                    if(canStepRight(tbri)) {
                                        moveBlockBy(tbri, 0, 1);
                                        moveBlockBy(tbi, 2, 0);
                                        canMove = true;
                                    }
                                }
                            }
                        }
                    }
                    else if(tbi && tbri && !tbbri) {
                        if(tbi.blockStartsHere) {
                            if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0) { //1x1 & 1x1
                                if(canStepRight(tbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                } else {
                                    moveBlockBy(tbi, 2, -1);
                                    moveBlockBy(tbri, 2, -1);
                                    canMove = true;
                                }
                            } else if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 2) { //1x1 & 2x1
                                if(canStepRight(tbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(tbi.blockData.blockSize == 2 && tbri.blockData.blockSize == 0) { //2x1 & 1x1
                                if(canStepRight(tbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                }
                            } else if(tbi.blockData.blockSize == 2 && tbri.blockData.blockSize == 2) { //2x1 & 2x1
                                if(canStepRight(tbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                }
                            }
                        }
                    }
                    else if(tbi && !tbri && tbbri) {
                        if(tbi.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) { //1x1 & 1x1
                            if(canStepRight(tbbri)) {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbbri, 0, -2);
                                canMove = true;
                            }
                        } else if(tbi.blockData.blockSize == 0 && tbbri.blockData.blockSize == 2) { //1x1 & 2x1
                            if(canStepRight(tbbri)) {
                                moveBlockBy(tbi, 2, 0);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            }
                        }
                    }
                    else if(!tbi && tbri && tbbri) {
                        if(tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) { //1x1 & 1x1
                            if(canStepRight(tbri) && canStepRight(tbbri)) {
                                moveBlockBy(tbri, 0, 1);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else {
                                moveBlockBy(tbri, 1, -2);
                                moveBlockBy(tbbri, 1, -2);
                                canMove = true;
                            }
                        } else if(tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 2) { //1x1 & 2x1
                            if(canStepRight(tbri) && canStepRight(tbbri)) {
                                moveBlockBy(tbri, 0, 1);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else if(canStepRight(tbbri)) {
                                moveBlockBy(tbri, 1, -2);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            }
                        } else if(tbri.blockData.blockSize == 2 && tbbri.blockData.blockSize == 0) { //2x1 & 1x1
                            if(canStepRight(tbri) && canStepRight(tbbri)) {
                                moveBlockBy(tbri, 0, 1);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else if(canStepRight(tbri)) {
                                moveBlockBy(tbri, 0, 1);
                                moveBlockBy(tbbri, 0, -2);
                                canMove = true;
                            }
                        } else if(tbri.blockData.blockSize == 2 && tbbri.blockData.blockSize == 2) { //2x1 & 2x1
                            if(canStepRight(tbri) && canStepRight(tbbri)) {
                                moveBlockBy(tbri, 0, 1);
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            }
                        }
                    }
                    else if(tbi && tbri && tbbri) {
                        if(tbi.blockStartsHere) {
                            if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                if(canStepRight(tbri) && canStepRight(tbbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    moveBlockBy(tbbri, 0, 1);
                                    canMove = true;
                                } else {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 1, -2);
                                    moveBlockBy(tbbri, 1, -2);
                                    canMove = true;
                                }
                            } else if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 2) { //1x1 & 1x1 & 2x1
                                if(canStepRight(tbri) && canStepRight(tbbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    moveBlockBy(tbbri, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 1, -2);
                                    moveBlockBy(tbbri, 0, 1);
                                    canMove = true;
                                }
                            } else if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 2 && tbbri.blockData.blockSize == 0) { //1x1 & 2x1 & 1x1
                                if(canStepRight(tbri) && canStepRight(tbbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    moveBlockBy(tbbri, 0, 1);
                                    canMove = true;
                                } else if(canStepRight(tbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    moveBlockBy(tbbri, 0, -2);
                                    canMove = true;
                                }
                            } else if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 2 && tbbri.blockData.blockSize == 2) { //1x1 & 2x1 & 2x1
                                if(canStepRight(tbri) && canStepRight(tbbri)) {
                                    moveBlockBy(tbi, 2, 0);
                                    moveBlockBy(tbri, 0, 1);
                                    moveBlockBy(tbbri, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(tbi.blockData.blockSize == 2) { //2x1
                                if(tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) { //1x1 & 1x1
                                    if(canStepRight(tbri) && canStepRight(tbbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 0, 1);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    } else if(canStepRight(tbbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 1, -2);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    } else if(canStepRight(tbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 0, 1);
                                        moveBlockBy(tbbri, -2, 0);
                                        canMove = true;
                                    }
                                } else if(tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 2) { //1x1 & 2x1
                                    if(canStepRight(tbri) && canStepRight(tbbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 0, 1);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    } else if(canStepRight(tbbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 1, -2);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    }
                                } else if(tbri.blockData.blockSize == 2 && tbbri.blockData.blockSize == 0) { //2x1 & 1x1
                                    if(canStepRight(tbri) && canStepRight(tbbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 0, 1);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    } else if(canStepRight(tbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 0, 1);
                                        moveBlockBy(tbbri, 0, -2);
                                        canMove = true;
                                    }
                                } else if(tbri.blockData.blockSize == 2 && tbbri.blockData.blockSize == 2) { //2x1 & 2x1
                                    if(canStepRight(tbri) && canStepRight(tbbri)) {
                                        moveBlockBy(tbi, 2, 0);
                                        moveBlockBy(tbri, 0, 1);
                                        moveBlockBy(tbbri, 0, 1);
                                        canMove = true;
                                    }
                                }
                            }
                        }
                    }
                }
                //向左下方移动一格
                else if(targetRow == selBlockPosRow + 1 && targetCol == selBlockPosCol - 1) {
                    var tbi =  targetBlockInfo;
                    var tbbi = targetBlockBottomInfo;
                    var tbbri = targetBlockBottomRightInfo;
                    if(!tbi && !tbbi && !tbbri) {
                        canMove = true;
                    } else if(tbi && !tbbi && !tbbri) {
                        //TODO
                    }
                }
                //向右下方移动一格
                else if(targetRow == selBlockPosRow + 1 && targetCol == selBlockPosCol + 1) {
                    var tbri =  targetBlockRightInfo;
                    var tbbi = targetBlockBottomInfo;
                    var tbbri = targetBlockBottomRightInfo;
                    if(!tbri && !tbbi && !tbbri) {
                        canMove = true;
                    } else if(tbri && !tbbi && !tbbri) {
                        //TODO
                    }
                }
                //其他移动方式
                else {
                    var tbi =  targetBlockInfo;
                    var tbri = targetBlockRightInfo;
                    var tbbi = targetBlockBottomInfo;
                    var tbbri = targetBlockBottomRightInfo;
                    if(!tbi && !tbri && !tbbi && !tbbri) {
                        canMove = true;
                    } else if(tbi && !tbri && !tbbi && !tbbri) {
                        if(tbi.blockStartsHere) {
                            if(tbi.blockData.blockSize == 0) { //1x1
                                if(canStepLeft(tbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                } else if(canStepTop(tbi)) {
                                    moveBlockBy(tbi, -1, 0);
                                } else {
                                    moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                }
                                canMove = true;
                            }
                        } else {
                            if(tbi.blockData.blockSize == 2) { //2x1
                                if(canStepLeft(tbi)) {
                                    moveBlockBy(tbi, 0, -1);
                                    canMove = true;
                                }
                            } else if(tbi.blockData.blockSize == 1) { //1x2
                                if(canStepLeft(tbi)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(targetRow - 2, targetCol - 2))
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol - 2)
                                ) {
                                    moveBlockBy(tbi, 0, -1);
                                    canMove = true;
                                }
                            }
                        }
                    } else if(!tbi && tbri && !tbbi && !tbbri) {
                        if(tbri.blockStartsHere) {
                            if(tbri.blockData.blockSize == 0) { //1x1
                                if(canStepRight(tbri)) {
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                } else {
                                    moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                    canMove = true;
                                }
                            } else if(tbri.blockData.blockSize == 2) { //2x1
                                if(canStepRight(tbri)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 3)
                                    || (selBlockPosRow == targetRow - 1 && selBlockPosCol == targetCol + 3)
                                ) {
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(tbri.blockData.blockSize == 1) { //1x2
                                if(canStepRight(tbri)
                                    || (selBlockPosRow == targetRow -1 && selBlockPosCol == targetCol + 2)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow - 2, selBlockPosCol - 1))
                                ) {
                                    moveBlockBy(tbri, 0, 1);
                                    canMove = true;
                                }
                            }
                        }
                    } else if(!tbi && !tbri && tbbi && !tbbri) {
                        if(tbbi.blockStartsHere) {
                            if(tbbi.blockData.blockSize == 0) { //1x1
                                if(canStepLeft(tbbi)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2)
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2)
                                ) {
                                    moveBlockBy(tbbi, 0, -1);
                                    canMove = true;
                                } else {
                                    moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                    canMove = true;
                                }
                            } else if(tbbi.blockData.blockSize == 1) { //1x2
                                if(canStepLeft(tbbi)
                                    || (selBlockPosRow == targetRow && selBlockPosCol == targetCol - 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol))
                                    || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol - 2)
                                ) {
                                    moveBlockBy(tbbi, 0, -1);
                                    canMove = true;
                                }
                            }
                        } else {
                            if(tbbi.blockData.blockSize == 1) { //1x2
                                if(canStepLeft(tbbi)) {
                                    moveBlockBy(tbbi, 0, -1);
                                    canMove = true;
                                }
                            }
                        }
                    } else if(!tbi && !tbri && !tbbi && tbbri) {
                        if(tbbri.blockData.blockSize == 0) { //1x1
                            if(canStepRight(tbbri)
                                || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2)
                                || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2)
                            ) {
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            } else {
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        } else if(tbbri.blockData.blockSize == 1) { //1x2
                            if(canStepRight(tbbri)
                                || (selBlockPosRow == targetRow && selBlockPosCol == targetCol + 2 && !checkPosOccupied(selBlockPosRow + 1, selBlockPosCol - 1))
                                || (selBlockPosRow == targetRow + 1 && selBlockPosCol == targetCol + 2)
                            ) {
                                moveBlockBy(tbbri, 0, 1);
                                canMove = true;
                            }
                        }
                    } else if(tbi && tbri && !tbbi && !tbbri) {
                        if(tbi.blockData == tbri.blockData) {
                            if(tbi.blockData.blockSize == 2) { //2x1
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                canMove = true;
                            }
                        } else {
                            if(tbi.blockData.blockSize == 0 &&　tbri.blockData.blockSize == 0){ //1x1 & 1x1
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    } else if(tbi && !tbri && tbbi && !tbbri) {
                        if(tbi.blockData == tbbi.blockData) {
                            if(tbi.blockData.blockSize == 1) { //1x2
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                canMove = true;
                            }
                        } else {
                            if(tbi.blockData == 0 && tbbi.blockData.blockSize == 0) { //1x1 & 1x1
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        }
                    } else if(tbi && !tbri && !tbbi && tbbri) {
                        if(tbi.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                            moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                            moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                            canMove = true;
                        }
                    } else if(!tbi && tbri && tbbi && !tbbri) {
                        if(tbri.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0) {
                            moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                            moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                            canMove = true;
                        }
                    } else if(!tbi && tbri && !tbbi && tbbri) {
                        if(tbri.blockData == tbbri.blockData) {
                            if(tbri.blockData.blockSize == 1) {
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1)
                            }
                        } else {
                            if(tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    } else if(!tbi && !tbri && tbbi && tbbri) {
                        if(tbbi.blockData == tbbri.blockData) {
                            if(tbbi.blockData.blockSize == 2) {
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        } else {
                            if(tbbi.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    } else if(tbi && tbri && tbbi && !tbbri) {
                        if(tbi.blockData == tbri.blockData) {
                            if(tbi.blockData.blockSize == 2 && tbbi.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        } else if(tbi.blockData == tbbi.blockData) {
                            if(tbi.blockData.blockSize == 1 && tbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                canMove = true;
                            }
                        } else {
                            if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    } else if(tbi && tbri && !tbbi && tbbri) {
                        if(tbi.blockData == tbri.blockData) {
                            if(tbi.blockData.blockSize == 2 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        } else if(tbri.blockData == tbbri.blockData) {
                            if(tbri.blockData.blockSize == 1 && tbi.blockData.blockSize == 0) {
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                canMove = true;
                            }
                        } else {
                            if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    } else if(tbi && !tbri && tbbi && tbbri) {
                        if(tbbi.blockData == tbbri.blockData) {
                            if(tbbi.blockData.blockSize == 2 && tbi.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        } else if(tbi.blockData == tbbi.blockData) {
                            if(tbi.blockData.blockSize == 1 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        } else {
                            if(tbi.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    } else if(!tbi && tbri && tbbi && tbbri) {
                        if(tbbi.blockData == tbbri.blockData) {
                            if(tbbi.blockData.blockSize == 2 && tbri.blockData.blockSize == 0) {
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        } else if(tbri.blockData == tbbri.blockData) {
                            if(tbri.blockData.blockSize == 1 && tbbi.blockData.blockSize == 0) {
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        } else {
                            if(tbri.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    } else if(tbi && tbri && tbbi && tbbri) {
                        if(tbi.blockStartsHere && tbi.blockData.blockSize == 3) { //4x4
                            moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                            canMove = true;
                        } else if(tbi.blockData == tbri.blockData && tbbi.blockData == tbbri.blockData) {
                            if(tbi.blockData.blockSize == 2 && tbbi.blockData.blockSize == 2) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosol);
                                canMove = true;
                            }
                        } else if(tbi.blockData == tbbi.blockData && tbri.blockData == tbbri.blockData) {
                            if(tbi.blockData.blockSize == 1 && tbri.blockData.blockSize == 1) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        } else if(tbi.blockData == tbri.blockData) {
                            if(tbi.blockData.blockSize == 2 && tbbi.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        } else if(tbbi.blockData == tbbri.blockData) {
                            if(tbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0 && tbbi.blockData.blockSize == 2) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                canMove = true;
                            }
                        } else if(tbi.blockData == tbbi.blockData) {
                            if(tbi.blockData.blockSize == 1 && tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        } else if(tbri.blockData == tbbri.blockData) {
                            if(tbi.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 1) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                canMove = true;
                            }
                        } else {
                            if(tbi.blockData.blockSize == 0 && tbbi.blockData.blockSize == 0 && tbri.blockData.blockSize == 0 && tbbri.blockData.blockSize == 0) {
                                moveBlockTo(tbi, selBlockPosRow, selBlockPosCol);
                                moveBlockTo(tbbi, selBlockPosRow + 1, selBlockPosCol);
                                moveBlockTo(tbri, selBlockPosRow, selBlockPosCol + 1);
                                moveBlockTo(tbbri, selBlockPosRow + 1, selBlockPosCol + 1);
                                canMove = true;
                            }
                        }
                    }
                }
            }

            if(canMove) {
                blockData.blockPosCol = targetCol;
                blockData.blockPosRow = targetRow;
                setBlockCss();
                selectBlock(selBlockId);
            }
        }

    }

    //根据位置获取占据此位置的块的信息
    var getBlockInfoByPos = function(row, col) {
        var getBlockInfo = function(row, col) {
            var thisBlockId = getBlockIdByPos(row, col);
            if(thisBlockId) {
                var thisBlockIndex = getBlockIndexById(thisBlockId);
                var thisBlockData = tempData.layout[thisBlockIndex];
                return {
                    blockStartsHere : true,
                    blockId : thisBlockId,
                    blockData : thisBlockData
                }
            } else {
                return false;
            }
        };

        //如果目标位置为空
        if(!checkPosOccupied(row - 1, col - 1)) {
            return false;
        } else {//目标位置不为空
            var thisBlockInfo = getBlockInfo(row, col);
            if(thisBlockInfo) {
                return thisBlockInfo;
            } else {
                var thisBlockLeftInfo = getBlockInfo(row, col - 1);
                var thisBlockTopLeftInfo = getBlockInfo(row - 1, col - 1);
                var thisBlockTopInfo = getBlockInfo(row - 1, col);
                //基准点在目标位置左侧，块大小2x1或2x2
                if(thisBlockLeftInfo && (thisBlockLeftInfo.blockData.blockSize == 2 || thisBlockLeftInfo.blockData.blockSize == 3)) {
                    return {
                        blockStartsHere : false,
                        blockOffset : 'left',
                        blockId : thisBlockLeftInfo.blockId,
                        blockData : thisBlockLeftInfo.blockData
                    }
                }
                //基准点在目标位置左上方，块大小2x2
                else if(thisBlockTopLeftInfo && thisBlockTopLeftInfo.blockData.blockSize == 3) {
                    return {
                        blockStartsHere : false,
                        blockOffset : 'topleft',
                        blockId : thisBlockTopLeftInfo.blockId,
                        blockData : thisBlockTopLeftInfo.blockData
                    }
                }
                //基准点在目标位置左上方，块大小1x2或2x2
                else if(thisBlockTopInfo && (thisBlockTopInfo.blockData.blockSize == 1 || thisBlockTopInfo.blockData.blockSize == 3)) {
                    return {
                        blockStartsHere : false,
                        blockOffset : 'top',
                        blockId : thisBlockTopInfo.blockId,
                        blockData : thisBlockTopInfo.blockData
                    }
                }
                return false;
            }
        }
    }

    //将对应blockInfo的块移动到rowPos，colPos
    var moveBlockTo = function(blockInfo, rowPos, colPos) {
        blockInfo.blockData.blockPosRow = parseInt(rowPos);
        blockInfo.blockData.blockPosCol = parseInt(colPos);
        setBlockCssById(blockInfo.blockId);
    }

    //将对应blockInfo的块水平移动stepX,垂直移动stepY
    var moveBlockBy = function(blockInfo, stepRow, stepCol) {
        blockInfo.blockData.blockPosRow = parseInt(blockInfo.blockData.blockPosRow) + parseInt(stepRow);
        blockInfo.blockData.blockPosCol = parseInt(blockInfo.blockData.blockPosCol) + parseInt(stepCol);
        setBlockCssById(blockInfo.blockId);
    }

    //判断被占据的块可否向左移动一格
    var canStepLeft = function(blockInfo) {
        _posRow = blockInfo.blockData.blockPosRow;
        _posCol = blockInfo.blockData.blockPosCol;
        if(blockInfo.blockData.blockSize == 0 || blockInfo.blockData.blockSize == 2) {//1x1或2x1
            if(!checkPosOccupied(_posRow - 1, _posCol - 2)) {
                return true;
            } else {
                return false;
            }
        } else {//1x2或2x2
            if(!checkPosOccupied(_posRow - 1, _posCol - 2) && !checkPosOccupied(_posRow, _posCol - 2)) {
                return true;
            } else {
                return false;
            }
        }
    }

    //判断被占据的块可否向右移动一格
    var canStepRight = function(blockInfo) {
        _posRow = blockInfo.blockData.blockPosRow;
        _posCol = blockInfo.blockData.blockPosCol;
        if(blockInfo.blockData.blockSize == 0) {//1x1
            if(!checkPosOccupied(_posRow - 1, _posCol)) {
                return true;
            } else {
                return false;
            }
        } else if(blockInfo.blockData.blockSize == 2) {//2x1
            if(!checkPosOccupied(_posRow - 1, _posCol + 1)) {
                return true;
            } else {
                return false;
            }
        } else if(blockInfo.blockData.blockSize == 1) {//1x2
            if(!checkPosOccupied(_posRow - 1, _posCol) && !checkPosOccupied(_posRow, _posCol)) {
                return true;
            } else {
                return false;
            }
        } else { //2x2
            if(!checkPosOccupied(_posRow - 1, _posCol + 1) && !checkPosOccupied(_posRow, _posCol + 1)) {
                return true;
            } else {
                return false;
            }
        }
    }

    //判断被占据的块可否向上移动一格
    var canStepTop = function(blockInfo) {
        _posRow = blockInfo.blockData.blockPosRow;
        _posCol = blockInfo.blockData.blockPosCol;
        if(blockInfo.blockData.blockSize == 0 || blockInfo.blockData.blockSize == 1) {//1x1或1x2
            if(!checkPosOccupied(_posRow - 2, _posCol - 1)) {
                return true;
            } else {
                return false;
            }
        } else {//2x1或2x2
            if(!checkPosOccupied(_posRow - 2, _posCol - 1) && !checkPosOccupied(_posRow - 2, _posCol)) {
                return true;
            } else {
                return false;
            }
        }
    }

    //判断被占据的块可否向下移动一格
    var canStepDown = function(blockInfo) {
        _posRow = blockInfo.blockData.blockPosRow;
        _posCol = blockInfo.blockData.blockPosCol;
        if(blockInfo.blockData.blockSize == 0) {//1x1
            if(!checkPosOccupied(_posRow, _posCol - 1)) {
                return true;
            } else {
                return false;
            }
        } else if(blockInfo.blockData.blockSize == 1){ //1x2
            if(!checkPosOccupied(_posRow + 1, _posCol - 1)) {
                return true;
            } else {
                return false;
            }
        } else if(blockInfo.blockData.blockSize == 2) {//2x1
            if(!checkPosOccupied(_posRow, _posCol - 1) && !checkPosOccupied(_posRow, _posCol)) {
                return true;
            } else {
                return false;
            }
        } else { //2x2
            if(!checkPosOccupied(_posRow + 1, _posCol - 1) && !checkPosOccupied(_posRow + 1, _posCol)) {
                return true;
            } else {
                return false;
            }
        }
    }

    //getRelativePos
    var getPosRelative = function(blockInfo, selBlockX, selBlockY){
        xRelative = 'left';
        yRelative = 'top';
        var el_targetBlock = $('#blockid_' + blockInfo.blockId);
        if(el_targetBlock.position().left > selBlockX) {
            xRelative = 'right';
        }
        if(el_targetBlock.position().top > selBlockY) {
            yRelative = 'down';
        }
        return {
            relRow : yRelative,
            relCol : xRelative
        }
    }

    //删除当前选中的块
    var deleteBlock = function() {
        var blockIndex = getBlockIndexById(selBlockId)
        $('#blockid_' + selBlockId).remove();

        //删除选择app弹窗中的已选状态
        var appId = tempData.layout[blockIndex].bxAppId;
        if(appId != ''){
            $('#appbtnid_' + appId).removeClass('used');
            $('#appbtnid_' + appId).removeClass('sel');
        }

        tempData.layout.splice(blockIndex,1);
        if(el_editlayout_content.find('.bn-block').length != 0){
            selBlockId = el_editlayout_content.find('.bn-block').eq(0).attr('id').split('_')[1];
            selectBlock(selBlockId);
        }
    };

    //计算块被占据的情况
    var caculateOccupiedState = function(){
        occupiedArray = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
        var layoutData = tempData.layout;
        for(var i = 0; i< layoutData.length; i++) {
            //判断块是否被占据
            var row = layoutData[i].blockPosRow - 1;
            var col = layoutData[i].blockPosCol - 1;
            var blockSize = layoutData[i].blockSize;
            occupiedArray[row][col] = 1;
            if(blockSize == 1) {
                if(row < 2){
                    occupiedArray[row+1][col] = 1;
                }
            } else if(blockSize == 2) {
                if(col < 4) {
                    occupiedArray[row][col+1] = 1;
                }
            } else if (blockSize == 3) {
                if(row < 2) {
                    occupiedArray[row+1][col] = 1;
                }
                if(col < 4) {
                    occupiedArray[row][col+1] = 1;
                    if(row < 2) {
                        occupiedArray[row+1][col+1] = 1;
                    }
                }
            }
        }
    }
    //判断某个位置是否被块占据
    var checkPosOccupied = function(row, col) {
        if(row < 0 || row > 2 || col < 0 || col > 4){
            return 1;
        } else {
            caculateOccupiedState();
            return occupiedArray[row][col];
        }
    }

    var setOccupied = function(row, col, blockSize) {
        occupiedArray[row][col] = 1;
        if(blockSize == 1) {
            occupiedArray[row+1][col] = 1;
        } else if(blockSize == 2) {
            occupiedArray[row][col+1] = 1;
        } else if (blockSize == 3) {
            occupiedArray[row+1][col] = 1;
            occupiedArray[row][col+1] = 1;
            occupiedArray[row+1][col+1] = 1;
        }
    }

    var checkOccupied = function(row, col, blockSize) {
        var isOcuppied = occupiedArray[row][col];
        if(blockSize == 1) {
            isOcuppied = isOcuppied || occupiedArray[row+1][col];
        } else if (blockSize == 2) {
            isOcuppied = isOcuppied || occupiedArray[row][col+1];
        } else if (blockSize == 3) {
            isOcuppied = isOcuppied ||occupiedArray[row+1][col] || occupiedArray[row][col+1] || occupiedArray[row+1][col+1];
        }
        return isOcuppied;
    }

    var checkSaveable = function(){
        var layoutData = tempData.layout;
        //console.log(JSON.stringify(layoutData));
        var result = true;
        var tiptext = '';
        var hasEmptyApp = false;
        var hasOccupied = false;
        var hasEmptyBlock = false;
        var el_blocks = el_editlayout_content.find('.bn-block');
        occupiedArray = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
        for(var i = 0; i < layoutData.length; i++) {
            //判断是否空布局
            if(layoutData[i].bxAppId == ''){
                hasEmptyApp = true;
            };

            //判断是否有重叠
            var row = layoutData[i].blockPosRow - 1;
            var col = layoutData[i].blockPosCol - 1;
            if(!checkOccupied(row, col, layoutData[i].blockSize)) {
                setOccupied(row, col, layoutData[i].blockSize);
            } else {
                hasOccupied = true;
            }
        }
        //console.log(occupiedArray);
        for(var i = 0; i < occupiedArray.length; i++) {
            for (var j = 0; j < occupiedArray[i].length; j++) {
                if(occupiedArray[i][j] == 0){
                    hasEmptyBlock = true;
                }
            }
        }

        //console.log(JSON.stringify(originData.layout));
        //console.log(JSON.stringify(tempData.layout));

        if(tempData.layout.length == 0) {
            tiptext = '布局为空，请先编辑布局';
            result = false;
        } else if(hasEmptyApp) {
            tiptext = '请先给空的块选则应用';
            result = false;
        } else if(_.isEqual(originData.layout,tempData.layout)) {
            tiptext = '布局未修改，无需保存';
            result = false;
        } else if(hasOccupied) {
            tiptext = '块有重叠，请调整后再保存';
            result = false;
        } else if(hasEmptyBlock) {
            tiptext = '请填满布局区域再保存';
            result = false;
        }

        if(result){
            return true;
        } else {
            el_body.trigger('ui.showtoptip',[tiptext,2000]);
            return false;
        }

    };

    return EditLayoutCtrl;

})();

module.exports = EditLayoutCtrl;
