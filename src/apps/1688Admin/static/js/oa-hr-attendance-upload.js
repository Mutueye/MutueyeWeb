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
                align: 'center'
            },
            {
                field: 'date_end',
                title: '结束时间',
                halign: 'center',
                sortable: true,
                align: 'center'
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
                date_start: '2017.06.01',
                date_end: '2017.06.30',
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
                date_start: '2017.06.01',
                date_end: '2017.06.30',
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
                date_start: '2017.06.01',
                date_end: '2017.06.30',
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
                date_start: '2017.06.01',
                date_end: '2017.06.30',
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
