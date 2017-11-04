$(document).ready(function(){
    
    //表单数据示例
    var formData = [
        {
            asset_name : '冷柜',
            asset_list : [
                {
                    asset_id : '20180001',
                    brand : '西门子',
                    spec : 'XMZ-21'
                },
                {
                    asset_id : '20180002',
                    brand : '海尔',
                    spec : 'HR-SD'
                },
                {
                    asset_id : '20180003',
                    brand : '澳柯玛',
                    spec : 'ACM-BB'
                }
            ]
        },
        {
            asset_name : '投影仪',
            asset_list : [
                {
                    asset_id : '20180004',
                    brand : '飞利浦',
                    spec : 'potu0239'
                },
                {
                    asset_id : '20180005',
                    brand : '夏普',
                    spec : 'SP3asF'
                }
            ]
        }
    ];
    
    function getOptionsFromData(data,key) {
        var selectData = [];
        for(i in data) {
            selectData.push({
                value : data[i][key],
                text : data[i][key]
            });
        }
        return selectData;
    }
    
    function fillFormData(data, id){
        var asset_name_data = window.commonTools.getSubArrayByObjValue(data, 'asset_name', $('#asset_name_' + id).val())[0];
        $('#asset_id_' + id).empty(); //每次选择不同的资产名称时，清空资产编号列表
        window.window.commonTools.addSelectOptions($('#asset_id_' + id), getOptionsFromData(asset_name_data.asset_list,'asset_id'));
        fillAssetIdData(data, id);
        $('#asset_id_' + id).change(function(){
            fillAssetIdData(data, id);
        });
    }
    
    function fillAssetIdData(data, id) {
        var a_n_data = window.commonTools.getSubArrayByObjValue(data, 'asset_name', $('#asset_name_' + id).val())[0];
        var asset_id_data = window.commonTools.getSubArrayByObjValue(a_n_data.asset_list, 'asset_id', $('#asset_id_' + id).val())[0];
        $('#brand_' + id).val(asset_id_data.brand);
        $('#spec_' + id).val(asset_id_data.spec);
    }
    
    window.commonTools.duplicateFormCtrl({
        container : $('#sell_content'),
        html :  '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产名称：</div>' +
                            '<select class="form-control" id="asset_name">' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">编号：</div>' +
                            '<select class="form-control" id="asset_id">' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">品牌：</div>' +
                            '<input type="text" class="form-control" id="brand" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">规格：</div>' +
                            '<input type="text" class="form-control" id="spec" disabled>' +
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
                '<div class="col-xs-12 col-sm-7 col-md-8">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">备注：</div>' +
                            '<input type="text" class="form-control" id="sell_ps">' +
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
            'asset_name',
            'asset_id',
            'brand',
            'spec',
            'sell_num',
            'sell_ps',
            'sell_btn_delete'
        ],
        btn_delete_id : 'sell_btn_delete',
        btn_add_id : 'sell_btn_add',
        btn_add_container_id : 'sell_btn_add_container',
        btn_add_html :  '<div id="sell_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的报废物品</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="sell_btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' + 
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 1,
        max_number : 5,
        afterAdd : function($container, id){
            window.window.commonTools.addSelectOptions($('#asset_name_' + id), getOptionsFromData(formData,'asset_name'));
            fillFormData(formData, id);
            $('#asset_name_' + id).change(function(){
                fillFormData(formData, id);
            })
        }
    });
    
    
    $('#btn_submit').click(function(){
        
        window.location.href='estate-stock-assets-scrap.html';
        
    });
    
    $('#btn_save').click(function(){
        
        toastr.success('您编辑的信息已保存');
        
    });
    
});