import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  loadAssets(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.load[arr[i].type](arr[i].name, arr[i].path, arr[i].opts);
    }
  }

  createAnims(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      this.anims.create(arr[i]);
    }
  }

  preload() {
    const assets = [{
        name: 'tiles',
        path: 'assets/map/spritesheet.png',
        type: 'image'
      },
      {
        name: 'map',
        path: 'assets/map/map.json',
        type: 'tilemapTiledJSON'
      },
      {
        name: 'dragonblue',
        path: 'assets/dragonblue.png',
        type: 'image'
      },
      {
        name: 'dragonorrange',
        path: 'assets/dragonorrange.png',
        type: 'image'
      },
      {
        name: 'player',
        path: 'assets/RPG_assets.png',
        opts: {
          frameWidth: 32,
          frameHeight: 32
        },
        type: 'spritesheet'
      }
    ];

    this.loadAssets(assets);
  }

  create() {
    const map = this.make.tilemap({
      key: 'map'
    });

    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    const grass = map.createStaticLayer('Grass', tiles, 0, 0);
    const decorations = map.createStaticLayer('Decorations', tiles, 0, 0);
    // const enemies = map.filterObjects('Enemies', (enemy) => console.log(enemy));
    const enemies = map.objects[0].objects;
    let obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

    obstacles.setCollisionByExclusion([-1]);

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

    this.createAnims(anims);
    this.player = this.physics.add.sprite(25, 250, 'player', 6);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, obstacles);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed
    this.cameras.main.setZoom(2);
    
    this.cursors = this.input.keyboard.createCursorKeys();

    // where the enemies will be
    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });

    for (var i = 0; i < enemies.length; i++) {
      this.spawns.create(enemies[i].x, enemies[i].y, 20, 20);
    }

    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    this.sys.events.on('wake', this.wake, this);
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  onMeetEnemy(player, zone) {
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    this.cameras.main.shake(200);

    this.input.stopPropagation();
    this.scene.switch('BattleScene');
  }

  update(time, delta) {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }
    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
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