export default class Enemy extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene,x,y) {
        
        super(scene, x, y, "enemy");
        scene.add.existing(this);
        let skeleton = this.play("skeleton_walk");
        scene.physics.world.enableBody(this);
        this.body.setAllowGravity(false);
        this.body.velocity.x = -40;
        
    }

    update(){
        if(this.x < 0){
            this.destroy();
        }
    }

}