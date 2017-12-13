$(document).ready(function(){
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
                        minYear: 2017,
                        maxYear: 2025,
                        minuteStep: 1
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
                    }
                }
            }
        ],
        data: [
            {
                name: '周吴郑',
                dep: '人事部',
                post: '职员',
                date_start: '2017-06-01',
                date_end: '2017-06-30',
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
                date_start: '2017-06-01',
                date_end: '2017-06-30',
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
                date_start: '2017-06-01',
                date_end: '2017-06-30',
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
                date_start: '2017-06-01',
                date_end: '2017-06-30',
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
            if(checkDateValid(datas)){
                //提交成功后返回上级
                window.location.href="oa-hr-attendance.html";
            }
        } else {
            toastr.warning('未获取到考勤数据');
        }

    });

    //遍历即将提交的表格数据，判断选择的日期是否可用，不可用返回false并弹出提示
    function checkDateValid(tableData) {
        var isValid = true;
        for(var i in tableData) {
            //alert(tableData[i].date_start + ' ' + tableData[i].date_end);
            if(!dateIsValid(tableData[i].date_start, tableData[i].date_end)) {
                toastr.warning(tableData[i].name + '的开始日期晚于结束日期，请重新选择！');
                isValid = false;
            }
        }
        return isValid;
    }

    //判断开始日期是否在结束日期之前
    function dateIsValid(date_start,date_end) {
        //日期格式为YYYY-MM-DD时，拆分日期为字符串数组
        var date_start_array = date_start.split('-');
        var date_end_array = date_end.split('-');
        //alert(JSON.stringify(date_start_array) + ' ' + JSON.stringify(date_end_array));
        if(parseInt(date_start_array[0])> parseInt(date_end_array[0])) {
            return false;
        } else if(parseInt(date_start_array[0]) == parseInt(date_end_array[0])) {
            if(parseInt(date_start_array[1]) > parseInt(date_end_array[1])) {
                return false;
            } else if (parseInt(date_start_array[1]) == parseInt(date_end_array[1])) {
                if(parseInt(date_start_array[2]) > parseInt(date_end_array[2])) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true
        }
    }
});
