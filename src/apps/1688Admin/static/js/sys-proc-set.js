$(document).ready(function(){
    
    var $btn_auth = $('#toolbtn_auth');

    var $table = $('#table');
    
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
                field: 'title',
                title: '流程名称',
                halign: 'center'
            }, 
            {
                field: 'desc',
                title: '描述',
                halign: 'center'
            },
            {
                field: 'auth',
                title: '授权给',
                halign: 'center'
            }
        ],
        data: [
            {
                id : 1,
                title : '流程1',
                desc : '描述1',
                auth : ''
            },
            {
                id : 2,
                title : '流程2',
                desc : '描述2',
                auth : '张伞'
            },
            {
                id : 3,
                title : '流程3',
                desc : '描述3',
                auth : '李思，王悟'
            }
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //授权
    $btn_auth.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));

            //window.location.href='sys-proc-set-auth.html';
            BSModal.confirm({ 
                title:"授权", 
                content:    "<div class='row-space-10'>" +
                                "<form class='row no-bottom'>" +
                                    "<div class='col-xs-12'>" +
                                        "<div class='form-group form-group-sm cool-form-group'>" +
                                            "<div class='control-label cool-form-label text-right'>选择授权人员：</div>" +
                                            "<select class='form-control selectpicker' type='text' id='auth_list' name='auth_list' title='请选择授权人员' multiple>" +
                                                "<optgroup label='行政'>" +
                                                    "<option>张伞</option>" +
                                                    "<option>李思</option>" +
                                                "</optgroup>" +
                                                "<optgroup label='财务'>" +
                                                    "<option>王悟</option>" +
                                                    "<option>赵溜</option>" +
                                                "</optgroup>" +
                                            "</select>" +
                                        "</div>" +
                                    "</div>" +
                                "</form>" +
                            "</div>",
                width:"460px", 
                btnOKDismiss:false,
                afterInit : function($modal){
                    $('#auth_list').selectpicker({
                        actionsBox : true,
                        liveSearch : true,
                        liveSearchPlaceholder : '搜索人员...'
                    });
                    var auths = arrselections[0].auth;
                    if(auths.length > 0) {
                        var authList = auths.split('，');
                        $('#auth_list').selectpicker('val',authList);
                    } else {
                        $('#auth_list').selectpicker('val',[]);
                    }
                }
            }).on(function (e, id) {
                if (!e) {
                    return;
                }
                
                var selectedList = $('#auth_list').selectpicker('val');
                if(!selectedList || selectedList.length == 0) {
                    toastr.warning('请选择授权人员');
                } else {
                    //alert($('#auth_list').selectpicker('val'));
                    var selectedVal = $('#auth_list').selectpicker('val').join('，');
                    var row_index = $table.find('.selected').eq(0).attr('data-index');
                    $table.bootstrapTable('updateCell', {
                        index : row_index,
                        field : 'auth',
                        value : selectedVal
                    });
                    $('#'+id).modal('hide');
                    toastr.success('添加授权成功');
                }
                
            });
        }
    });
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_auth.attr('disabled', tableSelections.length != 1);
    }
    
});