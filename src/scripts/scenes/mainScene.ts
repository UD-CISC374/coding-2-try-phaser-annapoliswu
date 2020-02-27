import ExampleObject from '../objects/exampleObject';
import {DEFAULT_HEIGHT} from '../game';
import {DEFAULT_WIDTH} from '../game';
import {gameSettings} from '../game';
import Beam from '../objects/beam';
import Explosion from '../objects/explosion';
import Enemy from '../objects/enemy';

const playerStartX = 50;
const playerStartY = 220;
const enemyInterval = 200;

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  player;
  cursorKeys;
  spacebar: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;
  
  scoreLabel: Phaser.GameObjects.BitmapText;
  text;

  score: number;
  beamSound: Phaser.Sound.BaseSound;
  explosionSound: Phaser.Sound.BaseSound;
  pickupSound: Phaser.Sound.BaseSound;
  music: Phaser.Sound.BaseSound;
  paraMid: Phaser.GameObjects.TileSprite;
  paraClose: Phaser.GameObjects.TileSprite;
  paraFar: Phaser.GameObjects.TileSprite;
  paraBg: Phaser.GameObjects.TileSprite;
  enemies: Phaser.GameObjects.Group;
  enemyTimer: number;
  ground: Phaser.GameObjects.Rectangle;

  constructor() {
    super({ key: 'MainScene' });
  }


  create() {

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.enemyTimer = 0;

    //background
    this.paraBg = this.add.tileSprite(0,0, DEFAULT_WIDTH, DEFAULT_HEIGHT, "paraBg");
    this.paraBg.setOrigin(0,0);
    this.paraFar = this.add.tileSprite(0,0, DEFAULT_WIDTH, DEFAULT_HEIGHT, "paraFar");
    this.paraFar.setOrigin(0,0);
    this.paraMid = this.add.tileSprite(0,0, DEFAULT_WIDTH, DEFAULT_HEIGHT, "paraMid");
    this.paraMid.setOrigin(0,0);
    this.paraClose = this.add.tileSprite(0,0, DEFAULT_WIDTH, DEFAULT_HEIGHT, "paraClose");
    this.paraClose.setOrigin(0,0);
  
    
    this.ground = this.add.rectangle(DEFAULT_WIDTH/2, DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_HEIGHT-playerStartY, 0xff6699);
    this.physics.add.existing(this.ground, true); //true is static

    this.player = this.physics.add.sprite(playerStartX, playerStartY, "player");
    this.player.play("thrust");
    this.player.setCollideWorldBounds(true);
    this.player.body.bounce.y = 0.3;
   //this.player.body.setAllowGravity(false);


    //change to this (whatever is clicked) and call destroyObj on it
    this.input.on("gameobjectdown", this.destroyObj, this);

    this.powerUps = this.physics.add.group();
    let maxObjects = 4;
    for(let i = 0; i <= maxObjects; i++){
      let powerUp = this.physics.add.sprite(16,16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0,0, DEFAULT_WIDTH, DEFAULT_HEIGHT);
      if (Math.random() > .5){
        powerUp.play("red");
      }else{
        powerUp.play("gray");
      }
      powerUp.setVelocity(100,100);
      powerUp.setCollideWorldBounds(true); //collide with game bounds
      powerUp.setBounce(1);
    }
  


    this.projectiles = this.add.group(); 

    
    //gravity auto applied to physics groups?
    this.enemies = this.add.group();
    //let enemy1 = new Enemy(this, 200, 300);
    //this.enemies.add(new Enemy(this, 400, 200));
    
    this.physics.add.collider(this.ground,this.player);

    this.physics.add.collider(this.projectiles, this.powerUps, 
      function(projectile, powerUp){
        projectile.destroy();
    });
    this.physics.add.overlap(this.player,this.powerUps,this.pickPowerUp, function(){}, this);
    this.physics.add.overlap(this.player,this.enemies,this.hurtPlayer, function(){}, this);
    this.physics.add.overlap(this.projectiles,this.enemies,this.hitEnemy, function(){}, this);
    

    this.score = 0;
    let graphic = this.add.graphics();
    graphic.fillStyle(0o0,1);
    graphic.fillRect(0,0,DEFAULT_WIDTH,20);

    this.text = this.add.text(4,4,"PLAYING GAME", {font: "16px", fill:"yellow"}); 

    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");

    this.music = this.sound.add("music");

    let musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    }
    this.music.play(musicConfig);


  } //end of create





  update() {
    this.paraFar.tilePositionX += 0.6;
    this.paraMid.tilePositionX += 0.4;
    this.paraClose.tilePositionX += 0.2

    //let enemy = new Enemy(this, 400, 200);
    //this.enemies.add(enemy);

    this.enemyGenerationManager();

    for(let i = 0; i < this.enemies.getChildren().length; i++){
      let enemy = this.enemies.getChildren()[i];
      enemy.update();
    }

    this.movePlayerManager();

    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      console.log("shot");
      if(this.player.active){
        this.shootBeam();
      }
    }

    for(let i = 0; i < this.projectiles.getChildren().length; i++){
      let beam = this.projectiles.getChildren()[i];
      beam.update();
    }

    
  } //end of update



  moveObj(obj, speed){
    obj.x -= speed;
    if(obj.x < 0){
      this.resetObjPos(obj);
    }
  }

  resetObjPos(obj){
    obj.x = DEFAULT_WIDTH;
    let randomY = Phaser.Math.Between(0, DEFAULT_WIDTH);
    obj.y = randomY;
  }

  destroyObj(pointer, gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explosion_anim");
  }

  movePlayerManager(){
    /*
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-1*gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }
    */

    if(this.cursorKeys.up.isDown && this.player.body.onFloor()){
      this.player.setVelocityY(-1*gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }



  }

  shootBeam(){
    let beam = new Beam(this);
    this.projectiles.add(beam);
    this.beamSound.play();
  }

  pickPowerUp(player,powerUp){
    powerUp.disableBody(true,true); //disables physics, makes inactive / hides
    this.pickupSound.play();
  }

  hurtPlayer(player, enemy){
    enemy.destroy();
    if(this.player.alpha < 1){
      return;
    }
    let explosion = new Explosion(this, player.x, player.y);
    this.explosionSound.play();

    player.x = playerStartX;
    player.y = playerStartY;
    player.setVelocity(0,0);

    player.disableBody(true, true);
    this.time.addEvent({
      delay:1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop: false
    });

    
  }

  resetPlayer(){
    let x = 0;
    let y = playerStartY;
    this.player.enableBody(true, x, y, true, true);
    this.player.alpha = 0.5;

    let tween = this.tweens.add({
      targets: this.player,
      x: playerStartX,
      ease: "Power1",
      duration: 1500,
      repeat: 0,
      onComplete: this.resetPlayerAlpha,
      callbackScope: this
    });

  }

  hitEnemy(projectile, enemy){
    projectile.destroy();
    let explosion = new Explosion(this, enemy.x, enemy.y);
    this.explosionSound.play();
    enemy.destroy();
    this.score += 15;
    this.text.setText('SCORE ' +  this.score);

  }

  resetPlayerAlpha(){
    this.player.alpha = 1;
  }

  enemyGenerationManager(){
    
    if(this.enemyTimer <= 0){
      this.enemyTimer = enemyInterval;
      let enemy = new Enemy(this, DEFAULT_WIDTH, playerStartY);
      this.enemies.add(enemy);
    }else{
      this.enemyTimer--;
    }
  
  }
    
} //end of scene
