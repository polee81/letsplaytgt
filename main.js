import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("ground", "assets/images/ground.png");
  this.load.image("obstacle", "assets/images/obstacle.png");
  this.load.spritesheet("player", "assets/images/player_spritesheet.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

let player;
let cursors;
let obstacles;
let score = 0; // Declare and initialize the score variable

function create() {
  const platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  player = this.physics.add.sprite(100, 450, "player");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "player", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();
  
  // Create obstacles
  obstacles = this.physics.add.group();
  createObstacle.call(this, 400, 300);
  createObstacle.call(this, 600, 450);

  // Set up collision detection between player and obstacles
  this.physics.add.collider(player, obstacles, playerObstacleCollision, null, this);

 // Create the scoreText object with the initial score of 0
 this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
}

function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function createObstacle(x, y) {
  const obstacle = this.physics.add.sprite(x, y, "obstacle");
  obstacles.add(obstacle);
  // Customize the obstacle's properties (e.g., size, velocity) here
}

function playerObstacleCollision(player, obstacle) {
    // Increase the score
    score += 10;
  
    // Update the score text
    this.scoreText.setText('Score: ' + score);
  
    // Handle the collision outcome here, e.g., eliminate the player, bounce, etc.
    console.log("Player collided with an obstacle");


    // Increase the score
    score += 10;
  
    // Update the score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
  
    // Handle the collision outcome here, e.g., eliminate the player, bounce, etc.
    console.log("Player collided with an obstacle");
  }
  