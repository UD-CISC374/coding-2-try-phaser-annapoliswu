export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("paraBg", "assets/parallax-bg.png");
    this.load.image("paraFar", "assets/parallax-far-trees.png");
    this.load.image("paraMid", "assets/parallax-mid-trees.png");
    this.load.image("paraClose", "assets/parallax-close-trees.png");
    

    this.load.spritesheet("ship1", "assets/spritesheets/ship1.png",{frameWidth: 16, frameHeight: 16});
    this.load.spritesheet("ship2", "assets/spritesheets/ship2.png",{frameWidth: 32, frameHeight: 16});
    this.load.spritesheet("ship3", "assets/spritesheets/ship3.png",{frameWidth: 32, frameHeight: 32});
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{frameWidth: 16, frameHeight: 16});
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png",{frameWidth: 16, frameHeight: 16});
    this.load.spritesheet("player", "assets/spritesheets/player.png",{frameWidth: 16, frameHeight: 24});
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{frameWidth: 16, frameHeight: 16});
    this.load.spritesheet("char", "assets/spritesheets/char.png",{frameWidth: 64, frameHeight: 44});

    this.load.spritesheet("skeleton", "assets/spritesheets/Skeleton Walk.png",{frameWidth: 44, frameHeight: 66});
    this.load.spritesheet("smallmon", "assets/spritesheets/smallMonster.png",{frameWidth: 64, frameHeight: 64});

    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);

  
  }

  create() {
    this.add.text(20,20,"LOADING GAME...");
  
    this.anims.create({
      key: "char_walk",
      frames: this.anims.generateFrameNumbers("char",{}),
      frameRate: 20,
      repeat: -1
    });


    this.anims.create({
      key: "smallmon_jump",
      frames: this.anims.generateFrameNumbers("smallmon",{start: 18, end:24}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "smallmon_walk",
      frames: this.anims.generateFrameNumbers("smallmon",{start: 12, end:15}),
      frameRate: 20,
      repeat: -1
    });
    
    
    this.anims.create({
      key: "skeleton_walk",
      frames: this.anims.generateFrameNumbers("skeleton",{}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship1",{}),
      frameRate: 20,
      repeat: -1
    });
    
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2",{}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3",{}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion",{}),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up",{start: 0, end: 1}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up",{start: 2, end: 3}),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam",{}),
      frameRate: 20,
      repeat: -1
    });

    this.scene.start('MainScene');

  }

}
