var ratio=window.devicePixelRatio>1.5 ? 1.5 : window.devicePixelRatio;
//萤火虫
function fireflygroup(canvas,context,config){
  this.particleCount = 30;
  this.canvas = canvas;
  this.context = context;
  this.canvasWidth=this.canvas.width=this.canvas.clientWidth*ratio;
  this.canvasHeight=this.canvas.height=this.canvas.clientHeight*ratio;
  this.particles = [];
  this.deg=0;
  this.init=(function(){
    this.addParticles();
  }).call(this)
}
fireflygroup.prototype = {
  getRandomVector:function(){
    var angle = Math.random() * Math.PI * 2;
    return this.getDirectionVector(angle);
  },
  getDirectionVector(angle) {
    return {
      "x": Math.cos(angle),
      "y": Math.sin(angle)
    };
  },
  distance(x1,y1, x2,y2){
    return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
  },
  getVectorTowards(from, to){
    var angle = Math.atan2(from.y - to.y, from.x - to.x);
    return this.getDirectionVector(angle - Math.PI);
  },
  addParticles:function(){
    for(var i = 0; i < this.particleCount; i++){
      var startX = Math.random() * this.canvasWidth;
      var startY = Math.random() * this.canvasWidth*.2;
      startX+=this.canvasWidth*0;
      startY+=this.canvasWidth;
      this.particles.push({
        position : {
          x: startX,
          y: startY
        },
        opacity:Math.random(),
        loopdir:1,
        homePosition : {
          x: startX,
          y: startY 
        },
        velocity: {
          x: 0, y: 0
        },
        wanderRadius: Math.random() * 300 + 100,
        size : (Math.random() * 2 + 0.5)*ratio,
        color : "rgba(34,234,255,"+Math.random()+")",
        direction: Math.random() * Math.PI
      });
    }
  },
  update:function(){
    for(var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      p.direction += (Math.random() * 2 - 1) * 0.1;
      var steeringVector = this.getDirectionVector(p.direction);
      p.velocity.x += steeringVector.x * 0.1;
      p.velocity.y += steeringVector.y * 0.1;
      var dist = this.distance(
        p.position.x, 
        p.position.y, 
        p.homePosition.x, 
        p.homePosition.y
      );
      if(dist > 0) {
        var steerToHome = this.getVectorTowards(p.position, p.homePosition);
        dist = Math.min(p.wanderRadius, dist);
        dist = (dist / p.wanderRadius);
        p.velocity.x += steerToHome.x * dist * 0.4;
        p.velocity.y += steerToHome.y * dist * 0.4;
      }
      p.velocity.x *= .84;
      p.velocity.y *= .84;
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;
    }
  },
  draw:function(){
    this.update();
    this.deg++;
    for(var i = 0; i < this.particles.length; i++) {
      var p = this.particles[i];
      if(this.deg%6==1 && p.size>ratio*1.6){
        p.loopdir= p.opacity>=1 ? -1 : p.loopdir;
        p.loopdir= p.opacity<=.4 ? 1 : p.loopdir;
        p.opacity+=.1*p.loopdir;
        p.opacity=p.opacity>1? 1: p.opacity;
        p.opacity=p.opacity<0? 0: p.opacity;
      }
      this.context.fillStyle = "rgba(34,234,255,"+p.opacity+")";
      this.context.beginPath();
      //this.context.shadowBlur=10*p.size/ratio;
      this.context.shadowColor= "rgba(255,234,255,"+p.opacity+")";
      this.context.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, false);
      this.context.closePath();
      this.context.fill();
    }
  }
};
//星星
function star(canvas,context){
  this.canvas = canvas;
  this.ctx = context;
  this.canvasWidth=this.canvas.width=this.canvas.clientWidth*ratio;
  this.canvasHeight=this.canvas.height=this.canvas.clientHeight*ratio;
  this.maxstarnum = 40;
  this.fly_size_range = [.5, 1.6];
  this.fly_lifespan_range = [ 50, 200];
  this.flies = [];
  this.init=(function(){
    this.render();
  }).call(this)
}
star.prototype={
  randomRange:function(min, max) {
    return Math.random() * (max - min) + min;
  },
  Fly:function(options,obj) {
    var self=obj;
    if (!options) {
      options = {};
    }
    this.x = options.x || self.randomRange(0, self.canvasWidth);
    this.y = options.y || self.randomRange(0, self.canvasWidth);
    this.size = (options.size || self.randomRange(self.fly_size_range[0], self.fly_size_range[1]))*ratio;
    this.lifeSpan = options.lifeSpan || self.randomRange(self.fly_lifespan_range[0], self.fly_lifespan_range[1]);
    this.age = 0;
    this.alpha = 0;
  },
  clearScreen:function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  createFlies:function() {
    if (this.flies.length !== this.maxstarnum) {
      this.flies.push(new this.Fly({},this));
    }
  },
  moveFlies:function() {
    var a=0;
    this.flies.forEach(function(fly) {
      fly.age++;
      if (fly.age < fly.lifeSpan / 2) {
        fly.alpha += 1 / (fly.lifeSpan / 2);
        fly.alpha=fly.alpha>.2 ? .2 :fly.alpha;
      }else {
        if(a++%5==0){
          fly.alpha -= 1 / (fly.lifeSpan / 2);
          fly.alpha=fly.alpha<0 ? 0 : fly.alpha;
        }
      }
    });

  },
  removeFlies:function() {
    var i = this.flies.length;
    while (i--) {
      var fly = this.flies[i];
      if (fly.age >= fly.lifeSpan) {
        fly.age=0;
      }
    }
  },
  drawFlies:function() {
    self=this;
    this.flies.forEach(function(fly){
      self.ctx.beginPath();
      self.ctx.fillStyle = 'rgba(100, 255, 253, ' + fly.alpha + ')';
      self.ctx.arc(
        fly.x,
        fly.y,
        fly.size,
        0,
        Math.PI * 2,
        false
      );
      self.ctx.closePath();
      self.ctx.fill();
    });
  },
  render:function() {
    //this.clearScreen();
    this.createFlies();
    this.moveFlies();
    this.removeFlies();
    this.drawFlies();
  }
}

