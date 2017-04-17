function star(canvas,context){
  this.canvas = canvas;
  this.ctx = context;
  this.canvasWidth = this.canvas.clientWidth*window.devicePixelRatio;
  this.canvasHeight = this.canvas.clientHeight*window.devicePixelRatio;
  this.maxstarnum = 100;
  this.fly_size_range = [.5*window.devicePixelRatio, 1*window.devicePixelRatio];
  this.fly_lifespan_range = [100, 300];
  this.flies = [];
  this.init=(function(){
    this.canvas.width=this.canvasWidth;
    this.canvas.height=this.canvasHeight;
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
    this.colors = options.colors || {
      red: 100,
      green: 255,
      blue: 253,
      alpha: 0
    };
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
    this.flies.forEach(function(fly) {
      fly.age++;
      if (fly.age < fly.lifeSpan / 2) {
        fly.colors.alpha += 1 / (fly.lifeSpan / 2);
        if (fly.colors.alpha > .2) {
          fly.colors.alpha = .2;
        }
      }else {
        fly.colors.alpha -= 1 / (fly.lifeSpan / 2);
        if (fly.colors.alpha < 0) {
          fly.colors.alpha = 0;
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
        //this.flies.splice(i, 1);
      }
    }
  },
  drawFlies:function() {
    self=this;
    this.flies.forEach(function(fly){
      self.ctx.beginPath();
      self.ctx.shadowBlur=5*Math.random();
      self.ctx.shadowColor="white";
      self.ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
      self.ctx.arc(
        fly.x,
        fly.y,
        fly.size,
        0,
        Math.PI * 2,
        false
      );
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

var s=new star(document.getElementById("output"),document.getElementById("output").getContext("2d"));


(function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  s.render();
})();




