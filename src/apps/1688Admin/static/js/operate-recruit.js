$(document).ready(function(){
    
    var $btn_edit = $('#toolbtn_edit');
    var $btn_view = $('#toolbtn_view');
    var $btn_delete = $('#toolbtn_delete');
    

    var $table = $('#table');
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
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
                field: 'post',
                title: '职位',
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
                field: 'author',
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
                post : '程序员',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                author : '张潇',
                date : '2018-09-15'
            },
            {
                id : 2,
                post : '行政',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                author : 'Mike',
                date : '2018-01-06'
            },
            {
                id : 3,
                post : '财会',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                author : '南怀瑾',
                date : '2018-11-04'
            },
            {
                id : 4,
                post : '业务',
                company : 'HP',
                address : 'D2 203',
                contact : '13812345678',
                author : '慕容白',
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

            window.location.href='operate-recruit-edit.html';
        }
    });
    
    //查看
    $btn_view.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));

            window.location.href='operate-recruit-view.html';
        }
    });
    
    //删除操作
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
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_edit.attr('disabled', tableSelections.length != 1);
        $btn_view.attr('disabled', tableSelections.length != 1);
        $btn_delete.attr('disabled', !$table.bootstrapTable('getSelections').length);
    }
    
});