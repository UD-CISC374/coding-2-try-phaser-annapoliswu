
import {DEFAULT_WIDTH} from "../game";
import {DEFAULT_HEIGHT} from "../game";
import { gameSettings } from "../game";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    body: Phaser.Physics.Arcade.Body;
    lives: number;
    score: number;

    constructor(scene,x,y) {
        
        super(scene, x, y, "enemy");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        //this.body.setAllowGravity(false);
        this.body.velocity.x = -60;
        this.lives = 1;
        this.score = 20;
        
    }

    update(){
        if(this.x < 0){
            this.destroy();
        }
    }

}