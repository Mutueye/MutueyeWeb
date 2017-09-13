/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var Popbox = require('../../../../libs/dolphin/js/popbox');
var AbsCenter = require('../../../../libs/dolphin/js/absCenter');

var Webapp = (function(){

    function Webapp(){
        popbox = new Popbox($);
        absCenter = new AbsCenter($);
    }

    return Webapp;

})();

$(document).ready(function(){
    var app = new Webapp();
});
