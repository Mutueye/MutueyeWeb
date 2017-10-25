$(document).ready(function(){
    
    var $startTime = $('#start_time');
    var $endTime = $('#end_time');
    
    var $btn_new = $('#toolbtn_new');
    var $btn_edit = $('#toolbtn_edit');
    var $btn_preview = $('#toolbtn_preview');
    var $btn_remove = $('#toolbtn_remove');
    var $table = $('#table');
    
    window.commonTools.setDateTimeInputSection($startTime,$endTime);
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
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
                title: '工号',
                sortable: true,
                halign: 'center',
                align: 'right',
                width: 30
            }, 
            {
                field: 'name',
                title: '申请人',
                halign: 'center'
            }, 
            {
                field: 'dep',
                title: '申请部门',
                halign: 'center'
            },
            {
                field: 'type',
                title: '请假类型',
                sortable: true,
                halign: 'center'
            }, 
            {
                field: 'state',
                title: '状态',
                sortable: true,
                halign: 'center'
            },
            {
                field: 'time',
                title: '申请时间',
                sortable: true,
                halign: 'center',
                align: 'center'
            },
            {
                field: 'time2',
                title: '销假时间',
                sortable: true,
                halign: 'center',
                align: 'center'
            }
        ],
        data: [
            {
                id : 1,
                name : '王先生',
                dep : '行政部',
                type : '病假',
                state : '审批中',
                time : '2018-09-09',
                time2 : '2018-10-01'
            },
            {
                id : 2,
                name : '李先生',
                dep : '财务部',
                type : '事假',
                state : '批准',
                time : '2018-03-12',
                time2 : '2018-03-24'
            }
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //编辑
    $btn_edit.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            window.location.href='oa-hr-leave-edit.html';
        }
    });
    
    //销假
    $btn_remove.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }

            console.log(JSON.stringify(arrselections));
            
            window.location.href='oa-hr-leave-clear.html';
        }
    });
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_remove.attr('disabled', !tableSelections.length);
        $btn_edit.attr('disabled', tableSelections.length != 1);
    }
    
});