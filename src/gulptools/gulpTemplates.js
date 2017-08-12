var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var duration = require('gulp-duration');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');

//gulp template 相关
var jade = require('gulp-jade');

//gulp后续版本改名为pug
var pug = require('gulp-pug');

var run = require('./runCallBack');
//var finished = require('./finished');

function finished(count, cb) {
    var complete = 0
    return function() {
        if (++complete === count) cb()
    }
}

var GulpTemplates = function(appname, config, needwatch, cb){
    var done = finished(config.templates.length, function() {
        if(cb) cb();
    });
    for(var i = 0; i < config.templates.length; i++){
        var item = config.templates[i];
        (function(item){
            var shouldWatch = item.watchable && needwatch;
            var doTemplates = function(cb){
                gulp.src(item.src)
                    .pipe(plumber())
                    .pipe(gulpif(item.templatetype == 'jade', jade({pretty: true})))
                    .pipe(gulpif(item.templatetype == 'pug', pug({pretty: "    "})))
                    .pipe(gulp.dest(item.dest))
                    .pipe(duration('[TEMPLATE] Compiling ' + item.name + ' for app "' + appname + '"'))
                    .pipe(run(done))
                    .pipe(run(cb));
            }
            doTemplates();
            if(shouldWatch) gulp.watch(item.watchsrc, function(){
                doTemplates(function(){
                    livereload.changed(item.dest + '**/*.html');
                });
            });
        })(item);
    }
}

module.exports = GulpTemplates;
