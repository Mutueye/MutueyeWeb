$(document).ready(function(){
    
    //日历初始化
    $('#calendar').datetimepicker({
        inline: true,
        showTodayButton: true,
        viewMode: 'days',
        format: 'YYYY-MM-DD'
    });
    
    //获取ip地址所在地的接口,或者http://pv.sohu.com/cityjson?ie=utf-8
    //http://ip.taobao.com/service/getIpInfo.php?ip=123.131.164.229
    
    //省级列表
    //http://flash.weather.com.cn/wmaps/xml/china.xml
    //市级列表山东为例
    //http://flash.weather.com.cn/wmaps/xml/shandong.xml
    
    //获取天气信息
    $.ajax({
        url: 'http://query.yahooapis.com/v1/public/yql',//JSONP跨域访问在线代理API
        dataType: 'jsonp',
        data: {
            //另一个天气接口，xml格式：http://wthrcdn.etouch.cn/WeatherApi?city=北京
            //q: "select * from json where url=\"http://mobile.weather.com.cn/data/forecast/101010100.html\"",
            q: "select * from json where url=\"http://wthrcdn.etouch.cn/weather_mini?citykey=101010100\"",
            format: "json"
        },
        success: function (d) {
            console.log(JSON.stringify(d.query.results));
            //格式说明
            //var format={fa:图片1,fb：图片2,fc:温度1,fd：温度2,fe:风向1,ff：风向2,fg:风力1,fh：风力2,fi:日出日落};  
            //定义天气类型
            //var weatherArr={"00":"晴","01":"多云","02":"阴","03":"阵雨","04":"雷阵雨","05":"雷阵雨伴有冰雹","06":"雨夹雪","07":"小雨","08":"中雨","09":"大雨","10":"暴雨","11":"大暴雨","12":"特大暴雨","13":"阵雪","14":"小雪","15":"中雪","16":"大雪","17":"暴雪","18":"雾","19":"冻雨","20":"沙尘暴","21":"小到中雨","22":"中到大雨","23":"大到暴雨","24":"暴雨到大暴雨","25":"大暴雨到特大暴雨","26":"小到中雪","27":"中到大雪","28":"大到暴雪","29":"浮尘","30":"扬沙","31":"强沙尘暴","53":"霾","99":""};  
            //定义风向数组  
            //var fxArr={"0":"无持续风向","1":"东北风","2":"东风","3":"东南风","4":"南风","5":"西南风","6":"西风","7":"西北风","8":"北风","9":"旋转风"};    
            //定义风力数组  
            //var flArr={"0":"微风","1":"3-4级","2":"4-5级","3":"5-6级","4":"6-7级","5":"7-8级","6":"8-9级","7":"9-10级","8":"10-11级","9":"11-12级"};
        }
    });
});