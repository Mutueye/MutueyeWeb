$(document).ready(function(){
    var $btn_new = $('#toolbtn_new');
    var $btn_remove = $('#toolbtn_remove');
    var $btn_edit = $('#toolbtn_edit');
    var $table = $('#table');
    
    function getStateNameHtml(stateVal){
        var sVal = stateVal || "";
        return "<div class='row-space-10'>" +
                    "<form class='row no-bottom'>" +
                        "<div class='col-xs-12'>" +
                            "<div class='form-group form-group-sm cool-form-group'>" +
                                "<div class='control-label cool-form-label text-right'>类型名称：</div>" +
                                "<input class='form-control' type='text' id='cat_name' value=" + sVal + ">" +
                            "</div>" +
                        "</div>" +
                    "</form>" +
                "</div>";
    }
    
    //设置bootstrap-table插件
    function setBSTable() {
        $table.bootstrapTable({
            toolbar : '#toolbar',
            showColumns : true,
            showToggle : true,
            pagination : false,
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
                    field: 'category',
                    title: '类型名称',
                    halign: 'center'
                }, 
                {
                    field: 'date',
                    title: '创建时间',
                    halign: 'center',
                    sortable: true,
                    align: 'center'
                }, 
                {
                    field: 'creater',
                    title: '创建人',
                    halign: 'center'
                }
            ],
            data: [
                {
                    id: 1,
                    category: '物业合同',
                    date: '2018-10-23',
                    creater: '赵千叶'
                }, 
                {
                    id: 2,
                    category: '招商合同',
                    date: '2016-04-21',
                    creater: '张不周'
                },
                {
                    id: 3,
                    category: '采购合同',
                    date: '2013-03-18',
                    creater: '鲁费清'
                }
            ]
        });
        
        setToolBtnDisableState();
        $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });
        
        $btn_new.click(function() {
            BSModal.confirm({ title:"新增合同类型", content:getStateNameHtml(), width:"60%", btnOKDismiss:false}).on(function (e, id) {
                if (!e) {
                    return;
                }
                
                //alert($('#'+id).find('#cat_name').eq(0).val());
                
                if($('#'+id).find('#cat_name').eq(0).val().length == 0) {
                    toastr.warning('请输入合同类型名称');
                } else {
                    $('#'+id).modal('hide');
                    toastr.success('添加合同类型成功');
                    //此处提交合同类型名称，并刷新表格...
                }
                
            });
        });
        
        //删除操作
        $btn_remove.click(function() {
            //按钮如果不是disabled合同类型,则可进行操作
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
                
                var currentCatName = arrselections[0].category;
                
                BSModal.confirm({ title:"编辑合同类型", content:getStateNameHtml(currentCatName), width:"60%", btnOKDismiss:false}).on(function (e, id) {
                    if (!e) {
                        return;
                    }
                    
                    if($('#'+id).find('#cat_name').eq(0).val().length == 0) {
                        toastr.warning('请输入合同类型名称');
                    } else if($('#'+id).find('#cat_name').eq(0).val() == currentCatName) {
                        toastr.warning('合同类型名称未修改');
                    } else {
                        $('#'+id).modal('hide');
                        toastr.success('修改合同类型成功');
                        //此处提交合同类型名称，并刷新表格...
                    }
                    
                });
                
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
    }

    setBSTable();
    
});