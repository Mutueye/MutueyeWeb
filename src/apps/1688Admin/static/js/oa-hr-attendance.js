$(document).ready(function(){
    
    var $startTime = $('#start_time');
    var $endTime = $('#end_time');
    
    var $btn_remove = $('#toolbtn_remove');
    var $btn_edit = $('#toolbtn_edit');
    var $btn_examine = $('#toolbtn_examine');
    var $table = $('#table');
    
    var fmt = 'YYYY-MM'
    //起始日期
    $startTime.datetimepicker({
        viewMode: 'days',
        format: fmt,
        allowInputToggle: true
    });
    //截止日期
    $endTime.datetimepicker({
        viewMode: 'months',
        format: fmt,
        allowInputToggle: true,
        useCurrent: false //关联两个日期输入框时，需要设置截止日期的useCurrent:false
    });
    //关联起始和截止日期，使起始日期不晚于截止日期
    $startTime.on("dp.change", function (e) {
        $endTime.data("DateTimePicker").minDate(e.date);
    });
    //关联起始和截止日期，使截止日期不早于起始日期
    $endTime.on("dp.change", function (e) {
        $startTime.data("DateTimePicker").maxDate(e.date);
    });
    
    /*****************************
     * 考虑到bootstrap-table支持x-editable插件，可以实现每个单元格单独编辑和提交保存，
     * 因而此处实现的考勤管理页面和原型设计的有些不同，用户可以直接搜索考勤列表，直接对
     * 各个单元个的考勤数据进行编辑和提报，不需要再另外弹出页面进行操作。
     * bootstrap-table-editable : https://github.com/wenzhixin/bootstrap-table/tree/master/src/extensions/editable
     * x-editable : http://vitalets.github.io/x-editable/docs.html
     ****************************/
    //设置bootstrap-table插件
    function setBSTable() {
        $table.bootstrapTable({
            showColumns : true,
            showToggle : true,
            pagination : true,
            showExport : true,
            showPaginationSwitch : false,
            columns: [
                {
                    field: 'name',
                    title: '姓名',
                    halign: 'center'
                }, 
                {
                    field: 'dep',
                    title: '部门',
                    halign: 'center'
                }, 
                {
                    field: 'post',
                    title: '职位',
                    halign: 'center'
                }, 
                {
                    field: 'date',
                    title: '时间',
                    halign: 'center',
                    sortable: true,
                    align: 'center'
                }, 
                {
                    field: 'due',
                    title: '应到',
                    halign: 'center',
                    align: 'right',
                    editable: {
                        type: 'text',
                        //url: '/post', //编辑后可直接ajax提交，详见http://vitalets.github.io/x-editable/docs.html
                        success: function(response, newValue) {
                            console.log('success, newValue=' + newValue);
                        }
                    }
                }, 
                {
                    field: 'actual',
                    title: '实到',
                    halign: 'center',
                    align: 'right',
                    editable: {
                        type: 'text',
                        //url: '/post',
                        success: function(response, newValue) {
                            console.log('success, newValue=' + newValue);
                        }
                    }
                }, 
                {
                    field: 'leave',
                    title: '请假',
                    halign: 'center',
                    align: 'right',
                    editable: {
                        type: 'text',
                        //url: '/post',
                        success: function(response, newValue) {
                            console.log('success, newValue=' + newValue);
                        }
                    }
                }, 
                {
                    field: 'business',
                    title: '出差',
                    halign: 'center',
                    align: 'right',
                    editable: {
                        type: 'text',
                        //url: '/post',
                        success: function(response, newValue) {
                            console.log('success, newValue=' + newValue);
                        }
                    }
                }, 
                {
                    field: 'out',
                    title: '外出',
                    halign: 'center',
                    align: 'right',
                    editable: {
                        type: 'text',
                        //url: '/post',
                        success: function(response, newValue) {
                            console.log('success, newValue=' + newValue);
                        }
                    }
                }
            ],
            data: [
                {
                    name: '周吴郑',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '0',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
                }, 
                {
                    name: '任水寒',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '0',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
                }, 
                {
                    name: '苏普',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '0',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
                }, 
                {
                    name: '李晟闻',
                    dep: '人事部',
                    post: '职员',
                    date: '2017.06',
                    due: '0',
                    actual: '0',
                    leave: '0',
                    business: '0',
                    out: '0'
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
                    //示例：通过ajax删除数据
                    /*
                    $.ajax({
                        type: "post",
                        url: "/api/.../delete",//删除数据的api地址
                        data: { "": JSON.stringify(arrselections) },
                        success: function (data, status) {
                            if (status == "success") {
                                toastr.success('删除的数据已提交成功！');
                                
                                //此处可以直接刷新表格
                                $table.bootstrapTable('refresh');
                                
                                //或者在前端删除对应选中的数据条目，并重新设置工具栏按钮的disabled状态
                                var ids = getIdSelections();
                                $table.bootstrapTable('remove', {
                                    field: 'id',
                                    values: ids
                                });
                                setToolBtnDisableState();
                            }
                        },
                        error: function () {
                            toastr.error('Error');
                        },
                        complete: function () {

                        }
                    });*/
                    
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
                window.location.href='merchant-info-edit.html';
            }
        });
        
        //审核按钮操作
        $btn_examine.click(function () {
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
                console.log(JSON.stringify(arrselections));
                //根据选定的数据信息跳转到对应的审核页面
                window.location.href='merchant-info-examine.html';
            }
        });
    }
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    function setToolBtnDisableState() {
        $btn_remove.attr('disabled', !$table.bootstrapTable('getSelections').length);
        $btn_edit.attr('disabled', $table.bootstrapTable('getSelections').length != 1);
        $btn_examine.attr('disabled', $table.bootstrapTable('getSelections').length != 1);
    }
    
    
    
    setBSTable();
    
});