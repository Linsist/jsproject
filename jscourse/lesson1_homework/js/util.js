/**
 * Created by wangjiewen on 14-11-27.
 */

var Util = {

    /**
     * 进行缓冲运动的函数
     * @param {Node} obj
     * @param {Object} attrJson
     * @param {function} callback
     */
    animate: function (obj, attrJson, callback) {
        //保存this对象，在setInterval里面会用到
        var self = this;
        //判断如果以前开启过timer,就清除它，不要重复开启
        if (obj.timer) {
            clearInterval(obj.timer);
        }
        obj.timer = setInterval(function () {
            var bStop = true;
            for (var attr in attrJson) {
                //获取现在属性attr的值
                var curValue = 0;
                if (attr == 'opacity') {
                    curValue = self.getStyle(obj, attr) * 100;
                    curValue = (attrJson[attr] - curValue > 0) ? Math.ceil(curValue) : Math.floor(curValue);
                } else {
                    curValue = parseInt(self.getStyle(obj, attr));
                }

                //计算缓冲运动的速度，即每次增加的量，这种方法比价低级
                // 有兴趣可以去看jquery.easing, https://github.com/QuantaCenter/jquery.easing
                var speed = (attrJson[attr] - curValue) / 60;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                var target = curValue + speed;

                //只要有一个属性没有到达目标值，就不能关闭定时器
                if (curValue != attrJson[attr]) {
                    bStop = false;
                    self.setStyle(obj, attr, target);
                }
            }

            //如果停止了，清除timer，并且进行回调
            if (bStop) {
                clearInterval(obj.timer);
                if (callback) {
                    callback();
                }
            }

        }, 10);
    },

    /**
     * 设置style属性
     * @param {Node} obj
     * @param {string} attr
     * @param {int/float} value
     */
    setStyle: function (obj, attr, value) {
        if (attr == 'opacity') {
            obj.style.filter = 'alpha(opacity:' + value + ')';
            obj.style.opacity = value / 1000;
        } else {
            obj.style[attr] = value + 'px';
        }
    },

    /**
     * 获取style属性
     * @param {Node} obj
     * @param {string} attr
     * @returns {int/float}
     */
    getStyle: function (obj, attr) {//能获取任何属性
        //IE
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    },
    /**
     * 将元素插入到指定位置之后
     * @param{Node} newElement
     * @param{Node} targetElement
     */
    insertAfter:function(newElement,targetElement){

        var parent = targetElement.parentNode;
        var childList = parent.getElementsByTagName("div");

        if(childList[childList.length-1] == targetElement){
            parent.after(newElement);
        }
        else{
            parent.insertBefore(newElement,targetElement.nextSibling);
        }
    },

    /**
     *判断元素类型
     * @param{object} o
     * @returns {string}
     */
    getType:function(o) {
        var _t;
        return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString   .call(o).slice(8,-1):_t).toLowerCase();
    },


    /**
     *对象数组深复制，没有真正用过
     * @param{Array} destination
     * @param{Array} source
     * @returns{void}
     */
    extend:function(destination,source) {
        for(var p in source)
        {
            self = this;
            if(self.getType(source[p])=="array"||self.getType(source[p])=="object")
            {
                destination[p]=getType(source[p])=="array"?[]:{};
                arguments.callee(destination[p],source[p]);
            }
            else
            {
                destination[p]=source[p];
            }
        }
    }
};