//流星
function MeteorGroup(cvs,ctx){
  this.canvas = cvs;
  this.context = ctx;
  this.canvasWidth=this.canvas.width=this.canvas.clientWidth*ratio;
  this.canvasHeight=this.canvas.height=this.canvas.clientHeight*ratio;
  this.meteorsNum=1;
  //流星栈
  this.meteors=[];
  this.init=(function(){ 
    this.make();
    var self=this;
    setInterval(function(){
      self.GC();
    },3000)
  }).call(this);
}
MeteorGroup.prototype={
  make:function(){
    for(var i=0;i<this.meteorsNum;i++){
      this.meteors.push(
        new this.Meteor(
          this.context,
          this.canvasWidth,
          this.canvasHeight
        )
      )
    };
  },
  Meteor:function(ctx,canvasWidth,canvasHeight) {
    this.ctx=ctx;
    this.x = canvasWidth*Math.random()+20*ratio;
    this.y = 0;
    this.vx = -(4 + Math.random() * 10);
    this.vy = -this.vx*2/3;
    this.lifeSpan=Math.random()*10+40;
    this.age=0;
    this.opacity=1;
    this.len = Math.random() * 100+40;
  },
  //回收
  GC:function(){
    var i = this.meteors.length;
    while (i--) {
      var meteor = this.meteors[i];
      if (meteor.age >= meteor.lifeSpan) {
        meteor.age=0;
        meteor.x=this.canvasWidth*Math.random()+80;
        meteor.y = 0;
        meteor.vx = -(4 + Math.random() * 10)*ratio;
        meteor.vy = -meteor.vx*2/3;
        meteor.len = (Math.random() * 100+40)*ratio;
        meteor.opacity=1;
      }
    }
  },
  drawMeteorGoup:function(){
    for(var i=0;i<this.meteors.length;i++){
      this.meteors[i].y=this.meteors[i].y+this.meteors[i].vy;
      this.meteors[i].x=this.meteors[i].x+this.meteors[i].vx;
      this.draw.call(this.meteors[i]);
    }
  },
  //绘制流星
  draw:function() {
    //径向渐变，从流星头尾圆心，半径越大，透明度越高
    gra = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.len);
    this.age++;
    this.opacity -= 1/this.lifeSpan;
    gra.addColorStop(0, 'rgba(100, 255, 253,'+this.opacity+')')
    gra.addColorStop(1, 'rgba(255,255,255,0)')
    this.ctx.save()
    this.ctx.fillStyle = gra
    this.ctx.beginPath()
    //流星头，二分之一圆
    this.ctx.arc(this.x, this.y, 1*ratio, Math.PI / 6, 5 * Math.PI/ 6)
    //绘制流星尾，三角形
    this.ctx.lineTo(this.x + this.len, this.y - this.len*2/3)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  }
} 


window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(callback, element){
            return window.setTimeout(callback, 1000 / 30);
        };
})();
var starcanvas=document.getElementById("starcanvas");
var starcanvas_ctx=starcanvas.getContext("2d");
var st=new star(starcanvas,starcanvas_ctx);
var ffg=new fireflygroup(starcanvas,starcanvas_ctx);
var mg=new MeteorGroup(starcanvas,starcanvas_ctx);
var frame=0;
requestAnimFrame(function(){
  if(frame++%2==0){   
    ffg.context.clearRect(0, 0, ffg.canvasWidth, ffg.canvasHeight);
    st.render();
    ffg.draw();
    mg.drawMeteorGoup();
  }
  requestAnimFrame(arguments.callee);
});















