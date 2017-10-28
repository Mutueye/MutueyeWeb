$(document).ready(function(){
    var $btn_ok = $('#btn_ok'); //按钮 审核通过
    var $btn_no = $('#btn_no'); //按钮 审核不通过
    
    //审核不通过弹窗的html内容
    var noPassHtml= "<div class='row-space-10'>" +
                        "<form class='row no-bottom'>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>审核人：</div>" +
                                    "<div class='cool-form-content'>" + commonTools.getUserName() + "</div>" +
                                "</div>" +
                            "</div>" +
                            "<div class='col-xs-12'>" +
                                "<div class='form-group form-group-sm cool-form-group'>" +
                                    "<div class='control-label cool-form-label text-right'>审核不通过理由：</div>" +
                                    "<textarea class='form-control textarea' rows=3 id='no_pass_reason'></textarea>" +
                                "</div>" +
                            "</div>" +
                        "</form>" +
                    "</div>";
    
    
    
    //审核通过
    $btn_ok.click(function(){
        BSModal.confirm({ content: "您确定审核通过吗"}).on(function (e) {
            if (!e) {
                return;
            }
            
            //提交审核通过数据...
            
            //此处仅是前端演示提交成功后的效果：跳转回上级页面
            window.location.href='operate-announce.html';
            
            //如审核通过提交失败，弹出提示消息
            //toastr.error('提交审核通过信息失败，请重试');
        });
    });
    
    //审核不通过
    $btn_no.click(function(){
        BSModal.confirm({ title:"审核不通过理由", content:noPassHtml, width:"600px", btnOKDismiss:false}).on(function (e, id) {
            if (!e) {
                return;
            }
            
            //alert($('#'+id).find('#no_pass_reason').eq(0).val());
            
            if($('#'+id).find('#no_pass_reason').eq(0).val().length == 0) {
                toastr.warning('请输入审核不通过理由');
            } else {
                //提交审核不通过数据...
                
                //此处仅是前端演示提交成功后的效果：跳转回上级页面
                window.location.href='operate-announce.html';
                
                //如审核通过提交失败，弹出提示消息
                //toastr.error('提交审核不通过信息失败，请重试');
            }
        });
    });
});