$(document).ready(function(){

    window.commonTools.setDateTimeInput($('#workdate'), '2016-12-11');
    window.commonTools.setDateTimeInput($('#workdate2'), '2017-11-12');

    $isSaleryChange = $('#is_salery_change');
    $saleryOldContainer = $('#salery_old_container');
    $saleryOld = $('#salery_old');
    $saleryNewContainer = $('#salery_new_container');
    $saleryNew = $('#salery_new');
    $saleryReasonContainer = $('#salery_reason_container');
    $saleryReason = $('#salery_reason');

    //检测是否薪酬变动
    checkIfSaleryChange();
    $isSaleryChange.change(function(){
        checkIfSaleryChange()
    });

    function checkIfSaleryChange() {
        if($isSaleryChange.val() == '否') {
            $saleryOld.attr('disabled','true');
            $saleryNew.attr('disabled','true');
            $saleryReason.attr('disabled','true');
            $saleryOldContainer.hide();
            $saleryNewContainer.hide();
            $saleryReasonContainer.hide();
        } else {
            $saleryOld.removeAttr('disabled');
            $saleryNew.removeAttr('disabled');
            $saleryReason.removeAttr('disabled');
            $saleryOldContainer.show();
            $saleryNewContainer.show();
            $saleryReasonContainer.show();
        }
    }

    $('#btn_submit').click(function(){

        window.location.href='oa-hr-post.html';

    });

});
