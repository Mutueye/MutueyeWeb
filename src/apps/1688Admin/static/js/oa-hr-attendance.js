$(document).ready(function(){

    var $startTime = $('#start_time');
    var $endTime = $('#end_time');

    var $btn_edit = $('#toolbtn_edit');
    var $table = $('#table');

    var fmt = 'YYYY-MM'
    //起始日期
    $startTime.datetimepicker({
        viewMode: 'months',
        format: fmt,
        allowInputToggle: true
    });
    //截止日期
    $endTime.datetimepicker({
        viewMode: 'months',
        format: fmt,
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

    //设置bootstrap-table插件
    function setBSTable() {
        $table.bootstrapTable({
            showColumns : true,
            showToggle : true,
            pagination : true,
            toolbar : '#toolbar',
            showExport : true,
            showPaginationSwitch : false,
            columns: [
                {
                    field: 'check',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                },
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
                    field: 'date',
                    title: '时间',
                    halign: 'center',
                    sortable: true,
                    align: 'center'
                },
                {
                    field: 'due',
                    title: '应到',
                    halign: 'center',
                    align: 'right'
                },
                {
                    field: 'actual',
                    title: '实到',
                    halign: 'center',
                    align: 'right'
                },
                {
                    field: 'leave',
                    title: '请假',
                    halign: 'center',
                    align: 'right'
                },
                {
                    field: 'business',
                    title: '出差',
                    halign: 'center',
                    align: 'right'
                },
                {
                    field: 'out',
                    title: '外出',
                    halign: 'center',
                    align: 'right',
                }
            ],
            data: [
                {
                    name: '周吴郑',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '30',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
                },
                {
                    name: '任水寒',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '30',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
                },
                {
                    name: '苏普',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '30',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
                },
                {
                    name: '李晟闻',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '30',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
                }
            ]
        });

        setToolBtnDisableState();
        $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });

        //编辑按钮操作
        $btn_edit.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的编辑页面
                window.location.href='oa-hr-attendance-edit.html';
            }
        });
    }

    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }

    function setToolBtnDisableState() {
        $btn_edit.attr('disabled', !$table.bootstrapTable('getSelections').length);
    }

    setBSTable();

});
