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
    
    
    var $message_list = $('#message_list');
    var $message_text = $('#message_text');
    var $btn_reply = $('#btn_reply');
    
    $btn_reply.click(function(){
        
        if($message_text.val().length > 0) {
            addMessage('right', $message_text.val());
            //模拟对方回复
            addMessage('left', '好的，收到！');
        } else {
            toastr.warning('请输入留言内容');
        }
    });
    
    //获取对方和用户自己的用户名及头像后，合成消息头，此处直接写死前端展示
    var message_head_left = '<div class="message-item-name">Isabella Yang</div>' +
                            '<div class="message-item-avatar">' +
                                '<div class="message-item-avatar-ball">' +
                                    '<img src="../images/avatar-default.jpg">' +
                                '</div>' +
                            '</div>';
    var message_head_right = '<div class="message-item-name">上善若水</div>' +
                            '<div class="message-item-avatar">' +
                                '<div class="message-item-avatar-ball">' +
                                    '<img src="../images/avatar-default.jpg">' +
                                '</div>' +
                            '</div>';
    
    //position : 'left','right'
    //content : 留言字符串
    function addMessage(position, content) {
        var message_class="message-item left readed";
        var message_head = message_head_left;
        if(position == 'right') {
            message_class="message-item right";
            message_head = message_head_right;
        }
        var messageHtml =   '<div class="' + message_class + '">' +
                                message_head + 
                                '<div class="message-item-text">' +
                                    content +
                                    '<div class="message-item-time">' + window.commonTools.getCurrentTime() + '</div>' +
                                '</div>' +
                            '</div>';
        $message_list.append(messageHtml);
    }
});