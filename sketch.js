var backGroundIMG, dog1IMG, dog2IMG, man1IMG, man2IMG, man3IMG, man4IMG, stoneIMG, gameOverIMG;
var backGround, dog, man, stone, invisableGround, gameOver;
var gameState, play, end;
var speed, score;

function preload(){
    manRunning = loadAnimation("./Images/Running Man Frame 1.png", "./Images/Running Man Frame 2.png", "./Images/Running Man Frame 3.png", "./Images/Running Man Frame 4.png");
    manCollided = loadAnimation("./Images/Running Man Frame 2.png");
    backGroundIMG = loadImage("./Images/full_background.png");
    stoneIMG = loadImage("./Images/stone.png");
    gameOverIMG = loadImage("./Images/gameOver.png");
    jumpSound = loadSound("./Images/jump.wav");
    collidedSound = loadSound("./Images/collided.wav");
}

function setup() {
    createCanvas(800, 400);
    play = 0;
    end = 1;
    gameState = play;
    speed = -2;
    score = 0;

    backGround = createSprite(0, 0, 800, 400);
    backGround.addImage("Background", backGroundIMG);
    backGround.scale = 0.5;

    man = createSprite(300, 237, 800, 400);
    man.addAnimation("Running Man", manRunning);
    man.addAnimation("Collided Man", manCollided);
    man.scale = 1.5;
    man.setCollider("circle",0,10,15);
    man.debug = true;

    invisableGround = createSprite(400, 287, 1600, 10);
    invisableGround.visible = false;

    stonesGroup = new Group();

    gameOver = createSprite(400, 180);
    gameOver.addImage(gameOverIMG);
    gameOver.scale = 1.5;
    gameOver.visible = false;

}

function draw() {
    background(255);
    if (gameState === play) {
        backGround.velocityX = speed;
        stonesGroup.velocityX = speed;
        score = score + 0.1;
        speed = speed - 0.001;

        if (backGround.x < 100) {
            backGround.x = 400;

        }

        if (keyDown("space")&& man.y>240){
            jumpSound.play();
            man.velocityY = -16;

        }
        man.velocityY = man.velocityY + 0.8;
        spawnStones();
        
        if (stonesGroup.isTouching(man)) {
            collidedSound.play();
            gameState = end;

        }

    }




    else if (gameState === end) {
        backGround.velocityX = 0;
        stonesGroup.setVelocityEach(0);
        man.changeAnimation("Collided Man", manCollided);
        stonesGroup.setLifetimeEach(-1);
        gameOver.visible = true;
        stonesGroup.visible = false;

    }

    drawSprites();
    textSize(20);
    stroke(3);
    fill("black");
    text("Score: " + Math.round(score), 20, 20);
    man.collide(invisableGround);
}

function spawnStones() {
    if (frameCount % 120 === 0) {
        var stone = createSprite(820, 270, 40, 40);
        stone.setCollider("rectangle", 0, 0, 100, 200);
        stone.debug = true;
        stone.addImage(stoneIMG);
        stone.velocityX = speed;
        stone.scale = 0.1;
        stone.lifetime = 400;
        stonesGroup.add(stone);
    }
}