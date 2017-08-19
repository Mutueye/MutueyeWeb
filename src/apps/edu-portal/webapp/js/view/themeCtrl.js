/* ==================================================================================
 * edu-portal: themeCtrl.js
 * 主题设置
 * ================================================================================== */

var ThemeCtrl = (function(){

    el_theme_boxes = $('.theme-box') //主题按钮们
    el_body = $('body');

    themes = ['theme1','theme2','theme3','theme4','theme5','theme6'];
    currentThemeId = null;

    //constructor
    function ThemeCtrl() {
        if(el_theme_boxes.length > 0){
            this.initLayout();
        }
    }

    ThemeCtrl.prototype.initLayout = function() {
        var base = this;
        el_theme_boxes.click(function(){
            themeId = $(this).index()
            //base.setTheme(themeId);
            el_body.trigger('data.changeTheme',[themeId]);
        });
        //base.setTheme(currentThemeId);
    };

    ThemeCtrl.prototype.setTheme = function(themeId) {
        if(currentThemeId != themeId) {
            $("body").removeClass(themes[currentThemeId]);
            el_theme_boxes.eq(currentThemeId).removeClass('sel');
            $("body").addClass(themes[themeId]);
            el_theme_boxes.eq(themeId).addClass('sel');
            currentThemeId = themeId;
        } else if(!$("body").hasClass(themes[themeId])) {
            $("body").addClass(themes[themeId]);
            el_theme_boxes.eq(themeId).addClass('sel');
        }
    }

    return ThemeCtrl;

})();

module.exports = ThemeCtrl;
