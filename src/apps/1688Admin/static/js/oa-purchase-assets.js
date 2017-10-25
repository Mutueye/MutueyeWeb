$(document).ready(function(){
    
    var $time = $('#time');
    
    var $btn_preview = $('#toolbtn_preview');
    var $table = $('#table');
    
    window.commonTools.setDateTimeInput($time);
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
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
                field: 'objname',
                title: '物品名称',
                halign: 'center'
            }, 
            {
                field: 'unit',
                title: '单位',
                halign: 'center'
            }, 
            {
                field: 'num',
                title: '数量',
                halign: 'center'
            },
            {
                field: 'price',
                title: '入库价格（元）',
                sortable: true,
                halign: 'center'
            }, 
            {
                field: 'applier',
                title: '领用人',
                halign: 'center'
            },
            {
                field: 'dep',
                title: '领用部门',
                halign: 'center'
            },
            {
                field: 'creator',
                title: '创建人',
                halign: 'center'
            },
            {
                field: 'time1',
                title: '缴费时间',
                halign: 'center',
                align: 'center'
            },
            {
                field: 'time2',
                title: '最后编辑时间',
                halign: 'center',
                align: 'center'
            }
        ],
        data: [
            {
                id : 1,
                objname : '电脑',
                unit : '台',
                num : '4',
                price : '4521',
                applier : '王小二',
                dep : '财务',
                creator : '王小二',
                time1 : '2018-09-09',
                time2 : '2018-10-01'
            },
            {
                id : 2,
                objname : '办公桌',
                unit : '张',
                num : '5',
                price : '2222',
                applier : '王小二',
                dep : '行政',
                creator : '王小二',
                time1 : '2018-03-28',
                time2 : '2018-04-03'
            },
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //预览弹窗的表单模板
    var modalPreviewHtml = "<div class='row-space-10'>" +
                        "<div class='row no-bottom'>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>领用品名称：</div>" +
                                    "<div class='cool-form-content'>鲜花</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>领用人：</div>" +
                                    "<div class='cool-form-content'>王小二</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>入库单号：</div>" +
                                    "<div class='cool-form-content'>201895293847</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>在库数：</div>" +
                                    "<div class='cool-form-content'>20</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>入库价格：</div>" +
                                    "<div class='cool-form-content'>30</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>单位：</div>" +
                                    "<div class='cool-form-content'>束</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>数量：</div>" +
                                    "<div class='cool-form-content'>20</div>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>用途：</div>" +
                                    "<div class='cool-form-content'>海尔鲜花更换<br>海尔鲜花更换</div>" + 
                                "</div>" +
                            "</div>" +
                        "</div>" +
                    "</div>";
    
    //查看
    $btn_preview.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            BSModal.confirm({
                title : '查看',
                content : modalPreviewHtml,
                width : '600px',
                maxHeight : '400px',
                btnOKDismiss : true,
                btnOK : '确定',
                btnCancel: ''
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
        $btn_preview.attr('disabled', tableSelections.length != 1);
    }
    
});