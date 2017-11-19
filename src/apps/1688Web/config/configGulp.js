var appFolderName = '1688Web/';
var buildFolderName = 'build/';
var assetFolderName = '';
var fontFolderName = 'fonts/';
var imgFolderName = 'images/';
var styleFolderName = 'css/';
var scriptFolderName = 'js/';
var templateFolderName = 'html/';

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
            dest : buildFolderName + appFolderName + assetFolderName  + fontFolderName,
            watchable : false
        },
        {
            name : 'font-awesome css files',
            src : 'bower_components/font-awesome/css/font-awesome.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'iscroll js',
            src : 'bower_components/iscroll/build/iscroll.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'iCheck files',
            src : 'bower_components/iCheck/**/*',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'iCheck/',
            watchable : false
        },
        {
            name : 'perfect-scrollbar css files',
            src : 'bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'perfect-scrollbar js files',
            src : 'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'bootstrap font files',
            src : 'src/libs/bootstrap-stylus/fonts/**/*',
            dest : buildFolderName + appFolderName + assetFolderName + fontFolderName,
            watchable : false
        },
        {
            name : 'bootstrap-datetimepicker css files',
            src : 'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'moment js files',
            src : [
                'bower_components/moment/min/moment.min.js',
                'bower_components/moment/locale/zh-cn.js'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'moment/',
            watchable : false
        },
        {
            name : 'bootstrap-datetimepicker js files',
            src : 'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'bootstrap-fileinput js files',
            src : [
                'bower_components/bootstrap-fileinput/js/fileinput.min.js',
                'bower_components/bootstrap-fileinput/js/locales/zh.js',
                'bower_components/bootstrap-fileinput/themes/explorer/theme.min.js',
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'bootstrap-fileinput/',
            watchable : false
        },
        {
            name : 'bootstrap-fileinput css files',
            src : [
                'bower_components/bootstrap-fileinput/css/fileinput.min.css',
                'bower_components/bootstrap-fileinput/themes/explorer/theme.min.css',
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'bootstrap-fileinput/css/',
            watchable : false
        },
        {
            name : 'bootstrap-fileinput img files',
            src : 'bower_components/bootstrap-fileinput/img/**/*',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'bootstrap-fileinput/img/',
            watchable : false
        },
        {
            name : 'bootstrap-select js files',
            src : [
                'bower_components/bootstrap-select/dist/js/bootstrap-select.min.js',
                'bower_components/bootstrap-select/dist/js/i18n/defaults-zh_CN.min.js'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'bootstrap-select/',
            watchable : false
        },
        {
            name : 'bootstrap-select css files',
            src : 'bower_components/bootstrap-select/dist/css/bootstrap-select.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'toastr css files',
            src : 'bower_components/toastr/toastr.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'toastr js files',
            src : 'bower_components/toastr/toastr.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'bootstrap-table css files',
            src : 'bower_components/bootstrap-table/dist/bootstrap-table.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'bootstrap-table js files',
            src : [
                'bower_components/bootstrap-table/dist/bootstrap-table.min.js',
                'bower_components/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js',
                'bower_components/bootstrap-table/dist/extensions/editable/bootstrap-table-editable.min.js'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'bootstrap-table/',
            watchable : false
        },
        {
            name : 'bootstrap-editable css files',
            src : 'bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'bootstrap-editable js files',
            src : 'bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'bootstrap-editable image files',
            src : 'bower_components/x-editable/dist/bootstrap3-editable/img/**/*',
            dest : buildFolderName + appFolderName + assetFolderName + imgFolderName,
            watchable : false
        },
        {
            name : 'bootstrapvalidator css files',
            src : 'bower_components/bootstrapvalidator/dist/css/bootstrapValidator.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'bootstrapValidator js files',
            src : [
                'bower_components/bootstrapvalidator/dist/js/bootstrapValidator.min.js',
                'bower_components/bootstrapvalidator/dist/js/language/zh_CN.js'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName + 'bootstrapvalidator/',
            watchable : false
        },
        {
            name : 'bootstrap-treeview css files',
            src : 'bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.css',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            watchable : false
        },
        {
            name : 'bootstrap-treeview js files',
            src : 'bower_components/bootstrap-treeview/dist/bootstrap-treeview.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'tree menu plugin',
            src : 'src/libs/tree-menu/jquery.treeMenu.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'highcharts js',
            src : [
                'bower_components/highcharts/highcharts.js',
                'src/libs/highcharts-zh_cn/highcharts-zh_CN.js'
            ],
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
            watchable : false
        },
        {
            name : 'owl.carousel2 js',
            src : 'src/libs/owl-carousel-2/owl.carousel.min.js',
            dest : buildFolderName + appFolderName + assetFolderName + scriptFolderName,
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
            name : 'main style',
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
        },
        {
            name : 'mobile style',
            src : 'src/apps/' + appFolderName + 'webapp/stylus/index-m.styl',
            dest : buildFolderName + appFolderName + assetFolderName + styleFolderName,
            styletype : 'stylus', //css, stylus, less, sass ...
            concatname : 'index-m.css',
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
            name : 'bootstrap js',
            src : [
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
            bundlename : 'bootstrap.min.js',
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
