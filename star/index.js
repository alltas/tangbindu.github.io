'use strict';

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

var maxstarnum = 30;
var fly_x_speed_range = [-.5, .5];
var fly_y_speed_range = [-0.25, 0.25];
var fly_size_range = [.5, 2];
var fly_lifespan_range = [1000, 1200];
var flies = [];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function Fly(options) {
  if (!options) {
    options = {};
  }
  this.x = options.x || randomRange(0, canvas.width);
  this.y = options.y || randomRange(0, canvas.height);
  this.xSpeed = options.xSpeed || randomRange(fly_x_speed_range[0], fly_x_speed_range[1]);
  this.ySpeed = options.ySpeed || randomRange(fly_y_speed_range[0], fly_y_speed_range[1]);
  this.size = options.size || randomRange(fly_size_range[0], fly_size_range[1]);
  this.lifeSpan = options.lifeSpan || randomRange(fly_lifespan_range[0], fly_lifespan_range[1]);
  this.age = 0;
  this.colors = options.colors || {
    red: 100,
    green: 255,
    blue: 253,
    alpha: 0
  };
}

function clearScreen() {
  ctx.beginPath();
  //ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.clear();
  //ctx.fill();
}

function createFlies() {
  if (flies.length !== maxstarnum) {
    flies.push(new Fly());
  }
}

function moveFlies() {
  flies.forEach(function(fly) {
    fly.x += fly.xSpeed;
    fly.y += fly.ySpeed;
    fly.age++;
    if (fly.age < fly.lifeSpan / 2) {
      fly.colors.alpha += 1 / (fly.lifeSpan / 2);
      if (fly.colors.alpha > 1) {
        fly.colors.alpha = 1;
      }
    }else {
      fly.colors.alpha -= 1 / (fly.lifeSpan / 2);
      if (fly.colors.alpha < 0) {
        fly.colors.alpha = 0;
      }
    }
  });
}

function removeFlies() {
  var i = flies.length;
  while (i--) {
    var fly = flies[i];
    if (fly.age >= fly.lifeSpan) {
      flies.splice(i, 1);
    }
  }
}

function drawFlies() {
  flies.forEach(function(fly){
    ctx.beginPath();
    ctx.shadowBlur=5*Math.random();
    ctx.shadowColor="white";
    ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
    ctx.arc(
      fly.x,
      fly.y,
      fly.size,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  });
}

function render() {
  clearScreen();
  createFlies();
  moveFlies();
  removeFlies();
  drawFlies();
}

function fitToScreen(element) {
  element.width = window.innerWidth;
  element.height = window.innerHeight;
}

window.addEventListener('resize', function() {
  fitToScreen(canvas);
});

document.querySelector('body').appendChild(canvas);
fitToScreen(canvas);

(function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  render();
})();




