$(document).ready(function(){
    var $user_info = $('#user_info');
    var $user_form = $('#user_form');
    var $form = $('#form');
    var $btn_edit = $('#btn_edit');
    var $btn_cancel = $('#btn_cancel');
    var $btn_save = $('#btn_save');
    $user_form.hide();

    window.commonTools.initBSFileInput($('#input_appendix'),true,true);

    $btn_edit.click(function(){
        $user_info.hide();
        $user_form.show();
    });

    $btn_cancel.click(function(){
        $user_info.show();
        $user_form.hide();
    });

    var $btn_message_filter_unread = $('#btn_message_filter_unread');
    var $btn_message_filter_all = $('#btn_message_filter_all');
    var $message_list = $('#message_list');

    $btn_message_filter_unread.click(function(){
        if(!$(this).hasClass('sel')) {
            $btn_message_filter_unread.addClass('sel');
            $btn_message_filter_all.removeClass('sel');
            $message_list.find('.readed').hide();
        }
    });

    $btn_message_filter_all.click(function(){
        if(!$(this).hasClass('sel')) {
            $btn_message_filter_unread.removeClass('sel');
            $btn_message_filter_all.addClass('sel');
            $message_list.find('.readed').show();
        }
    });
});
