/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms

var ViewCtrl = require('./view/viewCtrl');
var FrameAnim = require('./libs/frame-animation');


var Webapp = (function(){

    attachFastClick(document.body);
    var viewCtrl = new ViewCtrl();

    const SHAKE_SPEED = 200;
    let lastTime = 0;//上次变化的时间
    let x = y = z = lastX = lastY = lastZ = 0;//位置变量初始化

    let ani = null;
    let animReady = false;
    let isPlaying = false;

    function Webapp(){
        ion.sound({
            sounds: [
                {
                    name: "shaking",
                    loop: true
                },
                {
                    name: "button_tiny",
                    loop: true
                }
            ],
            volume: 1,
            path: "../sound/", // my test URL
            preload: true,
            multiplay: false,
            // 保证音频加载完成
            ready_callback: () => {
                play_animation();
            }
        });
    }

    function play_animation() {
        var framesUrl = [];
        for (let i = 0; i < 22; i++) {
            framesUrl.push('../images/anim_' + i + '.jpg');
        }

        // frame animation
        ani = new FrameAnim({
            canvasTargetId: "mainCanvas", // target canvas ID
            framesUrl: framesUrl, // frames url
            loop: false, // if loop
            height: 512, // source image's height (px)
            width: 512, // source image's width (px)
            frequency: 10, // count of frames in one second
            onComplete: function () { // complete callback
                console.log("Animation end.");
                isPlaying = false;
                $('#loading').html('摇一摇召唤火龙')
            },
        });

        // preload & play
        ani.initialize(() => {
            //$("#loading").hide();
            //ani.play();
            animReady = true;
            $('#loading').html('摇一摇召唤火龙')
            if(window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', motionHandler, false);
            } else {
                alert("你的设备不支持位置感应");
            }
            //ion.sound.play("shaking");
        });
    }

    function  motionHandler(event) {
      let acceleration = event.accelerationIncludingGravity;
      let curTime = Date.now();//取得当前时间
      if ((curTime - lastTime) > 120) {
        let diffTime = curTime - lastTime;
        lastTime = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        //计算摇动速度
        let speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000;
        if (speed > SHAKE_SPEED) {
          $('#loading').html('')
          //window.navigator.vibrate(2000)
          if(!isPlaying) {
              ani.reset();
              ani.play();
              ion.sound.play("button_tiny")
              isPlaying = true
          }
        } else {
            //$('#loading').html('no')
            //window.navigator.vibrate(0)
            if(speed < SHAKE_SPEED*0.1) ion.sound.stop("button_tiny")
        }
        lastX = x;
        lastY = y;
        lastZ = z;
      }
    }

    Webapp.prototype.getViewCtrl = function(){
        return viewCtrl;
    }

    return Webapp;

})();

$(document).ready(function(){
    window.app = new Webapp();
});
