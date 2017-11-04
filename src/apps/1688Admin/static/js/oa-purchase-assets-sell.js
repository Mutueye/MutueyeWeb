$(document).ready(function(){
    
    var $time = $('#time');

    var $btn_edit = $('#toolbtn_edit');
    var $btn_preview = $('#toolbtn_preview');
    var $btn_cancel = $('#toolbtn_cancel');
    var $btn_remove = $('#toolbtn_remove');
    var $table = $('#table');
    
    window.commonTools.setDateTimeInput($time);
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
        pagination : true,
        showPaginationSwitch : false,
        clickToSelect : true,
        columns: [
            {
                field: 'check',
                checkbox: true,
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'id',
                title: '出售单号',
                sortable: true,
                halign: 'center',
                align: 'right',
                width: 30
            },  
            {
                field: 'applier',
                title: '申请人',
                halign: 'center'
            },
            {
                field: 'dep',
                title: '申请部门',
                halign: 'center'
            },
            {
                field: 'time1',
                title: '申请时间',
                halign: 'center',
                align: 'center'
            },
            {
                field: 'state',
                title: '状态',
                halign: 'center'
            }
        ],
        data: [
            {
                id : '20180909001',
                applier : '王小二',
                dep : '财务',
                time1 : '2018-09-09',
                state : '审批中'
            },
            {
                id : '20180328001',
                applier : '王小二',
                dep : '维修',
                time1 : '2018-03-28',
                state : '待采购'
            },
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
            
            window.location.href='oa-purchase-assets-sell-edit.html';
        }
    });
    
    //查看
    $btn_preview.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            window.location.href='oa-purchase-assets-sell-view.html';
        }
    });
    
    //取消申请
    $btn_cancel.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }

            BSModal.confirm({ content: "确认要取消该条目的出售申请吗？" }).on(function (e) {
                if (!e) {
                    return;
                }
                
                //取消申请，完成后提示
                toastr.success('取消申请成功！');
                
            });
        }
    });
    
    //删除
    $btn_remove.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }

            BSModal.confirm({ content: "确认要删除选择的数据吗？" }).on(function (e) {
                if (!e) {
                    return;
                }
                
                //ajax删除数据...
                
                //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                var ids = getIdSelections();
                $table.bootstrapTable('remove', {
                    field: 'id',
                    values: ids
                });
                setToolBtnDisableState();
                toastr.success('删除的数据已提交成功！');
                
            });
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
        $btn_cancel.attr('disabled', tableSelections.length != 1);
        $btn_preview.attr('disabled', tableSelections.length != 1);
    }
    
});