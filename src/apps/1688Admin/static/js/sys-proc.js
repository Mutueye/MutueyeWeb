$(document).ready(function(){
    
    var $btn_edit = $('#toolbtn_edit');
    var $btn_view = $('#toolbtn_view');
    var $btn_dis_en_able = $('#toolbtn_dis_en_able');
    var $btn_delete = $('#toolbtn_remove');
    

    var $table = $('#table');
    
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
                title: '序号',
                sortable: true,
                halign: 'center',
                align: 'right',
                width: 30
            }, 
            {
                field: 'title',
                title: '流程名称',
                halign: 'center'
            }, 
            {
                field: 'state',
                title: '状态',
                sortable: true,
                halign: 'center'
            },
            {
                field: 'desc',
                title: '描述',
                halign: 'center'
            }
        ],
        data: [
            {
                id : 1,
                title : '流程1',
                state : '可用',
                desc : '描述1'
            },
            {
                id : 2,
                title : '流程2',
                state : '禁用',
                desc : '描述2'
            },
            {
                id : 3,
                title : '流程3',
                state : '可用',
                desc : '描述3'
            },
            {
                id : 4,
                title : '流程4',
                state : '禁用',
                desc : '描述4'
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

            window.location.href='sys-proc-edit.html';
        }
    });
    
    //查看
    $btn_view.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));

            window.location.href='sys-proc-view.html';
        }
    });
    
    //启用/禁用操作
    $btn_dis_en_able.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            
            //确保只选中了一项数据,切换 上架/下架 状态
            if(arrselections.length == 1) {
                var row_index = $table.find('.selected').eq(0).attr('data-index');
                var target_state = '可用';
                if(arrselections[0].state == '可用') target_state = '禁用';
                $table.bootstrapTable('updateCell', {
                    index : row_index,
                    field : 'state',
                    value : target_state
                });
                
                //提交修改后的数据...
            }
        }
    });
    
    //删除操作
    $btn_delete.click(function () {
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
        $btn_edit.attr('disabled', tableSelections.length != 1);
        $btn_view.attr('disabled', tableSelections.length != 1);
        $btn_dis_en_able.attr('disabled', tableSelections.length != 1);
        $btn_delete.attr('disabled', !tableSelections.length);
    }
    
});