$(document).ready(function(){

    var $table = $('#table');
    
    $table.bootstrapTable({
        showColumns : true,
        showToggle : true,
        showExport : true,
        pagination : true,
        showPaginationSwitch : false,
        clickToSelect : true,
        columns: [
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
                field: 'desc',
                title: '描述',
                halign: 'center'
            },
            {
                field: 'auth',
                title: '授权人',
                halign: 'center'
            }
        ],
        data: [
            {
                id : 1,
                title : '流程1',
                desc : '描述1',
                auth : '王悟'
            },
            {
                id : 2,
                title : '流程2',
                desc : '描述2',
                auth : '张伞'
            },
            {
                id : 3,
                title : '流程3',
                desc : '描述3',
                auth : '李思'
            }
        ]
    });
    
});