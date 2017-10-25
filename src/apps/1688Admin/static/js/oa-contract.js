$(document).ready(function(){
    
    var $btn_renew = $('#btn_renew');
    var $btn_change = $('#btn_change');
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
                    title: '序号',
                    sortable: true,
                    halign: 'center',
                    align: 'right',
                    width: 30
                }, 
                {
                    field: 'type',
                    title: '合同种类',
                    halign: 'center'
                }, 
                {
                    field: 'number',
                    title: '合同编号',
                    halign: 'center'
                }, 
                {
                    field: 'category',
                    title: '合同类型',
                    halign: 'center'
                }, 
                {
                    field: 'title',
                    title: '合同名称',
                    halign: 'center'
                },  
                {
                    field: 'version',
                    title: '版本号',
                    halign: 'center'
                }, 
                {
                    field: 'date',
                    title: '上传时间',
                    halign: 'center',
                    sortable: true,
                    align: 'center'
                }
            ],
            data: [
                {
                    id: 1,
                    type: '新增',
                    number: 'HT201923',
                    category: '采购合同',
                    title: '合同名称1',
                    version: '1.0.1',
                    date: '2017.06.23'
                }, 
                {
                    id: 2,
                    type: '变更',
                    number: 'HT1302923',
                    category: '劳动合同',
                    title: '合同名称2',
                    version: '1.0.0',
                    date: '2017.02.19'
                }
            ]
        });
        
        setToolBtnDisableState();
        $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });
        
        //续签
        $btn_renew.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                
                //根据选定的数据信息跳转到对应的页面
                window.location.href='oa-contract-renew.html';
                
            }
        });
        
        //变更
        $btn_change.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                
                //根据选定的数据信息跳转到对应的页面
                window.location.href='oa-contract-change.html';
                
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
        $btn_renew.attr('disabled', tableSelections.length != 1);
        $btn_change.attr('disabled', tableSelections.length != 1);
        $btn_delete.attr('disabled', !tableSelections.length);
    }
    
    setBSTable();
    
});