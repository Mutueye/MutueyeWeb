$(document).ready(function(){
    
    setTable1Actions();
    setTable2Actions();
    
    //格式化通知标题
    function titleFormatter(value, row, index) {
        var titleText = value.title_text;
        var titleUrl = value.title_url;
        return "<a href='" + titleUrl + "'>" + titleText + "</a>";
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
                    field: 'type',
                    title: '类型',
                    sortable: true,
                    halign: 'center'
                }, 
                {
                    field: 'title',
                    title: '标题',
                    halign: 'center',
                    formatter: titleFormatter
                }, 
                {
                    field: 'date',
                    title: '时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: [
                {
                    id: 1,
                    type: '通知',
                    title: {
                        title_text : '停水通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.06.23',
                }, 
                {
                    id: 2,
                    type: '公告',
                    title: {
                        title_text : '关于2018年度预算的公告',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.05.04',
                    creater: '苏普',
                    dep: '财务部'
                    
                }, 
                {
                    id: 3,
                    type: '通知',
                    title: {
                        title_text : '新入园客户交接的通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.07.11',
                    creater: '李晟闻',
                    dep: '人力资源部'
                    
                }, 
                {
                    id: 4,
                    type: '公告',
                    title: {
                        title_text : '李沧区人力局视察接待',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.02.21',
                    creater: '岳叔华',
                    dep: '商务部'
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
    
                BSModal.confirm({ content: "确认要删除选择的条目吗？" }).on(function (e) {
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
                    toastr.success('您选择的条目已删除！');
                    
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
                window.location.href='oa-personal-notice-edit.html';
            }
        });
        
        function setToolBtnDisableState() {
            var tableSelections = $table1.bootstrapTable('getSelections');
            $btn1_remove.attr('disabled', !tableSelections.length);
            $btn1_edit.attr('disabled', tableSelections.length != 1);
        }
    }
    
    function setTable2Actions() {
        var $btn2_remove = $('#toolbtn2_remove');
        var $table2 = $('#table2');
        
        $table2.bootstrapTable({
            toolbar : '#toolbar2',
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
                    field: 'type',
                    title: '类型',
                    sortable: true,
                    halign: 'center'
                }, 
                {
                    field: 'title',
                    title: '标题',
                    halign: 'center',
                    formatter: titleFormatter
                }, 
                {
                    field: 'date',
                    title: '时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: [
                {
                    id: 1,
                    type: '通知',
                    title: {
                        title_text : '新入园客户交接的通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.07.11',
                    creater: '李晟闻',
                    dep: '人力资源部'
                    
                }, 
                {
                    id: 2,
                    type: '公告',
                    title: {
                        title_text : '李沧区人力局视察接待',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.02.21',
                    creater: '岳叔华',
                    dep: '商务部'
                    
                },
                {
                    id: 3,
                    type: '通知',
                    title: {
                        title_text : '停水通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.06.23',
                    creater: '周吴郑',
                    dep: '企划部'
                    
                }, 
                {
                    id: 4,
                    type: '公告',
                    title: {
                        title_text : '关于2018年度预算的公告',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.05.04',
                    creater: '苏普',
                    dep: '财务部'
                    
                }
            ]
        });
        
        setToolBtnDisableState();
        $table2.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });
        
        //取消操作
        $btn2_remove.click(function () {
            //按钮如果不是disabled状态,则可进行操作
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table2.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }
    
                BSModal.confirm({ content: "确认要删除选择的条目吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }
                    
                    //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                    var ids = getIdSelections($table2);
                    $table2.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    setToolBtnDisableState();
                    toastr.success('您选择的条目已经删除！');
                    
                });
            }
        });
        
        function setToolBtnDisableState() {
            $btn2_remove.attr('disabled', !$table2.bootstrapTable('getSelections').length);
        }
    }
    
    function getIdSelections($table) {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    
    
    
    
    
});