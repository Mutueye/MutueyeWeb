/* ==================================================================================
 * topbarCtrl.js
 * 顶部菜单栏控制
 * ================================================================================== */

var SidebarCtrl = (function(){

    var el_sidebar = $('.sidebar');
    var el_btn_totop = $('#btn_totop');

    function SidebarCtrl() {
        this.initLayout();
    }

    SidebarCtrl.prototype.initLayout = function(){
        var base = this;
        
        var onToTopBtnShow = function(){
            el_sidebar.addClass('totop-show');
        }
        
        var onToTopBtnHide = function(){
            el_sidebar.removeClass('totop-show');
        }
        
        el_btn_totop.toTop({
            toggleClass : 'totop-show',
            checkNecessary : false,
            onToTopShow : onToTopBtnShow,
            onToTopHide : onToTopBtnHide
        });
        
    };

    return SidebarCtrl;

})();

module.exports = SidebarCtrl;
