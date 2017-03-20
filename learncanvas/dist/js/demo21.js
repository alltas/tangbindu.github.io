//o21爆炸效果，帧动画升级版
var demo21=function(){
  var ctx=initCanvas(demo21_canvas);
  var img=new Image();
  img.src="../img/bombframes.png";
  img.onload=function(){
    window.fxo21=new FrameXx({
      "img":img,
      "ctx":ctx,
      "framesNum":5,
    })
    //fxo21.play();
  }
  demo21_canvas.addEventListener("click",function(){
    fxo21 && fxo21.play();
  })
}()

//x轴帧动画
function FrameXx(param){
  param=param || {};
  this.img=param.img;//加载完毕的对象
  this.framesNum=param.framesNum;
  this.ctx=param.ctx;
  this.ctxW=param.ctx.canvas.clientWidth*devicePixelRatio;
  this.ctxH=param.ctx.canvas.clientHeight*devicePixelRatio;
  this.x=param.x || 0;
  this.y=param.y || 0;
  this.time=param.time ||70,
  this.imgPixelRatio=param.imgPixelRatio || 2;
  this.frameWidth=null;
  this.frameHeight=null;
  this.status=null;
  this.frameAnimationGroups=[];
  this.timmer=null;
  this.init=(function(){
    this.frameWidth=(this.img.width/this.framesNum)
    this.frameHeight=this.img.height;//帧高
  }).call(this)
}
FrameXx.prototype={
  //插入一个帧动画
  insetOneFramesAnimation:function(){
    var self=this;
    var oneFramesAnimation=[];
    for(var i=0;i<this.framesNum+1;i++){
      oneFramesAnimation.push({
        x:self.frameWidth*i,
        y:0
      })
    }
    this.frameAnimationGroups.unshift(oneFramesAnimation);
  },
  playFrame:function(){
    this.ctx.globalAlpha=.6 ;
    //console.dir(this.frameAnimationGroups)
    this.ctx.clearRect(0,0,this.ctxW,this.ctxH);
    for(var i=0;i<this.frameAnimationGroups.length;i++){

      //播放第一帧
      this.ctx.drawImage(
        this.img,
        this.frameAnimationGroups[i][0].x,
        0,
        this.frameWidth,
        this.frameHeight,
        this.x,
        this.y,
        this.frameWidth,
        this.frameHeight
      );
      //删除第一帧
      this.frameAnimationGroups[i].shift();
    }
    //清理frameAnimationGroups
    for(var i=0;i<this.frameAnimationGroups.length;i++){
      if(this.frameAnimationGroups[i].length==0){
        this.frameAnimationGroups.splice(i,1);
        i--;
      }
    }
  },
  play:function(){
    this.insetOneFramesAnimation();
    var self=this;
    //console.dir(this.timmer)
    if(this.timmer){
      return;
    }
    this.timmer=setInterval(function(){
       self.playFrame();
      if(self.frameAnimationGroups.length==0){
        clearInterval(self.timmer);
        self.timmer=null;
        return;
      }
    },100)
    //console.dir(this.timmer)
    // if(this.timmer){
    //   return false;
    // }
    // if(this.timmer){return}
    // this.timmer=setInterval(function(){
    //   self.ctx.clearRect(0,0,self.ctxW,self.ctxH);
    //   if(self.frameAnimationGroups.length==0){
    //     clearInterval(self.timmer);
    //     return;
    //   }
    //   self.playFrame();
    // },this.time)

    // setTimeout(function(){
    //   clearInterval(self.timmer);
    //   self.timmer=null;
    // },this.time*6)



    // var self=this;
    // self.status="play";
    // var timmer=null;
    // var currentStep=0;
    // timmer=setInterval(function(){
    //   if(currentStep>self.framesNum){
    //     self.status=null;
    //     clearInterval(timmer);
    //     return false;
    //   }
    //   //绘制
    //   self.ctx.clearRect(0,0,self.ctxW,self.ctxH);
    //   self.ctx.drawImage(
    //     self.img,
    //     self.frameWidth*currentStep++,
    //     0,
    //     self.frameWidth,
    //     self.frameHeight,
    //     self.x,
    //     self.y,
    //     self.frameWidth,
    //     self.frameHeight
    //   );
    //   //结束绘制
    // },self.time)
  }
}



