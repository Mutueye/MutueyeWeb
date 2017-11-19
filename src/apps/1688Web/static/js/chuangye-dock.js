$(document).ready(function(){
    var modalHtml =   '<form class="row-space-10" id="form">' +
                                        '<div class="row no-bottom">' +
                                            '<div class="col-xs-12">' +
                                                '<div class="form-group cool-form-group form-group-sm">' +
                                                    '<div class="cool-form-label text-right control-label">对接内容：</div>' +
                                                    '<textarea rows="4" class="form-control textarea" placeholder="对接内容500字以内" id="content" name="content"></textarea>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-xs-12">' +
                                                '<div class="form-group cool-form-group form-group-sm">' +
                                                    '<div class="cool-form-label text-right control-label">联系电话：</div>' +
                                                    '<input type="text" class="form-control" id="phone" name="phone">' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-xs-12">' +
                                                '<div class="form-group cool-form-group form-group-sm">' +
                                                    '<div class="cool-form-label text-right control-label">联系人：</div>' +
                                                    '<input type="text" class="form-control" id="name" name="name">' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="col-xs-12">' +
                                                '<div class="form-group cool-form-group form-group-sm">' +
                                                    '<div class="cool-form-label text-right control-label">公司：</div>' +
                                                    '<input type="text" class="form-control" id="company" name="company">' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</form>';

    $('.btn-dock').click(function(){
        BSModal.confirm({
            title: "需求对接",
            content: modalHtml,
            width: "460px",
            modalClass: 'modal-login',
            btnOK: "确认提交",
            btnOKDismiss: false,
            modalOptions : {
                backdrop : 'static'
            },
            afterInit : function($modal) {
                $('#form').bootstrapValidator({
                    fields: {
                        content: {
                            message: '验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入对接需求'
                                }
                            }
                        },
                        phone: {
                            message: '验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入联系电话'
                                }
                            }
                        },
                        name: {
                            message: '验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入联系人姓名'
                                }
                            }
                        },
                        company: {
                            message: '验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入公司名称'
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
            var $modal = $('#' + id);
            var bsValidator = $('#form').data('bootstrapValidator');
            bsValidator.validate();
            var result = bsValidator.isValid();
            if(result) {
                $modal.modal('hide');
                toastr.success('您的需求已提交成功！');
            }
        });
    });
});
