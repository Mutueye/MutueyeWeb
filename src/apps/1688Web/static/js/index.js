$(document).ready(function(){

    var sliderData = [
        {
            imageurl : "../images/slider_4.jpg",
            title : '放飞梦想 砥砺前行--祝贺嘉瑞德物业成立四周年',
            info : '2017年6月6日是青岛嘉瑞德物业管理有限公司成立四周年的日子，在这四年的日子里，嘉瑞德物业在各部门员工的共同努力下，各项工作有条不紊的开展。'
        },
        {
            imageurl : "../images/slider_1.jpg",
            title : '园区积极对接区人社局',
            info : '园区积极对接区人社局，帮企业揽高端人才，解人才之忧。'
        },
        {
            imageurl : "../images/slider_2.jpg",
            title : '园区开展电梯安全培训演练',
            info : '6月22日，中艺1688园区与嘉瑞德物业、奥的斯电梯（中国）有限公司青岛分公司联合开展了电梯事故(故障)演练活动。'
        },
        {
            imageurl : "../images/slider_3.jpg",
            title : '2017青岛工业设计周在我园区启动',
            info : '由青岛市人民政府主办，市经济信息化委、李沧区人民政府承办的2017青岛工业设计周于5月22日至26日在我园区正式启动。'
        },
        {
            imageurl : "../images/slider_5.jpg",
            title : '青岛市服务业局局长王伟光带队莅临园区调研参观',
            info : '7月6日，青岛市服务业局局长王伟光带队、市发改局分管领导和李沧区政府分管领导一行三十余人莅临园区调研参观，园区总经理刘永涛陪同讲解。'
        }
    ];
    
    var afterSliderInit = function() {
        app.getViewCtrl().setTouchActive();
    }
    
    $('#main_slider').dolphinSlider({
        //jsonData : '../data/slider.json',
        jsonData : sliderData,
        autoRun : true,
        slideType : 'basic',
        animDuration : 500,
        duration : 5000,
        navigation : true,
        navigationPrevClass : 'navi-prev touch-active',
        navigationNextClass : 'navi-next touch-active',
        paginationType : 'fancy',
        paginationHasContent : true,
        paginationHasInfo : true,
        paginationHasTimer : true,
        paginationHasDivider : true,
        paginationHasNumbers : true,
        paginationHidePrevDivider : true,
        paginationClass : 'slider-pagination',
        paginationContainerClass : 'container',
        
        afterInit : afterSliderInit
    });
    //alert($('.carousel').data('dolphinSlider').$userItems.length);
    
    //新闻轮播
    $('.ins').owlCarousel({
        items : 1,
        autoplay : true,
        nav : false,
        loop : true
    });
});