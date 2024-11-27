import { Boot } from './scenes/Boot';
import { SinglePlayer } from './scenes/SinglePlayer';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 400,
    height: 280,
    parent: 'game-container',
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        zoom: Phaser.Scale.ZOOM_2X,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        SinglePlayer
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
