import Enemy from "./enemy";

export default class Skeleton extends Enemy {
    lives: number;
    constructor(scene,x,y){
        super(scene, x, y);
        this.play("skeleton_walk");
        this.body.setSize(20,50);
        this.body.velocity.x = -30;
        this.lives = 5;
    }

    update(){
        super.update();
    }

}