var ViewCtrl = require('./view/viewCtrl');
//var MainStage = require('./3D/mainStage');

var Webapp = (function(){

    function Webapp() {

        //禁用微信的下拉
        $('body').on('touchmove', function(event) {
            event.preventDefault();
        });

        var viewCtrl = new ViewCtrl();

        //var mainStage = new MainStage();

    }

    return Webapp;

})();

$(document).ready(function(){
    var app = new Webapp();
});
