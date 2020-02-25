export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("ship1", "src/assets/ship1.png");
    this.load.image("ship2", "assets/ship2.png");
    this.load.image("ship3", "assets/ship3.png");
  }

  create() {
    this.add.text(20,20,"LOADING GAME...");
    this.scene.start('MainScene');
  }
}
