$(document).ready(function(){

    //流程数据示例
    var proc_data = [
        {
            name : '财务审批', //节点名称
            type : '上级协调', //节点类型
            action : '审批' //任务行为
        },
        {
            name : '部门经理审批', //节点名称
            type : '上级协调', //节点类型
            action : '审批', //任务行为
            examiner : { //负责人
                name : '章点非（总经理）',
                dep : '行政部'
            } 
        }
    ];
    
    /* ==================================================================================
     * procBuilder.js
     * 流程管理流程图的构建&控制
     * 依赖 jquery.min.js, underscore-min.js, toastr.min.js, BSModal.js, common.js
     * json数据格式参考上面的示例，
     * 具体开发时请根据后台提供数据和前端业务逻辑，对json格式和procBuilder.js代码进行调整
     * ================================================================================== */
    var processBuilder = new procBuilder($('#proc_container'), proc_data, {}, 'view');

});