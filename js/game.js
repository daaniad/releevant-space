/**
 * Variables used during the game.
 */
let background;
let backgroundDos;
let player;
let enemy;
let alienCuatro;
let alienDos;
let alienTres;
let enemies = [enemy, alienCuatro, alienDos, alienTres];
let arrayEnemies= []
let cursors;
let spaceBar;
let bullets = [];
let frame = -1;
let contBullets= 0;
let score = 0;
let scoreText;
let contador = -1;
let explosion;
let doh;
let resplandor;
let alienDosX;
// const enemyHalfWidth = enemy.width / 2 * ENEMY_SCALE;
// const enemyHalfHeight = enemy.height / 2 * ENEMY_SCALE;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
  this.load.image("alienCuatro", "assets/characters/alien4.png");
  this.load.image("alienDos", "assets/characters/alien2.png");
  this.load.image("alienTres", "assets/characters/alien3.png");
  this.load.image("red", "assets/particles/red.png");
  this.load.audio("doh", "assets/audio/doh.mp3");
  this.load.audio("resplandor", "assets/audio/resplandor.mp3")
}

/**
 * It creates the scene and place the game objects.
 */
function create() {
  // scene background
  background = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
  backgroundDos = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - background.height, "sky");

  // playet setup
  player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
  player.setScale(PLAYER_SCALE);

  // enemy setup
  spawnEnemy(this)

  enemy = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
  enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2);
  enemy.setY((enemy.height * ENEMY_SCALE) / 2);
  enemy.setScale(ENEMY_SCALE);

  // alienDos = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "alienDos"),
  // alienDos.setX((SCREEN_WIDTH - alienDos.width * ENEMY_SCALE + alienDos.width)/2),
  // alienDos.setY((alienDos.height * ENEMY_SCALE)/2),
  // alienDos.setScale(ENEMY_SCALE),

  // alienDos = alienDosX

  // alienTres = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "alienTres");
  // alienTres.setX((SCREEN_WIDTH - alienTres.width * ENEMY_SCALE - alienTres.width)/2);
  // alienTres.setY((alienTres.height * ENEMY_SCALE)/2);
  // alienTres.setScale(ENEMY_SCALE);

  // alienCuatro = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "alienCuatro");
  // alienCuatro.setX((SCREEN_WIDTH + (alienCuatro.width*9) * ENEMY_SCALE)/2);
  // alienCuatro.setY((alienCuatro.height * ENEMY_SCALE)/2);
  // alienCuatro.setScale(ENEMY_SCALE);

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();

  //Score

  scoreText = this.add.text(5, 5, "Score: " + score);

  //Sound

  doh = this.sound.add('doh');
  resplandor= this.sound.add('resplandor');
  



  //mapspace key status
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

  explosion = this.add.particles("red").createEmitter({
    scale: { min: 0.5, max: 0 },
    speed: { min: -100, max: 100 },
    quantity: 10,
    frequency: 0.1,
    lifespan: 200,
    gravityY: 0,
    on: false,
  });
}

/**
 * Updates each game object of the scene.
 */
function update() {
  moveBackground();
  movePlayer();
  if (frame<0) {
    shoot(this);
  }

  if (contBullets>0) {
    shotTravel();
  }  
  

  frame--
  contador--
  
}

  function movePlayer() {
  if (cursors.left.isDown) {
    let a = player.x - PLAYER_VELOCITY;
    if (a < (player.width/2) * PLAYER_SCALE) {
      a = player.width /2 *PLAYER_SCALE;
    }
    player.setX(a);
  }
  else if (cursors.right.isDown) {
    let a = player.x + PLAYER_VELOCITY;
    if (a > SCREEN_WIDTH - (player.width / 2) * PLAYER_SCALE) {
      a = SCREEN_WIDTH- player.width / 2 * PLAYER_SCALE;
    }
    player.setX(a)
  }

  if (cursors.up.isDown) {
    let a = player.y - PLAYER_VELOCITY;
    if (a < (player.height / 2)* PLAYER_SCALE) {
      a = player.height / 2 * PLAYER_SCALE;
    }
    player.setY(a)
  }
  else if (cursors.down.isDown) {
    let PLAYER_VELOCITY2 = PLAYER_VELOCITY*1.5;
    let a = player.y + PLAYER_VELOCITY2;
    if (a > SCREEN_HEIGHT - (player.height / 2)* PLAYER_SCALE) {
      a = SCREEN_HEIGHT - player.height / 2 * PLAYER_SCALE;
    }
    player.setY(a)
  }
}


function moveBackground () {
  background.setY(background.y + BACKGROUND_VELOCITY);
  backgroundDos.setY(backgroundDos.y + BACKGROUND_VELOCITY)
   if (background.y > background.height + SCREEN_HEIGHT / 2) {
     background.setY(backgroundDos.y - background.height)
  }
  let temporal = background;
  background = backgroundDos;
  backgroundDos = temporal;
  }


  function shoot(engine) {
    if (spaceBar.isDown) {
      bullets.push
      (engine.add.ellipse
        (player.x, player.y - player.height / 2 * PLAYER_SCALE, 10, 20, 0xf5400a));
        contBullets++;
        frame = 20;
    }
  }

  function shotTravel () {

    let index = -1


    for (let i= 0; i< bullets.length; i++) {
      

      bullets[i].setY (bullets[i].y- PROJECTILE_SPEED);
      collider(bullets[i])
      if (bullets[i].y <= 0-bullets[i].height) {
        bullets[i].destroy()
        
        index = i
      }
      collider(bullets[i])
      
      
    }
    if (index >=0) {
      
      bullets.splice(index, 1)
    }
    console.log(bullets.length);
  
  }

  function collider (bala) {
    let index = 0;
    while (index < arrayEnemies.length) {
      if ((bala.x >= enemy[index].x - (enemy[index].width * ENEMY_SCALE)/2) &&
      (bala.x<=enemy[index].x+(enemy[index].width*ENEMY_SCALE)/2)&&
      (bala.y>=enemy[index].y-(enemy[index].height*ENEMY_SCALE)/2)&&
      (bala.y<=enemy[index].y+(enemy[index].height*ENEMY_SCALE)/2)) 
      {
        index++
        spawnEnemy()
  
      doh.play()
      //resplandor.play()
      explosion.setPosition(enemy.x, enemy.y);
      explosion.explode();
      enemy.setX(Math.floor(Math.random()*(SCREEN_WIDTH-enemy.width) + (enemy.width/2)));
      if (contador < 0) {
        
        collectEnemy(bala, enemy);
      }
      
   }
    }
   
}

function collectEnemy(){
contador = 1
 score+= 1
 scoreText.setText("Score:"+score)
 }

//  function destroyBullet(index) {
//   bullets[index].destroy();
//   bullets.splice(index, 1);
// }

function spawnEnemy(engine) {
  for (let i = -1; i < 4; i++) {
  const enemy = engine.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy")
  enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2 - enemy.width * ENEMY_SCALE 
    + i * enemy.width * ENEMY_SCALE);
  enemy.setY((enemy.height * ENEMY_SCALE) / 2);
  enemy.setScale(ENEMY_SCALE);

  /*const alienDos = engine.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "alienDos")
  alienDos.setX((SCREEN_WIDTH - alienDos.width * ENEMY_SCALE) / 2 - alienDos.width * ENEMY_SCALE 
    + i * alienDos.width * ENEMY_SCALE);
  alienDos.setY((alienDos.height * ENEMY_SCALE) / 2);
  alienDos.setScale(ENEMY_SCALE);*/

  arrayEnemies.push(enemy)
  }
}