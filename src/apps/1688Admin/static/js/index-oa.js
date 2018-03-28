$(document).ready(function(){

    var isMobile = device.mobile();
    var isTouch = device.mobile() || device.tablet();

    //触摸设备使用iScroll插件，非触摸设备使用perfectScrollbar插件
    if(isTouch) {
        //创建左侧菜单iscroll实例
        var menuScroll = new IScroll('#menu_container', {
            scrollbars: 'custom',
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            click: app.iScrollClick()
        });
    } else {
        $('#menu_container').perfectScrollbar({
            suppressScrollX:true
        });
    }

    //菜单数据示例
    var menuData = [
        {
            title : "办公首页",
            icon_class : "fa fa-print",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='oa.html'"
        },
        {
            title : "个人事务",
            icon_class : "fa fa-user-circle",
            selected : false,
            submenu : [
                {
                    title : "我的任务",
                    icon_class : "fa fa-user-circle",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-mission.html' id='mission'"
                },
                {
                    title : "通知/公告",
                    icon_class : "fa fa-bullhorn",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-notice.html' id='notice'"
                },
                {
                    title : "电子邮件",
                    icon_class : "fa fa-envelope",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='https://139.219.231.108/roundcubemail'"
                },
                {
                    title : "流程审批",
                    icon_class : "fa fa-retweet",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-proc-approval.html'"
                },
                {
                    title : "工作日志",
                    icon_class : "fa fa-calendar-check-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-journal.html'"
                },
                {
                    title : "个人信息",
                    icon_class : "fa fa-id-card",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-info.html'"
                },
                {
                    title : "修改密码",
                    icon_class : "fa fa-key",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-password.html'"
                }
            ]
        },
        {
            title : "合同管理",
            icon_class : "fa fa-clipboard",
            selected : false,
            submenu : [
                {
                    title : "合同录入",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-contract-new.html'"
                },
                {
                    title : "合同管理",
                    icon_class : "fa fa-clipboard",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-contract.html'"
                },
                {
                    title : "合同类型",
                    icon_class : "fa fa-files-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-contract-cat.html'"
                }
            ]
        },
        {
            title : "文档管理",
            icon_class : "fa fa-archive",
            selected : false,
            submenu : [
                {
                    title : "文档管理",
                    icon_class : "fa fa-archive",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-doc.html'"
                },
                {
                    title : "文档类型",
                    icon_class : "fa fa-files-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-doc-cat.html'"
                }
            ]
        },
        {
            title : "人力资源",
            icon_class : "fa fa-id-card",
            selected : false,
            submenu : [
                {
                    title : "考勤管理",
                    icon_class : "fa fa-calendar",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-attendance.html'"
                },
                {
                    title : "招聘管理",
                    icon_class : "fa fa-users",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-recruit.html'"
                },
                {
                    title : "培训管理",
                    icon_class : "fa fa-book",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-coach.html'"
                },
                {
                    title : "培训类型",
                    icon_class : "fa fa-files-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-coach-cat.html'"
                },
                {
                    title : "岗位调整",
                    icon_class : "fa fa-id-badge",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-post.html'"
                },
                {
                    title : "人员信息",
                    icon_class : "fa fa-address-book-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-info.html'"
                },
                {
                    title : "请假管理",
                    icon_class : "fa fa-beer",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-leave.html'"
                },
                {
                    title : "外出申请",
                    icon_class : "fa fa-sign-out",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-out-apply.html'"
                },
                {
                    title : "出差申请",
                    icon_class : "fa fa-plane",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-hr-trip-apply.html'"
                }
            ]
        },
        {
            title : "物资采购",
            icon_class : "fa fa-shopping-cart",
            selected : false,
            submenu : [
                {
                    title : "采购管理",
                    icon_class : "fa fa-shopping-cart",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-purchase.html'"
                },
                {
                    title : "购买登记",
                    icon_class : "fa fa-edit",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-purchase-regist.html'"
                },
                {
                    title : "易耗领用",
                    icon_class : "fa fa-download",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-purchase-recieve.html'"
                },
                {
                    title : "固定资产管理",
                    icon_class : "fa fa-cubes",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-purchase-assets.html'"
                },
                {
                    title : "仓库管理",
                    icon_class : "fa fa-building",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-purchase-warehouse.html'"
                },
                {
                    title : "物品类型管理",
                    icon_class : "fa fa-files-o",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-purchase-cat.html'"
                }
            ]
        },
        {
            title : "工作流",
            icon_class : "fa fa-exchange",
            selected : false,
            submenu : [
                {
                    title : "宴请申请",
                    icon_class : "fa fa-glass",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-workflow-banquet.html'"
                },
                {
                    title : "车辆申请",
                    icon_class : "fa fa-car",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-workflow-vehicle.html'"
                },
                {
                    title : "支票申请",
                    icon_class : "fa fa-sticky-note",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-workflow-check.html'"
                },
                {
                    title : "请示报告单",
                    icon_class : "fa fa-file-text",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-workflow-report.html'"
                },
                {
                    title : "支付申请",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-workflow-payment.html'"
                },
                {
                    title : "用印申请",
                    icon_class : "fa fa-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-workflow-stamp.html'"
                }
            ]
        }
    ];
    //移动端菜单数据
    var menuData_m = [
        {
            title : "办公首页",
            icon_class : "fa fa-print",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='oa.html'"
        }
    ];
    //移动端内容相对PC端更精简，因此移动端和PC端分别加载不同的菜单数据
    var mData = isMobile ? menuData_m : menuData;

    //创建左侧菜单treeMenu实例
    $('#tree_menu').treeMenu({
        //jsonPath 通过ajax加载菜单数据,json格式参见tmenu.json
        //jsonPath : '/data/tmenu.json',

        //jsonData 通过js对象加载菜单数据
        jsonData : mData,

        tmBtnAddon : "<div class='sel-arrow'></div>",

        foldUnselected : true, //点击切换菜单时，折叠未被选中的菜单，默认false
        onlyFolderAction : true,
        autoSelect : false,

        afterInit :afterTMInit,
        onFolderBtnClick : onFolderBtnClick,
        onLinkBtnClick : onLinkBtnClick
    });



    //菜单初始化后触发事件
    function afterTMInit() {
        refreshScroll();
        //绑定iframeLinkChanged事件，iframe的src地址改变时，触发菜单改变选中的按钮
        $('body').bind('iframeLinkChanged', function(evt, iframelink){
            var el_tmenu_btns = $('#tree_menu').find('[data-link="' + iframelink +'"]');
            if(el_tmenu_btns.length == 0) {
                //TODO 设置sub-data-link匹配子页面，使访问某一功能的子页面时，菜单仍能定位并选中该功能页面对应的菜单按钮
                //实现此功能牵扯到大范围修改json数据格式，功能效果并不明显，所以不再添加此功能 2017.10.27
            } else {
                $('#tree_menu').trigger('tmenu.changeSel',[$('#tree_menu').find('[data-link="' + iframelink +'"]')]);
            }
        });
        //初始化iframe链接插件，必须在绑定iframeLinkChanged事件之后
        app.setIframeLinker('.main-iframe', true, 'iframelinker');
    }



    //菜单按钮按下触发事件
    function onFolderBtnClick() {
        refreshScroll();
    }

    //移动模式下隐藏/显示菜单
    $('#menu_btn').on('click tap', function(){showMenu();});
    $('#menu_mask').on('click tap touchend', function(){hideMenu();});

    //窗口大小变化时
    $(window).resize(function() {
        refreshScroll();
        if(isMobile) hideMenu();
    });

    //手机端，当点击非层级容器按钮时，延迟半秒收回菜单
    function onLinkBtnClick() {
        refreshScroll();
        if(isMobile) {
            setTimeout(function () {
                hideMenu();
            }, 500);
        }
    }


    //隐藏菜单
    function hideMenu() {
        $('#left_container').removeClass('show');
        $('#menu_mask').removeClass('show');
    }
    //显示菜单
    function showMenu() {
        $('#left_container').addClass('show');
        $('#menu_mask').addClass('show');
    }

    //刷新iscroll/perfectScrollbar插件
    function refreshScroll(){
        if(isTouch) {
            setTimeout(function () {
                menuScroll.refresh();
                //orgScroll.refresh();
            }, 200);
        } else {
            $('#menu_container').perfectScrollbar('update');
            //$('#org_container').perfectScrollbar('update');
        }
    }
});
