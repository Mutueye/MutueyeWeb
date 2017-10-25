/*!
 * bootstrap 3 modal 封装
 */

(function ($) {
    window.BSModal = function () {
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var generateId = function () {
            var date = new Date();
            return 'mdl' + date.valueOf();
        }
        var init = function (options) {
            options = $.extend({}, {
                title: "操作提示",
                content: "提示内容",
                btnOK: "确定",
                btnOKDismiss: true,
                btnOKClass: 'btn-primary',
                btnCancel: "取消",
                
                modalClass: '',
                
                width: '',
                height: '',
                maxHeight: '',
                
                hasFooter: true,
                footerContent : '',
                
                afterInit : false,
                
                modalOptions : {
                    backdrop : 'static'
                }
            }, options || {});
            var modalId = generateId();
            
            var footerHtml = "";
            if(options.hasFooter) {
                var btnOKDismissHtml = options.btnOKDismiss ? 'data-dismiss="modal"' : '';
                var btnClHtml = (typeof options.btnCancel == 'string' && options.btnCancel !="") ? '<button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button>' : '';
                var btnOkHtml = (typeof options.btnOK == 'string' && options.btnOK != "") ? '<button type="button" class="btn ' + options.btnOKClass + ' ok" ' + btnOKDismissHtml +'>[BtnOk]</button>' : '';
                var footerContentHtml = (typeof options.footerContent == 'string' && options.footerContent != "") ? options.footerContent : btnClHtml + btnOkHtml;
                footerHtml= '<div class="modal-footer">' +
                                footerContentHtml +
                            '</div>';
            }
            
            var modalHtml = '<div id="[Id]" class="modal ' + options.modalClass + ' fade" role="dialog" aria-labelledby="modalLabel">' +
                                '<div class="modal-dialog modal-sm">' +
                                    '<div class="modal-content">' +
                                        '<div class="modal-header">' +
                                            '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>' +
                                            '<h4 class="modal-title" id="modalLabel">[Title]</h4>' +
                                        '</div>' +
                                        '<div class="modal-body">' +
                                            '[modalBodyHtml]' +
                                        '</div>' +
                                        footerHtml +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            
            var content = modalHtml.replace(reg, function (node, key) {
                return {
                    Id: modalId,
                    Title: options.title,
                    modalBodyHtml: options.content,
                    BtnOk: options.btnOK,
                    BtnCancel: options.btnCancel
                }[key];
            });
            $('body').append(content);
            
            var $modal = $('#' + modalId);
            $modal.modal(options.modalOptions);
            
            if(typeof options.width == 'string' && options.width != 'auto' && options.width != '') {
                $modal.find('.modal-dialog').css('width', options.width);
            }
            
            if(typeof options.height == 'string' && options.height != 'auto' && options.height != '') {
                $modal.find('.modal-body').css({
                    'height': options.height,
                    'overflow': 'auto'
                });
            }
            
            if(typeof options.maxHeight == 'string' && options.maxHeight != 'auto' && options.maxHeight != '') {
                $modal.find('.modal-body').css({
                    'maxHeight': options.maxHeight,
                    'overflow': 'auto'
                });
            }
            
            //移动端统一处理弹窗的宽度高度，选项中定义的宽度、高度、最大高度不在移动端起作用
            if(device.mobile()) {
                $modal.find('.modal-dialog').css({
                    'width': 'auto',
                    'margin': '0.08rem'
                });
                $modal.find('.modal-body').css({
                    'height': 'auto',
                    'maxHeight': 'none',
                    'overflow': 'auto'
                });
            }
            
            if (typeof options.afterInit === "function") options.afterInit.apply(this, [$modal]);
            
            $modal.on('hide.bs.modal', function (e) {
                $('body').find('#' + modalId).remove();
            });
            return modalId;
        }
 
        return {
            alert: function (options) {
                if (typeof options == 'string') {
                    options = {
                        content: options
                    };
                }
                var id = init(options);
                var $modal = $('#' + id);
                $modal.find('.cancel').hide();
 
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            $modal.find('.ok').click(function () { callback(true); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            $modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            },
            confirm: function (options) {
                var id = init(options);
                var $modal = $('#' + id);
                $modal.find('.cancel').show();
                return {
                    id: id,
                    on: function (callback) {
                        if (callback && callback instanceof Function) {
                            $modal.find('.ok').click(function () { callback(true, id); });
                            $modal.find('.cancel').click(function () { callback(false, id); });
                        }
                    },
                    hide: function (callback) {
                        if (callback && callback instanceof Function) {
                            $modal.on('hide.bs.modal', function (e) {
                                callback(e);
                            });
                        }
                    }
                };
            }
        }
    }();
})(jQuery);