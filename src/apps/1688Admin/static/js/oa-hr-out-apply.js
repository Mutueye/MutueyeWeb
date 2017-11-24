$(document).ready(function(){

    var $startTime = $('#start_time');
    var $endTime = $('#end_time');

    var $btn_remove = $('#toolbtn_remove');
    var $btn_edit = $('#toolbtn_edit');
    var $table = $('#table');

    window.commonTools.setDateTimeInputSection($startTime, $endTime);

    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
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
                field: 'name',
                title: '姓名',
                halign: 'center'
            },
            {
                field: 'type',
                title: '外出类型',
                halign: 'center',
                sortable: true
            },
            {
                field: 'time_start',
                title: '外出开始时间',
                halign: 'center',
                align: 'center'
            },
            {
                field: 'time_end',
                title: '外出结束时间',
                halign: 'center',
                align: 'center'
            }
        ],
        data: [
            {
                id: 1,
                name: '周吴郑',
                type: '业务',
                time_start: '2017.06.23 09:00',
                time_end: '2017.06.23 12:00'
            },
            {
                id: 2,
                name: '任水寒',
                type: '培训',
                time_start: '2017.06.23 09:00',
                time_end: '2017.06.23 12:00'
            }
        ]
    });

    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });

    //删除操作
    $btn_remove.click(function () {
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

    //编辑按钮操作
    $btn_edit.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            //根据选定的数据信息跳转到对应的编辑页面
            window.location.href='oa-hr-out-apply-edit.html';
        }
    });

    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }

    function setToolBtnDisableState() {
        $btn_remove.attr('disabled', !$table.bootstrapTable('getSelections').length);
        $btn_edit.attr('disabled', $table.bootstrapTable('getSelections').length != 1);
    }

});
