$(document).ready(function(){
    
    var $btn_examine = $('#toolbtn_examine');
    
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
                field: 'title',
                title: '先锋故事',
                halign: 'center'
            }, 
            {
                field: 'state',
                title: '状态',
                halign: 'center'
            }, 
            {
                field: 'publisher',
                title: '投稿人',
                halign: 'center'
            }, 
            {
                field: 'examiner',
                title: '审核人',
                halign: 'center'
            },
            {
                field: 'date',
                title: '发布时间',
                halign: 'center',
                align: 'center'
            }
        ],
        data: [
            {
                id : 1,
                title : '先锋故事1',
                state : '待审核',
                publisher : 'Elena',
                examiner : 'admin',
                date : '2018-09-15'
            },
            {
                id : 2,
                title : '先锋故事2',
                state : '待审核',
                publisher : 'Mike',
                examiner : 'admin',
                date : '2018-01-06'
            },
            {
                id : 3,
                title : '先锋故事3',
                state : '审核通过',
                publisher : '南怀瑾',
                examiner : 'admin',
                date : '2018-11-04'
            },
            {
                id : 4,
                title : '先锋故事4',
                state : '审核不通过',
                publisher : '慕容白',
                examiner : 'admin',
                date : '2018-05-27'
            }
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //审核
    $btn_examine.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));

            window.location.href='party-learn-story-commit-examine.html';
        }
    });

    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        //待审核状态才可以点击审核按钮
        $btn_examine.attr('disabled', tableSelections.length != 1 || (tableSelections.length == 1 && tableSelections[0].state != '待审核'));
    }
    
});