/* ==================================================================================
 * edu-portal: app.js
 * 主程序入口
 * ================================================================================== */

//var attachFastClick = require('fastclick');
var Popbox = require('../../../../libs/dolphin/js/popbox');
var UiCtrl = require('./view/uiCtrl');
var BrowserCtrl = require('./view/browserCtrl');
var DataCtrl = require('./data/dataCtrl');


var Webapp = (function() {

    //attachFastClick(document.body);
    popbox = new Popbox($);

    browserCtrl = new BrowserCtrl();
    uiCtrl = new UiCtrl();
    dataCtrl = new DataCtrl(uiCtrl);

    //contrustor
    function Webapp(){

    }

    return Webapp;

})();

$(document).ready(function() {
    var app = new Webapp();
});
