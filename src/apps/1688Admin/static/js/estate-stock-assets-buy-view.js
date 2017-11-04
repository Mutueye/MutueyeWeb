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
    
    var initData = [
        {
            purchase_name : '冷柜',
            purchase_brand : '西门子',
            purchase_model : 'XMZ-21',
            purchase_num : 12
        },
        {
            purchase_name : '投影仪',
            purchase_brand : '飞利浦',
            purchase_model : 'potu0239',
            purchase_num : 8
        }
    ]
    
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
        mode : 'view',
        container : $('#purchase_content'),
        html :  '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产名称：</div>' +
                            '<select class="form-control" id="purchase_name" disabled>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">品牌：</div>' +
                            '<input type="text" class="form-control" id="purchase_brand" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">规格：</div>' +
                            '<input type="text" class="form-control" id="purchase_model" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="purchase_num" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>',
        ids : ['purchase_name', 'purchase_brand', 'purchase_model', 'purchase_num'],
        afterAdd : function($container, id){
            window.window.commonTools.addSelectOptions($('#purchase_name_' + id), getOptionsFromData(formData,'purchase_name'));
            fillFormData(formData, id);
            $('#purchase_name_' + id).change(function(){
                fillFormData(formData, id);
            });
        },
        initialData : initData,
        fillInitialData : function($container, data, id) {
            $('#purchase_name_' + id).val(data.purchase_name);
            fillFormData(formData, id);
            $('#purchase_num_' + id).val(data.purchase_num);
        }
    });
    
});