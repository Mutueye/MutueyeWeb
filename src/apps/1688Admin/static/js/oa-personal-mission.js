$(document).ready(function(){

    setTable1Actions();
    setTable2Actions();
    setTable3Actions();

    //格式化标题
    function missionFormatter(value, row, index) {
        var titleText = value.text;
        if(value.urgent) {
            return "<span class='font-red-intense'><i class='fa fa-exclamation-circle'></i>&nbsp;" + titleText + "</span>";
        } else {
            return titleText;
        }

    }

    function setTable1Actions() {
        var $btn1_remove = $('#toolbtn1_remove');
        var $btn1_edit = $('#toolbtn1_edit');
        var $btn1_view = $('#toolbtn1_preview');
        var $table1 = $('#table1');

        $table1.bootstrapTable({
            toolbar : '#toolbar1',
            showColumns : true,
            showToggle : true,
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
                    field: 'type',
                    title: '任务类型',
                    sortable: true,
                    halign: 'center'
                },
                {
                    field: 'name',
                    title: '任务名称',
                    halign: 'center',
                    formatter: missionFormatter
                },
                {
                    field: 'creater',
                    title: '创建人',
                    halign: 'center'
                },
                {
                    field: 'dep',
                    title: '部门',
                    halign: 'center'
                },
                {
                    field: 'date',
                    title: '创建时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: [
                {
                    id: 1,
                    type: '审批',
                    name: {
                        text: '用印申请',
                        urgent:true
                    },
                    creater: '周吴郑',
                    dep: '企划部',
                    date: '2017.06.23'
                },
                {
                    id: 2,
                    type: '审批',
                    name: {
                        text: '请假申请',
                        urgent:false
                    },
                    creater: '苏普',
                    dep: '财务部',
                    date: '2017.05.04'
                },
                {
                    id: 3,
                    type: '协同办公',
                    name: {
                        text: '新入园客户交接',
                        urgent:true
                    },
                    creater: '李晟闻',
                    dep: '人力资源部',
                    date: '2017.07.11'
                },
                {
                    id: 4,
                    type: '领导安排',
                    name: {
                        text: '李沧区人力局视察接待',
                        urgent:false
                    },
                    creater: '岳叔华',
                    dep: '商务部',
                    date: '2017.02.21'
                }
            ]
        });

        setToolBtnDisableState();
        $table1.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });

        //取消操作
        $btn1_remove.click(function () {
            //按钮如果不是disabled状态,则可进行操作
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table1.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }

                BSModal.confirm({ content: "确认要取消该任务吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }

                    //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                    var ids = getIdSelections($table1);
                    $table1.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    setToolBtnDisableState();
                    toastr.success('您选择的任务已取消！');

                });
            }
        });

        //编辑按钮操作
        $btn1_edit.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table1.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的编辑页面
                window.location.href='oa-personal-mission-edit.html';
            }
        });

        //查看按钮操作
        $btn1_view.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table1.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的审核页面
                window.location.href='oa-personal-mission-view.html';
            }
        });

        function setToolBtnDisableState() {
            var tableSelections = $table1.bootstrapTable('getSelections');
            $btn1_remove.attr('disabled', !tableSelections.length);
            $btn1_edit.attr('disabled', tableSelections.length != 1);
            $btn1_view.attr('disabled', tableSelections.length != 1);
        }
    }

    function setTable2Actions() {
        var $btn2_view = $('#toolbtn2_preview');
        var $table2 = $('#table2');

        $table2.bootstrapTable({
            toolbar : '#toolbar2',
            showColumns : true,
            showToggle : true,
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
                    field: 'type',
                    title: '任务类型',
                    sortable: true,
                    halign: 'center'
                },
                {
                    field: 'name',
                    title: '任务名称',
                    halign: 'center',
                    formatter: missionFormatter
                },
                {
                    field: 'creater',
                    title: '创建人',
                    halign: 'center'
                },
                {
                    field: 'dep',
                    title: '部门',
                    halign: 'center'
                },
                {
                    field: 'date',
                    title: '创建时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: [
                {
                    id: 1,
                    type: '协同办公',
                    name: {
                        text: '新入园客户交接',
                        urgent:true
                    },
                    creater: '李晟闻',
                    dep: '人力资源部',
                    date: '2017.07.11'
                },
                {
                    id: 2,
                    type: '领导安排',
                    name: {
                        text: '李沧区人力局视察接待',
                        urgent:false
                    },
                    creater: '岳叔华',
                    dep: '商务部',
                    date: '2017.02.21'
                },
                {
                    id: 3,
                    type: '审批',
                    name: {
                        text: '用印申请',
                        urgent:false
                    },
                    creater: '周吴郑',
                    dep: '企划部',
                    date: '2017.06.23'
                },
                {
                    id: 4,
                    type: '审批',
                    name: {
                        text: '请假申请',
                        urgent:false
                    },
                    creater: '苏普',
                    dep: '财务部',
                    date: '2017.05.04'
                }
            ]
        });

        setToolBtnDisableState();
        $table2.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });

        //查看按钮操作
        $btn2_view.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table2.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的审核页面
                window.location.href='oa-personal-mission-view.html';
            }
        });

        function setToolBtnDisableState() {
            $btn2_view.attr('disabled', $table2.bootstrapTable('getSelections').length != 1);
        }
    }


    function setTable3Actions() {
        var $btn3_remove = $('#toolbtn3_remove');
        var $btn3_edit = $('#toolbtn3_edit');
        var $btn3_view = $('#toolbtn3_preview');
        var $table3 = $('#table3');

        $table3.bootstrapTable({
            toolbar : '#toolbar3',
            showColumns : true,
            showToggle : true,
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
                    field: 'type',
                    title: '任务类型',
                    sortable: true,
                    halign: 'center'
                },
                {
                    field: 'name',
                    title: '任务名称',
                    halign: 'center',
                    formatter: missionFormatter
                },
                {
                    field: 'creater',
                    title: '创建人',
                    halign: 'center'
                },
                {
                    field: 'dep',
                    title: '部门',
                    halign: 'center'
                },
                {
                    field: 'date',
                    title: '创建时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: [

                {
                    id: 1,
                    type: '审批',
                    name: {
                        text: '请假申请',
                        urgent:false
                    },
                    creater: '苏普',
                    dep: '财务部',
                    date: '2017.05.04'
                },
                {
                    id: 2,
                    type: '审批',
                    name: {
                        text: '用印申请',
                        urgent:false
                    },
                    creater: '周吴郑',
                    dep: '企划部',
                    date: '2017.06.23'
                },
                {
                    id: 3,
                    type: '领导安排',
                    name: {
                        text: '李沧区人力局视察接待',
                        urgent:true
                    },
                    creater: '岳叔华',
                    dep: '商务部',
                    date: '2017.02.21'
                },
                {
                    id: 4,
                    type: '协同办公',
                    name: {
                        text: '新入园客户交接',
                        urgent:false
                    },
                    creater: '李晟闻',
                    dep: '人力资源部',
                    date: '2017.07.11'
                }
            ]
        });

        setToolBtnDisableState();
        $table3.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });

        //取消操作
        $btn3_remove.click(function () {
            //按钮如果不是disabled状态,则可进行操作
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table3.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }

                BSModal.confirm({ content: "确认要取消该任务吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }

                    //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                    var ids = getIdSelections($table3);
                    $table3.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    setToolBtnDisableState();
                    toastr.success('您选择的任务已取消！');

                });
            }
        });

        //编辑按钮操作
        $btn3_edit.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table3.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的编辑页面
                window.location.href='oa-personal-mission-edit.html';
            }
        });

        //查看按钮操作
        $btn3_view.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table3.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的审核页面
                window.location.href='oa-personal-mission-view.html';
            }
        });

        function setToolBtnDisableState() {
            var tableSelections = $table3.bootstrapTable('getSelections');
            $btn3_remove.attr('disabled', !tableSelections.length);
            $btn3_edit.attr('disabled', tableSelections.length != 1);
            $btn3_view.attr('disabled', tableSelections.length != 1);
        }
    }

    function getIdSelections($table) {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }






});
