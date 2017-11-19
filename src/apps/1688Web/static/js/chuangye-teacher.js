$(document).ready(function(){
    var modalHtml =   '<form class="row-space-10" id="form">' +
                                        '<div class="row no-bottom">' +
                                            '<div class="col-xs-12">' +
                                                '<div class="form-group cool-form-group form-group-sm">' +
                                                    '<div class="cool-form-label text-right control-label">请教内容：</div>' +
                                                    '<textarea rows="4" class="form-control textarea" placeholder="请教内容500字以内" id="content" name="content"></textarea>' +
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
                                                    '<div class="cool-form-label text-right control-label">电子邮箱：</div>' +
                                                    '<input type="text" class="form-control" id="email" name="email">' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</form>';

    $('.btn-teacher').click(function(){
        BSModal.confirm({
            title: "我要请教",
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
                                    message: '请输入请教内容'
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
                        email: {
                            message: '验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入电子邮箱'
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
                toastr.success('您请教的内容已提交成功！');
            }
        });
    });
});
