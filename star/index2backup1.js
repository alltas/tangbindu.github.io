function firefly(){
  var particleCount = 100;
  var canvas = document.getElementById("output");
  var canvasWidth = canvas.clientWidth*window.devicePixelRatio;
  var canvasHeight = canvas.clientHeight*window.devicePixelRatio;
  canvas.width=canvasWidth;
  canvas.height=canvasHeight;
  var context = canvas.getContext("2d");
  var particles = [];
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
        size : (Math.random() * 1 + 0.5)*window.devicePixelRatio,
        color : "rgba(34,234,255, 1)",
        direction: Math.random() * Math.PI
      });
    }
  }
  function update() {
    var damping = .9; 
    var steering_randomness = 0.1;
    var steering_force = 0.1;
    var boundary_force = 0.4;
    for(var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.direction += (Math.random() * 2 - 1) * steering_randomness;
      var steeringVector = getDirectionVector(p.direction);
      p.velocity.x += steeringVector.x * steering_force;
      p.velocity.y += steeringVector.y * steering_force;
      var dist = distance(p.position.x, p.position.y, p.homePosition.x, p.homePosition.y);
      if(dist > 0) {
        var steerToHome = getVectorTowards(p.position, p.homePosition);
        dist = Math.min(p.wanderRadius, dist);
        dist = (dist / p.wanderRadius);
        p.velocity.x += steerToHome.x * dist * boundary_force;
        p.velocity.y += steerToHome.y * dist * boundary_force;
      }
      p.velocity.x *= damping;
      p.velocity.y *= damping;
      p.position.x += p.velocity.x;
      p.position.y += p.velocity.y;
    }
  }
  function draw() {
    update();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for(var i = 0; i < particles.length; i++) {
      var p = particles[i];
      context.fillStyle = p.color;
      context.beginPath();
      context.shadowBlur=20;
      context.shadowColor="white";
      context.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, false);
      context.closePath();
      context.fill();
    }
    requestAnimationFrame(draw);
  }
}
addParticles();
requestAnimationFrame(draw);


