$(document).ready(function(){
    
    //表单数据示例
    var formData = [
        {
            recieve_id : '20180001',
            recieve_list : [
                {
                    recieve_name : '西门子冰箱',
                    recieve_model : 'XMZ-21'
                },
                {
                    recieve_name : '海尔冰箱',
                    recieve_model : 'HR-SD1'
                }
            ]
        },
        {
            recieve_id : '20180002',
            recieve_list : [
                {
                    recieve_name : '飞利浦投影仪',
                    recieve_model : 'potu0239-21'
                },
                {
                    recieve_name : '夏普投影仪',
                    recieve_model : 'SP3asF'
                }
            ]
        }
    ];
    
    var initData = [
        {
            recieve_location : 'D2 202',
            recieve_id : '20180001',
            recieve_name : '西门子冰箱',
            recieve_model : 'XMZ-21',
            recieve_num : '23',
            recieve_ps : '这是备注内容',
            reciever : '小D'
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
        var recieve_id_data = window.commonTools.getSubArrayByObjValue(data, 'recieve_id', $('#recieve_id_' + id).val())[0];
        $('#recieve_name_' + id).empty();
        window.window.commonTools.addSelectOptions($('#recieve_name_' + id), getOptionsFromData(recieve_id_data.recieve_list,'recieve_name'));
        fillNameData(data, id);
        $('#recieve_name_' + id).change(function(){
            fillNameData(data, id);
        });
    }
    
    function fillNameData(data, id) {
        var recieve_id_data = window.commonTools.getSubArrayByObjValue(data, 'recieve_id', $('#recieve_id_' + id).val())[0];
        var recieve_name_data = window.commonTools.getSubArrayByObjValue(recieve_id_data.recieve_list, 'recieve_name', $('#recieve_name_' + id).val())[0];
        $('#recieve_model_' + id).val(recieve_name_data.recieve_model);
    }
    
    window.commonTools.duplicateFormCtrl({
        mode : 'view',
        container : $('#recieve_content'),
        html :  '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">存放地点：</div>' +
                            '<input type="text" class="form-control" id="recieve_location" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">采购单号：</div>' +
                            '<select type="text" class="form-control" id="recieve_id" disabled>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产名称：</div>' +
                            '<select type="text" class="form-control" id="recieve_name" disabled>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">规格：</div>' +
                            '<input type="text" class="form-control" id="recieve_model" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="recieve_num" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-5">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">备注：</div>' +
                            '<input type="text" class="form-control" id="recieve_ps" disabled>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-4">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">领用人：</div>' +
                            '<select class="form-control selectpicker" id="reciever" title="请选择领用人" disabled>' +
                                '<optgroup label="行政">' +
                                    '<option> 小A' +
                                    '<option> 小B' +
                                    '<option> 小C' +
                                '</optgroup>' +
                                '<optgroup label="后勤">' +
                                    '<option> 小D' +
                                    '<option> 小E' +
                                    '<option> 小F' +
                                '</optgroup>' +
                            '</select>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : [
            'recieve_location',
            'recieve_id',
            'recieve_name',
            'recieve_model',
            'recieve_num',
            'recieve_ps',
            'reciever',
            'recieve_btn_delete'
        ],
        afterAdd : function($container, id) {
            $('#reciever_' + id).selectpicker({
                liveSearch : true,
                liveSearchPlaceholder : '搜索人员...'
            });
            
            window.window.commonTools.addSelectOptions($('#recieve_id_' + id), getOptionsFromData(formData,'recieve_id'));
            fillFormData(formData, id);
            $('#recieve_id_' + id).change(function(){
                fillFormData(formData, id);
            })
        },
        initialData : initData,
        fillInitialData : function($container, data, id) {
            $('#recieve_id_' + id).val(data.recieve_id);
            fillFormData(formData, id);
            $('#recieve_name_' + id).val(data.recieve_name);
            fillNameData(formData, id);
            //$('#recieve_model_' + id).val(data.recieve_model);
            $('#recieve_location_' + id).val(data.recieve_location);
            $('#recieve_num_' + id).val(data.recieve_num);
            $('#recieve_ps_' + id).val(data.recieve_ps);
            $('#reciever_' + id).selectpicker('val',data.reciever);
        }
    });
    
});