export default class Enemy extends Phaser.GameObjects.Sprite {
    body: Phaser.Physics.Arcade.Body;

    constructor(scene,x,y) {
        
        super(scene, x, y, "enemy");
        scene.add.existing(this);
        this.play("ship1_anim");
        scene.physics.world.enableBody(this);
        this.body.setAllowGravity(false);
        this.body.velocity.x = -100;
        
    }

    update(){
        if(this.x < 0){
            this.destroy();
        }
    }

}