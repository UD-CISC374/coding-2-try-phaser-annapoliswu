import ExampleObject from '../objects/exampleObject';
import {DEFAULT_HEIGHT} from '../game';
import {DEFAULT_WIDTH} from '../game';
import {gameSettings} from '../game';
import Beam from '../objects/beam';
import Explosion from '../objects/explosion';


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
  enemies: Phaser.Physics.Arcade.Group;
  scoreLabel: Phaser.GameObjects.BitmapText;
  text;
  score: number;
  beamSound: Phaser.Sound.BaseSound;
  explosionSound: Phaser.Sound.BaseSound;
  pickupSound: Phaser.Sound.BaseSound;
  music: Phaser.Sound.BaseSound;

  constructor() {
    super({ key: 'MainScene' });
  }


  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);

    this.background = this.add.tileSprite(0,0, DEFAULT_WIDTH, DEFAULT_HEIGHT, "background");
    this.background.setOrigin(0,0);

    this.ship1 = this.add.sprite(DEFAULT_WIDTH/2-50, DEFAULT_HEIGHT/2,"ship1");
    this.ship2 = this.add.sprite(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2,"ship2");
    this.ship3 = this.add.sprite(DEFAULT_WIDTH/2+50, DEFAULT_HEIGHT/2,"ship3");

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

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
  

    this.player = this.physics.add.sprite(DEFAULT_WIDTH /2 -8, DEFAULT_HEIGHT -64, "player");
    this.player.play("thrust");
    this.player.body.setAllowGravity(false);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
      projectile.destroy();
    });
    this.physics.add.overlap(this.player,this.powerUps,this.pickPowerUp, function(){}, this);

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    
    this.physics.add.overlap(this.player,this.enemies,this.hurtPlayer, function(){}, this);
    this.physics.add.overlap(this.projectiles,this.enemies,this.hitEnemy, function(){}, this);
    
    //this.scoreLabel = this.add.bitmapText(10,5,"Arial","SCORE",161);
    this.score = 0;
    let graphic = this.add.graphics();
    graphic.fillStyle(0o0,1);
    graphic.fillRect(0,0,DEFAULT_WIDTH,20);

    //don't need bitmap, but might be faster with bm
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
    this.moveObj(this.ship1,1);
    this.moveObj(this.ship2,2);
    this.moveObj(this.ship3,3);
    this.background.tilePositionY -= 0.5;
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
    obj.y += speed;
    if(obj.y > DEFAULT_HEIGHT){
      this.resetObjPos(obj);
    }
  }

  resetObjPos(obj){
    obj.y = 0;
    let randomX = Phaser.Math.Between(0, DEFAULT_WIDTH);
    obj.x = randomX;
  }

  destroyObj(pointer, gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explosion_anim");
  }

  movePlayerManager(){
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-1*gameSettings.playerSpeed);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-1*gameSettings.playerSpeed);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }

  shootBeam(){
    this.projectiles.add(new Beam(this));
    this.beamSound.play();
  }

  pickPowerUp(player,powerUp){
    powerUp.disableBody(true,true); //disables physics, makes inactive / hides
    this.pickupSound.play();
  }

  hurtPlayer(player, enemy){
    this.resetObjPos(enemy);
    if(this.player.alpha < 1){
      return;
    }
    let explosion = new Explosion(this, player.x, player.y);
    this.explosionSound.play();

    player.x = DEFAULT_WIDTH /2 -8;
    player.y = DEFAULT_HEIGHT - 64;
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
    let x = DEFAULT_WIDTH / 2 -8;
    let y = DEFAULT_HEIGHT + 64;
    this.player.enableBody(true, x, y, true, true);
    this.player.alpha = 0.5;

    let tween = this.tweens.add({
      targets: this.player,
      y: DEFAULT_HEIGHT - 64,
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
    this.resetObjPos(enemy);
    this.score += 15;
    this.text.setText('SCORE ' +  this.score);

  }

  resetPlayerAlpha(){
    this.player.alpha = 1;
  }
    
} //end of scene
