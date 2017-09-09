var UrlObj = (function(){

    //constructor
    function UrlObj(url){
        this.ourl = url||window.location.href;
        this.href = "";//?前面部分
        this.params = {};//url参数对象
        this.hash = "";//#及后面部分
        this.parseUrl(this.ourl);
    }
    
    //分析url,得到?前面存入this.href,参数解析为this.params对象，#号及后面存入this.hash
    UrlObj.prototype.parseUrl = function(url) {
        var base = this;
        var str = url;
        var index = str.indexOf("#");
        if(index > 0){
            base.hash = str.substr(index);
            str = str.substring(0,index);
        }
        index = str.indexOf("?");
        if(index > 0){
            base.href = str.substring(0,index);
            str = str.substr(index+1);
            var parts = str.split("&");
            for(var i = 0; i<parts.length; i++){
                var kv = parts[i].split("=");
                base.params[kv[0]] = kv[1];
            }
        }
        else{
            base.href = str;
            base.params = {};
        }
    }
    //得到参数值
    UrlObj.prototype.getParam = function(key){
        return this.params[key];
    }
    //只是修改this.params
    UrlObj.prototype.setParam = function(key,val){
        this.params[key] = val;
    }
    //只是设置this.params
    UrlObj.prototype.removeParam = function(key){
        this.params[key] = undefined;
    }
    
    UrlObj.prototype.getHref = function() {
        return this.href;
    }
    UrlObj.prototype.setHref = function(url) {
        this.href = url;
    }
    
    UrlObj.prototype.getHash = function() {
        return this.hash.substring(1);
    }
    UrlObj.prototype.setHash = function(hashString) {
        this.hash = '#' + hashString;
    }
    
    //根据三部分组成操作后的url
    UrlObj.prototype.url = function(){
        var strurl = this.href;
        var objps = [];//这里用数组组织,再做join操作
        for(var k in this.params){
            if(this.params[k]){
                objps.push(k + "=" + this.params[k]);
            }
        }
        if(objps.length>0){
            strurl += "?"+objps.join("&");
        }
        if(this.hash.length>0){
            strurl += this.hash;
        }
        return strurl;
    }

    return UrlObj;

})();

module.exports = UrlObj;
