var gulp = require('gulp');
var changed = require('gulp-changed');
var duration = require('gulp-duration');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');

var run = require('./runCallBack');
//var finished = require('./finished');

function finished(count, cb) {
    var complete = 0
    return function() {
        if (++complete === count) cb()
    }
}

var GulpStatics = function(appname, config, needwatch, cb){
    var done = finished(config.statics.length, function() {
        if(cb) cb();
    });

    for(i in config.statics){
        var item = config.statics[i];
        (function(item){
            var shouldWatch = item.watchable && needwatch;
            var copyOneStatic = function(){
                gulp.src(item.src)
                    .pipe(plumber())
                    .pipe(changed(item.dest))
                    .pipe(gulp.dest(item.dest))
                    .pipe(duration('[STATIC] Finished Copying ' + item.name))
                    .pipe(run(done))
                    .pipe(gulpif(shouldWatch, livereload()));
            }
            copyOneStatic();
            if(shouldWatch) gulp.watch(item.src,copyOneStatic);
        })(item);
    }
}


module.exports = GulpStatics;
