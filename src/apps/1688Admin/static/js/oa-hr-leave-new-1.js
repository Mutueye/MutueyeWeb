$(document).ready(function(){

    var $workdate = $('#workdate');
    var $startDate = $('#startdate');
    var $endDate = $('#enddate');
    var $leaveDays = $('#leave_days');

    //可选时间从8:30到17:30
    //矛盾：每天按8小时? 从8:30到17:30是9个小时，所以有可能得出时间差为例如5天8小时12分这种情况。
    //程序中没有固定每天8小时的相关计算，天数通过日期的差计算，剩余的小时分钟的计算只与开始时间8:30和结束时间17:30有关。
    //所以，下边计算请假时间的方法cacuTime()，根据实际业务需求调整
    var minHour = 8;
    var minMinute = 30;
    var maxHour = 17;
    var maxMinute = 30;

    //剩余请假时间，此处假定为8天1小时30分
    var remainDays = 8;
    var remainHours = 1;
    var remainMinutes = 30;

    //根据剩余请假时间，创建moment的duration时间段对象
    var remainDuration = moment.duration({
        days : remainDays,
        hours : remainHours,
        minutes : remainMinutes
    });

    window.commonTools.setDateTimeInput($workdate);

    //起始日期,
    $startDate.datetimepicker({
        viewMode: 'days',
        format: 'YYYY-MM-DD HH:mm',
        allowInputToggle: true,
        minDate: moment().add(1,'days').format('YYYY-MM-DD'), //今天及之前时间不可选
        maxDate: moment().format(moment().format('YYYY') + '-12-31'),//最大不出今年12月31日
        useCurrent: false
    });
    //截止日期
    $endDate.datetimepicker({
        viewMode: 'days',
        format: 'YYYY-MM-DD HH:mm',
        allowInputToggle: true,
        minDate: moment().add(1,'days').format('YYYY-MM-DD'), //今天及之前时间不可选
        maxDate: moment().format(moment().format('YYYY') + '-12-31'),
        useCurrent: false
    });

    $startDate.on('dp.change',function(e) {
        $endDate.data("DateTimePicker").minDate(e.date);

        var hour = parseInt(moment(e.date).format('HH'));
        var minute = parseInt(moment(e.date).format('mm'));
        var needReset = false; //是否需要调整时间，如果选择的时间小于最早时间(8:30)或者大于(17:30),为true
        if(hour < minHour) {
            hour = minHour;
            minute = minMinute;
            needReset = true;
        } else if (hour == minHour && minute < minMinute) {
            minute = minMinute;
            needReset = true;
        } else if(hour > maxHour) {
            hour = maxHour;
            minute = maxMinute;
            needReset = true;
        } else if(hour == maxHour && minute > maxMinute) {
            minute = maxMinute;
            needReset = true;
        }


        var startTime = moment(e.date).format('YYYY-MM-DD HH:mm');

        //自动调整时间到上班和下班时间之间
        if(needReset) {

            startTime = moment(moment(e.date).format('YYYY-MM-DD')).add(hour,'hours').add(minute,'minutes')
            $startDate.data('DateTimePicker').date(startTime);
            //toastr.success('已自动调整时间到工作时间范围：' + minHour + ':' + minMinute + '到' + maxHour + ':' + maxMinute + '之间');
            return; //如果自动调整时间，后续逻辑不再执行直接返回，因为修改了时间，马上会再次触发change事件，再执行后续逻辑，以免连续执行两次。
        }

        var endTime = $endDate.data('DateTimePicker').date();
        if(endTime != null) {
            var totalDuration = cacuTime(startTime, endTime);
            //如果选择的时间差大于剩余休假时间，调整结束日期到刚好填满剩余休假时间
            if(totalDuration.subtract(remainDuration).as('minutes') > 0) {
                endTime = moment(startTime).add(remainDuration).format('YYYY-MM-DD HH:mm'); //开始时间+剩余休假时间段
                //alert(endTime);
                //alert(moment(endTime).get('hour'));
                var endHour = parseInt(moment(endTime).get('hour'));
                var endMinute = parseInt(moment(endTime).get('minute'));
                var currentClock = moment.duration({
                    hours : endHour,
                    minutes : endMinute
                });
                var minClock = moment.duration({
                    minutes : minMinute,
                    hours : minHour
                });
                var maxClock = moment.duration({
                    minutes : maxMinute,
                    hours : maxHour
                });

                if(endHour > maxHour || (endHour == maxHour && endMinute > maxMinute)) {
                    //如果结束时间晚于17:30，新的结束时间再+1天，并且计算从8:30开始多出来的小时分钟数

                    var tempClock = currentClock.subtract(maxClock);
                    var finalClock = minClock.add(tempClock);

                    endTime = moment(moment(endTime).format('YYYY-MM-DD')).add(finalClock).format('YYYY-MM-DD HH:mm');
                    endTime = moment(endTime).add(1,'days').format('YYYY-MM-DD HH:mm');
                    //alert(endTime);
                } else if(endHour < minHour || (endHour == minHour && endMinute < minMinute)) {
                    //如果结束时间比8:30早，从上一天17:30开始到结束的这段时间，调整到从今天8:30开始
                    var tempClock = moment.duration({
                        days : 1,
                        hours : endHour,
                        minutes : endMinute
                    });
                    var finalClock = tempClock.subtract(tempClock);
                    endTime = moment(moment(endTime).format('YYYY-MM-DD')).add(finalClock).format('YYYY-MM-DD HH:mm');
                }

                $endDate.data('DateTimePicker').date(endTime);
                toastr.success('选择的时间段不能超过剩余休假时间，已自动更改结束时间');
            }
            //再次计算时间差
            totalDuration = cacuTime(startTime, endTime);
            //显示休假时间
            showLeaveTime(totalDuration);
        }

    });

    $endDate.on('dp.change',function(e) {
        $startDate.data("DateTimePicker").maxDate(e.date);

        var hour = parseInt(moment(e.date).format('HH'));
        var minute = parseInt(moment(e.date).format('mm'));
        var needReset = false; //是否需要调整时间，如果选择的时间小于最早时间(8:30)或者大于(17:30),为true
        //console.log(hour + ':' + minute);
        if(hour < minHour) {
            hour = minHour;
            minute = minMinute;
            needReset = true;
        } else if (hour == minHour && minute < minMinute) {
            minute = minMinute;
            needReset = true;
        } else if(hour > maxHour) {
            hour = maxHour;
            minute = maxMinute;
            needReset = true;
        } else if(hour == maxHour && minute > maxMinute) {
            minute = maxMinute;
            needReset = true;
        }

        var endTime = moment(e.date).format('YYYY-MM-DD HH:mm');

        //自动调整时间到上班和下班时间之间
        if(needReset) {
            endTime = moment(moment(e.date).format('YYYY-MM-DD')).add(hour,'hours').add(minute,'minutes')
            $endDate.data('DateTimePicker').date(moment(moment(e.date).format('YYYY-MM-DD')).add(hour,'hours').add(minute,'minutes'));
            return; //如果自动调整时间，后续逻辑不再执行直接返回，因为修改了时间，马上会再次触发change事件，再执行后续逻辑，以免连续执行两次。
        }

        var startTime = $startDate.data('DateTimePicker').date();
        if(startTime != null) {
            var totalDuration = cacuTime(startTime, endTime);
            //如果选择的时间差大于剩余休假时间，调整开始日期到刚好填满剩余休假时间
            if(totalDuration.subtract(remainDuration).as('minutes') > 0) {
                startTime = moment(endTime).subtract(remainDuration).format('YYYY-MM-DD HH:mm'); //结束时间-剩余休假时间段=新的开始时间
                var startHour = parseInt(moment(startTime).get('hour'));
                var startMinute = parseInt(moment(startTime).get('minute'));

                var currentClock = moment.duration({
                    hours : startHour,
                    minutes : startMinute
                });
                var minClock = moment.duration({
                    minutes : minMinute,
                    hours : minHour
                });
                var maxClock = moment.duration({
                    minutes : maxMinute,
                    hours : maxHour
                });


                if(startHour < minHour || (startHour == minHour && startMinute < minMinute)) {
                    //如果开始时间早于8:30，新的开始时间再-1天，早于8:30的这段时间，调整到新的开始时间到17:30这段时间

                    var tempClock = minClock.subtract(currentClock);
                    var finalClock = maxClock.subtract(tempClock);

                    startTime = moment(moment(startTime).format('YYYY-MM-DD')).add(finalClock).format('YYYY-MM-DD HH:mm');
                    startTime = moment(startTime).subtract(1,'days').format('YYYY-MM-DD HH:mm');
                } else if(startHour > maxHour || (startHour == maxHour && startMinute > maxMinute)) {
                    //如果开始时间晚于17:30,则从开始时间到凌晨0点0分的这段时间，调整到新开始时间到17:30这段时间。
                    var tempClock = moment.duration(1,'days');
                    tempClock.subtract(currentClock);
                    var finalClock = maxClock.subtract(tempClock);
                    startTime = moment(moment(startTime).format('YYYY-MM-DD')).add(finalClock).format('YYYY-MM-DD HH:mm');
                }

                $startDate.data('DateTimePicker').date(startTime);
                toastr.success('选择的时间段不能超过剩余休假时间，已自动更改开始时间');

            }
            //再次计算时间差
            totalDuration = cacuTime(startTime, endTime);
            //显示休假时间
            showLeaveTime(totalDuration);
        }

    });

    //计算开始时间到结束时间的时间差
    function cacuTime(startTime, endTime) {

        //先计算日期上的天数差，不足一天的时间再根据8:30和17:30，分情况计算剩余小时和分钟时间差
        var days = moment(endTime).diff(startTime,'days');

        var totalDuration = moment.duration(days, 'days');

        var startHour = parseInt(moment(startTime).format('HH'));
        var startMinute = parseInt(moment(startTime).format('mm'));
        var endHour = parseInt(moment(endTime).format('HH'));
        var endMinute = parseInt(moment(endTime).format('mm'));

        //将开始&结束&最大&最小的小时分钟时间，转换为moment的duration时间段方便计算
        var startClock = moment.duration({
            minutes : startMinute,
            hours : startHour
        });

        var endClock = moment.duration({
            minutes : endMinute,
            hours : endHour
        });

        var minClock = moment.duration({
            minutes : minMinute,
            hours : minHour
        });

        var maxClock = moment.duration({
            minutes : maxMinute,
            hours : maxHour
        });



        if(parseInt(days) > 0) {
            //如果结束时间的小时分钟数小于开始时间的小时分钟数，则计算除天数外的剩余时间为：
            //开始时间的小时分钟到17:30的长度 + 8:30到结束时间的小时分钟的长度
            if(endHour < startHour || ( endHour == startHour && endMinute < startMinute)) {
                var startDuration = maxClock.subtract(startClock);
                var endDuration = endClock.subtract(minClock);
                totalDuration.add(startDuration.add(endDuration));
            } else {
                //如果开始时间刚好8:30，结束时间刚好17:30,那么这就是1天了，时间段再加1天
                if(endHour == maxHour && endMinute == maxMinute && startHour == minHour && startMinute == minMinute) {
                    totalDuration.add(moment.duration(1,'days'));
                } else {
                    totalDuration.add(endClock.subtract(startClock));
                }
            }
        } else {
            //如果开始时间刚好8:30，结束时间刚好17:30,那么这就是1天了，时间段再加1天
            //console.log(startHour + ':' + startMinute + ' - ' + endHour + ':' + endMinute);
            if(endHour == maxHour && endMinute == maxMinute && startHour == minHour && startMinute == minMinute) {
                totalDuration = moment.duration(1,'days');
            } else {
                totalDuration = endClock.subtract(startClock);
            }

        }
        //alert(totalDuration.get('days') + '天' + totalDuration.get('hours') + '小时' + totalDuration.get('minutes') + '分');
        //console.log(startHour + ':' + startMinute + ' - ' + endHour + ':' + endMinute);
        //返回moment的duration时间段对象
        return totalDuration;

    }

    //将本次休假时间的duration对象转换为字符串显示在表单中
    function showLeaveTime(totalDuration) {
        var dayString = totalDuration.get('days') + '天';
        var hourString = totalDuration.get('hours') + '小时' ;
        var minuteString = totalDuration.get('minutes') + '分';
        //alert(totalDuration.get('days'));
        $leaveDays.html(dayString + hourString + minuteString);
    }



    $('#btn_submit').click(function(){

        window.location.href='oa-hr-leave.html';

    });

    $('#btn_save').click(function(){

        toastr.success('内容已保存');

    });

});
