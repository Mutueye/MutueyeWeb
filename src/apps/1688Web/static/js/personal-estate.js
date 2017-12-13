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


    setContentFilter($('#btn_tab1_all'), $('#btn_tab1_finished'), $('#btn_tab1_unfinished'), $('#tab_1'));
    setContentFilter($('#btn_tab2_all'), $('#btn_tab2_finished'), $('#btn_tab2_unfinished'), $('#tab_2'));
    setContentFilter($('#btn_tab3_all'), $('#btn_tab3_finished'), $('#btn_tab3_unfinished'), $('#tab_3'));
    setContentFilter($('#btn_tab4_all'), $('#btn_tab4_finished'), $('#btn_tab4_unfinished'), $('#tab_4'));

    function setContentFilter($btn_all, $btn_finished, $btn_unfinished, $tab) {
        $btn_all.click(function(){
            if(!$(this).hasClass('sel')) {
                $btn_all.addClass('sel')
                $btn_finished.removeClass('sel');
                $btn_unfinished.removeClass('sel');
                $tab.find('.finished').show();
                $tab.find('.unfinished').show();
            }
        });

        $btn_finished.click(function(){
            if(!$(this).hasClass('sel')) {
                $btn_all.removeClass('sel')
                $btn_finished.addClass('sel');
                $btn_unfinished.removeClass('sel');
                $tab.find('.finished').show();
                $tab.find('.unfinished').hide();
            }
        });

        $btn_unfinished.click(function(){
            if(!$(this).hasClass('sel')) {
                $btn_all.removeClass('sel')
                $btn_finished.removeClass('sel');
                $btn_unfinished.addClass('sel');
                $tab.find('.finished').hide();
                $tab.find('.unfinished').show();
            }
        });
    }


});
