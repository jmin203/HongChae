function make2DArray(rows, cols) {
  var arr = new Array(rows); //like arr[]; but with number of columns hardcoded
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

let angle = 0;
let w = 110;
let cols;
let rows;
let curves;

let particle;

let k = 5/8;
let slider;
let I = 2/7;
let slider2;

function setup() {
   createCanvas(1500, 1500);
   slider = createSlider(1,10,4,0.1);
   slider2 = createSlider(1,10,4,0.1);
  
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  curves = make2DArray(rows,cols);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
    }
  }

 //applyForce(gravity);를 없애 버림, 중력 = CreateVector라고 할당하던 것을 바로 적용시킴
  particle1 = new Particle(createVector(0,0.1));
  particle2 = new Particle(createVector(0.01,0.02));
  particle3 = new Particle(createVector(0.1,0.2));

}
 

function draw() {
  k = slider.value()
  I = slider2.value()
  // background(200);
  
  particle1.update();
  particle1.show();
  particle1.bounce();
  
  particle2.update();
  particle2.show();
  particle2.bounce();
  
  particle3.update();
  particle3.show();
  particle3.bounce();
  
  // 0번째 
  translate(width/2,height/2);
  beginShape();
  stroke(0,0,0,60);
  noFill();
  strokeWeight(3);
  
  //1번째 녀석
  for (var a = 0; a<TWO_PI * 9; a+= 0.2){
    var r = 200 * cos(k*a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x,y);
  }
  endShape(CLOSE);
  
  beginShape();
  stroke(255,255,255,0);
  noFill();
  strokeWeight(1);
  
  //2번째 녀석
  for (var a = 0; a<TWO_PI * 3; a+= 0.2){
    var r = 300 * cos(I*a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x,y);
  }
  endShape(CLOSE);
  
  translate(width/2,height/2);
  beginShape();
  stroke(0,0,0,30);
  noFill();
  strokeWeight(1);
  
  for (var a = 0; a<TWO_PI * 9; a+= 0.2){
    var r = 150 * cos(k*a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x,y);
  }
  endShape(CLOSE);
  
  
 
  // 원이 그려지는 모양
  let d = w - 40 * w;
  let r1 = d / 2;

  noFill();
  stroke(100);
  for (let i = 0; i < cols; i++) {
    let cx = w + i * w + w / 2;
    let cy = w / 2;
    strokeWeight(2);
    stroke(100);
    ellipse(cx, cy, d, d);
    let x = r * cos(angle * (i + 0.5) - HALF_PI);
    let y = r * sin(angle * (i + 0.5) - HALF_PI);
    strokeWeight(0);
    stroke(100);
    point(cx + x, cy + y);
    stroke(100);
    strokeWeight(0);
    line(cx + x, 0, cx + x, height);

    for (let j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
    }
  }

  noFill();
  stroke(100);
  for (let j = 0; j < rows; j++) {
    let cx = w / 2;
    let cy = w + j * w + w / 2;
    strokeWeight(0);
    stroke(0);
    ellipse(cx, cy, d, d);
    let x = r * cos(angle * (j + 1) - HALF_PI);
    let y = r * sin(angle * (j + 1) - HALF_PI);
    strokeWeight(25);
    stroke(random(0,255));
    point(cx + x, cy + y);
    stroke(255);
    strokeWeight(0);
    line(0, cy + y, width, cy + y);

  
    for (let i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show();
    }
  }


  angle -= 0.02;

  if (angle < -TWO_PI) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].reset();
      }
    }
    // saveFrame("lissajous#####.png");
    angle = 0;
  }
}

class Particle {
  constructor(speed) {
    this.pos = createVector(random(0,400));
    this.vel = createVector(0,0.2);
    this.acc = createVector(0.2);
    this.d = 15;
    this.acc = speed;
  }
  
  update(){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }

  show() {
    fill(random(0,255),random(0,255),random(0,255));
    circle(this.pos.x, this.pos.y, this.d);
    
  }
  bounce() {
    if(this.pos.y > height || this.pos.y < 0 ){
      this.vel.mult(-1);
      //this.acc.mult(-1);
    }
    if(this.pos.x > width || this.pos.x < 0 ){
      this.vel.mult(-1);
      //this.acc.mult(-1);
    }

}
}

class Curve {

  constructor() {
    this.path = [];
    this.current = createVector();
  }

   setX( x) {
    this.current.x = x;
  }

   setY( y) {
    this.current.y = y;
  }

   addPoint() {
    this.path.push(this.current);
  }
  
   reset() {
    this.path = []; 
  }

   show() {
    stroke(200);
    strokeWeight(0.5);
    noFill();
    beginShape();
    for (let v of this.path) {
      vertex(v.x, v.y);
    }
    endShape();

    strokeWeight(0);
    point(this.current.x, this.current.y);
    this.current = createVector();
  }
}

