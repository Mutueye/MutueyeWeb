$(document).ready(function(){
    var p_w = 1400; //基准宽度
    var p_h = 915; //基准高度
    var fsize = 100; //字体大小
    var basicFsize = 100; //基准字体大小
    var $platform = $('.platform-screen');
    var $top = $('.top-container');

    //从服务器读取的各位置数字
    var nums = {
        center : 58, //服务企业数
        tl : 32, //第三方服务商
        space : 12, //创业空间
        r1 : 3, //专业培训
        r2 : 9, //交流活动
        r3 : 4, //创业辅导
        r4 : 7 //投融资对接
    }

    //通过改变容器的fontsize，结合em单位自适应窗口
    setFont();
    $(window).resize(function() {
        setFont();
    });
    function setFont(){
        var winWidth = app.getViewCtrl().getWinSize().width;
        var winHeight = app.getViewCtrl().getWinSize().height - $top.height();
        if(winWidth/p_w > winHeight/p_h) {
            fsize = basicFsize*winHeight/p_h;
        } else {
            fsize = basicFsize*winWidth/p_w;
        }
        $platform.css('font-size',fsize + 'px');
    }

    //把读取的个位置数字填充到界面上
    fillNumbers(nums);
    function fillNumbers(nums){
        $('#num_center').html(addZeroOnNum(nums.center,3));
        $('#num_tl').html(addZeroOnNum(nums.tl,3));
        $('#num_space').html(addZeroOnNum(nums.space,2));
        addSpaceBoxes(parseInt(nums.space));
        $('#num_r1').html(addZeroOnNum(nums.r1,3));
        $('#num_r2').html(addZeroOnNum(nums.r2,3));
        $('#num_r3').html(addZeroOnNum(nums.r3,3));
        $('#num_r4').html(addZeroOnNum(nums.r4,3));
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

    //填充创客空间矩形数量
    function addSpaceBoxes(boxnum) {
        for(var i = 1; i<= boxnum; i++) {
            $('#box_' + i).addClass('sel');
        }
    }



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



});
