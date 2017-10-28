$(document).ready(function(){
    
    window.commonTools.duplicateFormCtrl({
        container : $('#sell_content'),
        html :  '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产类别：</div>' +
                            '<input type="text" class="form-control" id="sell_type">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-5">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">名称：</div>' +
                            '<input type="text" class="form-control" id="sell_name">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="sell_num">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">使用部门：</div>' +
                            '<input type="text" class="form-control" id="sell_dep">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">账面原值：</div>' +
                            '<input type="text" class="form-control" id="sell_old_value">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-2">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">已提折旧：</div>' +
                            '<input type="text" class="form-control" id="sell_cut_value">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">账面净值：</div>' +
                            '<input type="text" class="form-control" id="sell_true_value">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="sell_btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' + 
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : [
            'sell_type',
            'sell_name',
            'sell_num',
            'sell_dep',
            'sell_old_value',
            'sell_cut_value',
            'sell_true_value',
            'sell_btn_delete'
        ],
        btn_delete_id : 'sell_btn_delete',
        btn_add_id : 'sell_btn_add',
        btn_add_container_id : 'sell_btn_add_container',
        btn_add_html :  '<div id="sell_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的出售物品</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="sell_btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' + 
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 1,
        max_number : 5
    });
    
    //填充当前日期到“申请时间”
    var date = moment().year() + '-' + (moment().month() + 1) + '-' + moment().date();
    $('#apply_date').text(date);
    
    
    $('#btn_submit').click(function(){
        
        window.location.href='estate-stock-assets.html';
        
    });
    
    $('#btn_save').click(function(){
        
        toastr.success('您编辑的信息已保存');
        
    });
    
});