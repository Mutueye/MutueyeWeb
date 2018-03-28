$(document).ready(function(){
    var p_w = 1400; //基准宽度
    var p_h = 915; //基准高度
    var fsize = 100; //字体大小
    var basicFsize = 100; //基准字体大小
    var $platform = $('.platform-screen');
    var $platform_items = $('.platform-screen-content');
    var pageNum = $platform_items.length;
    var $top = $('.top-container');

    var $pager = $('.platform-pager') //分页点容器
    var $pagerItems = null //分页点们
    var $pagerSelector = $('.platform-pager-selector') //当前分页点

    var currentPage = 0 //当前页码
    var canGoNext = true //判断鼠标滚动是否可翻页
    var canGoNextTimer = null //鼠标滚动时间间隔计数器
    var canGoNextTime = 1000 //鼠标滚动时间间隔
    var pageTime = 1000 //翻页动画时长

    //从服务器读取的，第一个页面各位置的数字
    var nums = {
        center : 9258, //服务企业数
        tl : 32, //服务资源数
        tl2 : 518, //孵化项目数
        space : 118, //创业空间
        r1 : 3,
        r2 : 9,
        r3 : 4,
        r4 : 7,
        r5: 1230,
        r6: 23,
        r7: 29,
        r8: 94
    }

    //Highcharts配色设置
    Highcharts.setOptions({
        colors: ['#18c8ff', '#ff760a', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
    });

    setPager() //设置右侧翻页点
    setLayout(); //设置布局
    fillNumbers(nums);
    bindEvents();

    function setPager(){
        for(var i = 0; i < pageNum; i++) {
            $pager.append('<li></li>');
        }
        $pagerItems = $pager.find('li');
    }

    function setLayout(){
        var winWidth = app.getViewCtrl().getWinSize().width;
        var winHeight = app.getViewCtrl().getWinSize().height - $top.height();

        if(winWidth/p_w > winHeight/p_h) {
            fsize = basicFsize*winHeight/p_h;
        } else {
            fsize = basicFsize*winWidth/p_w;
        }
        //通过改变容器的fontsize，结合em单位自适应窗口
        $platform.css('font-size',fsize + 'px');

        $platform.css('height', 3*winHeight + 'px');
        $platform_items.css('height', winHeight + 'px');

        $pager.css({
            'top':'50%',
            'margin-top':20-$pager.height()/2+'px'
        });

        canGoNext = true;

        changePage(currentPage);
    }

    function bindEvents(){
        $(window).resize(function() {
            setLayout();
        });
        $('body').on('mousewheel', function(e){
            scrollPage(e.deltaY);
        });
        $('body').rhuiSwipe('swipeDown', function(event){
            scrollPage(1);
        }, {
            // 可选参数
            isStopPropagation: true,
            isPreventDefault: true,
            triggerOnMove: true
        });
        $('body').rhuiSwipe('swipeUp', function(event){
            scrollPage(-1);
        }, {
            // 可选参数
            isStopPropagation: true,
            isPreventDefault: true,
            triggerOnMove: true
        });
        $pagerItems.click(function(){
            changePage($(this).index() - 1);
        });
    }

    //把读取的各位置数字填充到界面上
    function fillNumbers(nums){
        //$('#num_center').html(addZeroOnNum(nums.center,6));
        increaseNum($('#num_center'), nums.center, 1000, 10, true, 6);
        //$('#num_tl').html(addZeroOnNum(nums.tl,3));
        increaseNum($('#num_tl'), nums.tl, 1000, 10, true, 3);
        //$('#num_tl2').html(addZeroOnNum(nums.tl2,3));
        increaseNum($('#num_tl2'), nums.tl2, 1000, 10,  true, 3);
        fillBars(nums.tl2, 200);

        $('#num_r1').html(nums.r1);
        $('#num_r2').html(nums.r2);
        $('#num_r3').html(nums.r3);
        $('#num_r4').html(nums.r4);
        $('#num_r5').html(nums.r5);
        $('#num_r6').html(nums.r6);
        $('#num_r7').html(nums.r7);
        $('#num_r8').html(nums.r8);
    }

    //将数字转化为规定长度的字符串，前面加0，例如数字23转化为4为字符串则为0023。
    function addZeroOnNum(number, length) {
        var num = parseInt(number);
        var numString = num.toString();
        if(numString.length < length) {
            var numLength = numString.length;
            for(var i = 0; i< length - numLength; i++) {
                numString = '0' + numString;
            }
        }
        return numString;
    }

    //填充孵化项目数的进度条
    function fillBars(num, onebar_num) {
        if(num < onebar_num) {
            $('#tl2_1').css('width', num*100/onebar_num + '%')
        } else {
            var barNum = Math.floor(num/onebar_num);
            for(var i = 1; i <= barNum + 1; i++) {
                $('#tl2_' + i).css('width','100%');
            }
            var pct = (num - barNum*onebar_num)*100/onebar_num;
            $('#tl2_' + (barNum + 1)).css('width', pct + '%');
        }
    }

    //数字增长动画
    //$el 需要显示数字的jquery元素
    //number 数字
    //animtime 动画持续时间
    //oneNumTime 每次变更的时间长度
    //shouldAddZero 是否前置0, boolean
    //length 如果前置0，需要给定数字位数
    function increaseNum($el, number, animtime, oneNumTime, shouldAddZero, length) {
        var oneIncreNum = parseInt(number*oneNumTime/animtime);
        if(oneIncreNum < 1) oneIncreNum = 1;
        var setNumber = function(num) {
            num = parseInt(num);
            if(num <= number) {
                if(shouldAddZero) {
                    num = addZeroOnNum(num, length);
                }
                $el.html(num);
                if(parseInt(num) < number) {
                    setTimeout(function(){
                        var nextNum = parseInt(num) + oneIncreNum;
                        if(nextNum > number) nextNum = number;
                        setNumber(nextNum);
                    }, oneNumTime);
                }
            }
        }
        setNumber(1);
    }

    function scrollPage(direction) {
        if (direction > 0) {
            if(canGoNext){
                if(currentPage > 0)
                    changePage(currentPage - 1);
                canGoNext = false;
                if(canGoNextTimer) clearTimeout(canGoNextTimer);
                canGoNextTimer = setTimeout(function(){
                    canGoNext = true;
                }, canGoNextTime);
            }
        } else if(direction < 0) {
            if(canGoNext) {
                if(currentPage < pageNum - 1)
                    changePage(currentPage + 1);
                canGoNext = false;
                if(canGoNextTimer) clearTimeout(canGoNextTimer);
                canGoNextTimer = setTimeout(function(){
                    canGoNext = true;
                }, canGoNextTime);
            }
        }
    }

    function changePage(page){
        var targetPos = $top.height();
        if(page >= 1) {
            for(var i = 1; i<= page; i++) {
                if(i < page) {
                    targetPos = targetPos - $platform_items.eq(i).height();
                } else {
                    if ($platform_items.eq(i).height() >= (app.getViewCtrl().getWinSize().height - $top.height())) {
                        targetPos = targetPos - app.getViewCtrl().getWinSize().height + $top.height();
                    } else {
                        targetPos = targetPos - $platform_items.eq(i).height();
                    }
                }
            }
        }

        $platform.stop().animate(
            {
                top: targetPos
            },
            {
                duration: pageTime,
                easing: 'easeInOutExpo'
            }
        );
        $pagerSelector.stop().animate(
            {
                top:$pagerItems.eq(page).offset().top-$pager.offset().top+2
            },
            {
                duration: pageTime,
                easing: 'easeInOutExpo'
            }
        );
        currentPage = page;
    }

    //初始化第三页各个轮播
    $('#carousel_1').owlCarousel({
        items : 1,
        autoplay : true,
        nav : true,
        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        loop : true,
        dots : false
    });

    $('#carousel_2').owlCarousel({
        items : 1,
        autoplay : true,
        nav : true,
        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        loop : true,
        dots : false
    });

    $('#carousel_3').owlCarousel({
        items : 1,
        autoplay : true,
        nav : true,
        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        loop : true,
        dots : false
    });

    $('#carousel_4').owlCarousel({
        items : 1,
        autoplay : true,
        nav : true,
        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        loop : true,
        dots : false
    });

    $('#carousel_5').owlCarousel({
        items : 1,
        autoplay : true,
        nav : true,
        navText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        loop : true,
        dots : false
    });

    //以下初始化各位置图表
    $('#chart_tl').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:false
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),15],
                    [Date.UTC(2017,2,1),12],
                    [Date.UTC(2017,3,1),16],
                    [Date.UTC(2017,4,1),23],
                    [Date.UTC(2017,5,1),14],
                    [Date.UTC(2017,6,1),22],
                    [Date.UTC(2017,7,1),30],
                    [Date.UTC(2017,8,1),24],
                    [Date.UTC(2017,9,1),38],
                    [Date.UTC(2017,10,1),35],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r1').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),2],
                    [Date.UTC(2017,2,1),2],
                    [Date.UTC(2017,3,1),6],
                    [Date.UTC(2017,4,1),2],
                    [Date.UTC(2017,5,1),1],
                    [Date.UTC(2017,6,1),0],
                    [Date.UTC(2017,7,1),3],
                    [Date.UTC(2017,8,1),1],
                    [Date.UTC(2017,9,1),4],
                    [Date.UTC(2017,10,1),3],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r2').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),3],
                    [Date.UTC(2017,2,1),1],
                    [Date.UTC(2017,3,1),5],
                    [Date.UTC(2017,4,1),2],
                    [Date.UTC(2017,5,1),4],
                    [Date.UTC(2017,6,1),3],
                    [Date.UTC(2017,7,1),7],
                    [Date.UTC(2017,8,1),2],
                    [Date.UTC(2017,9,1),1],
                    [Date.UTC(2017,10,1),4],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r3').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),2],
                    [Date.UTC(2017,2,1),2],
                    [Date.UTC(2017,3,1),4],
                    [Date.UTC(2017,4,1),3],
                    [Date.UTC(2017,5,1),5],
                    [Date.UTC(2017,6,1),1],
                    [Date.UTC(2017,7,1),5],
                    [Date.UTC(2017,8,1),7],
                    [Date.UTC(2017,9,1),2],
                    [Date.UTC(2017,10,1),1],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r4').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),5],
                    [Date.UTC(2017,2,1),2],
                    [Date.UTC(2017,3,1),2],
                    [Date.UTC(2017,4,1),6],
                    [Date.UTC(2017,5,1),1],
                    [Date.UTC(2017,6,1),3],
                    [Date.UTC(2017,7,1),2],
                    [Date.UTC(2017,8,1),7],
                    [Date.UTC(2017,9,1),2],
                    [Date.UTC(2017,10,1),6],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r5').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),2],
                    [Date.UTC(2017,2,1),2],
                    [Date.UTC(2017,3,1),6],
                    [Date.UTC(2017,4,1),2],
                    [Date.UTC(2017,5,1),1],
                    [Date.UTC(2017,6,1),0],
                    [Date.UTC(2017,7,1),3],
                    [Date.UTC(2017,8,1),1],
                    [Date.UTC(2017,9,1),4],
                    [Date.UTC(2017,10,1),3],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r6').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),3],
                    [Date.UTC(2017,2,1),1],
                    [Date.UTC(2017,3,1),5],
                    [Date.UTC(2017,4,1),2],
                    [Date.UTC(2017,5,1),4],
                    [Date.UTC(2017,6,1),3],
                    [Date.UTC(2017,7,1),7],
                    [Date.UTC(2017,8,1),2],
                    [Date.UTC(2017,9,1),1],
                    [Date.UTC(2017,10,1),4],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r7').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),2],
                    [Date.UTC(2017,2,1),2],
                    [Date.UTC(2017,3,1),4],
                    [Date.UTC(2017,4,1),3],
                    [Date.UTC(2017,5,1),5],
                    [Date.UTC(2017,6,1),1],
                    [Date.UTC(2017,7,1),5],
                    [Date.UTC(2017,8,1),7],
                    [Date.UTC(2017,9,1),2],
                    [Date.UTC(2017,10,1),1],
                ]
            }
        ],
        legend:false
    });

    $('#chart_r8').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginLeft:10,
            marginRight:10
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '数量',
                data: [
                    [Date.UTC(2017,1,1),5],
                    [Date.UTC(2017,2,1),2],
                    [Date.UTC(2017,3,1),2],
                    [Date.UTC(2017,4,1),6],
                    [Date.UTC(2017,5,1),1],
                    [Date.UTC(2017,6,1),3],
                    [Date.UTC(2017,7,1),2],
                    [Date.UTC(2017,8,1),7],
                    [Date.UTC(2017,9,1),2],
                    [Date.UTC(2017,10,1),6],
                ]
            }
        ],
        legend:false
    });

    $('#chart_2_1').highcharts({
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            marginBottom:24
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis:
        [
            {
                title : false,
                gridLineWidth:0,
                labels:{
                    enabled:true,
                    format : '{value}万'
                }
            },
            {
                title : false,
                labels:{
                    enabled:true,
                    format: '{value}%'
                },
                opposite: true
            }
        ],
        xAxis:{
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            shared: true,
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            column: {
                borderWidth: 0
            }
        },
        series: [
            {
                name: '当前数值',
                yAxis: 0,
                data: [
                    [Date.UTC(2016),14],
                    [Date.UTC(2017),21],
                    [Date.UTC(2018),29]
                ],
                tooltip: {
                    valueSuffix: '万'
                }
            },
            {
                name: '增长率',
                yAxis: 1,
                data: [
                    [Date.UTC(2016),40],
                    [Date.UTC(2017),32],
                    [Date.UTC(2018),58]
                ],
                tooltip: {
                    valueSuffix: '%'
                }
            }
        ],
        legend:false
    });

    $('#chart_2_2').highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: 'transparent',
            marginBottom:24
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:0,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
            area: {
                pointStart: '2017-6',
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                name: '就业人数',
                data: [
                    [Date.UTC(2017,1,1),1203],
                    [Date.UTC(2017,2,1),1305],
                    [Date.UTC(2017,3,1),1213],
                    [Date.UTC(2017,4,1),2103],
                    [Date.UTC(2017,5,1),1984],
                    [Date.UTC(2017,6,1),3502],
                    [Date.UTC(2017,7,1),2583],
                    [Date.UTC(2017,8,1),3102],
                    [Date.UTC(2017,9,1),2039],
                    [Date.UTC(2017,10,1),2543],
                ]
            }
        ],
        legend:false
    });

    $('#chart_2_3').highcharts({
        chart: {
            backgroundColor: 'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            marginLeft:0,
            marginTop:0,
            marginRight:0,
            marginBottom:0
        },
        title: false,
        credits: {
            enabled: false
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.y}万元， 占比:{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '60%'],
                showInLegend:true
            }
        },
        series: [{
            type: 'pie',
            name: '技术合同成交额',
            innerSize: '60%',
            data: [
                ['2017年技术合同成交额',   5000],
                ['2017年技术合同未成交金额', 800]
            ]
        }],
        legend: {
            layout: 'vertical'
        }
    });

    $('#chart_2_4').highcharts({
        chart: {
            backgroundColor: 'transparent',
            marginBottom:24
        },
        title: false,
        credits: {
            enabled: false
        },
        yAxis: {
            title : false,
            gridLineWidth:1,
            labels:{
                enabled:false
            }
        },
        xAxis: {
            title : false,
            labels:{
                enabled:true
            },
            tickWidth:0,
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        tooltip: {
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        plotOptions: {
        },
        series: [
            {
                name: '企业专利数',
                data: [
                    [Date.UTC(2017,1,1),5],
                    [Date.UTC(2017,2,1),5],
                    [Date.UTC(2017,3,1),12],
                    [Date.UTC(2017,4,1),14],
                    [Date.UTC(2017,5,1),14],
                    [Date.UTC(2017,6,1),16],
                    [Date.UTC(2017,7,1),19],
                    [Date.UTC(2017,8,1),20],
                    [Date.UTC(2017,9,1),21],
                    [Date.UTC(2017,10,1),21],
                ]
            }
        ],
        legend:false
    });

    $('#chart_3_1').highcharts({
        chart: {
            backgroundColor: 'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            marginLeft:5,
            marginTop:5,
            marginRight:5,
            marginBottom:5
        },
        title: false,
        credits: {
            enabled: false
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.y}个， 占比:{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false
                },
                center: ['50%', '50%']
            }
        },
        series: [{
            type: 'pie',
            name: '园区车位状态',
            innerSize: '60%',
            data: [
                ['剩余车位', 286],
                ['已用车位', 214]
            ]
        }]
    });

    $('#chart_3_2').highcharts({
        chart: {
            backgroundColor: 'transparent',
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            marginLeft:0,
            marginTop:0,
            marginRight:0,
            marginBottom:0
        },
        title: false,
        credits: {
            enabled: false
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.y}人， 占比:{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: false,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '60%'],
                showInLegend:true
            }
        },
        series: [{
            type: 'pie',
            name: '园区WIFI使用人数',
            innerSize: '60%',
            data: [
                ['园区WIFI使用人数', 5000],
                ['园区WIFI剩余带宽', 800]
            ]
        }],
        legend: {
            layout: 'vertical',
            itemStyle: {
                "color" : "#999999",
                "fontSize" : "10px"
            }
        }
    });



});
