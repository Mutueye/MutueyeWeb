$(document).ready(function(){
    
    $('#purchase_table').bootstrapTable({
        pagination : false,
        showPaginationSwitch : false,
        columns: [ 
            {
                field: 'name',
                title: '用品名称',
                halign: 'center'
            },
            {
                field: 'spec',
                title: '规格',
                halign: 'center'
            }, 
            {
                field: 'num',
                title: '数量',
                halign: 'center'
            }, 
            {
                field: 'unit',
                title: '单位',
                halign: 'center',
                align: 'center'
            }, 
            {
                field: 'usage',
                title: '用途',
                halign: 'center'
            }, 
            {
                field: 'date',
                title: '需用日期',
                halign: 'center'
            }, 
            {
                field: 'price',
                title: '估计价格（元）',
                halign: 'center'
            }, 
            {
                field: 'ps',
                title: '备注',
                halign: 'center'
            }
        ],
        data: [
            {
                name : '手电筒',
                spec : 'SDT01',
                num : '20',
                unit : '个',
                usage : '照明',
                date : '2017-12-12',
                price : '23',
                ps : '无'
            }
        ]
    });
    
    $('#btn_ok').click(function(){
        
        window.location.href='oa-purchase-examine-3.html';
        
    });
    
    $('#btn_no').click(function(){
        
        window.location.href='oa-purchase.html';
        
    });
    
});