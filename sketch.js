var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var edges;
var audio;



function preload () {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  audio = loadSound("spooky.wav");
}

function setup () {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  character = createSprite(300, 400);
  character.addImage("ghost", ghostImg);
  character.scale = 0.3;
  // edges = createEdgeSprites();
}

function draw () {
  background(200);

  if (gameState == "play") {

    audio.play();

    character.collide(climbersGroup);
    character.velocityY += 1;

    if (keyDown("space")) {
      character.velocityY -= 3;
    }
    
    if (keyDown("left")) {
      character.x -= 4;
    }

    if (keyDown("right")) {
      character.x += 4;
    }
   
    if(tower.y > 400){
        tower.y = 300;
      }
    if (character.y > 600 || invisibleBlockGroup.isTouching(character)) {
      gameState = "end";
      character.destroy();
    }

    spawnDoors();
  }
  else if (gameState == "end") {
    stroke("yellow");
    fill("orange");
    textSize(30);

    tower.velocityY = 0;
    tower.destroy();

    audio.pause();

    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();

    text("Game Over!", 210, 250);
  }
  drawSprites();
}

function spawnDoors() {
  if (frameCount % 300 == 0) {
    door = createSprite(200, -50);
    climber = createSprite(200, 10);
    invisibleBlock = createSprite(200, 15);

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x = Math.round(random(100, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    door.addImage("door", doorImg);
    climber.addImage("climber", climberImg)
    invisibleBlock.debug = true;
    climber.debug = true;

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    climber.setCollider("rectangle", 0, -10, climber.width, climber.height-15, 0);

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    character.depth = door.depth;
    character.depth += 1;
  }
}