var bgimg, bg;
var planeimg, plane
var birdimg, bird;
var cloudimg, cloud;
var kiteimg, kite;
var gameoverimg, restartimg;
var obs;
var PLAY = 1;
var END = 0;
var score = 0;
var topGround, bottomGround;
var gameover, restart;
var obstop;
var gameState;


function preload()
{
 bgimg = loadImage("assets/background.jpg");
 planeimg = loadImage("assets/aeroplane.png");
 birdimg = loadImage("assets/bird.png");
 cloudimg = loadImage("assets/cloud.png");
 kiteimg = loadImage("assets/kite.png");
 gameoverimg = loadImage("assets/gameover.png");
 restartimg = loadImage("assets/restart.jpg");
}


function setup()
{
 createCanvas(700,600);
 bg = createSprite(300,320,6,6);
 bg.addImage(bgimg);
 bg.scale = 2.4;

 bottomGround = createSprite(200,390,800,20);
 bottomGround.visible = false;

 topGround = createSprite(200,10,800,20);
 topGround.visible = false;

 plane = createSprite(100,200,20,50);
 plane.addImage(planeimg);
 plane.scale = 0.2;
 plane.debug = true;

 gameover = createSprite(220,200);
 restart = createSprite(220,240);

 gameover.addImage(gameoverimg);
 restart.addImage(restartimg);

 gameover.scale = 0.5
 gameover.visible = false;

 restart.scale = 0.5
 restart.visible = false;

}



function draw()
{

background('black');

if(gameState === PLAY)
{
  if(keyDown("space"))
  {
    plane.velocityY= -6;
  }
    plane.velocityY = plane.velocityY + 2;

 Bar();
 SpawnObstaclesTop();
 SpawnObstaclesBottom();

 //condition for endstate
 if(topObstaclesgrp.isTouching(plane) ||
  bottomObstaclesgrp.isTouching(plane) || 
  topGround.isTouching(plane) || 
  bottomGround.isTouching(plane))
 {
    gameState = END;
 }
 }


 if(gameState === END)
 {
  gameover.visible = true;
  gameover.depth = gameover.depth+1;

  restart.visible = true;
  restart.depth = restart.depth+1;
  
  plane.velocityX = 0;
  plane.velocityY = 0;
  topObstaclesgrp.setVelocityEach(0);
  bottomObstaclesgrp.setVelocityEach(0);
  bargrp.setVelocityEach(0);
 
  topObstaclesgrp.setLifetimeEach(-1);
  bottomObstaclesgrp.setLifetimeEach(-1);

  plane.y = 200;
}

//resetting the game
 if(mousePressedOver(restart))
 {
  reset();
 }

 drawSprites();
 Score();

 }
 


function reset()
{
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  topObstaclesgrp.destroyEach();
  bottomObstaclesgrp.destroyEach();

  score = 0;
}

function SpawnObstaclesTop()
{
  if(World.frameCount % 60 === 0)
  {
    obstop = createSprite(400, 50, 40, 50)

    obs.scale = 0.1;
    obstop.velocityX = -4;

  // random y positions for top obstacles

  obstop.y = Math.round(random(10,100));

  //generate random top obstacles
  var rand = Math.round(random(1,2,3));
  switch(rand)
  {
    case 1: obstop.addImage(birdimg);
    break;
    case 2: obstop.addImage(kiteimg);
    break;
    case 3: obstop.addImage(cloudimg);
    break;
    default: break;
  }
   //assign lifetime to the variable
   obstop.lifetime = 100;

   plane.depth = plane.depth + 1;

   topObstaclesgrp.add(obstop);
  }
}


