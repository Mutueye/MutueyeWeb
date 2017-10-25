$(document).ready(function(){
    
    $('#edu_history_table').bootstrapTable({
        pagination : false,
        showPaginationSwitch : false,
        columns: [ 
            {
                field: 'time_start',
                title: '起始时间',
                align: 'center',
                halign: 'center'
            },
            {
                field: 'time_end',
                title: '截止时间',
                align: 'center',
                halign: 'center'
            },
            {
                field: 'school',
                title: '学校名称',
                halign: 'center'
            }, 
            {
                field: 'major',
                title: '主修课程内容',
                halign: 'center'
            }, 
            {
                field: 'achieve',
                title: '学习成果或获取证书',
                halign: 'center'
            }
        ],
        data: [
            {
                time_start : '2001-09-01',
                time_end : '2005-06-30',
                school : '山东财经大学',
                major : '金融管理',
                achieve : '一等奖学金'
            }
        ]
    });
    
    $('#work_history_table').bootstrapTable({
        pagination : false,
        showPaginationSwitch : false,
        columns: [ 
            {
                field: 'time_start',
                title: '起始时间',
                align: 'center',
                halign: 'center'
            },
            {
                field: 'time_end',
                title: '截止时间',
                align: 'center',
                halign: 'center'
            },
            {
                field: 'name',
                title: '单位名称',
                halign: 'center'
            }, 
            {
                field: 'post',
                title: '部门及职务',
                halign: 'center'
            }, 
            {
                field: 'intro',
                title: '工作内容简介',
                halign: 'center'
            }, 
            {
                field: 'contact',
                title: '证明人及联系方式',
                halign: 'center'
            }
        ],
        data: [
            {
                time_start : '2001-09-01',
                time_end : '2005-06-30',
                name : '链家房产',
                post : '财务部 会计',
                intro : '财务工作',
                contact : '王思远 13812345678'
            }
        ]
    });
    
    $('#family_members_table').bootstrapTable({
        pagination : false,
        showPaginationSwitch : false,
        columns: [ 
            {
                field: 'name',
                title: '姓名',
                halign: 'center'
            },
            {
                field: 'relationship',
                title: '与本人关系',
                halign: 'center'
            },
            {
                field: 'phone',
                title: '联系电话',
                halign: 'center'
            }, 
            {
                field: 'address',
                title: '联系地址',
                halign: 'center'
            }, 
            {
                field: 'unit',
                title: '工作单位',
                halign: 'center'
            }
        ],
        data: [
            {
                name : '王庆隆',
                relationship : '父亲',
                phone : '13812345678',
                address : '山东青岛市北重庆南路153号10#203',
                unit : '青岛现代福日SSSS店'
            }
        ]
    });
    
    $('#em_contace_table').bootstrapTable({
        pagination : false,
        showPaginationSwitch : false,
        columns: [ 
            {
                field: 'name',
                title: '姓名',
                halign: 'center'
            },
            {
                field: 'relationship',
                title: '与本人关系',
                halign: 'center'
            },
            {
                field: 'phone',
                title: '联系电话',
                halign: 'center'
            }, 
            {
                field: 'address',
                title: '联系地址',
                halign: 'center'
            }, 
            {
                field: 'unit',
                title: '工作单位',
                halign: 'center'
            }
        ],
        data: [
            {
                name : '孙福立',
                relationship : '好友',
                phone : '13812345678',
                address : '山东青岛市北重庆南路153号10#203',
                unit : '青岛现代福日SSSS店'
            }
        ]
    });
    
});