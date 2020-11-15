
let systems = [];

function setup() {
  let text = createP("화수분아 열려라!");
  let text2 = createP("화수분을 열려면 화면을 클릭하세요");
  text.position(280, 365);
  text2.position(230, 400);

  createCanvas(640, 360);
}

function draw() {
  background(200,20,50);
  for (let i = 0; i < systems.length; i++) {
    systems[i].addParticle();
    systems[i].run();
  }
}

function mousePressed() {
  systems.push(new ParticleSystem(1, createVector(mouseX, mouseY)));
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

// A simple Particle class

class Particle {
  constructor(position) {
    this.acceleration = createVector(-0.5, 0.1);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255.0;
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }
  
// 이부분을 수정하니까 원과 사각형이 함께 나온다.
  // Method to display
  display() {
    stroke(100, this.lifespan);
    strokeWeight(0.3);
    fill(300,200,50, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
    push(); 
    translate(this.position.x, this.position.y);
    var theta = map(this.position.x, 0, width, 0, TWO_PI * 2);
    rotate(theta);
    rect(0, 0, 12, 12);
    pop();
    
  }
  
  display2(){
    rectMode(CENTER);
    fill(255, this.lifespan);
    stroke(255, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    var theta = map(this.position.x, 0, width, 0, TWO_PI * 2);
    rotate(theta);
    rect(0, 0, 12, 12);
    pop();
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

class ParticleSystem {
  constructor(num, position) {
    this.origin = position.copy();
    this.particles = [];
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.origin));
    }
  }

  addParticle() {
    this.particles.push(new Particle(this.origin));
  }

  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());

  }
}

