/* ==================================================================================
 * iframeLinker.js
 * 链接iframe内容
 * ================================================================================== */

var IFrameLinker = (function(){
    
    var el_body = $('body');

    //constructor
    function IFrameLinker() {}
    
    IFrameLinker.prototype.setIframeLinks = function(){
        $('[data-toggle="iframelinker"]').each(function(){
            $(this).on('click tap', function(){
                var selecter = $(this).attr('data-target');
                var iframelink = $(this).attr('data-link');
                $(selecter).attr("src",iframelink);
                if($(this).attr("data-target-menu")) {
                    //触发修改菜单当前选择按钮
                    var target_menu = $(this).attr("data-target-menu");
                    if(target_menu != "") {
                        el_body.trigger('tmenu.changeSel',[$(target_menu).find('[data-link="' + iframelink +'"]')]);
                    }
                }
            });
        });
    }

    return IFrameLinker;

})();

module.exports = IFrameLinker;
