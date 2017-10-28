$(document).ready(function(){
    
    var $btn_edit = $('#toolbtn_edit');
    var $btn_examine = $('#toolbtn_examine');
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
                field: 'news',
                title: '新闻内容',
                halign: 'center'
            }, 
            {
                field: 'resource',
                title: '新闻来源',
                halign: 'center'
            },
            {
                field: 'state',
                title: '状态',
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
                news : '新闻标题新闻标题1',
                resource : '来源1',
                state : '待审核',
                date : '2018-09-15'
            },
            {
                id : 2,
                news : '新闻标题新闻标题2',
                resource : '来源2',
                state : '发布',
                date : '2018-01-06'
            },
            {
                id : 3,
                news : '新闻标题新闻标题3',
                resource : '来源3',
                state : '审核中',
                date : '2018-11-04'
            },
            {
                id : 4,
                news : '新闻标题新闻标题3',
                resource : '来源4',
                state : '暂存',
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

            window.location.href='operate-news-center-edit.html';
        }
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

            window.location.href='operate-news-center-examine.html';
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

            window.location.href='operate-news-center-view.html';
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
        //待审核状态才可以点击审核按钮
        $btn_examine.attr('disabled', tableSelections.length != 1 || (tableSelections.length == 1 && tableSelections[0].state != '待审核'));
    }
    
});