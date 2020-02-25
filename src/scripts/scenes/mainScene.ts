import ExampleObject from '../objects/exampleObject';
import {DEFAULT_HEIGHT} from '../game';
import {DEFAULT_WIDTH} from '../game';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.TileSprite;
  ship1: Phaser.GameObjects.Sprite;
  ship2: Phaser.GameObjects.Sprite;
  ship3: Phaser.GameObjects.Sprite;
  powerUps: Phaser.Physics.Arcade.Group;
  player: Phaser.GameObjects.Sprite;


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

    this.add.text(20,20,"PLAYING GAME", {font: "16px", fill:"yellow"}); 

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

    this.player = this.physics.add.sprite(DEFAULT_WIDTH /2 -8, DEFAULT_HEIGHT -62, "player");
    this.player.play("thrust");


  }

  update() {
    this.moveObj(this.ship1,1);
    this.moveObj(this.ship2,2);
    this.moveObj(this.ship3,3);
    this.background.tilePositionY -= 0.5;
  }

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

}
