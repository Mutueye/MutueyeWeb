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
                title: '编号',
                halign: 'center',
                align: 'right'
            },
            {
                field: 'obj_name',
                title: '名称',
                halign: 'center'
            },
            {
                field: 'action',
                title: '行为',
                halign: 'center'
            },
            {
                field: 'obj_father',
                title: '上级对象',
                halign: 'center'
            }, 
            {
                field: 'state',
                title: '状态',
                sortable: true,
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
                id : 1,
                id_num : 'AO-OFFICEAUTOMATION',
                obj_name : '协同办公',
                action : '',
                obj_father : '',
                state : '启用',
                ps : ''
            },
            {
                id : 2,
                id_num : 'AO-HUMANRESOURCES',
                obj_name : '人力资源',
                action : '',
                obj_father : '协同办公',
                state : '禁用',
                ps : ''
            },
            {
                id : 3,
                id_num : 'AO-RECRUIT',
                obj_name : '招聘',
                action : ["新增","删除","修改","查看"],
                obj_father : '人力资源',
                state : '启用',
                ps : ''
            },
            {
                id : 4,
                id_num : 'AO-CULTIVATE',
                obj_name : '培训',
                action : ["打印","删除","导出","查看"],
                obj_father : '人力资源',
                state : '禁用',
                ps : ''
            },
            {
                id : 5,
                id_num : 'AO-DOCUMENT',
                obj_name : '文档管理',
                action : ["修改","查看","导出","下载"],
                obj_father : '协同办公',
                state : '禁用',
                ps : ''
            },
            {
                id : 6,
                id_num : 'AO-PURCHASE',
                obj_name : '物资采购',
                action : ["新增","删除","审核"],
                obj_father : '',
                state : '启用',
                ps : ''
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
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_dis_en_able.attr('disabled', tableSelections.length != 1);
    }
    
});