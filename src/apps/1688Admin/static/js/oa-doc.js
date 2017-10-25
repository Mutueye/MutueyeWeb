$(document).ready(function(){
    
    var $btn_edit = $('#btn_edit');
    var $btn_delete = $('#btn_delete');
    
    var $table = $('#table');
    
    //设置bootstrap-table插件
    function setBSTable() {
        $table.bootstrapTable({
            toolbar : '#toolbar',
            showColumns : true,
            showToggle : true,
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
                    title: '文档编号',
                    sortable: true,
                    halign: 'center'
                }, 
                {
                    field: 'title',
                    title: '标题',
                    halign: 'center'
                }, 
                {
                    field: 'category',
                    title: '文档类型',
                    halign: 'center'
                },  
                {
                    field: 'date',
                    title: '上传时间',
                    halign: 'center',
                    sortable: true,
                    align: 'center'
                },
                {
                    field: 'uploader',
                    title: '上传人',
                    halign: 'center'
                },
            ],
            data: [
                {
                    id: 'MT231029',
                    title: '文档名称1',
                    category: '行政文档',
                    date: '2017.06.23',
                    uploader: '罗振亮'
                }, 
                {
                    id: 'MT4123u4',
                    title: '文档名称2',
                    category: '行政文档',
                    date: '2017.02.19',
                    uploader: '王强'
                }
            ]
        });
        
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
                
                //根据选定的数据信息跳转到对应的页面
                window.location.href='oa-doc-edit.html';
                
            }
        });
        
        //删除
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
        
        
    }
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');        
        $btn_edit.attr('disabled', tableSelections.length != 1);
        $btn_delete.attr('disabled', !tableSelections.length);
    }
    
    setBSTable();
    
});