var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var duration = require('gulp-duration');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');

//gulp browserify 相关
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var coffeeify = require('coffeeify'); //coffee to js
var babelify = require('babelify'); //es2015 to js

var run = require('./runCallBack');
//var finished = require('./finished');

function finished(count, cb) {
    var complete = 0
    return function() {
        if (++complete === count) cb()
    }
}

var GulpScripts = function(appname, config, needwatch, cb){
    var done = finished(config.scripts.length, function() {
        if(cb) cb();
    });

    for(i in config.scripts){
        var item = config.scripts[i];
        (function(item){
            var shouldWatch = item.watchable && needwatch;
            if(item.browserify){
                if(shouldWatch){
                    var bundler = watchify(browserify(item.src));
                    if(item.scripttype == 'coffee'){
                        bundler = bundler.transform(coffeeify);
                    } else if(item.scripttype = 'es2015'){
                        bundler = bundler.transform(babelify);
                    }
                    bundler.on('update', rebundle);
                    function rebundle() {
                        var start = Date.now();
                        return bundler.bundle()
                            .on('error', function(err) {
                                gutil.log(gutil.colors.red(err.toString()));
                            })
                            .on('end', function() {
                                gutil.log(gutil.colors.green('[SCRIPT] Finished rebundling ' + item.name + ' in', (Date.now() - start) + 'ms.'));
                            })
                            .pipe(source(item.bundlename))
                            .pipe(gulpif(item.compressable, streamify(uglify())))
                            .pipe(gulp.dest(item.dest))
                            .pipe(run(done))
                            .pipe(livereload());
                    }
                    rebundle();
                } else {
                    browserify(item.src)
                        .bundle()
                        .pipe(source(item.bundlename))
                        .pipe(gulpif(item.compressable, streamify(uglify())))
                        .pipe(duration('[SCRIPT] Bundling ' + item.name + ' for app "' + appname + '"'))
                        .pipe(gulp.dest(item.dest))
                        .pipe(run(done));
                }
            } else {
                gulp.src(item.src)
                    .pipe(changed(item.dest))
                    .pipe(concat(item.bundlename))
                    .pipe(gulpif(item.compressable,uglify()))
                    .pipe(duration('[SCRIPT] Bundling ' + item.name + ' for app "' + appname + '"'))
                    .pipe(gulp.dest(item.dest))
                    .pipe(run(done));
            }
        })(item);
    }
}

module.exports = GulpScripts;
