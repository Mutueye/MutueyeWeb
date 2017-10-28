$(document).ready(function(){
    var isUeReady = false; //ueditor编辑器是否初始化完成
    
    var $btn_publish = $('#btn_publish'); //按钮发布
    var $btn_draft = $('#btn_draft'); //按钮暂存
    var $btn_preview = $('#btn_preview'); //按钮预览
    
    $btn_publish.attr('disabled','disabled');
    $btn_draft.attr('disabled','disabled');
    $btn_preview.attr('disabled','disabled');
    
    //实例化ueditor编辑器
    var ue = UE.getEditor('container');
    //初始化完成后，解除按钮禁用状态
    ue.ready(function(){
        isUeReady = true;
        $btn_publish.attr('disabled',false);
        $btn_draft.attr('disabled',false);
        $btn_preview.attr('disabled',false);
        
        //加载已保存的编辑内容信息
        ue.setContent('<b>内容信息...</b>');
    });
    
    //发布
    $btn_publish.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation()) {
                //此处提交数据，提交成功后，返回上级页面
                window.location.href='operate.html';
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });
    
    //暂存
    $btn_draft.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation()) {
                //此处提交数据，提交成功后，弹出如下提示
                toastr.success('您编辑的内容已暂存');
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });
    
    //预览
    $btn_preview.click(function(){
        if(!$(this).attr('disabled')) {
            if(checkValidation()) {
                var htmlStr =   '<div class="box-form">' +
                                    '<div class="article-title">园区规划</div>' +
                                    '<div class="article-info-content">' +
                                        ue.getContent() +
                                    '</div>' +
                                '</div>';
                BSModal.confirm({
                    title : '预览',
                    content : htmlStr,
                    width : '90%',
                    btnOK : '确定',
                    btnCancel : '',
                    maxHeight: '450px'
                });
            }
        } else {
            toastr.warning('富文本编辑器未初始化完成，请稍等...');
        }
    });
    
    function checkValidation() {
        if(ue.getContent().length == 0) {
            toastr.warning('请输入编辑内容');
            return false;
        } else {
            return true;
        }
    }
    
});