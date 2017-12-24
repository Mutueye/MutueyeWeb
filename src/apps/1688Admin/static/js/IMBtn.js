//各子系统框架右上角IM按钮控制，用于打开IM页面

$(document).ready(function(){

    if(!device.mobile()) {

        var $btn = $('#topbar_im_btn');

        //读取localStorage里的im状态，判断im页面是否打开
        var imState = localStorage.getItem('im');
        if(imState == null) {
            imState == 'close';
        }
        toggleBtnState(imState);

        //通过storage事件判断localStorage中im的状态
        if(window.addEventListener){
            window.addEventListener("storage",handle_storage,false);
        }else if(window.attachEvent){
            window.attachEvent("onstorage",handle_storage);
        }
        function handle_storage(e){
            if(!e){
                e=window.event;
            }
            if(localStorage.getItem('im') != imState) {
                imState = localStorage.getItem("im");
                toggleBtnState(imState);
            }
        }

        $btn.click(function(){
            if(imState == 'close') {
                window.open('/html/IM.html');
            }
        });

        function toggleBtnState(imState) {
            if(imState == 'open') {
                $btn.html('<i class="fa fa-comments"></i>&nbsp;即时通讯已打开');
                $btn.attr('disabled','disabled');
            } else if(imState == 'close') {
                $btn.html('<i class="fa fa-comments"></i>&nbsp;即时通讯');
                $btn.removeAttr('disabled');
            }
        }
    }
});
