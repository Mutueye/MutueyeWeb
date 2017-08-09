var gulp = require('gulp');
var argv = require('minimist')(process.argv);
var livereload = require('gulp-livereload');

var DEFAULT_APP_NAME = 'dolphin';
var appname = argv.a || DEFAULT_APP_NAME;
var config = require('./src/apps/' + appname + '/config/configGulp');

var gulpStatics = require('./src/gulptools/gulpStatics');
var gulpStyles = require('./src/gulptools/gulpStyles');
var gulpScripts = require('./src/gulptools/gulpScripts');
var gulpTemplates = require('./src/gulptools/gulpTemplates');
var gulpServer = require('./src/gulptools/gulpServer');
var gulpNodemon = require('./src/gulptools/gulpNodemon');

function finished(count, cb) {
    var complete = 0
    return function() {
        if (++complete === count) cb();
    }
}

gulp.task('build', function() {
    if(config.statics) gulpStatics(appname, config, false);
    if(config.styles) gulpStyles(appname, config, false);
    if(config.scripts) gulpScripts(appname, config, false);
    if(config.templates) gulpTemplates(appname, config, false);
});

gulp.task('develop', function() {
    var done = finished(config.buildNum, function(){
        var changedFolder = config.server ? config.server.staticfolder : config.nodemon.projfolder;
        livereload.changed(changedFolder);
        console.log('-=[GULP BUILD FINISHED]=-\n');
    });

    if(config.statics) gulpStatics(appname, config, true, done);
    if(config.styles) gulpStyles(appname, config, true, done);
    if(config.templates) gulpTemplates(appname, config, true, done);
    if(config.scripts) gulpScripts(appname, config, true, done);
    if(config.server) gulpServer(appname, config, done);
    if(config.nodemon) gulpNodemon(config, done);

});

gulp.task('default', ['develop']);
