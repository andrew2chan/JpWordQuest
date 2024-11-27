import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class SinglePlayer extends Scene
{
    private player: Phaser.Physics.Arcade.Sprite | null = null;
    private playerIdleAnimConfig: object = {};
    private playerAttackAnimConfig: object = {};
    private cursors;

    constructor ()
    {
        super('SinglePlayer');
    }

    create ()
    {
        // Make the tile map based on the key from the preloader
        const map = this.make.tilemap({ key: "map" });

        // Adds the tile map that was loaded into the preloader
        const tileset = map.addTilesetImage("tilemap_packed", "tiles");
        const backgroundset = map.addTilesetImage("backgrounds", "background");

        // Make the layers
        const backgroundLayer = map.createLayer("Background", backgroundset!, 0, 0);
        const foregroundLayer = map.createLayer("Foreground", tileset!, 0, 0);
        const groundLayer = map.createLayer("Ground", tileset!, 0, 0);

        // pulls the data from our json file so we know that the ground should be collided with
        groundLayer?.setCollisionByProperty({ collides: true })

        /*const debugGraphics = this.add.graphics().setAlpha(0.75);
        groundLayer?.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/

        let highestY = map.heightInPixels; // Start with the bottom of the map

        groundLayer!.forEachTile((tile) => { //goes through each row of the tilemap and sees when the ground layer starts appearing in pixels
            if (tile.index !== -1) { // Non-empty ground tile
                highestY = Math.min(highestY, tile.pixelY); //gets the smallest Y pixel where we don't have a ground tile
            }
        });

        this.player = this.physics.add.sprite(20, highestY - 10, 'character', 0); //offsets by 10 pixel so that we start above ground

        this.physics.add.collider(this.player, groundLayer!);

        this.playerIdleAnimConfig = { //create idle player anim
            key: 'idle',
            frames: this.anims.generateFrameNumbers("character", {
                start: 0,
                end: 2,
                frames: [0,2]
            }),
            frameRate: 1,
            repeat: -1
        }

        this.playerAttackAnimConfig = { //create attack player anim
            key: 'attack',
            frames: this.anims.generateFrameNumbers("character", {
                start: 0,
                end: 2,
                frames: [0,1]
            }),
            frameRate: 1,
            repeat: 0
        }

        //add anims so they can be used
        this.anims.create(this.playerIdleAnimConfig);
        this.anims.create(this.playerAttackAnimConfig);

        this.player?.anims.play('idle');

        this.cursors = this.input.keyboard?.createCursorKeys();

        //this.add.bitmapText(60, 60, "pixelfont", "lalalala");

        EventBus.emit('current-scene-ready', this);
    }

    update (time: number, delta: number)
    {
        if(this.cursors.left.isDown) {
            this.player?.anims.play('attack');
            this.player?.anims.playAfterRepeat('idle');
        }
    }
    
}
