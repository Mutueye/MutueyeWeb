/* ==================================================================================
 * edu-portal: variables.js
 * 颜色、块大小、块类型等数组
 * ================================================================================== */

var Variables = (function(){

    colorClasses = [
        "bn-color-blue",
        "bn-color-purple",
        "bn-color-pink",
        "bn-color-red",
        "bn-color-orange",
        "bn-color-yellow",
        "bn-color-green",
        "bn-color-cyan",
        "bn-color-gray"
    ];

    blockSizes = [
        "bn-size-1x1",
        "bn-size-1x2",
        "bn-size-2x1",
        "bn-size-2x2"
    ];

    //constructor
    function Variables() {

    }

    Variables.prototype.getColorClass = function(index){
        return colorClasses[index];
    };

    Variables.prototype.getSizeClass = function(index){
        return blockSizes[index];
    }

    return Variables;

})();

module.exports = Variables;
