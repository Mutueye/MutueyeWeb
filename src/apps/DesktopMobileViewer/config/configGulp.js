var appFolderName = 'DesktopMobileViewer/';
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
            name : 'font-awesome font files',
            src : 'bower_components/font-awesome/fonts/**/*',
            dest : buildFolderName + appFolderName + assetFolderName  + fontFolderName,
            watchable : false
        },
        {
            name : 'bootstrap font files',
            src : 'src/libs/bootstrap-stylus/fonts/**/*',
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
                'bower_components/font-awesome/css/font-awesome.min.css'
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
            compressable : true,
            watchable : true,
            watchsrc : [
                'src/apps/' + appFolderName +'**/*.styl',
                'src/libs/bootstrap-stylus/bootstrap/**/*.styl'
            ]
        }
    ],

    scripts : [
        {
            name : 'vendor js',
            src : [
                'bower_components/jquery-1.12.3/dist/jquery.min.js',
                'src/libs/bootstrap-stylus/js/affix.js',
                'src/libs/bootstrap-stylus/js/alert.js',
                'src/libs/bootstrap-stylus/js/button.js',
                'src/libs/bootstrap-stylus/js/carousel.js',
                'src/libs/bootstrap-stylus/js/collapse.js',
                'src/libs/bootstrap-stylus/js/dropdown.js',
                'src/libs/bootstrap-stylus/js/modal.js',
                'src/libs/bootstrap-stylus/js/tooltip.js',
                'src/libs/bootstrap-stylus/js/popover.js',
                'src/libs/bootstrap-stylus/js/scrollspy.js',
                'src/libs/bootstrap-stylus/js/tab.js',
                'src/libs/bootstrap-stylus/js/transition.js'
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
                'src/apps/' + appFolderName + 'webapp/**/*.pug',
                '!src/apps/' + appFolderName + 'webapp/layout.pug'
            ],
            dest : buildFolderName + appFolderName + templateFolderName,
            templatetype : 'pug',
            watchable : true,
            watchsrc : [
                'src/apps/' + appFolderName + 'webapp/**/*.pug',
                'src/apps/' + appFolderName + 'components/**/*.pug'
            ]
        }
    ],

    server : {
        appport : 8080,
        lrport : 35730,
        staticfolder : buildFolderName + appFolderName
    },

    buildNum : 5
}

module.exports = configGulp;
