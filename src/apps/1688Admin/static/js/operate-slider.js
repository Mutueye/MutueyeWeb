$(document).ready(function(){
    
    var $btn_edit = $('#toolbtn_edit');
    var $btn_shelf = $('#toolbtn_shelf');
    

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
                radio: true,
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
                title: '标题',
                halign: 'center'
            }, 
            {
                field: 'position',
                title: '位置',
                halign: 'center'
            },
            {
                field: 'state',
                title: '状态',
                sortable: true,
                halign: 'center'
            },
            {
                field: 'publisher',
                title: '作者',
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
                title : '轮播图标题1',
                position : '1',
                state : '上架',
                publisher : '作者1',
                date : '2018-09-15'
            },
            {
                id : 2,
                title : '轮播图标题2',
                position : '2',
                state : '下架',
                publisher : '作者2',
                date : '2018-01-06'
            },
            {
                id : 3,
                title : '轮播图标题3',
                position : '3',
                state : '上架',
                publisher : '作者3',
                date : '2018-11-04'
            },
            {
                id : 4,
                title : '轮播图标题4',
                position : '4',
                state : '下架',
                publisher : '作者3',
                date : '2018-05-27'
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

            window.location.href='operate-slider-edit.html';
        }
    });
    
    //上架/下架操作
    $btn_shelf.click(function () {
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
                var target_state = '上架';
                if(arrselections[0].state == '上架') target_state = '下架';
                $table.bootstrapTable('updateCell', {
                    index : row_index,
                    field : 'state',
                    value : target_state
                });
                
                //提交修改后的数据...
            }
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
        $btn_shelf.attr('disabled', tableSelections.length != 1);
    }
    
});