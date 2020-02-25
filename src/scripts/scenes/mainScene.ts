import ExampleObject from '../objects/exampleObject';
import {DEFAULT_HEIGHT} from '../game';
import {DEFAULT_WIDTH} from '../game';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  background: Phaser.GameObjects.Image;
  ship1: Phaser.GameObjects.Image;
  ship2: Phaser.GameObjects.Image;
  ship3: Phaser.GameObjects.Image;


  constructor() {
    super({ key: 'MainScene' });
  }

  preload(){
  
  }

  create() {
    this.exampleObject = new ExampleObject(this, 0, 0);

    this.background = this.add.image(0,0,"background");
    this.background.setOrigin(0,0);

    this.ship1 = this.add.image(DEFAULT_WIDTH/2-50, DEFAULT_HEIGHT/2,"ship1");
    this.ship2 = this.add.image(DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2,"ship2");
    this.ship3 = this.add.image(DEFAULT_WIDTH/2+50, DEFAULT_HEIGHT/2,"ship3");

    this.add.text(20,20,"PLAYING GAME", {font: "16px", fill:"yellow"});
    
  }

  update() {
  }
}
