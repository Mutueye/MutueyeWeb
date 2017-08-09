var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var duration = require('gulp-duration');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');

//gulp style 相关
var minifycss = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var stylus = require('gulp-stylus');

var run = require('./runCallBack');
//var finished = require('./finished');

function finished(count, cb) {
    var complete = 0
    return function() {
        if (++complete === count) cb()
    }
}

var GulpStyles = function(appname, config, needwatch, cb){
    var done = finished(config.styles.length, function() {
        if(cb) cb();
    });
    for(i in config.styles){
        var item = config.styles[i];
        (function(item){
            var shouldWatch = item.watchable && needwatch;
            var doStyle = function(cb){
                gulp.src(item.src)
                    .pipe(plumber())
                    .pipe(gulpif(item.styletype == 'stylus', stylus()))
                    //.pipe(prefix('last 2 versions', { cascade: true }))
                    .pipe(concat(item.concatname))
                    .pipe(gulpif(item.compressable, minifycss()))
                    .pipe(gulp.dest(item.dest))
                    .pipe(duration('[STYLE] Dealing ' + item.name +' for app "' + appname + '"'))
                    .pipe(run(done))
                    .pipe(run(cb))
            };
            doStyle();
            if(shouldWatch) gulp.watch(item.watchsrc, function(){
                doStyle(function(){
                    livereload.changed(item.dest + '**/*.css');
                });
            });
        })(item);
    }
}

module.exports = GulpStyles;
