window.commonTools = {
    getUserName : function() {
        //获取当前登录的用户名
        //此处直接返回'admin'字符串，用于静态页面演示
        return 'admin';
    },
    
    getLocalTime : function() {
        var myDate = new Date();
        var year = myDate.getFullYear() + '.'
        var monthNum = myDate.getMonth() + 1
        var month = (monthNum < 10 ? '0' + monthNum : monthNum) + '.';
        var date = myDate.getDate() + ' ';
        var hour = myDate.getHours() + ':';
        var minute = myDate.getMinutes() < 10 ? '0'+myDate.getMinutes() : myDate.getMinutes();
        var second = ':' + (myDate.getSeconds() < 10 ? '0'+ myDate.getSeconds() : myDate.getSeconds());

        return year + month + date + hour + minute + second;
    },
    
    /**
    * 文件上传插件通用初始化
    * @param Object $input input的jQuery选择器
    * @param bool hasInitialPreview 是否有初始预览内容
    * @param bool isSingleFile 是否只能单选
    **/
    initBSFileInput : function($input, hasInitialPreview, isSingleFile) {
        
        var _previewFileIconSettings = { // configure your icon file extensions
            'doc': '<i class="fa fa-file-word-o text-primary"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
            'htm': '<i class="fa fa-file-code-o text-info"></i>',
            'txt': '<i class="fa fa-file-text-o text-info"></i>',
            'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
            'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
            // note for these file types below no extension determination logic 
            // has been configured (the keys itself will be used as extensions)
            'jpg': '<i class="fa fa-file-photo-o text-danger"></i>', 
            'gif': '<i class="fa fa-file-photo-o text-muted"></i>', 
            'png': '<i class="fa fa-file-photo-o text-primary"></i>'    
        };
        
        var _previewFileExtSettings = { // configure the logic for determining icon file extensions
            'doc': function(ext) {
                return ext.match(/(doc|docx)$/i);
            },
            'xls': function(ext) {
                return ext.match(/(xls|xlsx)$/i);
            },
            'ppt': function(ext) {
                return ext.match(/(ppt|pptx)$/i);
            },
            'zip': function(ext) {
                return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
            },
            'htm': function(ext) {
                return ext.match(/(htm|html)$/i);
            },
            'txt': function(ext) {
                return ext.match(/(txt|ini|csv|java|php|js|css)$/i);
            },
            'mov': function(ext) {
                return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
            },
            'mp3': function(ext) {
                return ext.match(/(mp3|wav)$/i);
            }
        }
        
        //如果文件上传表单有初始值，通过initialPreview等选项设定初始内容
        //此处直接指定初始内容，用于前端效果展示
        if(hasInitialPreview) {
            if(isSingleFile) {
                $input.fileinput({
                    language : 'zh',
                    theme : 'explorer',
                    showClose : false,
                    browseOnZoneClick : true,
                    layoutTemplates : { actionDrag: ''}, //去掉预览列表拖拽功能，因iframe内拖拽失效
                    overwriteInitial: true,
                    previewFileIcon: '<i class="fa fa-file"></i>',
                    initialPreview: [
                        // IMAGE DATA
                       'http://lorempixel.com/800/460/business/1',
                    ],
                    initialPreviewAsData: true, // defaults markup  
                    initialPreviewConfig: [
                        {caption: "Business 1.jpg", size: 762980, url: "/site/file-delete", downloadUrl: 'http://lorempixel.com/800/460/business/1', key: 11}
                    ],
                    preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
                    previewFileIconSettings: _previewFileIconSettings,
                    previewFileExtSettings: _previewFileExtSettings
                });
            } else {
                $input.fileinput({
                    language : 'zh',
                    theme : 'explorer',
                    showClose : false,
                    layoutTemplates : { actionDrag: ''}, //去掉预览列表拖拽功能，因iframe内拖拽失效
                    overwriteInitial: false,
                    previewFileIcon: '<i class="fa fa-file"></i>',
                    initialPreview: [
                        // IMAGE DATA
                       'http://lorempixel.com/800/460/business/1',
                        // IMAGE RAW MARKUP
                        '<img src="http://lorempixel.com/800/460/business/2" class="kv-preview-data file-preview-image">',
                        // TEXT DATA
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut mauris ut libero fermentum feugiat eu et dui. Mauris condimentum rhoncus enim, sed semper neque vestibulum id. Nulla semper, turpis ut consequat imperdiet, enim turpis aliquet orci, eget venenatis elit sapien non ante. Aliquam neque ipsum, rhoncus id ipsum et, volutpat tincidunt augue. Maecenas dolor libero, gravida nec est at, commodo tempor massa. Sed id feugiat massa. Pellentesque at est eu ante aliquam viverra ac sed est.",
                        // PDF DATA
                        'http://kartik-v.github.io/bootstrap-fileinput-samples/samples/pdf-sample.pdf',
                        // VIDEO DATA
                        "http://kartik-v.github.io/bootstrap-fileinput-samples/samples/small.mp4"
                    ],
                    initialPreviewAsData: true, // defaults markup  
                    initialPreviewConfig: [
                        {caption: "Business 1.jpg", size: 762980, url: "/site/file-delete", downloadUrl: 'http://lorempixel.com/800/460/business/1', key: 11},
                        {previewAsData: false, size: 823782, caption: "Business 2.jpg", url: "/site/file-delete", downloadUrl: 'http://lorempixel.com/800/460/business/2', key: 13}, 
                        {caption: "Lorem Ipsum.txt", type: "text", size: 1430, url: "/site/file-delete", key: 12}, 
                        {type: "pdf", size: 8000, caption: "PDF Sample.pdf", url: "/site/file-delete", key: 14}, 
                        {type: "video", size: 375000, filetype: "video/mp4", caption: "Krajee Sample.mp4", url: "/site/file-delete", key: 15} 
                    ],
                    preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
                    previewFileIconSettings: _previewFileIconSettings,
                    previewFileExtSettings: _previewFileExtSettings
                });
            }
            
        } else {
            $input.fileinput({
                language : 'zh',
                theme : 'explorer',
                showClose : false,
                layoutTemplates : { actionDrag: ''}, //去掉预览列表拖拽功能，因iframe内拖拽失效
                overwriteInitial: false,
                previewFileIcon: '<i class="fa fa-file"></i>',
                preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
                previewFileIconSettings: _previewFileIconSettings,
                previewFileExtSettings: _previewFileExtSettings
            });
        }
    },
    
    /**
    * 初始化时间控件bootstrap-datetimepicker
    * @param Object $time 时间input输入框的jQuery选择器
    * @param String defaultDate 默认填入的日期
    * @param String format 时间格式
    **/
    setDateTimeInput : function($time, defaultDate, format) {
        var dfdate = typeof defaultDate == 'string' ? defaultDate : '';
        var fmt = format ? format : 'YYYY-MM-DD'; 
        $time.datetimepicker({
            viewMode: 'days',
            format: fmt,
            defaultDate: dfdate,
            allowInputToggle: true
        });
    },
    
    /**
    * 初始化时间控件bootstrap-datetimepicker，设置两个时间控件的前后时间范围
    * @param Object $startTime 起始时间input输入框的jQuery选择器
    * @param Object $endTime 截止时间input输入框的jQuery选择器
    * @param String startDefaultDate 默认起始日期
    * @param String endDefaultDate 默认截止日期
    * @param String format 时间格式
    **/
    setDateTimeInputSection : function($startTime, $endTime, startdefaultDate, endDefaultDate, format) {
        
        var startDfDate = typeof startdefaultDate == 'string' ? startdefaultDate : '';
        var endDfDate = typeof endDefaultDate == 'string' ? endDefaultDate : '';
        
        var fmt = format ? format : 'YYYY-MM-DD';

        //起始日期
        $startTime.datetimepicker({
            viewMode: 'days',
            format: fmt,
            defaultDate: startDfDate,
            allowInputToggle: true
        });
        //截止日期
        $endTime.datetimepicker({
            viewMode: 'days',
            format: fmt,
            defaultDate: endDfDate,
            allowInputToggle: true,
            useCurrent: false //关联两个日期输入框时，需要设置截止日期的useCurrent:false
        });
        //关联起始和截止日期，使起始日期不晚于截止日期
        $startTime.on("dp.change", function (e) {
            $endTime.data("DateTimePicker").minDate(e.date);
        });
        //关联起始和截止日期，使截止日期不早于起始日期
        $endTime.on("dp.change", function (e) {
            $startTime.data("DateTimePicker").maxDate(e.date);
        });
    }
};