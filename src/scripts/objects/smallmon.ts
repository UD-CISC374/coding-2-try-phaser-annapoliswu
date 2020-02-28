import Enemy from "./enemy";

export default class SmallMon extends Enemy {
    timer: number;

    constructor(scene,x,y){
        super(scene, x, y);
        this.play("smallmon_walk");
        this.body.setSize(20,24);
        this.timer = 0;
        this.setBounce(.5);
    }

    update(){
        super.update();
        if(this.timer <= 0){
            this.timer = Math.random()*100+100;
            this.body.setVelocityY(-250);
        }else{
            this.timer--;
        }
    }

}