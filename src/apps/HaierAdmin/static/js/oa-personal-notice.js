$(document).ready(function(){
    
    
    
    setTable1Actions();
    setTable2Actions();
    
    //格式化通知标题
    function titleFormatter(value, row, index) {
        var titleText = value.title_text;
        var titleUrl = value.title_url;
        return "<a href='" + titleUrl + "'>" + titleText + "</a>";
    }
    
    function setTable1Actions() {
        var $table1 = $('#table1');
        
        $table1.bootstrapTable({
            pagination : true,
            showPaginationSwitch : false,
            columns: [ 
                {
                    field: 'type',
                    title: '类型',
                    sortable: true,
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
                },
                {
                    field: 'creater',
                    title: '起草人',
                    halign: 'center'
                }, 
                {
                    field: 'dep',
                    title: '起草部门',
                    halign: 'center'
                },
                
            ],
            data: [
                {
                    type: '通知',
                    title: {
                        title_text : '停水通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.06.23',
                    creater: '周吴郑',
                    dep: '企划部'
                    
                }, 
                {
                    type: '公告',
                    title: {
                        title_text : '关于2018年度预算的公告',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.05.04',
                    creater: '苏普',
                    dep: '财务部'
                    
                }, 
                {
                    type: '通知',
                    title: {
                        title_text : '新入园客户交接的通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.07.11',
                    creater: '李晟闻',
                    dep: '人力资源部'
                    
                }, 
                {
                    type: '公告',
                    title: {
                        title_text : '李沧区人力局视察接待',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.02.21',
                    creater: '岳叔华',
                    dep: '商务部'
                }
            ]
        });
    }
    
    function setTable2Actions() {
        var $table2 = $('#table2');
        
        $table2.bootstrapTable({
            pagination : true,
            showPaginationSwitch : false,
            columns: [ 
                {
                    field: 'type',
                    title: '类型',
                    sortable: true,
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
                },
                {
                    field: 'creater',
                    title: '起草人',
                    halign: 'center'
                }, 
                {
                    field: 'dep',
                    title: '起草部门',
                    halign: 'center'
                },
                
            ],
            data: [
                {
                    type: '通知',
                    title: {
                        title_text : '新入园客户交接的通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.07.11',
                    creater: '李晟闻',
                    dep: '人力资源部'
                    
                }, 
                {
                    type: '公告',
                    title: {
                        title_text : '李沧区人力局视察接待',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.02.21',
                    creater: '岳叔华',
                    dep: '商务部'
                    
                },
                {
                    type: '通知',
                    title: {
                        title_text : '停水通知',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.06.23',
                    creater: '周吴郑',
                    dep: '企划部'
                    
                }, 
                {
                    type: '公告',
                    title: {
                        title_text : '关于2018年度预算的公告',
                        title_url : 'oa-personal-notice-view.html'
                    },
                    date: '2017.05.04',
                    creater: '苏普',
                    dep: '财务部'
                    
                }
            ]
        });
    }
    
});