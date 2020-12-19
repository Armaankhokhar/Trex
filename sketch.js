var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles1;
var obstacles2;
var obstacles3;
var obstacles4;
var obstacles5;
var obstacles6;
var score = 0;
var obstaclesGroup, cloudGroup;
var END = 0
var PLAY = 1
var gameState = PLAY
var gameOver, gameOverImg
var restart, restartImg
var dieSound, jumpSound, checkPointSound;



var cloudImage;
var obstacles;
function preload() {
  console.count("this is preload")
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")

  obstacles1 = loadImage("obstacle1.png")

  obstacles2 = loadImage("obstacle2.png")

  obstacles3 = loadImage("obstacle3.png")

  obstacles4 = loadImage("obstacle4.png")

  obstacles5 = loadImage("obstacle5.png")

  obstacles6 = loadImage("obstacle6.png")

  restartImg = loadImage("restart.png")

  gameOverImg = loadImage("gameOver.png")

  dieSound = loadSound("die.mp3")

  jumpSound = loadSound("jump.mp3")

  checkPointSound = loadSound("die.mp3")



}

function setup() {
  createCanvas(600, 200);
  console.count("this is setup")
  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colliding", trex_collided)
  trex.scale = 0.5;
  //trex.debug=true
  trex.setCollider("circle", 0, 0, 40)
  //create a ground sprite
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200, 190, 400, 20);
  invisibleGround.visible = false;
  cloudGroup = new Group();
  obstaclesGroup = new Group();
  gameOver = createSprite(300, 80, 20, 20);
  gameOver.addImage("gameOver", gameOverImg)
  gameOver.scale = 0.5
  restart = createSprite(300, 125, 20, 20);
  restart.addImage("restart", restartImg)
  restart.scale = 0.5



}

function draw() {

  background(200);
  text("score = " + score, 500, 10)
  text("Armaan khokhar", 50, 20)
  if (gameState == PLAY) {


    if (score % 100 == 0 && score > 0) {
      checkPointSound.play()
    }

    if (score % 10 == 0) {
      ground.velocityX += -1
      // ground.velocityX=ground.velocityX-1 
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    score = Math.round(getFrameRate() / 6)+score
    if (keyDown("space") && trex.y > 150) {
      trex.velocityY = -10;
      jumpSound.play()

    }
    spawnobstacles();
    spawnCloud();
    if (trex.isTouching(obstaclesGroup)) {
      gameState = END
      trex.changeAnimation("colliding", trex_collided)
      dieSound.play()
    }
    gameOver.visible = false
    restart.visible = false

  }
  else if (gameState == END) {
    ground.velocityX = 0
    cloudGroup.setVelocityXEach(0)
    obstaclesGroup.setVelocityXEach(0)
    cloudGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1)
    gameOver.visible = true
    restart.visible = true
    if (mousePressedOver(restart)) {
      reset()
    }
  }
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleGround);


  drawSprites()
}
function reset() {
  cloudGroup.destroyEach()
  obstaclesGroup.destroyEach()
  score=0 
  gameState=PLAY
}



function spawnCloud() {
  if (frameCount % 40 == 0) {
    var cloudHeight = Math.round(random(30, 100))
    var cloud = createSprite(600, cloudHeight, 20, 20)
    cloud.velocityX = -8
    cloud.addImage(cloudImage)
    cloud.scale = 0.2;


    trex.depth = cloud.depth + 1

    cloud.lifetime = 80
    cloudGroup.add(cloud)
  }
}
function spawnobstacles() {
  if (frameCount % 50 == 0) {
    var obstacles = createSprite(600, 180, 10, 20)
    obstacles.velocityX = -10 - (score / 10)
    obstacles.scale = 0.1;
    var selectobstacles = Math.round(random(1, 6))
    switch (selectobstacles) {
      case 1: obstacles.addImage(obstacles1);
        break;
      case 2: obstacles.addImage(obstacles2);
        break;
      case 3: obstacles.addImage(obstacles3);
        break;
      case 4: obstacles.addImage(obstacles4);
        break;
      case 5: obstacles.addImage(obstacles5);
        break;
      case 6: obstacles.addImage(obstacles6);
        break;
      default: break;
    }
    obstacles.lifetime = 80
    obstaclesGroup.add(obstacles)
  }


}
