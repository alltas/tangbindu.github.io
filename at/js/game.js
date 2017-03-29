//沙漏计时器
var TimeHourglass={
  timeNode:timeHourglass,//沙漏进度
  intervalTimer:true,
  playTime:null,
  allTime:null,
  game:null,
  status:false,
  timeLapse:function(){
    var self=this;
    //定时器
    this.intervalTimer=setInterval(function(){
      if(self.status){
        self.playTime-=120;
        if(self.playTime<0){
          //挑战成功0，正常死亡1，被奥特曼杀死2
          this.Game.gameoverStatus=1;
          console.log("沙漏死亡")
          self.game.trigger("over");
          sound.playGameOver();
          self.status=false;
          return;
        }
        self.timeNode.style["-webkit-transform"]="scale3d("+self.playTime/self.allTime+",1,1)";
      }
    },120)
  },
  //添加时间
  addTime:function(){
    this.playTime+=150;
    this.playTime=this.playTime>this.allTime ? this.allTime : this.playTime;
  },
  reset:function(){
    this.timeNode.style["-webkit-transform"]="scale3d("+.5+",1,1)";
    this.playTime=this.allTime*.5;
    this.timeNode.style["-webkit-transform"]="scale3d("+this.playTime/this.allTime+",1,1)";
  },
  pause:function(){
    this.status=false;
  },
  start:function(){
    this.status=true;
  },
  init:function(playTime,game){
    this.allTime=playTime;
    this.playTime=playTime*.5;
    this.game=game;
    this.timeLapse()
  }
}



function bombFrame(obj){
  //帧动画
  function FrameAnimation(param){
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
  FrameAnimation.prototype={
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
      //console.dir(this.frameAnimationGroups)
      if(this.frameAnimationGroups.length==2){
        this.ctx.globalAlpha=.95;
      }else if(this.frameAnimationGroups.length==3){
        this.ctx.globalAlpha=.9;
      }else if(this.frameAnimationGroups.length==4){
        this.ctx.globalAlpha=.85;
      }else if(this.frameAnimationGroups.length==5){
        this.ctx.globalAlpha=.8;
      }else{
        this.ctx.globalAlpha=1;
      }
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
    }
  }
  //返回一个操作柄
  var canvas=document.getElementById("tower_break_canvas");
  canvas.width=600;
  canvas.height=350;
  var ctx=canvas.getContext("2d");
  var img=new Image();
  img.src="../img/game/bombframes.png";
  img.onload=function(){
    var bombFrameAnima=new FrameAnimation({
      "img":img,
      "ctx":ctx,
      "framesNum":5,
    })
    obj.bombFrameAnima=bombFrameAnima;
  }
}

