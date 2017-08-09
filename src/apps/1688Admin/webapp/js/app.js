/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var attachFastClick = require('fastclick'); //解决触摸设备浏览器点击延迟300ms
//var TMenu = require('../../../../libs/tree-menu/treeMenu');
var TMenuCtrl = require('../../components/tree-menu/tmenuCtrl');
var ViewCtrl = require('./view/viewCtrl');

var Webapp = (function(){
    
    attachFastClick(document.body);
    
    //tmenu = new TMenu($);
    viewCtrl = new ViewCtrl();
    tMenuCtrl = new TMenuCtrl();

    function Webapp(){
        /*
        $('#tree_menu').treeMenu({
            jsonPath : '/data/tmenu.json',
            beforeInit : beforeTMInit
        });*/
    }
    
    function beforeTMInit() {
        var base = this;
        console.log(this.$elem);
    }

    return Webapp;

})();

$(document).ready(function(){
    var app = new Webapp();
});
