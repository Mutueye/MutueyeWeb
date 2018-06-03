/* ==================================================================================
 * mainStage.js
 * 3D场景控制
 * ================================================================================== */

var Stage3D = (function(){
    var mainStage = new C3D.Stage();
    var myCube = new C3D.Skybox();

    var lastMouseX = 0;
    var lastMouseY = 0;
    var curMouseX = 0;
    var curMouseY = 0;
    var lastAngleX = 0;
    var lastAngleY = 0;
    var angleX = 0;
    var angleY = 0;
    var lastMoveEvt = null;
    var frameTimer;
    var timeoutTimer;

    //刷新场景
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
        setTimeout(callback, 1000 / 60);
    };

    function Stage3D() {
        this.initStage();
    }

    Stage3D.prototype.initStage = function(){
        create3D();
        this.resize();
        $('#main').on("mousedown touchstart", mouseDownHandler);
        $('#main').on("mouseup touchend", mouseUpHandler);
    };

    //响应屏幕调整尺寸
    Stage3D.prototype.resize = function() {
        mainStage.size(window.innerWidth, window.innerHeight).update();
    }

    var create3D = function() {
        mainStage.size(window.innerWidth, window.innerHeight).material({
            color: "#f0f0f0"
        }).update();
        document.getElementById('main').appendChild(mainStage.el);

        //创建1个立方体放入场景
        myCube.size(1024, 1024, 1024).position(0, 0, 0).material({
            front: {image: "dist/images/boxes/skybox_FR.jpg"},
            back: {image: "dist/images/boxes/skybox_BK.jpg"},
            left: {image: "dist/images/boxes/skybox_RT.jpg"},
            right: {image: "dist/images/boxes/skybox_LF.jpg"},
            up: {image: "dist/images/boxes/skybox_UP.jpg"},
            down: {image: "dist/images/boxes/skybox_DN.jpg"},
        }).update();
        mainStage.addChild(myCube);
    }



    var mouseDownHandler = function(evt) {
        console.log(evt)
        lastMouseX = evt.pageX || evt.originalEvent.touches[0].pageX;
        lastMouseY = evt.pageY || evt.originalEvent.touches[0].pageY;
        lastAngleX = angleX;
        lastAngleY = angleY;
        curMouseX = evt.pageX || evt.originalEvent.touches[0].pageX;
        curMouseY = evt.pageY || evt.originalEvent.touches[0].pageY;
        lastMoveEvt = evt;

        clearTimeout(timeoutTimer);

        $('#main').on("mousemove touchmove", mouseMoveHandler);
        window.cancelAnimationFrame(frameTimer);
        frameTimer = requestAnimationFrame(go);
    }

    var mouseMoveHandler = function(evt) {
        curMouseX = evt.pageX || evt.originalEvent.touches[0].pageX;
        curMouseY = evt.pageY || evt.originalEvent.touches[0].pageY;
        lastMoveEvt = evt;
    }

    var mouseUpHandler = function(evt) {
        curMouseX = lastMoveEvt.pageX || lastMoveEvt.originalEvent.touches[0].pageX;
        curMouseY = lastMoveEvt.pageY || lastMoveEvt.originalEvent.touches[0].pageY;

        $('#main').unbind("mousemove touchmove");

        timeoutTimer = setTimeout(function(){
            window.cancelAnimationFrame(frameTimer);
        }, 2500);
    }


    var go = function() {
        angleX += (curMouseX - lastMouseX + lastAngleX - angleX) * 0.1;
        angleY += (curMouseY - lastMouseY + lastAngleY - angleY) * 0.1;
        angleY = Math.max(-80, Math.min(80, angleY));

        mainStage.camera.rotation(-0.1*angleY, angleX*0.2, 0).updateT();

        frameTimer = requestAnimationFrame(go);
    }

    return Stage3D;

})();

module.exports = Stage3D;
