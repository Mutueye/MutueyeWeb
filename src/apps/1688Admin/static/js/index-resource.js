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
            title : "资源首页",
            icon_class : "fa fa-database",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='resource.html'"
        },
        {
            title : "人力资源服务",
            icon_class : "fa fa-users",
            selected : false,
            submenu : [
                {
                    title : "人力资源服务",
                    icon_class : "fa fa-users",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-hr.html'"
                },
                {
                    title : "人力资源服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-hr-new.html'"
                }
            ]
        },
        {
            title : "财务服务",
            icon_class : "fa fa-money",
            selected : false,
            submenu : [
                {
                    title : "财务服务",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-finance.html'"
                },
                {
                    title : "财务服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-finance-new.html'"
                }
            ]
        },
        {
            title : "税务服务",
            icon_class : "fa fa-ticket",
            selected : false,
            submenu : [
                {
                    title : "税务服务",
                    icon_class : "fa fa-money",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-tax.html'"
                },
                {
                    title : "税务服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-tax-new.html'"
                }
            ]
        },
        {
            title : "法律服务",
            icon_class : "fa fa-balance-scale",
            selected : false,
            submenu : [
                {
                    title : "法律服务",
                    icon_class : "fa fa-balance-scale",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-law.html'"
                },
                {
                    title : "法律服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-law-new.html'"
                }
            ]
        },
        {
            title : "专利服务",
            icon_class : "fa fa-laptop",
            selected : false,
            submenu : [
                {
                    title : "专利服务",
                    icon_class : "fa fa-laptop",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-patent.html'"
                },
                {
                    title : "专利服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-patent-new.html'"
                }
            ]
        },
        {
            title : "管理咨询服务",
            icon_class : "fa fa-question-circle",
            selected : false,
            submenu : [
                {
                    title : "管理咨询服务",
                    icon_class : "fa fa-question-circle",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-management.html'"
                },
                {
                    title : "管理咨询服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-management-new.html'"
                }
            ]
        },
        {
            title : "投融资服务",
            icon_class : "fa fa-suitcase",
            selected : false,
            submenu : [
                {
                    title : "投融资服务",
                    icon_class : "fa fa-suitcase",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-invest.html'"
                },
                {
                    title : "投融资服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-invest-new.html'"
                }
            ]
        },
        {
            title : "培训服务",
            icon_class : "fa fa-book",
            selected : false,
            submenu : [
                {
                    title : "培训服务",
                    icon_class : "fa fa-book",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-coach.html'"
                },
                {
                    title : "培训服务申请",
                    icon_class : "fa fa-plus-square",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='resource-coach-new.html'"
                }
            ]
        }
    ];
    //移动端菜单数据
    var menuData_m = [
        {
            title : "资源首页",
            icon_class : "fa fa-database",
            selected : false,
            btn_props : "data-toggle='iframelinker' data-link='resource.html'"
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
    
    //移动模式下隐藏/显示菜单
    $('#menu_btn').on('click tap', function(){showMenu();});
    $('#menu_mask').on('click tap touchend', function(){hideMenu();});
    
    //窗口大小变化时
    $(window).resize(function() {
        refreshScroll();
        if(isMobile) hideMenu();
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
            }, 200);
        } else {
            $('#menu_container').perfectScrollbar('update');
        }
    }
});