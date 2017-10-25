$(document).ready(function(){
    
    window.commonTools.duplicateFormCtrl({
        container : $('#recieve_content'),
        html :  '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产编号：</div>' +
                            '<input type="text" class="form-control" id="recieve_id">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">资产名称：</div>' +
                            '<input type="text" class="form-control" id="recieve_name">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">规格型号：</div>' +
                            '<input type="text" class="form-control" id="recieve_model">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">存放地点：</div>' +
                            '<input type="text" class="form-control" id="recieve_location">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-2">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">单位：</div>' +
                            '<input type="text" class="form-control" id="recieve_unit">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">数量：</div>' +
                            '<input type="text" class="form-control" id="recieve_num">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">单价：</div>' +
                            '<input type="text" class="form-control" id="recieve_price">' +
                            '<div class="input-group-addon">元</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-3">' +
                    '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                        '<div class="input-group">' +
                            '<div class="input-group-addon addon-label">金额：</div>' +
                            '<input type="text" class="form-control" id="recieve_sum">' +
                            '<div class="input-group-addon">元</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-2 col-md-1">' +
                    '<div class="btn btn-line btn-line-red btn-small btn-block" id="recieve_btn_delete">' +
                        '<i class="fa fa-remove"></i>&nbsp;删除' + 
                    '</div>' +
                '</div>' +
                '<div class="col-xs-12">' +
                    '<div class="cool-form-hline"></div>' +
                '</div>',
        ids : [
            'recieve_id',
            'recieve_name',
            'recieve_model',
            'recieve_location',
            'recieve_unit',
            'recieve_num',
            'recieve_price',
            'recieve_sum',
            'recieve_btn_delete'
        ],
        btn_delete_id : 'recieve_btn_delete',
        btn_add_id : 'recieve_btn_add',
        btn_add_container_id : 'recieve_btn_add_container',
        btn_add_html :  '<div id="recieve_btn_add_container">' +
                            '<div class="col-xs-12 col-sm-10 col-md-11">' +
                                '<div class="form-group form-group-sm cool-form-group cool-form-input-group">' +
                                    '<div class="cool-form-content" id="total"></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-2 col-md-1">' +
                                '<div class="btn btn-line btn-small btn-block" id="recieve_btn_add">' +
                                    '<i class="fa fa-plus"></i>&nbsp;添加' + 
                                '</div>' +
                            '</div>' +
                        '</div>',
        init_number : 1,
        max_number : 5,
        removeOnMax : false,
        afterInit : function(){
            cacuTotal();
        },
        afterAdd : function($container, id) {
            cacuTotal();
            $('#recieve_sum_' + id).watchInput(function(){
                cacuTotal();
            });
        },
        afterRemove : function(){
            cacuTotal();
        }
    });
    
    //计算合计金额
    function cacuTotal(){
        var groups = $('#recieve_content').find('.one-form-group');
        var total = 0;
        groups.each(function(){
            var $this = $(this);
            var id = $this.attr('id').split('_')[1];
            var sum = $('#recieve_sum_' + id).val();
            if(sum != "") {
                total += parseFloat(sum);
            }
        });
        $('#total').text('合计金额：' + toDecimal2(total) + '元');
    }
    
    //强制保留2位小数,返回字符串，如：2，会在2后面补上00.即2.00 
    function toDecimal2(x) { 
        var f = parseFloat(x); 
        if (isNaN(f)) { 
            return false; 
        } 
        var f = Math.round(x*100)/100; 
        var s = f.toString(); 
        var rs = s.indexOf('.'); 
        if (rs < 0) { 
            rs = s.length; 
            s += '.'; 
        } 
        while (s.length <= rs + 2) { 
            s += '0'; 
        }
        return s;
    }
    
    //填充当前日期到“申请时间”
    var date = moment().year() + '-' + (moment().month() + 1) + '-' + moment().date();
    $('#apply_date').text(date);
    
    
    $('#btn_submit').click(function(){
        
        window.location.href='oa-purchase-assets.html';
        
    });
    
    $('#btn_save').click(function(){
        
        toastr.success('您编辑的信息已保存');
        
    });
    
});