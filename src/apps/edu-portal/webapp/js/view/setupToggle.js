/* ==================================================================================
 * edu-portal: setupToggle.js
 * 设置切换
 * ================================================================================== */

var SetupToggle = (function(){

    el_setup_btns = $('.setup_toggle_btn') //切换按钮们
    el_layout_content = $('#layout_content');


    setupContents = ['#theme_content','#layout_content'];
    currentSetupContentId = 0;

    //constructor
    function SetupToggle() {
        this.initLayout();
    }

    SetupToggle.prototype.initLayout = function() {
        var base = this;

        el_layout_content.perfectScrollbar({
            suppressScrollX:true
        });

        el_setup_btns.click(function(){
            setupContentId = $(this).index()
            base.setSetupContent(setupContentId);
            if(setupContents[setupContentId] == '#layout_content') {
                el_layout_content.perfectScrollbar('update');
            }
        })

        base.setSetupContent(currentSetupContentId);
    };

    //
    SetupToggle.prototype.setSetupContent = function(setupContentId) {
        if(currentSetupContentId != setupContentId) {
            $(setupContents[currentSetupContentId]).removeClass("current-container");
            el_setup_btns.eq(currentSetupContentId).removeClass('sel');
            $(setupContents[setupContentId]).addClass("current-container");
            el_setup_btns.eq(setupContentId).addClass('sel');
            currentSetupContentId = setupContentId;
        } else if(!$("body").hasClass(themes[setupContentId])) {
            $(setupContents[setupContentId]).addClass("current-container");
            el_setup_btns.eq(setupContentId).addClass('sel');
        }
    }

    return SetupToggle;

})();

module.exports = SetupToggle;
