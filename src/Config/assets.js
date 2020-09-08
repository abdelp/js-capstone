const assets = [{
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
    key: 'dragonorrange',
    path: 'assets/dragonorrange.png',
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
  },
  {
    key: 'life_bar',
    path: 'assets/life.png',
    opts: {
      frameWidth: 214,
      frameHeight: 28
    },
    type: 'spritesheet'
  }
];

export default assets;