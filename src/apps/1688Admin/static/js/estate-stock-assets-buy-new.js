$(document).ready(function(){
    
    //icheck初始化
    $('#checkbox_urgent').iCheck({
        handle: 'checkbox',
        checkboxClass: 'icheckbox_square-blue'
    }).on('ifChanged', function(e){
        console.log('加急采购checkbox状态：' + $('#checkbox_urgent').is(':checked'));
    });
    
    //表单数据示例
    var formData = [
        {
            purchase_name : '冷柜',
            purchase_brand : '西门子',
            purchase_model : 'XMZ-21'
        },
        {
            purchase_name : '投影仪',
            purchase_brand : '飞利浦',
            purchase_model : 'potu0239'
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
    
    function fillFormData(data, id) {
        var selectedData = window.commonTools.getSubArrayByObjValue(data, 'purchase_name', $('#purchase_name_' + id).val())[0];
        $('#purchase_brand_' + id).val(selectedData.purchase_brand);
        $('#purchase_model_' + id).val(selectedData.purchase_model);
    }
    
    window.commonTools.duplicateFormCtrl({
        container : $('#purchase_content'),
        html :  '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产名称：</div>' +
                            '<select class="form-control" id="purchase_name">' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">品牌：</div>' +
                            '<input type="text" class="form-control" id="purchase_brand">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">规格：</div>' +
                            '<input type="text" class="form-control" id="purchase_model">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-2">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="purchase_num">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="purchase_btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' + 
                    '</div>' +
                '</div>',
        ids : ['purchase_name', 'purchase_brand', 'purchase_model', 'purchase_num', 'purchase_btn_delete'],
        btn_delete_id : 'purchase_btn_delete',
        btn_add_id : 'purchase_btn_add',
        btn_add_container_id : 'purchase_btn_add_container',
        btn_add_html :  '<div id="purchase_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content">点击添加按钮，添加新的采购物品</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="purchase_btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' + 
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 1,
        max_number : 5,
        afterAdd : function($container, id){
            window.window.commonTools.addSelectOptions($('#purchase_name_' + id), getOptionsFromData(formData,'purchase_name'));
            fillFormData(formData, id);
            $('#purchase_name_' + id).change(function(){
                fillFormData(formData, id);
            });
        }
    });
    
    
    $('#btn_submit').click(function(){
        
        window.location.href='estate-stock-assets-buy.html';
        
    });
    
    $('#btn_save').click(function(){
        
        toastr.success('您编辑的信息已保存');
        
    });
    
});