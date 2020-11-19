  // variables
  var monkey , monkey_running, monkeyCollide;
  var ground, invisiGround, groundImg;
  var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, obstacleGroup;
  var score = 0;
  var bananaScore = 0;
  var PLAY = 0;
  var END = 1;
  var gameState = PLAY;

  function preload() {
  // loading Images
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  monkeyCollide = loadAnimation("monkey_1.png");
  groundImg = loadAnimation("ground.jpg") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  }

  function setup() {
   createCanvas(600,300);
  
  // new groups : obstacleGroup and bananaGroup 
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  // create monkey
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  // create ground
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  ground.addAnimation("ground", groundImg);
  
  // create invisible ground
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false; 
  }

  function draw() {
  background("skyblue");
    
  // text (banana collected and survival time)  
  fill("black"); 
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY) {
  obstacles();
  bananas();
  score = score + Math.round(getFrameRate()/60);
    
  ground.velocityX = -(4+score*1.5/100);

  if(keyDown("space")&&monkey.y >= 235) {
  monkey.velocityY = -13; 
  }
  
  monkey.velocityY = monkey.velocityY + 0.8

  if (ground.x < 0){
  ground.x = ground.width/2;
  }

  if (monkey.isTouching(bananaGroup)){
  bananaScore++;  
  bananaGroup.destroyEach();  
  }
    
  if (monkey.isTouching(obstacleGroup)) {
  gameState = END;
  }  
  }
  
  if (gameState === END) {
  ground.velocityX = 0;

  monkey.y = 235;
  monkey.scale = 0.12;
  monkey.changeAnimation("collide", monkeyCollide);

  // set velocity to obstacleGroup and bananaGroup
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
   
  // set lifetime to obstacleGroup and BananaGroup
  obstacleGroup.setLifetimeEach(-1);
  bananaGroup.setLifetimeEach(-1);
    
  // text (gameOver)
  fill("red")
  stroke("black")
  textSize(30);
  text("GAMEOVER!!!", 220, 170);
    
  // text (press R to restart)
  fill("black");
  textSize(15);
  text("Press 'R' to play again", 240, 200);
   
  // change gameState from END to PLAY
  if (keyDown("r")) {
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  monkey.changeAnimation("monkey", monkey_running);
  score = 0;
  bananaScore = 0;
  gameState = PLAY; 
  }
  }
  
  drawSprites(); 
  
  monkey.collide(invisiGround);
  }

  function bananas() {
  if (frameCount%80 === 0) {
  banana = createSprite(620,120, 50, 50 )
  banana.addAnimation("banana", bananaImage);
  banana.scale = 0.1;
  banana.velocityX =-(4+score*1.5/100);           
  banana.lifetime = 220;
  bananaGroup.add(banana);
  bananaGroup.add(banana); 
  }
  }

  function obstacles() {
  if (frameCount%200 === 0){
  obstacle = createSprite(620,253,50,50);
  obstacle.addAnimation("rock", obstacleImage);
  obstacle.setCollider("circle", 0, 0, 180);
  obstacle.scale = 0.13 ;
  obstacle.velocityX = -(4+score*1.5/100);
  obstacle.lifetime = 220;
  obstacleGroup.add(obstacle); 
  } 
  }