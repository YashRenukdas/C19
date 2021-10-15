var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4

  invisibleBlock = createSprite(200,150);
 // invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
}

function draw() {
  background(200);
  drawSprites();

  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x -4;
  }

  if(keyDown("RIGHT_ARROW")){
    ghost.x =ghost.x +4;
  }

  if(keyDown("space")){
    ghost.velocityY = -4;
  }
  ghost.velocityY =  ghost.velocityY + 0.4

  
  if(tower.y > 400){
      tower.y = 300
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(insivibleBlockGroup.isTouching(ghost) || ghost.y > 600 ){
     ghost.destroy();
    }

    spawnDoors();
    drawSprites();
}

function spawnDoors(){
if(frameCount % 200 === 0 ){
  var door = createSprite(200,50)
  door.addImage("door",doorImg)

  var climber = createSprite(200,80);
  climber.addImage("climber",climberImg)

  climber.velocityY = 1;
  climber.lifetime = 600;
  
  door.velocityY = 1;
  door.lifetime = 600;

  doorsGroup.add(door);
  climbersGroup.add(climber);

  door.x = Math.round(random(120,400))
  climber.x = door.x;

  ghost.depth = door.depth
  ghost.depth = ghost.depth +1
}
}

