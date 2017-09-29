var appFolderName = 'huiye/';
var buildFolderName = 'build/';
var assetFolderName = '';
var fontFolderName = 'fonts/';
var imgFolderName = 'images/';
var styleFolderName = 'css/';
var scriptFolderName = 'js/';
var templateFolderName = '';

var configGulp = {

    statics : [
        {
            name : 'jquery 1.12.3',
            src : 'bower_components/jquery-1.12.3/dist/jquery.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'font-awesome font files',
            src : 'bower_components/font-awesome/fonts/**/*',
            dest : buildFolderName + appFolderName + assetFolderName + fontFolderName,
            watchable : false
        },
        {
            name : 'font-awesome css files',
            src : 'bower_components/font-awesome/css/font-awesome.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'owl.carousel2 js',
            src : 'src/libs/owl-carousel-2/owl.carousel.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'laydate files',
            src : 'bower_components/laydate/dist/**/*',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'laydate/',
            watchable : false
        },
        {
            name : 'owl.carousel2 css files',
            src : [
                'src/libs/owl-carousel-2/assets/owl.carousel.min.css',
                'src/libs/owl-carousel-2/assets/owl.theme.default.min.css'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
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
            name : 'main styles',
            src : 'src/apps/' + appFolderName + 'webapp/stylus/index.styl',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            styletype : 'stylus', //css, stylus, less, sass ...
            concatname : 'index.css',
            compressable : false,
            watchable : true,
            watchsrc : 'src/apps/' + appFolderName +'**/*.styl'
        }
    ],

    scripts : [
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
        appport : 8081,
        lrport : 35731,
        staticfolder : buildFolderName + appFolderName
    },

    buildNum : 5 //本项目共有statics、styles、templates、scripts、server 五个构建任务
}

module.exports = configGulp;
