$(document).ready(function(){
    
    var $btn_edit = $('#toolbtn_edit');
    var $btn_view = $('#toolbtn_view');
    var $btn_delete = $('#toolbtn_delete');
    

    var $table = $('#table');
    
    //格式化公司信息
    function orgFormatter(value, row, index) {
        return  '<div class="org-li in-table">' +
                    '<div class="org-li-img">' +
                        '<img src=' + value.logourl + '>' +
                    '</div>' +
                    '<div class="org-li-content">' +
                        '<div class="org-li-title">' + value.orgname + '</div>' +
                        '<div class="org-li-info">行业：' + value.industry + '</div>' +
                        '<div class="org-li-info">专业领域：' + value.fields + '</div>' +
                    '</div>' +
                '</div>';
    }
    
    function orgCellStyle(value, row, index) {
        return {
            css : {
                "padding" : "0"
            }
        }
    }
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        search : true,
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
                field: 'orglead',
                title: '创业领军企业信息',
                halign: 'center',
                formatter: orgFormatter,
                cellStyle : orgCellStyle
            }
        ],
        data: [
            {
                id : 1,
                orglead : {
                    orgname : '小米科技有限公司',
                    logourl : '../images/rcs-item-01.jpg',
                    industry : '计算机',
                    fields : '计算机，互联网，移动业务'
                }
            },
            {
                id : 2,
                orglead : {
                    orgname : '子初科技有限公司',
                    logourl : '../images/rcs-item-02.jpg',
                    industry : '大数据',
                    fields : '大数据，计算机，互联网'
                }
            },
            {
                id : 3,
                orglead : {
                    orgname : '飞鲸科技有限公司',
                    logourl : '../images/rcs-item-03.jpg',
                    industry : '智能家居',
                    fields : '计算机，互联网，智能家居'
                }
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

            window.location.href='operate-orglead-edit.html';
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

            window.location.href='operate-orglead-view.html';
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