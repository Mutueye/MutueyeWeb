$(document).ready(function(){
    
    var $startTime = $('#start_time');
    var $endTime = $('#end_time');
    
    var $btn_new = $('#toolbtn_new');
    var $btn_edit = $('#toolbtn_edit');
    var $table = $('#table');
    
    window.commonTools.setDateTimeInputSection($startTime, $endTime);
    
    //设置bootstrap-table插件
    $table.bootstrapTable({
        toolbar : '#toolbar',
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
                field: 'name',
                title: '提交人',
                halign: 'center'
            }, 
            {
                field: 'dep',
                title: '部门',
                halign: 'center'
            }, 
            {
                field: 'title',
                title: '日志标题',
                halign: 'center'
            }, 
            {
                field: 'date',
                title: '提交时间',
                halign: 'center',
                sortable: true
            }, 
            {
                field: 'last_date',
                title: '最后更新时间',
                halign: 'center',
                sortable: true
            }
        ],
        data: [
            {
                id: 1,
                name: '周吴郑',
                dep: '招商部',
                title: '第35周工作日志',
                date: '2017.06.23',
                last_date: '2017.06.23'
            }, 
            {
                id: 2,
                name: '任水寒',
                dep: '招商部',
                title: '第36周工作日志',
                date: '2017.07.11',
                last_date: '2017.07.11'
            }, 
            {
                id: 3,
                name: '苏普',
                dep: '招商部',
                title: '第37周工作日志',
                date: '2017.07.11',
                last_date: '2017.07.11'
            }, 
            {
                id: 4,
                name: '李晟闻',
                dep: '招商部',
                title: '第38周工作日志',
                date: '2017.07.11',
                last_date: '2017.07.11'
            }
        ]
    });
    
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //新增&编辑弹窗的表单模板
    var modalHtml = "<div class='row-space-10'>" +
                        "<form class='row no-bottom'>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>日志标题：</div>" +
                                    "<input class='form-control' type='text' id='title' name='title'>" + 
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>日志内容：</div>" +
                                    "<textarea class='form-control textarea' id='content' rows='6' name='content'></textarea>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                    "</div>";
    
    //弹窗初始化后，对表单进行的操作，type区分新增或编辑
    function modalInit(type){
        
        if(type == '新增') {
            //初始化控件，如果有
        } else if(type == '编辑') {
            //初始化控件，加载初始值
        }
    }
                    
    //新增
    $btn_new.click(function () {
        
        BSModal.confirm({
            title : '新增',
            content : modalHtml,
            width : '600px',
            maxHeight : '400px',
            btnOKDismiss : false,
            btnOK : '提交',
            afterInit: function(){
                modalInit('新增');
            }
        }).on(function(e, id) {
            if (!e) {
                return;
            }
            //提交成功后，刷新表格数据:
            //$table.bootstrapTable('load', data);
            
            $('#'+id).modal('hide');
            toastr.success('您新增的数据已提交！');
        });
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
            BSModal.confirm({
                title : '编辑',
                content : modalHtml,
                width : '600px',
                maxHeight : '400px',
                btnOKDismiss : false,
                btnOK : '提交',
                afterInit: function(){
                    modalInit('编辑');
                }
            }).on(function(e, id) {
                if (!e) {
                    return;
                }
                //提交成功后，刷新表格数据:
                //$table.bootstrapTable('load', data);
                
                $('#'+id).modal('hide');
                toastr.success('您编辑的数据已提交！');
                
            });
        }
    });
    
    function setToolBtnDisableState() {
        $btn_edit.attr('disabled', $table.bootstrapTable('getSelections').length != 1);
    }
    
});