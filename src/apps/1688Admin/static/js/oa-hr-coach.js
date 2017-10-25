$(document).ready(function(){
    
    var $startTime = $('#start_time');
    var $endTime = $('#end_time');
    
    var $btn_new = $('#toolbtn_new');
    var $btn_edit = $('#toolbtn_edit');
    var $btn_sign = $('#toolbtn_sign');
    var $table = $('#table');
    
    window.commonTools.setDateTimeInputSection($startTime, $endTime);
    
    //设置bootstrap-table插件
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        pagination : true,
        singleSelect : true,
        showPaginationSwitch : false,
        clickToSelect : true,
        columns: [
            {
                field: 'check',
                radio: true,
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'id',
                title: '序号',
                sortable: true,
                halign: 'center',
                align: 'right',
                width: 30
            },
            {
                field: 'title',
                title: '标题',
                halign: 'center'
            }, 
            {
                field: 'holder',
                title: '发起人',
                halign: 'center'
            }, 
            {
                field: 'type',
                title: '培训类型',
                halign: 'center'
            }, 
            {
                field: 'date',
                title: '培训时间',
                halign: 'center',
                sortable: true
            }, 
            {
                field: 'address',
                title: '培训地点',
                halign: 'center'
            }, 
            {
                field: 'due_num',
                title: '应参人数',
                halign: 'center'
            }, 
            {
                field: 'actual_num',
                title: '实际人数',
                halign: 'center'
            }, 
            {
                field: 'state',
                title: '状态',
                halign: 'center',
                sortable: true
            }, 
            {
                field: 'create_time',
                title: '创建时间',
                halign: 'center',
                align: 'center'
            }
        ],
        data: [
            {
                id: 1,
                title : '安全培训',
                holder: '周吴郑',
                type: '安全培训',
                date: '2017.06.23',
                address: 'F0 203',
                due_num: '23',
                actual_num: '21',
                state: '待审批',
                create_time: '2017.04.18 12:30'
            }, 
            {
                id: 2,
                title : '入职培训',
                holder: '任水涵',
                type: '入赘培训',
                date: '2017.09.02',
                address: 'D2 301',
                due_num: '4',
                actual_num: '4',
                state: '待签到',
                create_time: '2017.04.18 12:30'
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
            window.location.href='oa-hr-coach-edit.html';
        }
    });
    
    //编辑按钮操作
    $btn_sign.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            window.location.href='oa-hr-coach-sign.html';
        }
    });
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_edit.attr('disabled', tableSelections.length != 1);
        //签到：单选待签到状态才可签到
        $btn_sign.attr('disabled', tableSelections.length != 1 || (tableSelections.length == 1 && tableSelections[0].state != '待签到'));
    }
    
});