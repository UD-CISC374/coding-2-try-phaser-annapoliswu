import { DEFAULT_WIDTH } from "../game";

export default class Beam extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;
    //.body gravity issues https://github.com/photonstorm/phaser3-docs/issues/24

    constructor(scene) {
        let x = scene.player.x;
        let y = scene.player.y;
        
        super(scene, x, y, "beam");
        scene.add.existing(this);
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.setAllowGravity(false);
        this.body.velocity.x = 150;
    }

    update(){
        if(this.x > DEFAULT_WIDTH){
            this.destroy();
        }
    }

}