//宝塔对象
var Tower={
  Game:null,
  monsterName:null,
  judgeCurrentFloor:0,
  attack:null,//攻击方向
  isIOS:false,
  viewprogress:document.getElementById("viewprogress"),
  map:{
    "Boy_Gomola":[
      //地图,层类型，礼物类型，奥特曼类型 F(层)G(礼物)U(奥特曼)number(类型)number(方向，1左边，2右)
      {F:1},{F:2},{F:1,U:1},{F:2},{F:1,U:2},{F:2},{F:1,G:1},{F:2,U:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1,G:1},{F:2},{F:1,G:2},{F:2,U:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,G:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2,U:2},{F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1,U:2},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:3}
    ],
    "Boy_DaDa":[
      //地图,层类型，礼物类型，奥特曼类型 F(层)G(礼物)U(奥特曼)number(类型)number(方向，1左边，2右)
      {F:1},{F:2},{F:1,G:1},{F:2},{F:1},{F:2},{F:1,G:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1,G:1},{F:2},{F:1,G:2},{F:2,U:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,G:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:3}
    ],
    "Boy_NewAlienBaltan":[
      //地图,层类型，礼物类型，奥特曼类型 F(层)G(礼物)U(奥特曼)number(类型)number(方向，1左边，2右)
      {F:1},{F:2,G:2},{F:1,G:1},{F:2},{F:1},{F:2},{F:1,G:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1,G:1},{F:2},{F:1,G:2},{F:2,U:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,G:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2,U:1},{F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,U:2},{F:2},{F:1},{F:2,U:1},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,U:1},{F:2},{F:1},{F:2,U:1},{F:1},{F:3}
    ],
    "Boy_Miklas":[
      //地图,层类型，礼物类型，奥特曼类型 F(层)G(礼物)U(奥特曼)number(类型)number(方向，1左边，2右)
      {F:1},{F:2,U:1},{F:1},{F:2},{F:1},{F:2},{F:1,G:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1,G:1},{F:2},{F:1,G:2},{F:2,U:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1,G:2},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},
      {F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:2},{F:1},{F:3}
    ]
  },
  floors:function(){
    return tower.querySelectorAll("li")
  },
  floorLength:tower.querySelectorAll("li").length,
  firstFloor:function(){
    return tower.querySelectorAll("li")[tower.querySelectorAll("li").length-1]
  },
  lastFloor:function(){
    return tower.querySelectorAll("li")[0]
  },
  floorHeight:parseInt(getComputedStyle(tower.querySelectorAll("li")[0]).marginBottom)+tower.querySelectorAll("li")[0].clientHeight,
  towerBottom:parseInt(getComputedStyle(tower).bottom),
  currentFloorNum:0,
  //烟雾效果
  bombFrameAnima:null,
  //刷新一层
  refreshFloor:function(floor,floorInfo){
    floorInfo=floorInfo || {};
    var floorType=floorInfo.F;
    var floorGiftType=floorInfo.G;
    var floorUltramanType=floorInfo.U;
    //楼层类型
    switch(floorType){
      case 1:
        floor.setAttribute("type","1");
        break;
      case 2:
        floor.setAttribute("type","2");
        break;
      case 3:
        floor.setAttribute("type","3");
        break;
      case 4:
        floor.setAttribute("type","4");
        break;
      case 5:
        floor.setAttribute("type","5");
        break;
      default:
        floor.setAttribute("type","");
        break;
    }
    //礼物位置
    switch(floorGiftType){
      case 1:
        floor.getElementsByClassName("G")[0].setAttribute("direction","l");
        break;
      case 2:
        floor.getElementsByClassName("G")[0].setAttribute("direction","r");
        break;
      default:
        floor.getElementsByClassName("G")[0].setAttribute("direction","");
    }
    //奥特曼位置
    switch(floorUltramanType){
      case 1:
        floor.getElementsByClassName("U")[0].setAttribute("direction","l");
        break;
      case 2:
        floor.getElementsByClassName("U")[0].setAttribute("direction","r");
        break;
      default:
        floor.getElementsByClassName("U")[0].setAttribute("direction","");
    }
  },
  //初始化楼层
  initFloors:function(){
    for(var i=0;i<this.floorLength;i++){
      this.refreshFloor(this.floors()[this.floorLength-i-1],this.map[this.monsterName][i])
      this.currentFloorNum++;
    };
  },
  judgeCollision:function(){
    //console.dir(this.firstFloor());
    // //判断
    // //F(层)G(礼物)U(奥特曼)number(类型)number(方向，1左边，2右)
    if(this.map[this.monsterName].length<=(this.judgeCurrentFloor+1)){
      console.log("挑战成功")
      this.Game.gameoverStatus=0;
      this.Game.trigger("over");
      return false;
    }
    var curFloorInfo=this.map[this.monsterName][this.judgeCurrentFloor];
    //console.dir(curFloorInfo.G)
    if(curFloorInfo.G){
      if((curFloorInfo.G==1 && this.attack=="left") || (curFloorInfo.G==2 && this.attack=="right")){
        var gift=$(this.firstFloor()).find(".G");
        if(gift.attr("direction")){ 
          this.Game.gift++;
          sound.playGift();
          //刷新礼物
          $(".gift span").text("x"+this.Game.gift);
          gift.attr("direction","");
        }
      }
    }

    if(curFloorInfo.U){
      if((curFloorInfo.U==1 && this.attack=="left") || (curFloorInfo.U==2 && this.attack=="right")){
        var U=$(this.firstFloor()).find(".U");
        if(U.attr("direction")){ 
          //挑战成功0，正常死亡1，被奥特曼杀死2
          console.log("被杀死")
          this.Game.gameoverStatus=2;
          this.Game.trigger("over")
          console.dir(sound)
          sound.playGameOver();
          U.attr("direction","");
        }
      }
    }else{
      TimeHourglass.addTime()
    }

    // }else{
    //   //console.log("增加时间")
    //   //成功拆塔，增加时间
    //   TimeHourglass.addTime()
    // }
  },
  //下一层
  nextFloor:function(){
    //碰撞判断
    this.judgeCollision();
    //隐藏第一层，移到最后一层
    tower.insertBefore(this.firstFloor(),this.lastFloor());
    //更新一层
    this.currentFloorNum++;
    this.refreshFloor(this.lastFloor(),this.map[this.monsterName][this.currentFloorNum-1]);
    //移动宝塔
    // if(this.isIOS){
    //   tower.style.bottom=this.towerBottom+this.floorHeight+"px";
    //   tower.style.transition="transform 0.05s ease-in";
    //   tower.style.transform="translate3D(0,"+this.floorHeight+"px,0) rotateZ(0deg)";
    // }
    //摧毁宝塔
    this.destroyFooor();
    this.judgeCurrentFloor++;
    this.Game.progress=(this.judgeCurrentFloor+1)/this.map[this.monsterName].length;
    this.Game.progress=this.Game.progress>1 ? 1 : this.Game.progress;
    //显示数字
    this.viewprogress.innerHTML=(this.Game.progress*100).toFixed(0)+"<span>%</span>";
    //碰撞判断
    this.judgeCollision();
    tower.style.transformOrigin="center bottom"
  },
  //摧毁楼层
  destroyFooor:function(){
    //烟雾特效
    this.bombFrameAnima && this.bombFrameAnima.play();
  },
  reset:function(monsterName){
    this.monsterName=monsterName;
    this.currentFloorNum=0;
    this.judgeCurrentFloor=0;
    //初始化楼层
    this.initFloors(monsterName);
  },
  //初始化
  init:function(Game){
    this.Game=Game;
    this.isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //动画监听
    tower.addEventListener("webkitTransitionEnd",function(){
      tower.style.transition="";
      tower.style.transform="translate3D(0,0,0) rotateX(0deg)";
      tower.style.bottom=Tower.towerBottom+"px";
    })
    //烟雾特效
    bombFrame(this);
    return this;
  }
};

