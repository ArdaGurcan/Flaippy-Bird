// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// P5 exported functions (eslint flags)
/* exported preload, setup, draw, keyPressed */

// Exported sprites (eslint flags)
/* exported birdSprite, pipeBodySprite, pipePeakSprite */

var bird;
var pipes;
// var parallax = 0.8;
var score = 0;
var maxScore = 0;
// var birdSprite;
// var pipeBodySprite;
// var pipePeakSprite;
// var bgImg;
// var bgX;
var gameoverFrame = 0;
var isOver = false;

var touched = false;
var prevTouched = touched;


function preload() {
  // pipeBodySprite = loadImage('graphics/pipe_marshmallow_fix.png');
  // pipePeakSprite = loadImage('graphics/pipe_marshmallow_fix.png');
  // birdSprite = loadImage('graphics/train.png');
  // bgImg = loadImage('graphics/background.png');
}

function setup() {
  createCanvas(800, 600);
  reset();
  stroke(50)
  strokeWeight(3)
  // noStroke()
}

function draw() {
  background("#46b0c3");

  bird.show();

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();

    if (pipes[i].pass(bird)) {
      score++;
    }

    if (pipes[i].hits(bird)) {
      gameover();
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();

  if ((frameCount - gameoverFrame) % 150 == 0) {
    pipes.push(new Pipe());
  }

  showScores();

  // touches is an list that contains the positions of all
  // current touch points positions and IDs
  // here we check if touches' length is bigger than one
  // and set it to the touched var
  touched = (touches.length > 0);

  // if user has touched then make bird jump
  // also checks if not touched before
  if (touched && !prevTouched) {
    bird.up();
  }

  // updates prevTouched
  prevTouched = touched;


}

function showScores() {
  textSize(32);
  fill(50)
  noStroke()
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
  stroke(50)
}

function gameover() {
  textSize(64);
  fill(0,220)
  noStroke()
  rect(0,height/2-75,width,150)
  textAlign(CENTER, CENTER);
  fill(208,0,20)
  text('YOU DIED', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  stroke(50)
  maxScore = max(score, maxScore);
  isOver = true;

  noLoop();
}

function reset() {
  isOver = false;
  score = 0;
  bgX = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  gameoverFrame = frameCount - 1;
  loop();
}

function keyPressed() {
  if (key === ' ') {
    bird.up();
    if (isOver) reset(); //you can just call reset() in Machinelearning if you die, because you cant simulate keyPress with code.
  }
}

function touchStarted() {
  if (isOver) reset();
}