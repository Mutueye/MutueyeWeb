var appFolderName = 'qdgov360/';
var buildFolderName = 'build/';
var assetFolderName = 'dist/';
var fontFolderName = 'fonts/';
var imgFolderName = 'images/';
var styleFolderName = 'css/';
var scriptFolderName = 'js/';
var templateFolderName = '';

var configGulp = {

    statics : [
        {
            name : 'font-awesome font files',
            src : 'bower_components/font-awesome/fonts/**/*',
            dest : buildFolderName + appFolderName + assetFolderName + fontFolderName,
            watchable : false
        },
        {
            name : 'webapp statics',
            src : 'src/apps/' + appFolderName + 'static/**/*',
            dest : buildFolderName + appFolderName + assetFolderName,
            watchable : true
        }
    ],

    styles : [
        {
            name : 'vendor styles',
            src : [
                'bower_components/font-awesome/css/font-awesome.css'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            styletype : 'css',
            concatname : 'vendor.css',
            compressable : true,
            watchable : false
        },
        {
            name : 'main styles',
            src : 'src/apps/' + appFolderName + 'webapp/stylus/index.styl',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            styletype : 'stylus', //css, stylus, less, sass ...
            concatname : 'index.css',
            compressable : false,
            watchable : true,
            watchsrc : [
                'src/apps/' + appFolderName +'**/*.styl'
            ]
        }
    ],

    scripts : [
        {
            name : 'vendor js',
            src : [
                'bower_components/Jquery/dist/jquery.js',
                'src/libs/css3d-engine/css3d.js'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            scripttype : 'js', //js, coffee, es2015 ...
            bundlename : 'vendor.js',
            browserify : false,
            compressable : true,
            watchable : false
        },
        {
            name : 'main js',
            src : 'src/apps/' + appFolderName +'webapp/js/app.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            scripttype : 'js',
            bundlename : 'app.js',
            browserify : true,
            compressable : false,
            watchable : true
        }
    ],

    templates : [
        {
            name : 'webapp templates',
            src : [
                'src/apps/' + appFolderName + 'webapp/**/*.jade',
                '!src/apps/' + appFolderName + 'webapp/layout.jade'
            ],
            dest : buildFolderName + appFolderName + templateFolderName,
            templatetype : 'jade', //html, jade, handlebar ...
            watchable : true,
            watchsrc : [
                'src/apps/' + appFolderName + 'webapp/**/*.jade',
                'src/apps/' + appFolderName + 'components/**/*.jade'
            ]
        }
    ],

    server : {
        appport : 8080,
        lrport : 35730,
        staticfolder : buildFolderName + appFolderName
    },

    buildNum : 5 //本项目共有statics、styles、templates、scripts、server 五个构建任务
}

module.exports = configGulp;
