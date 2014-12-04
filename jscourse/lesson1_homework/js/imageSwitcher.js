/**
 * Created by Linsist on 11/27.
 */

/**
 *
 */
var ImageSwitcher = {
    //先把需要使用到的元素定义一个变量
    container:null,
    childList:[],
    //定时器控制变量
    //timer:null,

    conWidth:0,
    navWidth:0,

    curIndex:0,
    curNum:0,
    direction:-1,//orientation of switching image(方向)
    isRuning:false,//synchronize the animation(同步和阻塞)


    /**
     *图片切换初始化和切换执行调用
     */
    init:function(){
        var self = this;//要访问外部对象时使用self去访问
        self.container = document.getElementById('banner');
        self.childList = self.container.children;
        var len = self.childList.length;
        for(var i = 0;i< len;i++){
            var div = self.childList[i];
            self.conWidth += div.clientWidth;
        }
        self.navWidth = self.childList[0].clientWidth;
        //先设置图片绝对定位，再初始化图片位置
        for(var k = 0;k < len;k++){
            Util.setStyle(self.childList[k],'left',k*800);
        }
        self.container.style.width = self.conWidth + 'px';
        self.container.style.height = self.childList[0].clientHeight + 'px';
        self.container.style.left = 0 + 'px';
        Util.setStyle(self.container,'top',0);

        self.startSwitch();

    },
    /**
     * 图片切换具体过程，调用缓冲运动函数并设置回调函数
     *
     * 解决最后一张图片之后跳回第一张图片的问题
     */
    startSwitch:function(){
        var self = this;
        var len = self.childList.length;
        self.timer = setInterval(function(){
            if(self.isRuning){
                return;
            }//当在运行时阻塞
            self.isRuning = true;//第一次执行时设置为正在执行
            if(self.curNum >= len){
                console.log(self.curNum);
                self.curNum = 1;
                //方法二：当当前图片为最后一张时，将前面的图片插入到最后一张图片后面构造一个循环队列,同时注意设置图片位置
                for(var j = 0;j < len-1;j++){
                    var curLeft = self.childList[0].offsetLeft;
                    Util.setStyle(self.childList[0],'left',curLeft += 4000);
                    self.container.appendChild(self.childList[0]);
                    //debugger
                }
            }
            var newLeft = self.curIndex * self.navWidth * self.direction;
            var attr = {
                left:newLeft
            };
            Util.animate(self.container,attr,function(){
                self.curIndex++;//控制banner不断向右移动
                self.curNum++;//计数器，当值为len-1时，移动节点并移动图片位置,初始值为0，以后每次置为1
                self.isRuning = false;
            });
        },3000);
    }

};