const ASSETS = [{
    key: 'tiles',
    path: 'assets/map/spritesheet.png',
    type: 'image'
  },
  {
    key: 'map',
    path: 'assets/map/map.json',
    type: 'tilemapTiledJSON'
  },
  {
    key: 'ork',
    path: 'assets/ork.png',
    type: 'image'
  },
  {
    key: 'player',
    path: 'assets/RPG_assets.png',
    opts: {
      frameWidth: 32,
      frameHeight: 32
    },
    type: 'spritesheet'
  }
];

export default ASSETS;