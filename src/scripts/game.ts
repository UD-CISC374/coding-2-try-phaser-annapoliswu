import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import GameConfig = Phaser.Types.Core.GameConfig;
import EndScene from './scenes/endScene';

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 272;

export {DEFAULT_WIDTH};
export {DEFAULT_HEIGHT};


export let gameSettings ={
    playerSpeed: 300,
    score: 0
}

const config: GameConfig = {
    backgroundColor: '#000',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, EndScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 300 }
        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});
