/**
 * Variables used during the game.
 */
let background;
let backgroundDos;
let player;
let enemy;
let cursors;
let spaceBar;
let bullet = [];
let frame = -1;
let contBullet= 0;
let score = 0;

/**
 * It prelaods all the assets required in the game.
 */
function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
  this.load.image("enemy", "assets/characters/alien1.png");
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
  enemy = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
  enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2);
  enemy.setY((enemy.height * ENEMY_SCALE) / 2);
  enemy.setScale(ENEMY_SCALE);

  //cursors map into game engine
  cursors = this.input.keyboard.createCursorKeys();

  //Score

  this.add.text(5, 5, "Score: " + score);
  



  //mapspace key status
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
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

  if (contBullet>0) {
    shotTravel();
  }  
  

  frame--
  
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
      bullet.push
      (engine.add.ellipse
        (player.x, player.y - player.height / 2 * PLAYER_SCALE, 10, 20, 0xf5400a));
        contBullet++;
        frame = 20;
    }
  }

  function shotTravel () {
    for (let shot of bullet) {
      shot.setY (shot.y- PROYECTILE_SPEED)
      if (shot.y < 0-bullet.height/2) {
        shot.destroy()
      }
    }
  
  }