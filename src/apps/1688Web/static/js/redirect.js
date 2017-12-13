$(document).ready(function(){

    redirect('success', '提交成功，即将跳转到百度页面...', 'http://www.baidu.com/', 5000);

    //type : 'normal','error','warning','success'  跳转提示类型
    //content : 跳转文字内容
    //link : 跳转链接
    //delay : 跳转延迟时间ms
    function redirect(type, content, link, delay) {
        $('.redirect-box').html('');
        var iconHtml = '<div class="redirect-box-icon"><i class="fa fa-link"></i></div>';
        if(type == 'error') {
            iconHtml = '<div class="redirect-box-icon bg-red-intense"><i class="fa fa-times"></i></div>';
        } else if(type == 'warning') {
            iconHtml = '<div class="redirect-box-icon bg-yellow-bronze"><i class="fa fa-exclamation"></i></div>';
        } else if(type == 'success') {
            iconHtml = '<div class="redirect-box-icon bg-green-grass"><i class="fa fa-check"></i></div>';
        }

        var mainHtml = iconHtml + '<div class="redirect-box-label">' + content + '</div>';
        $('.redirect-box').html(mainHtml);

        if(typeof delay == 'number') {
            setTimeout(function(){
                window.location.href = link;
            }, delay);
        } else {
            window.location.href = link;
        }
    }
});
