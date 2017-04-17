var particleCount = 1000;
var canvasWidth = 300;
var canvasHeight = 300;
var particles = [];

var canvas;
var context;
var mousePressed = false;

function getRandomVector() {
  var angle = Math.random() * Math.PI * 2;
  return getDirectionVector(angle);
}

function getDirectionVector(angle) {
  return {
    "x": Math.cos(angle),
    "y": Math.sin(angle)
  };
}

function distance(x1,y1, x2,y2){
  return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
}

function getVectorTowards(from, to){
  var angle = Math.atan2(from.y - to.y, from.x - to.x);
  return getDirectionVector(angle - Math.PI);
}

function addParticles() {
  for(var i = 0; i < particleCount; i++){
    var startX = Math.random() * canvasWidth;
    var startY = Math.random() * canvasHeight;
    var r = Math.floor( startX / canvasWidth * 255);
    var g = Math.floor( startY / canvasHeight * 255);
    particles.push({
      position : {
        x: startX,
        y: startY
      },
      homePosition : {
        x: startX,
        y: startY
      },
      velocity: {
        x: 0, y: 0
      },
      wanderRadius: Math.random() * 500 + 50,
      size : Math.random() * 2 + 0.5,
      color : "rgba(" + r + ", " + g + ", 255, 1)",
      direction: Math.random() * Math.PI
    });
  }
}

function addParticle(x,y) {
  var homeX = x;
  var homeY = y;
  var offset = getRandomVector();
  var offsetDist = Math.random() * 50;
  var startX = x + offset.x * offsetDist;
  var startY = y + offset.y * offsetDist;

  var r = Math.floor( x / canvasWidth * 255);
  var g = Math.floor( y / canvasHeight * 255);
  
  particles.push({
    position : {
      x: startX,
      y: startY
    },
    homePosition : {
      x: homeX,
      y: homeY
    },
    velocity: {
      x: 0, y: 0
    },
    wanderRadius: Math.random() * 500 + 5,
    size : Math.random() * 2 + 0.5,
    color : "rgba(" + r + ", " + g + ", 0, 1)",
    direction: Math.random() * Math.PI*2
  });
}

function update() {
  
  // arbitrary scaling values for behavior.

  var DAMPING = 0.85; // higher numbers == faster velocities
  var steering_randomness = 0.1; // higher numbers == more jumpy motion
  var steering_force = 0.1;
  var boundary_force = 0.4; // how much does the particle get pushed back to the home position
  for(var i = 0; i < particles.length; i++) {
    var p = particles[i];

    
    // randomly steer the direction around
    p.direction += (Math.random() * 2 - 1) * steering_randomness;
    var steeringVector = getDirectionVector(p.direction);

    // add velocity in the current direction.
    p.velocity.x += steeringVector.x * steering_force;
    p.velocity.y += steeringVector.y * steering_force;
    
    var dist = distance(p.position.x, p.position.y, p.homePosition.x, p.homePosition.y);

    // apply a force shoving each particle back toward the "home" position modualated 
    // by the distance from that home point compared to the "wanderRadius" threshold.
    if(dist > 0) {
      var steerToHome = getVectorTowards(p.position, p.homePosition);
      
      dist = Math.min(p.wanderRadius, dist);
      dist = (dist / p.wanderRadius);
      
      p.velocity.x += steerToHome.x * dist * boundary_force;
      p.velocity.y += steerToHome.y * dist * boundary_force;
    }
    
    p.velocity.x *= DAMPING;
    p.velocity.y *= DAMPING;
    
    p.position.x += p.velocity.x;
    p.position.y += p.velocity.y;
  }
  wrapCoordinates();
}

function wrapCoordinates() {
  for(var i = 0; i < particleCount; i++) {
    var p = particles[i];
    if(p.position.x < 0){
      p.position.x += canvasWidth;
    } else if (p.position.x > canvasWidth){
      p.position.x -= canvasWidth;
    }
   
    if(p.position.y < 0){
      p.position.y += canvasHeight;
    } else if (p.position.y > canvasHeight){
      p.position.y -= canvasHeight;
    }
  }
}

function draw() {

  update();
  
  context.fillStyle = "#202020";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  
  for(var i = 0; i < particles.length; i++) {
    var p = particles[i];
    context.fillStyle = p.color;
    context.beginPath();
    context.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    
    
    // draw line from particle to "home" position.
    
    context.strokeStyle = "rgba(255, 255, 255, 0.2)";
    context.beginPath();
    context.moveTo(p.position.x, p.position.y);
    context.lineTo(p.homePosition.x, p.homePosition.y);
    context.stroke();
    
    
        
    // draw "wanderRadius" ring.
    context.strokeStyle = "rgba(255, 0, 0, 0.4)";
    context.beginPath();
    context.arc(p.homePosition.x, p.homePosition.y, p.wanderRadius/2, 0, Math.PI * 2, false);
    context.stroke();
    
  }
  requestAnimationFrame(draw);
}


function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
}

function init() {
  
  canvas = document.getElementById("output");
  
  canvas.addEventListener("mousedown", function(e) {
    mousePressed = true;
  });
  canvas.addEventListener("mouseup", function(e) {
    mousePressed = false;
  });
  
  canvas.addEventListener("mousemove", function(e) {
    if(mousePressed){
      addParticle(e.clientX, e.clientY);
    }
  });
  
  context = canvas.getContext("2d");
  window.addEventListener("resize", resize);
  
  resize();
  
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  
  addParticles();
  requestAnimationFrame(draw);
  
}

init();