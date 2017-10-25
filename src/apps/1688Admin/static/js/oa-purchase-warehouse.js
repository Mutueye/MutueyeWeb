$(document).ready(function(){
    var $table = $('#table');
    $table.bootstrapTable({
        showColumns : true,
        showToggle : true,
        showExport : true,
        pagination : true,
        showPaginationSwitch : false,
        columns: [ 
            {
                field: 'asset_type',
                title: '资产类型',
                sortable: true,
                halign: 'center'
            }, 
            {
                field: 'item_name',
                title: '资产名称',
                halign: 'center'
            }, 
            {
                field: 'stock_total',
                title: '入库数',
                sortable: true,
                halign: 'center',
                align: 'right'
            },
            {
                field: 'out_total',
                title: '出库数',
                sortable: true,
                halign: 'center',
                align: 'right'
            }, 
            {
                field: 'stock_remain',
                title: '在库数',
                sortable: true,
                halign: 'center',
                align: 'right'
            }
        ],
        data: [
            {
                id : 1,
                asset_type : '固定资产',
                item_name : '45W节能灯',
                stock_total : '998',
                out_total : '668',
                stock_remain : '300'
            },
            {
                id : 2,
                asset_type : '易耗品',
                item_name : '20mm螺丝',
                stock_total : '669',
                out_total : '492',
                stock_remain : '122'
            }
        ]
    });
    
});