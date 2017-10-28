$(document).ready(function(){
    
    window.commonTools.duplicateFormCtrl({
        container : $('#scrap_content'),
        html :  '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产类别：</div>' +
                            '<input type="text" class="form-control" id="scrap_type">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-5">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">名称：</div>' +
                            '<input type="text" class="form-control" id="scrap_name">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">品牌：</div>' +
                            '<input type="text" class="form-control" id="scrap_brand">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">型号：</div>' +
                            '<input type="text" class="form-control" id="scrap_model">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="scrap_num">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">使用部门：</div>' +
                            '<input type="text" class="form-control" id="scrap_dep">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">使用人：</div>' +
                            '<input type="text" class="form-control" id="scrap_user">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="scrap_btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' + 
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : [
            'scrap_type',
            'scrap_name',
            'scrap_brand',
            'scrap_model',
            'scrap_num',
            'scrap_dep',
            'scrap_user',
            'scrap_btn_delete'
        ],
        btn_delete_id : 'scrap_btn_delete',
        btn_add_id : 'scrap_btn_add',
        btn_add_container_id : 'scrap_btn_add_container',
        btn_add_html :  '<div id="scrap_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的报废物品</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="scrap_btn_add">' +
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