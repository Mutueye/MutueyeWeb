/* ==================================================================================
 * iframeLinker.js
 * 链接iframe内容
 * ================================================================================== */

var UrlObj = require('./urlObj');

var IFrameLinker = (function(){
    
    var el_body = $('body');
    var urlObj = new UrlObj();
    var targetIframe = 'iframe';

    //constructor
    function IFrameLinker(iframe) {
        targetIframe = iframe || 'iframe';
        if(window.location.hash) {
            IFrameLinker.prototype.loadIframeByHash(iframe);
        }
        this.changeIframeLinkByHash();
    }
    
    IFrameLinker.prototype.setIframeLinks = function(toggleAttr){
        var base = this;
        if(toggleAttr && toggleAttr !="") {
            $('[data-toggle="'+ toggleAttr + '"]').each(function(){
                $(this).on('click tap', function(){
                    var iframelink = $(this).attr('data-link');
                    //$(targetIframe).attr("src",iframelink);
                    base.changeUrlHash(iframelink);
                    
                    //trigger iframe Src Changed
                    /*
                    if($(this).attr("data-target-menu")) {
                        //触发修改菜单当前选择按钮
                        var target_menu = $(this).attr("data-target-menu");
                        if(target_menu != "") {
                            el_body.trigger('tmenu.changeSel',[$(target_menu).find('[data-link="' + iframelink +'"]')]);
                        }
                    }*/
                });
            });
        }
        
    }
    
    IFrameLinker.prototype.changeUrlHash = function(hashString) {
        urlObj.parseUrl(window.location.href);
        urlObj.setHash(hashString);
        window.location.href = urlObj.url();
    }
    
    IFrameLinker.prototype.loadIframeByHash = function() {
        var link = window.location.hash.substring(1);
        //window.history.pushState('','',window.location.href);
        $(targetIframe).attr("src",link);
        el_body.trigger('iframeLinkChanged',[link]);
    }
    
    IFrameLinker.prototype.changeIframeLinkByHash = function() {
        var base = this;
        if(("onhashchange" in window) && ((typeof document.documentMode==="undefined") || document.documentMode==8)) {//浏览器支持onhashchange事件
            window.onhashchange = function(){
                base.loadIframeByHash();
            }
        } else {
            //TODO 不支持则跳转到浏览器升级页面
        }
    }

    return IFrameLinker;

})();

module.exports = IFrameLinker;
