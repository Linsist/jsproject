/**
 * Created by Linsist on 11/26.
 */

var Util = {

    /*
     IE不支持通过classname获取元素，需要自己写函数
     实现方法：遍历父节点的所有子节点，获取与classname相对应的元素放到一个数组中，返回
     需要注意：1.通过getElementsByTagName("*")来获取子节点可以过滤文本节点
     2.一个元素可能不止一个class，所以可以用classList去获取，className获取的是字符串
     3.需要将作为循环限制条件的属性如length缓存起来，降低耗能，防止属性值变化导致陷入死循环
     4.用push方法向数组添加新元素
     5.使用console.log()方法输出不理解的变量,使用debugger断点调试
     */
    /**
     * tonguodf
     * @param {Node} parentNode
     * @param {string} className
     * @return {Array}
     */
    getElementsByClassName: function (parentNode, className) {

        var List = [];

        var childList = parentNode.getElementsByTagName("*");//这个函数作用对象不能是节点？
        var childLen = childList.length;
        for (var i = 0; i < childLen; i++) {
            var child = childList[i];
            var classLen = child.classList.length;

            for(var j= 0;j < classLen; j++){
                if(child.classList[j] == className){
                    List.push(child);
                }
            }
        }
        return List;
    }
};