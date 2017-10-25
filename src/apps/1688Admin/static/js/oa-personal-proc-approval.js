$(document).ready(function(){
    
    setTable1Actions();
    setTable2Actions();
    
    function setTable1Actions() {
        var $btn1_examine = $('#toolbtn_examine');
        var $table1 = $('#table1');
        
        $table1.bootstrapTable({
            toolbar : '#toolbar1',
            showColumns : true,
            showToggle : true,
            pagination : true,
            search : true,
            showExport : true,
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
                    field: 'type',
                    title: '类型',
                    sortable: true,
                    halign: 'center'
                }, 
                {
                    field: 'title',
                    title: '标题',
                    halign: 'center'
                }, 
                {
                    field: 'date',
                    title: '申请时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },
                {
                    field: 'creater',
                    title: '申请人',
                    halign: 'center'
                }, 
                {
                    field: 'dep',
                    title: '申请部门',
                    halign: 'center'
                }
            ],
            data: [
                {
                    id: 1,
                    type: '通知',
                    title: '通知标题',
                    date: '2017.06.23',
                    creater: '周吴郑',
                    dep: '企划部'
                }, 
                {
                    id: 2,
                    type: '请假',
                    title: '请假申请',
                    date: '2017.05.04',
                    creater: '苏普',
                    dep: '财务部'
                }, 
                {
                    id: 3,
                    type: '公告',
                    title: '新入园客户交接',
                    date: '2017.07.11',
                    creater: '李晟闻',
                    dep: '人力资源部'
                }, 
                {
                    id: 4,
                    type: '通知',
                    title: '李沧区人力局视察接待',
                    date: '2017.02.21',
                    creater: '岳叔华',
                    dep: '商务部'    
                }
            ]
        });
        
        setToolBtnDisableState();
        $table1.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });
        
        //审批按钮操作
        $btn1_examine.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table1.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的编辑页面
                window.location.href='oa-personal-proc-approval-examine.html';
            }
        });
        
        function setToolBtnDisableState() {
            var tableSelections = $table1.bootstrapTable('getSelections');
            $btn1_examine.attr('disabled', tableSelections.length != 1);
        }
    }
    
    function setTable2Actions() {
        var $btn2_view = $('#toolbtn2_preview');
        var $table2 = $('#table2');
        
        $table2.bootstrapTable({
            toolbar : '#toolbar2',
            showColumns : true,
            showToggle : true,
            pagination : true,
            singleSelect : true,
            search : true,
            showExport : true,
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
                    field: 'type',
                    title: '类型',
                    sortable: true,
                    halign: 'center'
                }, 
                {
                    field: 'title',
                    title: '标题',
                    halign: 'center'
                }, 
                {
                    field: 'date',
                    title: '申请时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                },
                {
                    field: 'creater',
                    title: '申请人',
                    halign: 'center'
                }, 
                {
                    field: 'dep',
                    title: '申请部门',
                    halign: 'center'
                }
            ],
            data: [
                {
                    id: 1,
                    type: '公告',
                    title: '新入园客户交接',
                    date: '2017.07.11',
                    creater: '李晟闻',
                    dep: '人力资源部'
                }, 
                {
                    id: 2,
                    type: '通知',
                    title: '李沧区人力局视察接待',
                    date: '2017.02.21',
                    creater: '岳叔华',
                    dep: '商务部'    
                },
                {
                    id: 3,
                    type: '通知',
                    title: '通知标题',
                    date: '2017.06.23',
                    creater: '周吴郑',
                    dep: '企划部'
                }, 
                {
                    id: 4,
                    type: '请假',
                    title: '请假申请',
                    date: '2017.05.04',
                    creater: '苏普',
                    dep: '财务部'
                }
            ]
        });
        
        setToolBtnDisableState();
        $table2.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });
        
        //查看按钮操作
        $btn2_view.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table2.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的审核页面
                window.location.href='oa-personal-proc-approval-view.html';
            }
        });
        
        function setToolBtnDisableState() {
            $btn2_view.attr('disabled', $table2.bootstrapTable('getSelections').length != 1);
        }
    }
    
    function getIdSelections($table) {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    
    
    
    
    
});