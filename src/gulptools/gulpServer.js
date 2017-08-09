var gulp = require('gulp');
var gutil = require('gulp-util');
var changed = require('gulp-changed');
var duration = require('gulp-duration');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var gulpif = require('gulp-if');

//gulp server 相关
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var injectLr = require('connect-livereload');

var DEFAULT_APP_PORT = 8080;
var DEFAULT_LR_PORT = 35730;

var GulpServer = function(appname, config, cb){
    var appport = config.server.appport || DEFAULT_APP_PORT;
    var lrport = config.server.lrport || DEFAULT_LR_PORT;
    livereload.listen({port: lrport});
    var app = connect()
        .use(injectLr({ port: lrport }))
        .use(serveStatic(config.server.staticfolder));
    var server = http.createServer(app);
    server.listen(appport, function(err) {
        if(err) {
            gutil.log(err);
        }
        gutil.log('Serving app "' + appname + '" on port: ' + appport + ' !!!');
    });

    cb();
}

module.exports = GulpServer;
