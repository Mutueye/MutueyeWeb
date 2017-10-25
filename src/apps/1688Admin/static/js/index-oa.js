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
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-mission.html'"
                },
                {
                    title : "通知/公告",
                    icon_class : "fa fa-bullhorn",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-notice.html'"
                },
                {
                    title : "电子邮件",
                    icon_class : "fa fa-envelope",
                    selected : false,
                    btn_props : "data-toggle='iframelinker' data-link='oa-personal-email.html'"
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
                orgScroll.refresh();
            }, 200);
        } else {
            $('#menu_container').perfectScrollbar('update');
            $('#org_container').perfectScrollbar('update');
        }
    }
    
    //非移动端使用layIM在线聊天插件
    if(!isMobile) {
        if(!/^http(s*):\/\//.test(location.href)){
            alert('请部署到localhost上查看嵌入的在线聊天插件layIM的演示');
        }
        layui.use('layim', function(layim){

            //演示自动回复
            var autoReplay = [
                '您好，我现在有事不在，一会再和您联系。', 
                '你没发错吧？face[微笑] ',
                '洗澡中，请勿打扰，偷窥请购票，个体四十，团体八折，订票电话：一般人我不告诉他！face[哈哈] ',
                '你好，我是主人的美女秘书，有什么事就跟我说吧，等他回来我会转告他的。face[心] face[心] face[心] ',
                'face[威武] face[威武] face[威武] face[威武] ',
                '<（@￣︶￣@）>',
                '你要和我说话？你真的要和我说话？你确定自己想说吗？你一定非说不可吗？那你说吧，这是自动回复。',
                'face[黑线]  你慢慢说，别急……',
                '(*^__^*) face[嘻嘻] ，是贤心吗？'
            ];

            //基础配置
            layim.config({

                //初始化接口
                init: {
                    url: '../data/getList.json'
                    ,data: {}
                }

                //或采用以下方式初始化接口
                /*
                ,init: {
                    mine: {
                        "username": "LayIM体验者" //我的昵称
                        ,"id": "100000123" //我的ID
                        ,"status": "online" //在线状态 online：在线、hide：隐身
                        ,"remark": "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名
                        ,"avatar": "a.jpg" //我的头像
                    }
                    ,friend: []
                    ,group: []
                }
                */


                //查看群员接口
                ,members: {
                    url: '../data/getMembers.json'
                    ,data: {}
                }

                //上传图片接口
                ,uploadImage: {
                    url: '/upload/image' //（返回的数据格式见下文）
                    ,type: '' //默认post
                } 

                //上传文件接口
                ,uploadFile: {
                    url: '/upload/file' //（返回的数据格式见下文）
                    ,type: '' //默认post
                }

                //扩展工具栏
                ,tool: [{
                    alias: 'code'
                    ,title: '代码'
                    ,icon: '&#xe64e;'
                }]

                //,brief: true //是否简约模式（若开启则不显示主面板）

                ,title: '即时通讯' //自定义主面板最小化时的标题
                //,right: '100px' //主面板相对浏览器右侧距离
                //,minRight: '90px' //聊天面板最小化时相对浏览器右侧距离
                ,initSkin: '' //1.jpg-5.jpg 设置初始背景
                //,skin: ['aaa.jpg'] //新增皮肤
                //,isfriend: false //是否开启好友
                //,isgroup: false //是否开启群组
                //,min: true //是否始终最小化主面板，默认false
                ,notice: true //是否开启桌面消息提醒，默认false
                ,voice: false //声音提醒，默认开启，声音文件为：default.wav

                ,msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html' //消息盒子页面地址，若不开启，剔除该项即可
                //,find: layui.cache.dir + 'css/modules/layim/html/find.html' //发现页面地址，若不开启，剔除该项即可
                ,chatLog: layui.cache.dir + 'css/modules/layim/html/chatLog.html' //聊天记录页面地址，若不开启，剔除该项即可

            });

            /*
            layim.chat({
                name: '在线客服-小苍'
                ,type: 'kefu'
                ,avatar: 'http://tva3.sinaimg.cn/crop.0.0.180.180.180/7f5f6861jw1e8qgp5bmzyj2050050aa8.jpg'
                ,id: -1
            });
            layim.chat({
                name: '在线客服-心心'
                ,type: 'kefu'
                ,avatar: 'http://tva1.sinaimg.cn/crop.219.144.555.555.180/0068iARejw8esk724mra6j30rs0rstap.jpg'
                ,id: -2
            });
            layim.setChatMin();*/

            //监听在线状态的切换事件
            layim.on('online', function(data){
                //console.log(data);
            });

            //监听签名修改
            layim.on('sign', function(value){
                //console.log(value);
            });

            //监听自定义工具栏点击，以添加代码为例
            layim.on('tool(code)', function(insert){
                layer.prompt({
                    title: '插入代码'
                    ,formType: 2
                    ,shade: 0
                }, function(text, index){
                    layer.close(index);
                    insert('[pre class=layui-code]' + text + '[/pre]'); //将内容插入到编辑器
                });
            });

            //监听layim建立就绪
            layim.on('ready', function(res){
                //console.log(res.mine);
                layim.msgbox(5); //模拟消息盒子有新消息，实际使用时，一般是动态获得

                //添加好友（如果检测到该socket）
                layim.addList({
                    type: 'group'
                    ,avatar: "http://tva3.sinaimg.cn/crop.64.106.361.361.50/7181dbb3jw8evfbtem8edj20ci0dpq3a.jpg"
                    ,groupname: 'Angular开发'
                    ,id: "12333333"
                    ,members: 0
                });
                layim.addList({
                    type: 'friend'
                    ,avatar: "http://tp2.sinaimg.cn/2386568184/180/40050524279/0"
                    ,username: '冲田杏梨'
                    ,groupid: 2
                    ,id: "1233333312121212"
                    ,remark: "本人冲田杏梨将结束AV女优的工作"
                });

                setTimeout(function(){
                    //接受消息（如果检测到该socket）
                    layim.getMessage({
                        username: "Hi"
                        ,avatar: "http://qzapp.qlogo.cn/qzapp/100280987/56ADC83E78CEC046F8DF2C5D0DD63CDE/100"
                        ,id: "10000111"
                        ,type: "friend"
                        ,content: "临时："+ new Date().getTime()
                    });

                    /*layim.getMessage({
                        username: "贤心"
                        ,avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1"
                        ,id: "100001"
                        ,type: "friend"
                        ,content: "嗨，你好！欢迎体验LayIM。演示标记："+ new Date().getTime()
                    });*/

                }, 3000);
            });

            //监听发送消息
            layim.on('sendMessage', function(data){
                var To = data.to;
                //console.log(data);

                if(To.type === 'friend'){
                    layim.setChatStatus('<span style="color:#FF5722;">对方正在输入。。。</span>');
                }

                //演示自动回复
                setTimeout(function(){
                    var obj = {};
                    if(To.type === 'group'){
                        obj = {
                            username: '模拟群员'+(Math.random()*100|0)
                            ,avatar: layui.cache.dir + 'images/face/'+ (Math.random()*72|0) + '.gif'
                            ,id: To.id
                            ,type: To.type
                            ,content: autoReplay[Math.random()*9|0]
                        }
                    } else {
                        obj = {
                            username: To.name
                            ,avatar: To.avatar
                            ,id: To.id
                            ,type: To.type
                            ,content: autoReplay[Math.random()*9|0]
                        }
                        layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
                    }
                    layim.getMessage(obj);
                }, 1000);
            });

            //监听查看群员
            layim.on('members', function(data){
                //console.log(data);
            });

            //监听聊天窗口的切换
            layim.on('chatChange', function(res){
                var type = res.data.type;
                console.log(res.data.id)
                if(type === 'friend'){
                    //模拟标注好友状态
                    //layim.setChatStatus('<span style="color:#FF5722;">在线</span>');
                } else if(type === 'group'){
                    //模拟系统消息
                    layim.getMessage({
                        system: true
                        ,id: res.data.id
                        ,type: "group"
                        ,content: '模拟群员'+(Math.random()*100|0) + '加入群聊'
                    });
                }
            });
        });
    }
});