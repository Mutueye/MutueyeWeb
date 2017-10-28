$(document).ready(function(){
    
    var $btn_reply = $('#toolbtn_reply');
    

    var $table = $('#table');
    
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
                field: 'apply',
                title: '申请内容',
                halign: 'center'
            }, 
            {
                field: 'company',
                title: '公司',
                halign: 'center'
            },
            {
                field: 'address',
                title: '地点',
                halign: 'center'
            },
            {
                field: 'contact',
                title: '联系方式',
                halign: 'center'
            },
            {
                field: 'date',
                title: '时间',
                halign: 'center',
                align: 'center'
            }
        ],
        data: [
            {
                id : 1,
                apply : '财务申请',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                date : '2018-09-15'
            },
            {
                id : 2,
                apply : '物业申请',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                date : '2018-01-06'
            },
            {
                id : 3,
                apply : '创业申请',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                date : '2018-11-04'
            },
            {
                id : 4,
                apply : '财务申请',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                date : '2018-05-27'
            }
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //回复
    $btn_reply.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));

            window.location.href='operate-thirdparty-apply-reply.html';
        }
    });
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_reply.attr('disabled', tableSelections.length != 1);
    }
    
});