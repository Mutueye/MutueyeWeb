$(document).ready(function(){
    //app.getViewCtrl().getWinSize().height;

    //自适应高度
    setEmailHeight(app.getViewCtrl().getWinSize().height);
    $(window).resize(function() {
        setEmailHeight(app.getViewCtrl().getWinSize().height);
    });
    function setEmailHeight(h){
        $('.email-content').css({
            height : h
        });
    }





});