var sound={
  attack_sound1:document.getElementById("attack_sound1"),
  attack_sound2:document.getElementById("attack_sound2"),
  attack_sound3:document.getElementById("attack_sound3"),
  attack_sound4:document.getElementById("attack_sound4"),
  gift:document.getElementById("gift"),
  gameover:document.getElementById("gameover"),
  index:1,
  timmer:null,
  play:function(){
    var self=this;
    this.index= this.index>4? 1 :this.index;
    //播放
    this["attack_sound"+this.index].currentTime = 0;
    this["attack_sound"+this.index].play();
    this.index++;
    this.timmer && clearTimeout(this.timmer);
    this.timmer=setTimeout(function(){
      self.index=1;
    },400)
  },
  playGift:function(){
    this.gift.currentTime = 0;
    this.gift.play();
  },
  playGameOver:function(){
    this.gameover.currentTime = 0;
    this.gameover.play();
  }
}

//怪兽对象(基础与骨骼动画)
function Monster(option){
  var self=this;
  option=option || {};
  this.monster=null;
  this.position={};//站位
  this.direction="right";
  //骨骼动画资源
  this.name=option.name;
  //骨骼动画舞台
  this.stage=option.stage;
  this.init=(function(){
    var self=this;
    this.position.right={
      x:self.stage.clientWidth*devicePixelRatio*.8,
      y:self.stage.clientWidth*devicePixelRatio*.24
    }
    this.position.left={
      x:self.stage.clientWidth*devicePixelRatio*.2,
      y:self.stage.clientWidth*devicePixelRatio*.24
    }
    this.monster=new SpinePlus(this.stage,{
      atlas:"../img/bone-skin/"+this.name+"/"+this.name+".atlas",
      json:"../img/bone-skin/"+this.name+"/"+this.name+".json",
      png:"../img/bone-skin/"+this.name+"/"+this.name+".png",
      scale:this.stage.clientWidth*devicePixelRatio*0.2/280
    });
    //初始化站立在左边
    this.monster.handler("ready",function(){
      self.trigger("ready");
      self.stand("right");
    });
    this.monster.handler("animationEnd",function(){
      //console.log("")
      //self.stand(self.direction);
    })
    //站位，计算位置
    //var pos=this.position("left");
    //初始化骨骼动画
  }).call(this);
};
Monster.prototype={
  //左边攻击，右边攻击
  attack:function(direction){
    var self=this;
    this.direction=direction;
    this.monster._skeleton.flipX= this.direction=="left" ? true :false;
    this.monster._animationState.clearTracks();
    this.monster._animationState.addAnimation(0,"attack",false); 
    this.monster.renderAnimation(this.monster._skeleton,this.position[this.direction]);
    setTimeout(function(){
      sound.play();
      Tower.nextFloor();
    },200)
    return this;
  },
  //死亡
  die:function(direction){
    this.direction=direction;
    this.monster._skeleton.flipX= this.direction=="left" ? true :false;
    this.monster._animationState.clearTracks();
    this.monster._animationState.addAnimation(0,"die",false); 
    this.monster.renderAnimation(this.monster._skeleton,this.position[this.direction]);
    return this;
  },
  stand:function(direction){
    this.direction=direction;
    this.monster._skeleton.flipX= this.direction=="left" ? true :false;
    this.monster._animationState.clearTracks();
    this.monster._animationState.addAnimation(0,"standby",false); 
    this.monster.renderAnimation(this.monster._skeleton,this.position[this.direction]);
    return this;
  }
};



/**
 * handler 事件机制
 * @method handler
 * @return  {context}
 * @param   {string} 自定义事件名称
 * @param   {function} 自定义事件
 */
