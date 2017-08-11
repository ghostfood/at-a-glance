
(function () {
  'use strict';

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
    
  var TWO_PI = Math.PI * 2,
      TO_RADIAN = Math.PI / 180,
      TO_DEGREE = 180 * Math.PI,
      COLORS = [
        '#a90000',
        '#a90093',
        '#008ba9',
        '#00a938',
        '#8ba900',
        '#a99300',
      ],
      canvas = document.getElementById('circles'),
      ctx = canvas.getContext('2d'),
      mainRadius = 75,
      friendRadius = 75,
      depth = 0,
      planets = [],
      lastPlanets = [],
      windowW,
      windowH,
      halfW,
      halfH,
      velocityMid;
  
  
  var init = function () {
    planets = [];
    lastPlanets = [];
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    halfW = windowW >> 1;
    halfH = windowH >> 1;
    canvas.width = windowW;
    canvas.height = windowH;
    
    var parentStar = {velocity: {x: halfW, y: halfH}};
    
    var radius = mainRadius >> 1,
        numPlanets = 4,
        angleStep = (360 / numPlanets) * TO_RADIAN,
        planet;
    
      while (numPlanets--) {
        var velocity = new Vector(halfW, halfH, 250, angleStep * numPlanets);
        planet = new Planet(velocity, radius, 4, 0.004, parentStar, depth);
        planets.push(planet);
      }
    
  };
  
  var createMid = function () {
    ctx.beginPath();
    ctx.arc(halfW, halfH, mainRadius, 0, TWO_PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#808080';
    ctx.stroke();
    ctx.closePath();
  }
  

  function Planet(velocity, radius, numStars, speed, parentStar, depth) {
    this.velocity = velocity;
    this.radius = radius;
    this.numStars = numStars;
    this.speed = speed;
    this.parentStar = parentStar || null;
    this.depth = depth || 0;
    this.stars = [];
      
    if (numStars < 0) {
      return;
    }

    var i = numStars,
        planetRadius = radius * 0.5,
        angleStep = (360 / numStars) * TO_RADIAN,
        angle,
        planet,
        planetVelocity;

    var correction = 0;
    if (this.parentStar !== null) {
      correction -= this.velocity.angle;
    }

    while (i--) {
      angle = angleStep * i;
      if (this.parentStar !== null) {
        angle += this.velocity.angle;
      }

      planetVelocity = new Vector(velocity.x, velocity.y, velocity.length * 0.5, angle);
      planet = new Planet(planetVelocity, planetRadius, numStars-1, speed * 1.5, this, this.depth + 1);
      planets.push(planet);
      this.stars.push(planet);
    }

    if (numStars <= 0) {
      lastPlanets.push(this);
    }
  }
  

  Planet.prototype.update = function () {
    var vel = this.velocity;
    if (this.parentStar !== null) {
      vel.setX(this.parentStar.velocity.x);
      vel.setY(this.parentStar.velocity.y);
    }
   vel.setAngle(vel.getAngle() + this.speed);
  }
   
  
  Planet.prototype.draw = function () {   
    var vel = this.velocity;

    ctx.beginPath();
    ctx.arc(vel.x, vel.y, this.radius, 0, TWO_PI, false);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = COLORS[this.depth];
    ctx.stroke();

    if (this.numStars === 0) {
      ctx.fillStyle = '#f37a0e';
      ctx.fill();
    }


    ctx.closePath();
  }
  
  // https://github.com/bit101/CodingMath/blob/master/episode7/vector.js
  function Vector(sX, sY, length, angle) {
    this.startX = sX;
    this.startY = sY;
    
    this.angle = angle;

    this.setX = function (x) {
      this.startX = x;
    }

    this.setY = function (y) {
      this.startY = y;
    }

    this.setAngle = function (angle) {
      this.angle = angle;
      this.x = this.startX + (Math.cos(this.angle) * this.length);
      this.y = this.startY + (Math.sin(this.angle) * this.length);
    }

    this.getAngle = function () {
      return this.angle;
    }

    this.setLength = function (length) {
      this.length = length;
      this.x = (Math.cos(this.angle) * this.length);
      this.y = (Math.sin(this.angle) * this.length);
    }

    this.getLength = function () {
      return this.length;
    }

    this.getDistanceTo = function (v2) {
      var dx = v2.x - this.x,
          dy = v2.y - this.y;
      
      return Math.sqrt(dx * dx + dy * dy);
    }

    this.setLength(length);
    this.setAngle(angle);
  }


  var drawConnector = function (v1, v2, color) {
    color = color || '#000000';
    ctx.beginPath();
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.3;
    ctx.stroke();
    ctx.closePath();
  }

  
  var loop = function () {
    requestAnimFrame(loop);
    ctx.fillStyle = 'rgba(255,255,255, 0.7)';
    ctx.fillRect(0,0, windowW, windowH);
    ctx.save();

    createMid();

    // connect nearest
    var q, z,
        planetA, planetB,
        distance;

    for (q = 0; q < lastPlanets.length; q++) {
      planetA = lastPlanets[q];

      for (z = 0; z < lastPlanets.length; z++) {
        planetB = lastPlanets[z];
        distance = planetB.velocity.getDistanceTo(planetA.velocity);

        if (distance < friendRadius && planetA !== planetB) {
          drawConnector(planetA.velocity, planetB.velocity, '#FFB800');
        }
      }
    }


    // draw planets
    var i = planets.length,
        planet,
        star;

    while (i--) {
      planet = planets[i];

      if (planet.stars.length > 0) {
        for (q = 0; q < planet.stars.length; q++) {
          star = planet.stars[q];
          drawConnector(planet.velocity, star.velocity, '#cccccc');
        }

      }
      planet.update();
      planet.draw();
    }

    ctx.restore();
  }
  
  window.addEventListener('resize', init, false);
  init();
  loop();
})();