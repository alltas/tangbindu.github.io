function fireflygroup(canvas,context,config){
  this.particleCount = 30;
  this.canvas = canvas;
  this.context = context;
  this.canvasWidth = this.canvas.clientWidth;
  this.canvasHeight = this.canvas.clientHeight;
  this.particles = [];
  this.deg=0;
  this.init=(function(){
    this.canvas.width=this.canvasWidth;
    this.canvas.height=this.canvasHeight;
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
        size : (Math.random() * 2 + 0.5),
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
      if(this.deg%6==1 && p.size>window.devicePixelRatio*1.6){
        p.loopdir= p.opacity>=1 ? -1 : p.loopdir;
        p.loopdir= p.opacity<=.4 ? 1 : p.loopdir;
        p.opacity+=.1*p.loopdir;
        p.opacity=p.opacity>1? 1: p.opacity;
        p.opacity=p.opacity<0? 0: p.opacity;
      }
      this.context.fillStyle = "rgba(34,234,255,"+p.opacity+")";
      this.context.beginPath();
      //this.context.shadowBlur=10*p.size/window.devicePixelRatio;
      this.context.shadowColor= "rgba(255,234,255,"+p.opacity+")";
      this.context.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, false);
      this.context.closePath();
      this.context.fill();
    }
  }
};





function star(canvas,context){
  this.canvas = canvas;
  this.ctx = context;
  this.canvasWidth = this.canvas.clientWidth;
  this.canvasHeight = this.canvas.clientHeight;
  this.maxstarnum = 40;
  this.fly_size_range = [.5, 1.2];
  this.fly_lifespan_range = [ 50, 200];
  this.flies = [];
  this.init=(function(){
    this.canvas.width=this.canvasWidth;
    this.canvas.height=this.canvasHeight;
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
    this.x = options.x || self.randomRange(0, self.canvas.width);
    this.y = options.y || self.randomRange(0, self.canvas.width);
    this.size = options.size || self.randomRange(self.fly_size_range[0], self.fly_size_range[1]);
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
var frame=0;
requestAnimFrame(function(){
  if(frame++%2==0){   
    ffg.context.clearRect(0, 0, ffg.canvasWidth, ffg.canvasHeight);
    st.render();
    ffg.draw();
  }
  requestAnimFrame(arguments.callee);
});















