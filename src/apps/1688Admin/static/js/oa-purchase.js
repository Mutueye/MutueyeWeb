$(document).ready(function(){
    
    var $time = $('#time');
    
    var $btn_new = $('#toolbtn_new');
    var $btn_edit = $('#toolbtn_edit');
    var $btn_view = $('#toolbtn_view');
    var $btn_remove = $('#toolbtn_remove');
    var $table = $('#table');
    
    window.commonTools.setDateTimeInput($time);
    
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
                title: '采购号',
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
                field: 'time',
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
                id : '19045182412',
                title : '采购申请',
                name : '王先生',
                dep : '行政部',
                time : '2018-09-09',
                state : '审批中'
            },
            {
                id : '19045182421',
                title : '采购申请',
                name : '李先生',
                dep : '财务部',
                time : '2018-03-12',
                state : '已通过'
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
            
            window.location.href='oa-purchase-edit.html';
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
            
            window.location.href='oa-purchase-view.html';
        }
    });
    
    //撤销
    $btn_remove.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }

            BSModal.confirm({ content: "确认要撤销选择的采购申请吗？" }).on(function (e) {
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
                toastr.success('您选择的采购申请已撤销！');
                
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
        $btn_view.attr('disabled', tableSelections.length != 1);
        //编辑和撤销：状态非已通过才可以编辑和撤销
        $btn_edit.attr('disabled', tableSelections.length != 1 || (tableSelections.length == 1 && tableSelections[0].state == '已通过'));
        $btn_remove.attr('disabled', tableSelections.length != 1 || (tableSelections.length == 1 && tableSelections[0].state == '已通过'));
    }
    
});