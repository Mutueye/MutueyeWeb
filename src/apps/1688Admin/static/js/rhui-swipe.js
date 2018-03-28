/**
* @author accountwcx@qq.com
* http://git.oschina.net/accountwcx/rhui
*
* swipe事件，包括swipeLeft、swipeRight、swipeUp、swipeDown。
* 调用方法
* Rhui.mobile.swipeLeft(el, callback, options)
* Rhui.mobile.swipeRight(el, callback, options)
* Rhui.mobile.swipeUp(el, callback, options)
* Rhui.mobile.swipeDown(el, callback, options)
* 如果使用jQuery，调用方法
* $(el).rhuiSwipe('swipeLeft', callback, options);
* $(el).rhuiSwipe('swipeRight', callback, options);
* $(el).rhuiSwipe('swipeUp', callback, options);
* $(el).rhuiSwipe('swipeDown', callback, options);
*/
(function(window, $){
    var Rhui = window.Rhui || {};
    window.Rhui = Rhui;
    Rhui.mobile = (function(){
        var touch = {
            distance: 30,  //滑动距离，超过该距离触发swipe事件，单位像素。
            duration: 1000 //滑动时长，超过该时间不触发swipe，单位毫秒。
        };

        /**
        * 绑定事件
        * @param  el        触发事件的元素
        * @param  swipe     事件名称，可选值为swipeLeft,swipeRight,swipeUp,swipeDown
        * @param  callback  事件回调函数
        * @param  isStopPropagation   是否停止冒泡，true为停止冒泡
        * @param  isPreventDefault    是否阻止默认事件，true为阻止默认事件
        * @param  triggerOnMove       swipe事件有两种触发方式，一种是在touchmove过程中，只要满足滑动距离条件即触发。
        *                             一种是在touchend中，进入滑动距离判断，如果满足滑动距离触发。
        *                             默认是在touchend中触发。
        */
        function bindSwipe(el, swipe, callback, triggerOnMove, isStopPropagation, isPreventDefault){
            var startPoint, endPoint, timer;

            /**
            * 计算滑动方向
            * 首先根据x方向和y方向滑动的长度决定触发x方向还是y方向的事件。
            * 然后再判断具体的滑动方向。
            * 如果滑动距离不够长，不判断方向。
            */
            function swipeDirection(x1, y1, x2, y2){
                var diffX = x1 - x2,
                    diffY = y1 - y2,
                    absX = Math.abs(diffX),
                    absY = Math.abs(diffY),
                    swipe;

                if(absX >= absY){
                    if(absX >= touch.distance){
                        swipe = diffX > 0 ? 'swipeLeft' : 'swipeRight';
                    }
                }else{
                    if(absY >= touch.distance){
                        swipe = diffY > 0 ? 'swipeUp' : 'swipeDown';
                    }
                }

                return swipe;
            }

            // 清除本次滑动数据
            function clearSwipe(){
                startPoint = undefined;
                endPoint = undefined;

                if(timer !== undefined){
                    clearTimeout(timer);
                    timer = undefined;
                }
            }

            /**
            * 判断是否符合条件，如果符合条件就执行swipe事件
            * @param  el     {HTMLElement}  元素
            * @param  event  {Event}        Touch原始事件
            * @param  return 如果执行了事件，就返回true。
            */
            function execSwipe(el, event){
                if(startPoint && endPoint && swipeDirection(startPoint.x, startPoint.y, endPoint.x, endPoint.y) === swipe){
                    callback.call(el, event);
                    return true;
                }
            }

            el.addEventListener('touchstart', function(event){
                var self = this, touchPoint = event.touches[0];

                if(isStopPropagation){
                    event.stopPropagation();
                }

                if(isPreventDefault){
                    event.preventDefault();
                }

                startPoint = {
                    x: Math.floor(touchPoint.clientX),
                    y: Math.floor(touchPoint.clientY)
                };

                timer = setTimeout(function(){
                    //如果超时，清空本次touch数据
                    clearSwipe();
                }, touch.duration);
            });

            el.addEventListener('touchmove', function(event){
                var self = this, touchPoint = event.touches[0];

                if(isStopPropagation){
                    event.stopPropagation();
                }

                if(isPreventDefault){
                    event.preventDefault();
                }

                if(startPoint){
                    endPoint = {
                        x: Math.floor(touchPoint.clientX),
                        y: Math.floor(touchPoint.clientY)
                    };

                    //执行swipe事件判断，是否符合触发事件
                    if(triggerOnMove){
                        if(execSwipe(self, event)){
                            clearSwipe();
                        }
                    }
                }
            });

            el.addEventListener('touchend', function(event){
                if(isStopPropagation){
                    event.stopPropagation();
                }

                if(isPreventDefault){
                    event.preventDefault();
                }

                execSwipe(self, event);
                //清除本次touch数据
                clearSwipe();
            });
        }

        /**
        * @param  el        {HTMLElement}  HTML元素
        * @param  callback  {Function}     事件回调函数
        * @param  options   {Object}       可选参数
        *                   isStopPropagation  {Boolean}  是否停止冒泡，true为停止冒泡
        *                   isPreventDefault   {Boolean}  是否阻止默认事件，true为阻止默认事件
        *                   triggerOnMove      {Boolean}
        *                                       swipe事件有两种触发方式，一种是在touchmove过程中，只要满足滑动距离条件即触发。
        *                                       一种是在touchend中，进入滑动距离判断，如果满足滑动距离触发。
        *                                       默认值为false，在touchend中触发。
        */
        touch.swipeLeft = function(el, callback, options){
            if(options){
                bindSwipe(el, 'swipeLeft', callback, options.triggerOnMove, options.isStopPropagation, options.isPreventDefault);
            }else{
                bindSwipe(el, 'swipeLeft', callback);
            }

        };

        touch.swipeRight = function(el, callback, options){
            if(options){
                bindSwipe(el, 'swipeRight', callback, options.triggerOnMove, options.isStopPropagation, options.isPreventDefault);
            }else{
                bindSwipe(el, 'swipeRight', callback);
            }
        };

        touch.swipeUp = function(el, callback, options){
            if(options){
                bindSwipe(el, 'swipeUp', callback, options.triggerOnMove, options.isStopPropagation, options.isPreventDefault);
            }else{
                bindSwipe(el, 'swipeUp', callback);
            }
        };

        touch.swipeDown = function(el, callback, options){
            if(options){
                bindSwipe(el, 'swipeDown', callback, options.triggerOnMove, options.isStopPropagation, options.isPreventDefault);
            }else{
                bindSwipe(el, 'swipeDown', callback);
            }
        };

        return touch;
    })();

    // 注册jquery方法
    if($ && $.fn){
        $.fn.extend({
            /**
            * 模拟touch swipe事件，支持链式调用。
            * @param   name      {String}    swipe事件名称，值有swipLeft、swipeRight、swipeUp、swipeDown。
            * @param   callback  {Function}  swipe事件回调函数
            * @param   opts      {Object}    可选参数
            *                                isStopPropagation  {Boolean}  是否停止冒泡，true为停止冒泡
            *                                isPreventDefault   {Boolean}  是否阻止默认事件，true为阻止默认事件
            *                                triggerOnMove      {Boolean}  swipe事件有两种触发方式，一种是在touchmove过程中，只要满足滑动距离条件即触发。
            *                                                              一种是在touchend中，进入滑动距离判断，如果满足滑动距离触发。
            *                                                              默认值为false，在touchend中触发。
            */
            rhuiSwipe: function(name, callback, opts){
                var fnSwipe = Rhui.mobile[name];

                if(this.length > 0 && fnSwipe){
                    this.each(function(){
                        fnSwipe(this, callback, opts);
                    });
                }

                return this;
            }
        });
    }
})(window, $);
