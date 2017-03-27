window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

// Big thanks to http://stackoverflow.com/a/19775485/6697001 for this amazing solution!
window.countFPS = (function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;
  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    } 
    lastLoop = currentLoop;
    return fps;
  };
}());

function random(min,max){
  return Math.floor(Math.random()*max-min+1,min);
}
var SNOW_AMOUNT = 10;
var SNOWFLAKES = [];
var MAX_RADIUS = 15;
var myCanvas = document.createElement('canvas');
myCanvas.id = "snow";
myCanvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
myCanvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
myCanvas.style.cssText = "top:0;display:block;position:fixed;z-index:999;"
//document.body.appendChild(myCanvas);
p_game.appendChild(myCanvas)
var ctx = myCanvas.getContext('2d');

var SNOWFLAKE = function(){
this.x = random(1,myCanvas.width),
this.y = 2,
this.radius = random(1,MAX_RADIUS)/10,
this.speed = random(1,22),
  this.update = function(){
  this.y+=this.radius+random(0,1);
  this.x+=this.speed/10*random(-1,1);
  },
  this.check = function(){
  this.y = this.y >=myCanvas.height ? 1 : this.y;
  this.x = this.x >=myCanvas.width ? 1 : this.x;
  if(this.y>=myCanvas.height || this.x>=myCanvas.width){this.radius=random(1,MAX_RADIUS)/5;console.log('x');}
  }
};

ctx.fillStyle = "rgba(255,255,255,1)";
// ANIMATION HAPPEN HERE
function animation(){
  requestAnimationFrame(animation);
  ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
  // Add 1 snowflake per frame to smooth effect
  if(SNOWFLAKES.length<=SNOW_AMOUNT){SNOWFLAKES.push(new SNOWFLAKE);}
  for(var i=1;i<=SNOWFLAKES.length-1;i++){
    SNOWFLAKES[i].check();
    ctx.beginPath();
    ctx.arc(SNOWFLAKES[i].x,SNOWFLAKES[i].y,SNOWFLAKES[i].radius,0,2*Math.PI);
    SNOWFLAKES[i].update();
    ctx.fill();
  }
}

// Init
//animation();


