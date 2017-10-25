$(document).ready(function(){
    
    window.commonTools.setDateTimeInput($('#workdate'));
    window.commonTools.initBSFileInput($('#photo'));
    $('#gradu_date').datetimepicker({
        viewMode: 'years',
        format: 'YYYY',
        allowInputToggle: true
    });
    $('#start_date').datetimepicker({
        viewMode: 'years',
        format: 'YYYY',
        allowInputToggle: true
    });
    
    window.commonTools.duplicateFormCtrl({
        container : $('#edu_history'),
        html :  '<div class="col-xs-12 col-sm-8">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">起始时间：</div>' +
                            '<input type="text" class="form-control" id="edu_start_time">' +
                            '<div class="input-group-addon no-border">' +
                                '<i class="fa fa-arrows-h"></i>' +
                            '</div>' + 
                            '<input type="text" class="form-control" id="edu_end_time">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">学校名称：</div>' +
                            '<input type="text" class="form-control" id="edu_school">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-6">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">主修课程内容：</div>' +
                            '<input type="text" class="form-control" id="edu_major">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4 col-md-5">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">学习成果或获取证书：</div>' +
                            '<input type="text" class="form-control" id="edu_achieve">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="edu_btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' + 
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : ['edu_start_time', 'edu_end_time', 'edu_school', 'edu_major', 'edu_achieve', 'edu_btn_delete'],
        btn_delete_id : 'edu_btn_delete',
        btn_add_id : 'edu_btn_add',
        btn_add_container_id : 'edu_btn_add_container',
        btn_add_html :  '<div id="edu_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的教育经历信息</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="edu_btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' + 
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 1,
        max_number : 5,
        afterAdd : function($container, id) {
            var $startTime = $('#edu_start_time_' + id );
            var $endTime = $('#edu_end_time_' + id);
            
            $startTime.datetimepicker({
                viewMode: 'months',
                format: 'YYYY-MM',
                allowInputToggle: true
            });
            //截止日期
            $endTime.datetimepicker({
                viewMode: 'months',
                format: 'YYYY-MM',
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
    });
    
    window.commonTools.duplicateFormCtrl({
        container : $('#work_history'),
        html :  '<div class="col-xs-12 col-sm-8">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">起始时间：</div>' +
                            '<input type="text" class="form-control" id="work_start_time">' +
                            '<div class="input-group-addon no-border">' +
                                '<i class="fa fa-arrows-h"></i>' +
                            '</div>' + 
                            '<input type="text" class="form-control" id="work_end_time">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">单位名称：</div>' +
                            '<input type="text" class="form-control" id="work_unit">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-6">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">部门及职务：</div>' +
                            '<input type="text" class="form-control" id="work_dep">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-6">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">证明人及联系电话：</div>' +
                            '<input type="text" class="form-control" id="work_reterence">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-10 col-md-11">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">工作内容简介：</div>' +
                            '<input type="text" class="form-control" id="work_intro">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="work_btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' + 
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : ['work_start_time', 'work_end_time', 'work_unit', 'work_dep', 'work_reterence', 'work_intro', 'work_btn_delete'],
        btn_delete_id : 'work_btn_delete',
        btn_add_id : 'work_btn_add',
        btn_add_container_id : 'work_btn_add_container',
        btn_add_html :  '<div id="work_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的工作经历信息</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="work_btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' + 
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 1,
        max_number : 5,
        afterAdd : function($container, id) {
            var $startTime = $('#work_start_time_' + id );
            var $endTime = $('#work_end_time_' + id);
            
            $startTime.datetimepicker({
                viewMode: 'months',
                format: 'YYYY-MM',
                allowInputToggle: true
            });
            //截止日期
            $endTime.datetimepicker({
                viewMode: 'months',
                format: 'YYYY-MM',
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
    });
    
    window.commonTools.duplicateFormCtrl({
        container : $('#family_members'),
        html :  '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">姓名：</div>' +
                            '<input type="text" class="form-control" id="fmember_name">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">与本人关系：</div>' +
                            '<input type="text" class="form-control" id="fmember_relationship">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">联系电话：</div>' +
                            '<input type="text" class="form-control" id="fmember_phone">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-6 col-md-6">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">联系地址：</div>' +
                            '<input type="text" class="form-control" id="fmember_address">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4 col-md-5">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">工作单位：</div>' +
                            '<input type="text" class="form-control" id="fmember_unit">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="fmember_btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' + 
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : ['fmember_name', 'fmember_relationship', 'fmember_phone', 'fmember_address', 'fmember_unit', 'fmember_btn_delete'],
        btn_delete_id : 'fmember_btn_delete',
        btn_add_id : 'fmember_btn_add',
        btn_add_container_id : 'fmember_btn_add_container',
        btn_add_html :  '<div id="fmember_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的家庭成员信息</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="fmember_btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' + 
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 1,
        max_number : 3
    });
    
    $('#btn_submit').click(function(){
        
        window.location.href='oa-hr-info.html';
        
    });
    
});