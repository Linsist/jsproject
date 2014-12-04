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
    direction:-1,//orientation of switching image(方向)

    isRuning:false,//synchronize the animation(同步和阻塞)
    /**
     *
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

        self.container.style.width = self.conWidth + 'px';
        self.container.style.height = self.childList[0].clientHeight + 'px';
        self.container.style.left = 0 + 'px';
        Util.setStyle(self.container,'top',0);

        self.switch();

    },
    switch:function(){
        var self = this;
        var len = self.childList.length;
        self.timer = setInterval(function(){
            if(self.isRuning){
                return;
            }//当在运行时阻塞
            self.isRuning = true;//第一次执行时设置为正在执行
            if(self.curIndex >= len){
                self.curIndex = 0;
                //Util.setStyle(self.container,'left',0);//这里会出现到最后一张时突然跳回第一张需要改进,可以使用循环队列
            }
            var newLeft = self.curIndex *self.navWidth * self.direction;
            var attr = {
                left:newLeft
            };
            Util.animate(self.container,attr,function(){
                self.curIndex ++;
                self.isRuning = false;
            });

        },3000);
    }
};