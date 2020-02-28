import {DEFAULT_HEIGHT, gameSettings} from '../game';
import {DEFAULT_WIDTH} from '../game';

export default class EndScene extends Phaser.Scene {
    menu: Phaser.GameObjects.Rectangle;
    menuText: Phaser.GameObjects.Text;
    button: Phaser.GameObjects.Rectangle;
    restart: Phaser.Input.Keyboard.Key;

    constructor() {
        super({ key: 'EndScene' });
    }

    create(){
        this.menu = this.add.rectangle( DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, DEFAULT_WIDTH/2, DEFAULT_HEIGHT/2, 0x3B2634);
        this.add.text(DEFAULT_WIDTH/2-60, DEFAULT_HEIGHT/2-20, "SCORE: " + gameSettings.score, {font: "20px"});
        this.add.text(DEFAULT_WIDTH/2-70, DEFAULT_HEIGHT/2+20, "PRESS R TO RESTART", {font: "12px"});
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.restart)){
            this.scene.start('MainScene');
        }
    }
    


}