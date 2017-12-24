$(document).ready(function(){
    //app.getViewCtrl().getWinSize().height;

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
