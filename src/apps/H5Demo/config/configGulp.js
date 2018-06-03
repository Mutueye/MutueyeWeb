var appFolderName = 'H5Demo/';
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
            name : 'main style',
            src : 'src/apps/' + appFolderName + 'webapp/stylus/index.styl',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            styletype : 'stylus', //css, stylus, less, sass ...
            concatname : 'index.css',
            compressable : true,
            watchable : true,
            watchsrc : 'src/apps/' + appFolderName +'**/*.styl'
        }
    ],

    scripts : [
        {
            name : 'vendor js',
            src : [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/ion-sound/js/ion.sound.js'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            scripttype : 'js', //js, coffee, es2015 ...
            bundlename : 'vendor.js',
            browserify : false,
            compressable : false,
            watchable : false
        },
        {
            name : 'main app js',
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
                '!src/apps/' + appFolderName + 'webapp/layout.pug',
                '!src/apps/' + appFolderName + 'webapp/variables.pug'
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
