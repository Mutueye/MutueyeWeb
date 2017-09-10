/* ==================================================================================
 * iframeLinker.js
 * 链接iframe内容
 * ================================================================================== */

var UrlObj = require('./urlObj');

var IFrameLinker = (function(){
    
    var el_body = $('body');
    var urlObj = new UrlObj();
    var targetIframe = 'iframe';
    var useHash = false; //是否使用浏览器url的#来设置iframe的src

    //constructor
    function IFrameLinker(iframe, isUsingHash) {
        targetIframe = iframe || 'iframe';
        useHash = isUsingHash;
        if(useHash) {
            if(window.location.hash) {
                IFrameLinker.prototype.loadIframeByHash(iframe);
            }
            this.changeIframeLinkByHash();
        }
    }
    
    IFrameLinker.prototype.setIframeLinks = function(toggleAttr){
        var base = this;
        if(toggleAttr && toggleAttr !="") {
            $('[data-toggle="'+ toggleAttr + '"]').each(function(){
                $(this).on('click tap', function(){
                    var iframelink = $(this).attr('data-link');
                    if(useHash) {
                        base.changeUrlHash(iframelink);
                    } else {
                        $(targetIframe).attr("src",iframelink);
                        el_body.trigger('iframeLinkChanged',[iframelink]);
                    }
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
