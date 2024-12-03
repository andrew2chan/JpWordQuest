import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class SinglePlayer extends Scene
{
    private player: Phaser.Physics.Arcade.Sprite | null = null;
    private playerIdleAnimConfig: object = {};
    private playerAttackAnimConfig: object = {};
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private enemy: Phaser.Physics.Arcade.Sprite | null = null;
    private enemyWalkAnimConfig: { //create enemy walk anim
        key: string; frames: Phaser.Types.Animations.AnimationFrame[]; frameRate: number; repeat: number;
    };

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

        this.player = this.physics.add.sprite(20, highestY - 10, 'character'); //offsets by 10 pixel so that we start above ground

        this.enemy = this.physics.add.sprite(this.game.canvas.width - 20 , highestY - 10, 'enemy1').setFlipX(true);

        this.physics.add.collider(this.player, groundLayer!);

        this.physics.add.collider(this.enemy, groundLayer!);

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
            frameRate: 5,
            repeat: 0
        }

        this.enemyWalkAnimConfig = { //create enemy walk anim
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers("enemy1", {
                start: 0,
                end: 1,
                frames: [0,1]
            }),
            frameRate: 10,
            repeat: -1
        }

        //add anims so they can be used
        this.anims.create(this.playerIdleAnimConfig);
        this.anims.create(this.playerAttackAnimConfig);
        this.anims.create(this.enemyWalkAnimConfig);

        this.player?.anims.play('idle');

        if(this.input.keyboard == null) return;
        this.cursors = this.input.keyboard.createCursorKeys();

        let tween = this.tweens.add({
            targets: this.enemy,
            x: { value: this.player.x},
            duration: 2000,
            onStart: () => {
                this.enemy?.anims.play("walk-left");
            },
            onComplete: () => {
                this.enemy?.anims.stop();
                tween.stop();
            }
        })

        tween.play();

        EventBus.emit('current-scene-ready', this);
    }

    update (time: number, delta: number)
    {
        if(this.cursors.left.isDown) {
            this.player?.anims.play('attack');
            this.player?.anims.playAfterRepeat('idle');
        }
    }
    
    shutdown() {
        this.scene.stop();
    }
}
