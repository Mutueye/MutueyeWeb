$(document).ready(function(){
    //app.getViewCtrl().getWinSize().height;

    //自适应高度
    setEmailHeight(app.getViewCtrl().getWinSize().height);
    $(window).resize(function() {
        setEmailHeight(app.getViewCtrl().getWinSize().height);
    });
    function setEmailHeight(h){
        $('.email-content').css({
            height : h
        });
    }

    var $table1 = $('#table1');
    var $toolbtn1_remove = $('#toolbtn1_remove');
    var $toolbtn1_recover = $('#toolbtn1_recover');

    setBSTable1();

    function setBSTable1() {

        //格式化标题
        function titleFormatter(value, row, index) {
            var titleText = value.text;
            var titleUrl = value.url;
            return "<a href='" + titleUrl + "'>" + titleText + "</a>";
        }

        $table1.bootstrapTable({
            toolbar : '#toolbar1',
            showColumns : false,
            showToggle : false,
            pagination : true,
            showPaginationSwitch : false,
            clickToSelect : false,
            columns: [
                {
                    field: 'check',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                },
                {
                    field: 'id',
                    title: '序号',
                    halign: 'center',
                    align: 'right',
                    width: 30,
                    visible: false
                },
                {
                    field: 'dep',
                    title: '收/发件人',
                    halign: 'center'
                },
                {
                    field: 'title',
                    title: '标题',
                    halign: 'center',
                    formatter: titleFormatter
                },
                {
                    field: 'date',
                    title: '时间',
                    halign: 'center',
                    align: 'center',
                    sortable: true
                }
            ],
            data: [
                {
                    id: 1,
                    dep: '王二小',
                    title: {
                        text : '【年末福利-500元礼券】给忙碌了一年的你の奖励！',
                        url : 'oa-personal-email-detail.html'
                    },
                    date: '2017.12.31'
                },
                {
                    id: 2,
                    dep: '行政部',
                    title: {
                        text : '【本月上新推荐】We Wish You A Merry Christmas！圣诞节贴心送礼指南！',
                        url : 'oa-personal-email-detail.html'
                    },
                    date: '2017.12.23',
                }
            ]
        });

        setToolBtnDisableState();
        $table1.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
            setToolBtnDisableState();
        });

        //撤销操作
        $toolbtn1_remove.click(function () {
            //按钮如果不是disabled状态,则可进行操作
            if(!$(this).attr('disabled')) {
                //取表格的选中行数据
                var arrselections = $table1.bootstrapTable('getSelections');
                if (arrselections.length <= 0) {
                    toastr.warning('请选择有效数据');
                    return;
                }

                BSModal.confirm({ content: "确认要删除选定的邮件吗？" }).on(function (e) {
                    if (!e) {
                        return;
                    }

                    //此处仅是前端演示删除后的效果：删除表格条目，重置工具栏状态，显示删除成功的提示
                    var ids = getIdSelections();
                    $table1.bootstrapTable('remove', {
                        field: 'id',
                        values: ids
                    });
                    setToolBtnDisableState();
                    toastr.success('删除成功！');
                });
            }
        });

        function getIdSelections() {
            return $.map($table1.bootstrapTable('getSelections'), function (row) {
                return row.id
            });
        }

        function setToolBtnDisableState() {
            var tableSelections = $table1.bootstrapTable('getSelections')
            $toolbtn1_remove.attr('disabled', !tableSelections.length);
            $toolbtn1_recover.attr('disabled', !tableSelections.length);
        }
    }



});
