$(document).ready(function(){
    
    var $startTime = $('#start_time');
    var $endTime = $('#end_time');
    
    var $btn_remove = $('#toolbtn_remove');
    var $btn_edit = $('#toolbtn_edit');
    var $btn_view = $('#toolbtn_view');
    var $table = $('#table');
    
    //设置bootstrap-table插件
    function setBSTable() {
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
                    field: 'dep',
                    title: '申请部门',
                    halign: 'center'
                }, 
                {
                    field: 'title',
                    title: '标题',
                    halign: 'center',
                    sortable: true
                }, 
                {
                    field: 'num',
                    title: '招聘人数',
                    halign: 'center',
                    align: 'right',
                    sortable: true
                }, 
                {
                    field: 'date',
                    title: '申请时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }, 
                {
                    field: 'state',
                    title: '状态',
                    halign: 'center',
                    sortable: true
                }
            ],
            data: [
                {
                    id: 1,
                    dep: '财务部',
                    title: '员工招聘',
                    num: '2',
                    date: '2017.06.23',
                    state: '审批中'
                }, 
                {
                    id: 2,
                    dep: '行政部',
                    title: '员工招聘',
                    num: '3',
                    date: '2017.02.19',
                    state: '已通过'
                }
            ]
        });
        
        setToolBtnDisableState();
        $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });
        
        //撤销操作
        $btn_remove.click(function () {
            //按钮如果不是disabled状态,则可进行操作
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }

                BSModal.confirm({ content: "确认要撤销该申请吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }
                    
                    //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                    var ids = getIdSelections();
                    $table.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    setToolBtnDisableState();
                    toastr.success('该申请已撤销成功！');
                    
                });
            }
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
                window.location.href='oa-hr-recruit-edit.html';
            }
        });
        
        //查看按钮操作
        $btn_view.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的编辑页面
                window.location.href='oa-hr-recruit-view.html';
            }
        });
    }
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections')
        $btn_edit.attr('disabled', tableSelections.length != 1);
        $btn_view.attr('disabled', tableSelections.length != 1);
        //撤销：非‘已通过’状态时，按钮才可用可操作
        $btn_remove.attr('disabled', tableSelections.length != 1 || (tableSelections.length == 1 && tableSelections[0].state == '已通过'));
    }
    
    
    window.commonTools.setDateTimeInputSection($startTime, $endTime);
    setBSTable();
    
});