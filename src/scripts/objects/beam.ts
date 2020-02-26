export default class Beam extends Phaser.Physics.Arcade.Sprite {

    constructor(scene) {
        let x = scene.player.x;
        let y = scene.player.y;
        
        super(scene, x, y, "beam");
        scene.add.existing(this);
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -150;
    }

    update(){
        if(this.y < 0){
            this.destroy();
        }
    }

}