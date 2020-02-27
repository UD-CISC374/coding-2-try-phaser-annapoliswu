import Enemy from "./enemy";

export default class Skeleton extends Enemy {

    constructor(scene,x,y){
        super(scene, x, y);
        this.play("skeleton_walk");
        this.body.setSize(40,60);
    }

    update(){
        super.update();
    }

}