Monster.prototype.handler=function(type, handler) {
    //添加事件对象
    if (typeof this.handlers == "undefined") { this.handlers = {} }
    if (typeof this.handlers[type] == 'undefined') {
        this.handlers[type] = new Array();
    }
    this.handlers[type] = this.handlers[type].concat(handler);
},
/**
 * trigger 触发事件
 * @method trigger
 * @return  {context}
 * @param   {string} 事件名称
 */
Monster.prototype.trigger=function(type) {
    if (typeof this.handlers == "undefined") { this.handlers = {} }
    if (this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type];
        for (var i = 0, len = handlers.length; i < len; i++) {
            handlers[i].call(this, this);
        }
    }
}





//交互
var interactive={
  standLeft:standLeft,
  standRight:standRight,
  monster:null,
  monsterEvent:function(){
    var self=this;
    //上线改tap
    this.standLeft.addEventListener("touchstart",function(){
      TimeHourglass.start();
      self.monster && self.monster.attack("left");
      Tower.attack="left"
    })
    this.standRight.addEventListener("touchstart",function(){
      TimeHourglass.start();
      self.monster && self.monster.attack("right");
      Tower.attack="right"
    })
    return this;
  }
}





//游戏对象
Game={
  monsterName:null,
  monsterTime:{
    "Boy_Gomola":20000,
    "Boy_NewAlienBaltan":30000,
    "Boy_Miklas":20000,
    "Boy_DaDa":20000,
  },
  gameoverStatus:1,
  //怪兽
  monster:null,
  //宝塔
  tower:null,
  //交互
  interactive:null,
  //沙漏
  TimeHourglass:TimeHourglass,
  //怪兽舞台
  monsterStage:document.getElementById("monsterStage"),
  //沙漏时间
  hourglassTime:null,
  //礼物数量
  gift:0,
  //游戏进度
  progress:0,
  //复活次数倒计
  renewCount:2,
  //怪兽站位方向
  direction:"left",
  //初始化游戏
  init:function(){
    //初始化宝塔（事件）
    this.tower=Tower.init(this);
    //初始化交互（就一个交互）
    this.interactive=interactive.monsterEvent();
    return this;
  },
  //重置游戏
  reset:function(){
    this.gift=0;
    this.progress=0;
  },
  //复活
  renew:function(){
    //复活，碰到伤害才复活，否则结束
    this.TimeHourglass.start();
    this.renewCount--;
    //去除当前层的
    //$(Tower.firstFloor()).find(".U").attr("direction","");
  },
  replay:function(){
    this.reset();
    this.tower.reset(this.monsterName);
    this.renewCount=0;
    this.TimeHourglass.reset();
  },
  //开始(怪兽)
  play:function(monsterName){
    this.monsterName=monsterName;
    //根据怪兽设置地图
    this.tower.reset(this.monsterName);
    //重制game
    this.reset();
    //初始化shalou
    this.TimeHourglass.init(this.monsterTime[monsterName],this);
    var self=this;
    //初始化怪兽角色
    this.monster=new Monster({name:this.monsterName,stage:this.monsterStage});
    this.monster.handler("ready",function(){
      self.interactive.monster=self.monster;
      self.hourglassTime=self.monsterTime[monsterName];
      self.TimeHourglass.reset();
    })
  },
  handler:function(type, handler) {
    //添加事件对象
    if (typeof this.handlers == "undefined") { this.handlers = {} }
    if (typeof this.handlers[type] == 'undefined') {
        this.handlers[type] = new Array();
    }
    this.handlers[type] = this.handlers[type].concat(handler);
  },
  trigger:function(type) {
    if (typeof this.handlers == "undefined") { this.handlers = {} }
    if (this.handlers[type] instanceof Array) {
      var handlers = this.handlers[type];
      for (var i = 0, len = handlers.length; i < len; i++) {
          handlers[i].call(this, this);
      }
    }
  }
};
Game.handler("over",function(){
  TimeHourglass.pause();
})



//----------------------
Game.init();






//   Game.play("Boy_Miklas");
// setTimeout(function(){
//     Game.play("Boy_NewAlienBaltan");
// },15000)




Game.play("Boy_Gomola");
// setTimeout(function(){
//   Game.play("Boy_DaDa");
// },5000)
// setTimeout(function(){
//   Game.play("Boy_Miklas");
// },10000)
// setTimeout(function(){
//   Game.play("Boy_NewAlienBaltan");
// },15000)



Game.handler("over",function(){
  console.log("gameover")
  //console.dir(Game);
  $(".dialog_a").removeClass("hide");
})




$(".d_zwyc").bind("touchstart",function(){
  $(".dialog").addClass("hide");
  Game.replay();
})
$(".game-guide").bind("touchstart",function(){
  $(this).remove();
})

$(".role-loading").bind("touchstart",function(){
  $(this).remove();
})



