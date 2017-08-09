var through = require('through');

var RunCallBack = function(callback) {
    return through(write, end);

    function write(buf) {
        this.queue(buf);
    };

    function end() {
        if(callback) {
            callback();
        }
        this.queue(null);
    }
}

module.exports = RunCallBack;
