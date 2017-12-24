$(document).ready(function(){

    //index-oa.js 对应修改了菜单数据json，使菜单中的我的任务和消息/通知按钮带上了id;
    //index-oa.html 增加了一些html内容，包含声音文件的引用和推送消息的容器
    //2017.12.16更新，通过localStorage共享变量，判断IM页面是否打开功能，如果打开，就不显示消息了，消息会在IM页面打开

    var $mission = $('#mission'); //我的任务的左侧菜单按钮
    var $notice = $('#notice'); //通知/公告的左侧菜单按钮
    var $messageTrain = $('.message-train'); //消息小火车

    var message_sound = document.getElementById("message_sound");

    var animSpeed = 20000 //单次动画(消息从右侧出现到左侧消失)时间,毫秒
    var animTimes = 3; //消息动画播放的次数，新消息持续显示的时间是animTimes*animSpeed
    var remainAnimTimes = animTimes; //用于保存剩余动画次数

    //读取localStorage里的im状态，判断im页面是否打开
    var imState = localStorage.getItem('im');
    if(imState == null) {
        imState == 'close';
    }

    //存储当前未读消息和通知的数量
    var unreadNums = {
        mission : 3,
        notice : 12
    };

    //更新右侧菜单未读通知/公告和未完成任务数量
    updateUnreadNums(unreadNums.mission, unreadNums.notice);

    //消息小火车位置初始化
    parkMessageTrain();
    //startMessageAnim();

    //鼠标放到消息上暂停动画，拿开鼠标动画继续
    $messageTrain.mouseover(function(){
        pauseMessageAnim();
    }).mouseout(function(){
        resumeMessageAnim();
    });

    function updateUnreadNums(num_mission, num_notice){
        updateNum(num_mission, $mission);
        updateNum(num_notice, $notice);
    }

    //设置菜单按钮上的数字
    function updateNum(num, $btn_el) {
        _num = parseInt(num);
        if(num > 0) {
            if($btn_el.find('.nums').length > 0) {
                $btn_el.find('.nums').eq(0).html(num);
            } else {
                $btn_el.append('<div class="nums">' + num + '</div>');
            }
        } else {
            $btn_el.find('.nums').remove();
        }
    }

    //添加一个新消息
    //type :"新任务"、"新通知"、"新公告"、"紧急任务"
    //content : 消息文字内容
    //link : 消息链接
    function addOneMessage(type, content, link) {

        var messageHtml= '<div class="message-item"><div class="message-item-head">' + type + '</div>';

        //更新菜单按钮右侧数字
        if(type == "新任务" || type == "紧急任务") {
            unreadNums.mission += 1;
            updateNum(unreadNums.mission, $mission);
            if(type == "紧急任务") {
                messageHtml = '<div class="message-item"><div class="message-item-head bg-red-intense">' + type + '</div>';
            }
        } else {
            unreadNums.notice += 1;
            updateNum(unreadNums.notice, $notice);
        }

        if(link) {
            messageHtml += '<a href="' + link + '" class="message-item-body">' + content + '</div></div>';
        } else {
            messageHtml += '<div class="message-item-body">' + content + '</div></div>';
        }

        //如果即时通讯页没打开，则OA播放消息动画
        if(imState == 'close') {
            $messageTrain.prepend(messageHtml);

            remainAnimTimes = animTimes;
            parkMessageTrain();
            startMessageAnim();

            playMessageSound();
        }

    }

    //清楚消息内容
    function clearMessageTrain(){
        $messageTrain.html('');
    }

    //开始播放动画
    function startMessageAnim(){
        parkMessageTrain();
        $messageTrain.stop().animate({'left':getEndPosition() + 'px'}, animSpeed, 'linear', animCountdown);
    }

    //暂停动画
    function pauseMessageAnim(){
        $messageTrain.stop();
    }

    //继续动画
    function resumeMessageAnim(){
        $messageTrain.stop().animate({'left':getEndPosition() + 'px'}, getRemainAnimTime(), 'linear', animCountdown);
    }

    //暂停后继续播放动画时，获取播放动画需要的剩余时间，以保持动画速度不变
    function getRemainAnimTime() {
        var currentPosition = parseFloat($messageTrain.css('left'));
        var trainWidth = $messageTrain.innerWidth();
        return parseFloat(animSpeed*(currentPosition + trainWidth)/(getWinWidth() + trainWidth));
    }

    //动画播放次数倒计时
    function animCountdown(){
        if(remainAnimTimes > 1) {
            remainAnimTimes -= 1;
            startMessageAnim();
        } else {
            parkMessageTrain();
            remainAnimTimes = animTimes;
            clearMessageTrain();
        }
    }

    //获取浏览器窗口显示区域宽度
    function getWinWidth(){
        return app.getViewCtrl().getWinSize().width;
    }

    //获取动画结束位置
    function getEndPosition(){
        return -1*$messageTrain.innerWidth();
    }

    //将消息小火车停到右侧初始位置
    function parkMessageTrain(){
        $messageTrain.css('left',getWinWidth() + 'px');
    }

    //播放提示音
    function playMessageSound() {
        message_sound.pause();
        message_sound.currentTime = 0;
        message_sound.play();
    }



    //以下为模拟新消息过来时的使用示范===========================================================
    //当上一个消息还在播放中，又来一个新消息时，会重新播放消息动画，两条消息一起滚动，这种情况出现的概率非常小

    //通过storage事件判断localStorage中im的状态
    console.log("im页面是否打开：" + imState);
    if(window.addEventListener){
        window.addEventListener("storage",handle_storage,false);
    }else if(window.attachEvent){
        window.attachEvent("onstorage",handle_storage);
    }
    function handle_storage(e){
        if(!e){
            e=window.event;
        }
        if(localStorage.getItem('im') != imState) {
            imState = localStorage.getItem("im");
            console.log("im页面是否打开：" + imState);
        }
    }


    setTimeout(example_message_1, 5000);
    setTimeout(example_message_2, 80000);
    setTimeout(example_message_2, 160000);
    function example_message_1(){
        addOneMessage('紧急任务','请借我10个比特币','/html/index-oa.html#oa-personal-mission.html');

    }
    function example_message_2(){
        addOneMessage('新通知','震惊！明天我们将继续加班','/html/index-oa.html#oa-personal-notice.html');
    }
    function example_message_3(){
        addOneMessage('新公告','19大期间科学上网软件都将不再好用','/html/index-oa.html#oa-personal-notice.html');
    }




});
