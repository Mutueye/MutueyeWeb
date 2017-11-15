$(document).ready(function(){
    var $btn_dis_en_able = $('#toolbtn_dis_en_able');
    

    var $table = $('#table');
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
        pagination : true,
        search : true,
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
                field: 'id_num',
                title: 'ID号',
                halign: 'center',
                align: 'right'
            },
            {
                field: 'phone',
                title: '手机号',
                halign: 'center'
            },
            {
                field: 'account',
                title: '用户名',
                halign: 'center'
            },
            {
                field: 'reg_time',
                title: '注册时间',
                halign: 'center',
                align: 'center'
            }, 
            {
                field: 'state',
                title: '状态',
                sortable: true,
                halign: 'center'
            }
        ],
        data: [
            {
                id : 1,
                id_num : '102934',
                phone : '13812345678',
                account : 'user1',
                reg_time : '2018-10-10 13:32',
                state : '启用'
            },
            {
                id : 2,
                id_num : '102935',
                phone : '13812345678',
                account : 'user2',
                reg_time : '2018-10-10 13:32',
                state : '禁用'
            },
            {
                id : 3,
                id_num : '102936',
                phone : '13812345678',
                account : 'user3',
                reg_time : '2018-10-10 13:32',
                state : '启用'
            },
            {
                id : 4,
                id_num : '102937',
                phone : '13812345678',
                account : 'user4',
                reg_time : '2018-10-10 13:32',
                state : '禁用'
            }
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
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
            
            //确保只选中了一项数据,切换 启用/禁用 状态
            if(arrselections.length == 1) {
                var row_index = $table.find('.selected').eq(0).attr('data-index');
                var target_state = '启用';
                if(arrselections[0].state == '启用') target_state = '禁用';
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
        $btn_dis_en_able.attr('disabled', tableSelections.length != 1);
    }
    
});