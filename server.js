var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var argv = require('minimist')(process.argv);

var DEFAULT_APP_NAME = 'webapp';
var port = '8080';
var appname = argv.a || DEFAULT_APP_NAME;

//获取编译目标目录
function getDestRoot(appname, subfolder) {
    if(subfolder) {
        return './build/' + appname + '/' + subfolder;
    } else {
        return './build/' + appname + '/';
    }
}

var app = connect().use(serveStatic(getDestRoot(appname)));
var server = http.createServer(app);
server.listen(port, function(err) {
    if(err) {
        console.log(err);
    }
    console.log('Serving app on port: ' + port);
});
