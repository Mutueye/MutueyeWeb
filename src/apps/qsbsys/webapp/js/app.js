/* ==================================================================================
 * app.js
 * 主程序入口
 * ================================================================================== */

var Popbox = require('../../../../libs/dolphin/js/popbox');
var AbsCenter = require('../../../../libs/dolphin/js/absCenter');
var MenuCtrl = require('../../components/leftmenu/menuCtrl');

var Webapp = (function(){

    function Webapp(){
        popbox = new Popbox($);
        absCenter = new AbsCenter($);
        menuCtrl = new MenuCtrl();
        if($('.index-carousel')){
            $('.index-carousel').owlCarousel({
                margin:20,
                nav:true,
                loop:true,
                navText: [ '', '' ],
                autoplay:false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 4
                    },
                    1200: {
                        items: 8
                    }
                }
            });
        }
        if($('.work-carousel')){
            $('.work-carousel').owlCarousel({
                nav:false,
                loop:true,
                autoplay:true,
                items:1,
            });
        }
    }

    return Webapp;

})();

$(document).ready(function(){
    var app = new Webapp();
});
