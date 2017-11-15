$(document).ready(function(){
    var $btn_new = $('#toolbtn_new');
    var $btn_reset = $('#toolbtn_reset');
    var $btn_dis_en_able = $('#toolbtn_dis_en_able');
    

    var $table = $('#table');
    
    $table.bootstrapTable({
        toolbar : '#toolbar',
        showColumns : true,
        showToggle : true,
        showExport : true,
        pagination : true,
        search : true,
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
                field: 'id_num',
                title: 'ID号',
                halign: 'center',
                align: 'right'
            },
            {
                field: 'phone',
                title: '手机号',
                halign: 'center'
            },
            {
                field: 'account',
                title: '账号',
                halign: 'center'
            },
            {
                field: 'reg_time',
                title: '注册时间',
                halign: 'center',
                align: 'center'
            }, 
            {
                field: 'state',
                title: '状态',
                sortable: true,
                halign: 'center'
            }
        ],
        data: [
            {
                id : 1,
                id_num : '102934',
                phone : '13812345678',
                account : 'Admin',
                reg_time : '2018-10-10 13:32',
                state : '启用'
            },
            {
                id : 2,
                id_num : '102935',
                phone : '13812345678',
                account : 'Admin2',
                reg_time : '2018-10-10 13:32',
                state : '禁用'
            },
            {
                id : 3,
                id_num : '102936',
                phone : '13812345678',
                account : 'Admin3',
                reg_time : '2018-10-10 13:32',
                state : '启用'
            },
            {
                id : 4,
                id_num : '102937',
                phone : '13812345678',
                account : 'Admin4',
                reg_time : '2018-10-10 13:32',
                state : '禁用'
            }
        ]
    });
    
    //设置工具栏按钮禁用状态
    setToolBtnDisableState();
    $table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
        setToolBtnDisableState();
    });
    
    //新增
    $btn_new.click(function () {
        var $form = undefined;
        BSModal.confirm({ 
            title:"新增管理员", 
            content:    "<div class='row-space-10'>" +
                            "<form class='row no-bottom' id='new_admin_form'>" +
                                "<div class='col-xs-12'>" +
                                    "<div class='form-group form-group-sm cool-form-group'>" +
                                        "<div class='control-label cool-form-label text-right'>手机号：</div>" +
                                        "<input class='form-control' type='text' id='phone' name='phone'>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='col-xs-12'>" +
                                    "<div class='form-group form-group-sm cool-form-group'>" +
                                        "<div class='control-label cool-form-label text-right'>邮箱：</div>" +
                                        "<input class='form-control' type='text' id='email' name='email'>" +
                                    "</div>" +
                                "</div>" +
                                "<div class='col-xs-12'>" +
                                    "<div class='form-group form-group-sm cool-form-group'>" +
                                        "<div class='control-label cool-form-label text-right'>密码：</div>" +
                                        "<input class='form-control' type='password' id='password' name='password'>" +
                                    "</div>" +
                                "</div>" +
                            "</form>" +
                        "</div>",
            width:"460px", 
            btnOKDismiss:false,
            afterInit : function($modal){
                $form = $('#new_admin_form');
                $form.bootstrapValidator({
                    fields: {
                        phone: {
                            message: '手机号验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入手机号'
                                }
                            }
                        },
                        email: {
                            message: '邮箱验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入邮箱'
                                }
                            }
                        },
                        password: {
                            message: '密码验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入密码'
                                }
                            }
                        }
                    }
                });
            }
        }).on(function (e, id) {
            if (!e) {
                return;
            }
            
            var bsValidator = $form.data('bootstrapValidator');
            bsValidator.validate();
            var result = bsValidator.isValid();
            if(!result) {
                toastr.warning('您输入的表单信息验证未通过');
            } else {
                $('#'+id).modal('hide');
                toastr.success('添加授权成功');
            }
            
            
            
        });
    });
    
    //重置密码
    $btn_reset.click(function () {
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            console.log(JSON.stringify(arrselections));
            
            BSModal.confirm({ content: "确认要重置该管理员的密码吗？" }).on(function (e) {
                if (!e) {
                    return;
                }
                
                //提交申请重置为默认密码...
                
                //重置成功提示
                toastr.success(arrselections[0].account + '的密码已重置为默认密码：000000');
                
            });
            
            
        }
    });
    
    //启用/禁用操作
    $btn_dis_en_able.click(function () {
        //按钮如果不是disabled状态,则可进行操作
        if(!$(this).attr('disabled')) {
            //取表格的选中行数据
            var arrselections = $table.bootstrapTable('getSelections');
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }
            
            //确保只选中了一项数据,切换 启用/禁用 状态
            if(arrselections.length == 1) {
                var row_index = $table.find('.selected').eq(0).attr('data-index');
                var target_state = '启用';
                if(arrselections[0].state == '启用') target_state = '禁用';
                $table.bootstrapTable('updateCell', {
                    index : row_index,
                    field : 'state',
                    value : target_state
                });
                
                //提交修改后的数据...
            }
        }
    });
    
    function getIdSelections() {
        return $.map($table.bootstrapTable('getSelections'), function (row) {
            return row.id
        });
    }
    
    function setToolBtnDisableState() {
        var tableSelections = $table.bootstrapTable('getSelections');
        $btn_reset.attr('disabled', tableSelections.length != 1);
        $btn_dis_en_able.attr('disabled', tableSelections.length != 1);
    }
    
});