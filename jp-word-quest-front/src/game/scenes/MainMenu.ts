import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        // Make the tile map based on the key from the preloader
        const map = this.make.tilemap({ key: "map" });

        // Adds the tile map that was loaded into the preloader
        const tileset = map.addTilesetImage("tilemap_packed", "tiles");

        // Make the layers
        const backgroundLayer = map.createLayer("Background", tileset!, 0, 0);
        const foregroundLayer = map.createLayer("Foreground", tileset!, 0, 0);
        const groundLayer = map.createLayer("Ground", tileset!, 0, 0);

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {

        this.scene.start('Game');
    }
}
