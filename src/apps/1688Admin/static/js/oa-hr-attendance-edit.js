$(document).ready(function(){

    //设置默认的起始和截止时间，截止到今天，起始于1月前。
    var defaultEndDate = moment().format('YYYY-MM-DD');
    var defaultStartDate = moment().subtract(1, 'months').format('YYYY-MM-DD');

    var $table = $('#table');
    $table.bootstrapTable({
        showColumns : true,
        showToggle : true,
        pagination : false,
        showExport : true,
        showPaginationSwitch : false,
        columns: [
            {
                field: 'name',
                title: '姓名',
                halign: 'center'
            },
            {
                field: 'dep',
                title: '部门',
                halign: 'center'
            },
            {
                field: 'post',
                title: '职位',
                halign: 'center'
            },
            {
                field: 'date_start',
                title: '开始时间',
                halign: 'center',
                sortable: true,
                align: 'center',
                editable: {
                    emptytext:'请选择日期',
                    title:'选择日期',
                    type:'combodate',
                    format: 'YYYY-MM-DD',
                    viewformat: 'YYYY-MM-DD',
                    template: 'YYYY 年 MM 月 DD 日',
                    combodate: {
                        minYear: 2017,
                        maxYear: 2025,
                        minuteStep: 1
                    },
                    validate: function(value) {
                        var selectedDate = moment(value).format('YYYY-MM-DD');
                        var data = $table.bootstrapTable('getData');
                        var index = $(this).parents('tr').data('index');
                        var rowData = data[index];

                        //开始到截止的天数
                        var total = moment(rowData.date_end).diff(selectedDate,'days');

                        var due = parseInt(rowData.due); //应到
                        var actual = parseInt(rowData.actual);//实到
                        var leave = parseInt(rowData.leave);//请假
                        var business = parseInt(rowData.business);//出差
                        var out = parseInt(rowData.out);//外出

                        var sum = actual + leave + business + out; //实到 + 请假 + 出差 + 外出

                        if($.trim(value) == '') {
                            return '日期不存在，请选择正确的日期';
                        }
                        if(moment(selectedDate).isAfter(defaultEndDate)) {
                            return '不能选择未来的日期';
                        }
                        if(moment(selectedDate).isAfter(data[index].date_end)) {
                            return '起始日期不能晚于截止日期';
                        }
                        if(due > total) {
                            return '开始到截止的天数不能小于应到天数';
                        }
                        if(sum > total) {
                            return '开始到截止的天数不能小于实到+请假+出差+外出天数';
                        }

                    }
                }
            },
            {
                field: 'date_end',
                title: '结束时间',
                halign: 'center',
                sortable: true,
                align: 'center',
                editable: {
                    emptytext:'请选择日期',
                    title:'选择日期',
                    type:'combodate',
                    format: 'YYYY-MM-DD',
                    viewformat: 'YYYY-MM-DD',
                    template: 'YYYY 年 MM 月 DD 日',
                    combodate: {
                        minYear: 2016,
                        maxYear: 2017,
                        minuteStep: 1
                    },
                    validate: function(value) {
                        var selectedDate = moment(value).format('YYYY-MM-DD');
                        var data = $table.bootstrapTable('getData');
                        var index = $(this).parents('tr').data('index');
                        var rowData = data[index];

                        //开始到截止的天数
                        var total = moment(selectedDate).diff(rowData.date_start,'days');

                        var due = parseInt(rowData.due); //应到
                        var actual = parseInt(rowData.actual);//实到
                        var leave = parseInt(rowData.leave);//请假
                        var business = parseInt(rowData.business);//出差
                        var out = parseInt(rowData.out);//外出

                        var sum = actual + leave + business + out; //实到 + 请假 + 出差 + 外出

                        if($.trim(value) == '') {
                            return '日期不存在，请选择正确的日期';
                        }
                        if(moment(selectedDate).isAfter(defaultEndDate)) {
                            return '不能选择未来的日期';
                        }
                        if(moment(selectedDate).isBefore(data[index].date_start)) {
                            return '截止日期不能早于起始日期';
                        }
                        if(due > total) {
                            return '开始到截止的天数不能小于应到天数';
                        }
                        if(sum > total) {
                            return '开始到截止的天数不能小于实到+请假+出差+外出天数';
                        }
                    }
                }
            },
            {
                field: 'due',
                title: '应到',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    },
                    validate: function(value) {
                        var val = $.trim(value);
                        var data = $table.bootstrapTable('getData');
                        var index = $(this).parents('tr').data('index');
                        var rowData = data[index];
                        //截止日期-开始日期的天数
                        var total = moment(rowData.date_end).diff(rowData.date_start,'days');
                        if(val == '') {
                            return '不能为空';
                        }
                        //验证非负整数
                        if(!/^[1-9]\d*|0$/.test(val)){
                            return '请输入天数';
                        }
                        if(val > total) {
                            return '应到天数超出开始到截止的天数'
                        }
                    }
                }
            },
            {
                field: 'actual',
                title: '实到',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    },
                    validate: function(value) {
                        var val = $.trim(value);
                        var data = $table.bootstrapTable('getData');
                        var index = $(this).parents('tr').data('index');
                        var rowData = data[index];
                        var actual = parseInt(val);
                        var leave = parseInt(rowData.leave);
                        var business = parseInt(rowData.business);
                        var out = parseInt(rowData.out);
                        //截止日期-开始日期的天数
                        var total = moment(rowData.date_end).diff(rowData.date_start,'days');
                        var sum = actual + leave + business + out;
                        if(val == '') {
                            return '不能为空';
                        }
                        //验证非负整数
                        if(!/^[1-9]\d*|0$/.test(val)){
                            return '请输入天数';
                        }
                        if(sum > total) {
                            return '实到+请假+出差+外出天数超出开始到截止的天数'
                        }
                    }
                }
            },
            {
                field: 'leave',
                title: '请假',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    },
                    validate: function(value) {
                        var val = $.trim(value);
                        var data = $table.bootstrapTable('getData');
                        var index = $(this).parents('tr').data('index');
                        var rowData = data[index];
                        var actual = parseInt(rowData.actual);
                        var leave = parseInt(val);
                        var business = parseInt(rowData.business);
                        var out = parseInt(rowData.out);
                        //截止日期-开始日期的天数
                        var total = moment(rowData.date_end).diff(rowData.date_start,'days');
                        var sum = actual + leave + business + out;
                        if(val == '') {
                            return '不能为空';
                        }
                        //验证非负整数
                        if(!/^[1-9]\d*|0$/.test(val)){
                            return '请输入天数';
                        }
                        if(sum > total) {
                            return '实到+请假+出差+外出天数超出开始到截止的天数'
                        }
                    }
                }
            },
            {
                field: 'business',
                title: '出差',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    },
                    validate: function(value) {
                        var val = $.trim(value);
                        var data = $table.bootstrapTable('getData');
                        var index = $(this).parents('tr').data('index');
                        var rowData = data[index];
                        var actual = parseInt(rowData.actual);
                        var leave = parseInt(rowData.leave);
                        var business = parseInt(val);
                        var out = parseInt(rowData.out);
                        //截止日期-开始日期的天数
                        var total = moment(rowData.date_end).diff(rowData.date_start,'days');
                        var sum = actual + leave + business + out;
                        if(val == '') {
                            return '不能为空';
                        }
                        //验证非负整数
                        if(!/^[1-9]\d*|0$/.test(val)){
                            return '请输入天数';
                        }
                        if(sum > total) {
                            return '实到+请假+出差+外出天数超出开始到截止的天数'
                        }
                    }
                }
            },
            {
                field: 'out',
                title: '外出',
                halign: 'center',
                align: 'right',
                editable: {
                    type: 'text',
                    success: function(response, newValue) {
                        console.log('success, newValue=' + newValue);
                    },
                    validate: function(value) {
                        var val = $.trim(value);
                        var data = $table.bootstrapTable('getData');
                        var index = $(this).parents('tr').data('index');
                        var rowData = data[index];
                        var actual = parseInt(rowData.actual);
                        var leave = parseInt(rowData.leave);
                        var business = parseInt(rowData.business);
                        var out = parseInt(val);
                        //截止日期-开始日期的天数
                        var total = moment(rowData.date_end).diff(rowData.date_start,'days');
                        var sum = actual + leave + business + out;
                        if(val == '') {
                            return '不能为空';
                        }
                        //验证非负整数
                        if(!/^[1-9]\d*|0$/.test(val)){
                            return '请输入天数';
                        }
                        if(sum > total) {
                            return '实到+请假+出差+外出天数超出开始到截止的天数'
                        }
                    }
                }
            }
        ],
        data: [
            {
                name: '周吴郑',
                dep: '人事部',
                post: '职员',
                date_start: defaultStartDate,
                date_end: defaultEndDate,
                due: '0',
                actual: '0',
                leave: '0',
                business: '0',
                out: '0'
            },
            {
                name: '任水寒',
                dep: '人事部',
                post: '职员',
                date_start: defaultStartDate,
                date_end: defaultEndDate,
                due: '0',
                actual: '0',
                leave: '0',
                business: '0',
                out: '0'
            },
            {
                name: '苏普',
                dep: '人事部',
                post: '职员',
                date_start: defaultStartDate,
                date_end: defaultEndDate,
                due: '0',
                actual: '0',
                leave: '0',
                business: '0',
                out: '0'
            },
            {
                name: '李晟闻',
                dep: '人事部',
                post: '职员',
                date_start: defaultStartDate,
                date_end: defaultEndDate,
                due: '0',
                actual: '0',
                leave: '0',
                business: '0',
                out: '0'
            }
        ]
    });
    $('#btn_submit').click(function(){
        var datas = $table.bootstrapTable('getData');
        if(datas.length > 0) {
            alert(JSON.stringify(datas));
            //提交成功后返回上级
            window.location.href="oa-hr-attendance.html";
        } else {
            toastr.warning('未获取到考勤数据');
        }

    });

});
