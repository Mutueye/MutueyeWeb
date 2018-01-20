//toastr提示框插件设置
toastr.options = { positionClass: "toast-top-center toastr-mt" };

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

    //获取时间 格式 YYYY-MM-DD HH:mm
    getCurrentTime : function(){

        var add0 = function(str) {
            var _str = str.toString();
            if(_str.length == 1) {
                return '0' + _str;
            } else {
                return _str;
            }
        }
        var date = moment().year() + '-' + add0(moment().month() + 1) + '-' + add0(moment().date()) + ' ' + add0(moment().hour()) + ':' + add0(moment().minute()) + ':' + add0(moment().second());
        return date;
    },

    /**
    * 给select添加option数据
    * @param Object $select select的jQuery选择器
    * @param Array optionData 选项数据
    * optionsData:
    * [
    *     {
    *         value : '值',
    *         text : '值'，
    *     },
    *     {
    *         value : '值',
    *         text : '值'，
    *     }
    * ]
    **/
    addSelectOptions : function($select, optionData) {
        var optionHtml = "";
        for(i in optionData) {
            var val = optionData[i].value ? optionData[i].value : "";
            var text = optionData[i].text ? optionData[i].text : "";
            optionHtml +="<option value='" + optionData[i].value + "'>" + optionData[i].text +"</option>";
        }
        $select.append(optionHtml);
    },

    /**
    * 从对象数组中获取属性为objPropery，值为objValue元素的子对象数组
    * @param Array arr 数组对象
    * @param String objPropery 对象的属性
    * @param String objPropery 对象的值
    * @return Array 过滤后的数组
    **/
    getSubArrayByObjValue : function(arr,objPropery,objValue) {
        return $.grep(arr, function(cur,i){
            return cur[objPropery] == objValue;
        });
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
    },

    /**
    * 重复的可增减表单组的控制
    * @param Object options 选项
    **/
    duplicateFormCtrl : function(options) {
        //选项
        var option = $.extend({},{
            container : $('body'), //容器的jQuery选择器对象
            html : '', //表单模板
            ids : [], //表单各个input等控件的id，每组表单的id通过类似'name_1','name_2'这样增加后缀数字来区分
            //"mode=eviw"时以上为必填
            btn_delete_id : 'btn_delete', //删除按钮的id，每组表单对应一个删除按钮，通过'btn_delete_1','btn_delete_2'这样增加后缀数字来区分
            btn_add_id : 'btn_add', //添加按钮，点击添加一组重复性的表单
            btn_add_container_id : 'btn_add_container', //按钮容器id，方便在其前方插入表单组
            btn_add_html : '', // 按钮html
            //"mode=edit"时以上选项为必填项

            removeOnMax : true,//当表单组达到最大数量时，是否删除添加按钮

            init_number : 1, //初始表单组的数量，默认为1
            max_number : 0, //可添加的最大数量，0表示无限制
            afterInit : false, //回调 初始化完成后运行
            afterAdd : false, //回调 添加后执行
            afterRemove : false, //回调 删除后执行

            initialData : [], //初始数据,
            fillInitialData : false, //回调 填充初始数据

            mode : 'edit' //显示模式，'edit'和'view'，'view'模式下只加载显示初始数据，且不可编辑
        }, options);

        //初始化
        if(option.html.length != 0 && option.ids.length != 0) {
            if(option.mode == 'edit') addBtnAdd();
            if(!option.initialData || option.initialData.length == 0) {
                //没有初始数据，根据init_number创建空表单组
                if(option.mode == 'edit') {
                    if(option.init_number > 0) {
                        for (var i=0; i<option.init_number; i++) {
                            addOneFormGroup(i);
                        }
                    }
                }
            } else {
                //有初始数据，填充初始数据.
                addInitialData();
            }
            if (typeof option.afterInit === "function") option.afterInit.apply(this, [option.container]);
        }

        //创建‘添加’按钮
        function addBtnAdd(){
            option.container.append(option.btn_add_html);
            $('#' + option.btn_add_id).click(function(){
                if(!$(this).attr('disabled')) {
                    var groups = option.container.find('.one-form-group');
                    if(groups.length > 0) {
                        var lastGroupIDArray = groups.eq(groups.length - 1).attr('id').split('_');
                        var lastNum = parseInt(lastGroupIDArray[lastGroupIDArray.length - 1]);
                        addOneFormGroup(lastNum + 1);
                    } else {
                        addOneFormGroup(0);
                    }
                }
            });
        }

        //添加一个表单组
        function addOneFormGroup(num){
            var thisHtml = option.html;
            for(var i in option.ids) {
                thisHtml = thisHtml.replace(option.ids[i], option.ids[i] + '_' + num);
            }
            thisHtml = '<div class="one-form-group" id="group_' + num + '">' + thisHtml + '</div>';
            if(option.mode == 'edit') {
                $('#' + option.btn_add_container_id).before(thisHtml);
                $('#' + option.btn_delete_id + '_' + num).click(function(){
                    if(!$(this).attr('disabled')) {
                        $('#group_' + num).remove();
                        setBtnState();
                        if (typeof option.afterRemove === "function") option.afterRemove.apply(this, [option.container, num]);
                    }
                });
                setBtnState();
            } else {
                option.container.append(thisHtml);
            }

            if (typeof option.afterAdd === "function") option.afterAdd.apply(this, [option.container, num]);
        }

        //设置‘删除’和‘添加’按钮的禁用、显示状态
        function setBtnState() {
            var groups = option.container.find('.one-form-group');

            //当表单组数量不超过选项设定的初始表单组的数量时，禁用删除按钮
            if(groups.length <= option.init_number && groups.length > 0) {
                var groupIDStrArray = groups.eq(0).attr('id').split('_');
                var num = parseInt(groupIDStrArray[groupIDStrArray.length - 1]);
                $('#' + option.btn_delete_id + '_' + num).attr('disabled',true);
            } else if(groups.length > option.init_number) {//表单组数量大于初始表单组数量时，删除按钮可用
                for(var i = 0; i < groups.length; i++) {
                    var groupIDStrArray = groups.eq(i).attr('id').split('_');
                    var num = parseInt(groupIDStrArray[groupIDStrArray.length - 1]);
                    $('#' + option.btn_delete_id + '_' + num).attr('disabled',false);
                }
            }

            //当表单组数量大于等于最大数量时，删除‘添加’按钮，或者禁用
            if(option.max_number > 0 && groups.length >= option.max_number) {
                if(option.removeOnMax) {
                    $('#' + option.btn_add_container_id).remove();
                } else {
                    $('#' + option.btn_add_id).attr('disabled', true);
                }

            }
            if(groups.length < options.max_number){
                if(option.removeOnMax) {
                    //当表单组数量小于最大数量，且‘添加’按钮不存在是，创建一个‘添加’按钮
                    if($('#' + option.btn_add_container_id).length == 0) addBtnAdd();
                } else {
                    //当表单组数量小于最大数量，取消"添加"按钮的禁用状态
                    $('#' + option.btn_add_id).removeAttr("disabled");
                }

            }
        }

        //添加初始数据
        function addInitialData(){
            for(var i in option.initialData) {
                if (typeof option.fillInitialData === "function") {
                    addOneFormGroup(i);
                    option.fillInitialData.apply(this, [option.container, option.initialData[i], i]);
                } else {
                    console.log('需要回调函数fillInitialData来填充初始数据！');
                }
            }
        }
    }


};

//用于监听input的值变化（input的值产生变化才会触发事件）
(function ($) {
    $.fn.watchInput = function (callback) {
        return this.each(function () {
            //缓存以前的值
            $.data(this, 'originVal', $(this).val());

            //event
            $(this).on('keyup paste', function () {
                var originVal = $.data(this, 'originVal');
                var currentVal = $(this).val();

                if (originVal != currentVal) {
                    $.data(this, 'originVal', $(this).val());
                    callback(currentVal);
                }
            });
        });
    }
})(jQuery);
