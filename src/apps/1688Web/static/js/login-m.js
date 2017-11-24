//登录
$(document).ready(function(){
    var loginFormHtml = '<form id="form_login" class="form-login">' +
                            '<div class="row">' +
                                '<div class="col-xs-12">' +
                                    '<div class="form-group">' +
                                        '<label>用户名</label>' +
                                        '<div class="input-group login-input-group">' +
                                            '<div class="input-group-addon"><i class="fa fa-user"></i></div>' +
                                            '<input class="form-control" type="text" placeholder="用户名" id="username" name="username">' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-xs-12">' +
                                    '<div class="form-group">' +
                                        '<label>密码</label>' +
                                        '<div class="input-group login-input-group">' +
                                            '<div class="input-group-addon"><i class="fa fa-lock"></i></div>' +
                                            '<input class="form-control" type="password" placeholder="密码" id="password" name="password">' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-xs-12">' +
                                    '<div class="form-group">' +
                                        '<label>验证码</label>' +
                                        '<div class="input-group login-input-group">' +
                                            '<div class="input-group-addon"><i class="fa fa-key"></i></div>' +
                                            '<input class="form-control" type="text" placeholder="验证码" id="vcode" name="vcode">' +
                                            '<div class="input-group-addon vcode">' +
                                                '<a href="#" class="vcode-btn" title="看不清，点击更换验证码">' +
                                                    '<img src="../images/jcaptcha.jpg">' +
                                                '</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-xs-12" style="margin-top:0.06rem;">' +
                                    '尚未注册？&nbsp;' +
                                    '<a href="m-regist.html">免费注册</a>' +
                                '</div>' +
                            '</div>' +
                        '</form>';

    $('#btn_login, #btn_reg_login').click(function(){
        BSModal.confirm({
            title: "登录",
            content: loginFormHtml,
            width: "400px",
            modalClass: 'modal-login',
            btnOK: "&nbsp;&nbsp;&nbsp;登&nbsp;录&nbsp;&nbsp;&nbsp;",
            btnOKDismiss: false,
            btnOKClass: 'btn-success',
            modalOptions : {
                backdrop : 'static'
            },
            afterInit : function($modal) {
                $('#form_login').bootstrapValidator({
                    fields: {
                        username: {
                            message: '用户名称验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入用户名'
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
                        },
                        vcode: {
                            message: '验证码验证失败',
                            validators: {
                                notEmpty: {
                                    message: '请输入验证码'
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
            var bsValidator = $('#form_login').data('bootstrapValidator');
            bsValidator.validate();
            var result = bsValidator.isValid();
            if(result) {
                $modal.modal('hide');
                window.location.href = 'index-logined.html';
            }
        });
    });
});
