/**
 * Variables used during the game.
 */
let player;
let enemy;
let cursors;

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
  this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");

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
}

/**
 * Updates each game object of the scene.
 */
function update() {
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
    let PLAYER_VELOCITY2 = PLAYER_VELOCITY*2;
    let a = player.y + PLAYER_VELOCITY2;
    if (a > SCREEN_HEIGHT - (player.height / 2)* PLAYER_SCALE) {
      a = SCREEN_HEIGHT - player.height / 2 * PLAYER_SCALE;
    }
    player.setY(a)
  }
}
