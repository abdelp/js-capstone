import 'phaser';
import { loadAssets, createAnims } from './../Objects/Utilities';
import ASSETS from './../Config/assets';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    loadAssets(this, ASSETS);
    this.sys.events.on('update health points', this.updateHealthPoints, this);
  }

  updateHealthPoints(points) {
    this.warrior.hp = points;
  }

  create() {
    this.warrior = {hp: 100,
                 medicalKits: 2};

    const map = this.make.tilemap({
      key: 'map'
    });

    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    const grass = map.createStaticLayer('Grass', tiles, 0, 0);
    const decorations = map.createStaticLayer('Decorations', tiles, 0, 0);
    this.food = map.createDynamicLayer('Food', tiles, 0, 0);

    const enemies = map.objects[0].objects;
    let obstacles = map.createDynamicLayer('Obstacles', tiles, 0, 0);

    obstacles.setCollisionByExclusion([-1]);
    this.food.setCollisionByExclusion([-1]);

    const anims = [{
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [6, 7, 8]
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [6, 7, 8]
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [9, 10, 11]
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', {
          frames: [0, 1]
        }),
        frameRate: 10,
        repeat: -1
      }
    ];

    createAnims(this, anims);
    this.player = this.physics.add.sprite(25, 250, 'player', 6);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, obstacles);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;
    this.cameras.main.setZoom(2);
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });

    this.collect = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });

    for (let i = 0; i < enemies.length; i++) {
      this.spawns.create(enemies[i].x, enemies[i].y, 20, 20);
    }

    this.physics.add.collider(this.player, this.food, this.collectFood, false, this);


    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    this.sys.events.on('wake', this.wake, this);
  }

  collectFood(_player, food2) {
    this.food.removeTileAt(food2.x + 1, food2.y - 1);
    this.food.removeTileAt(food2.x - 1, food2.y + 1);
    this.food.removeTileAt(food2.x - 1, food2.y - 1);
    this.food.removeTileAt(food2.x, food2.y - 1);
    this.food.removeTileAt(food2.x - 1, food2.y);
    this.food.removeTileAt(food2.x, food2.y);
    this.food.removeTileAt(food2.x, food2.y + 1);
    this.food.removeTileAt(food2.x + 1, food2.y);
    this.food.removeTileAt(food2.x + 1, food2.y + 1);
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    zone.destroy();
    this.cameras.main.shake(200);

    this.input.stopPropagation();
    this.scene.switch('BattleScene');
  }

  update(time, delta) {
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
};