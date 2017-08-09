var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

var DEFAULT_LR_PORT = 35730;

var NodeMonCtrl = function(config, cb){
    var lr_port = config.nodemon.lrport || DEFAULT_LR_PORT;
    livereload.listen({port: lr_port});
    nodemon({
        script: config.nodemon.script || '',
        ext: config.nodemon.ext || '',
        ignore : config.nodemon.ignore || '',
        watch : config.nodemon.watch || '',
        stdout: false
    }).on('readable', function () { //the `readable` event indicates that data is ready to pick up
        this.stdout.on('data', function (chunk) {
            if(/^Express server listening on port/.test(chunk)){
                livereload.changed(config.nodemon.projfolder);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });

    cb();
}

module.exports = NodeMonCtrl;
