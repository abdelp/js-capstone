const setText = (textObj, text) => {
  textObj.setText(text);
};

const createStatusCard = (scene) => {
  scene.status = scene.add.rectangle(25, 250, 70, 30, '#ffffff').setOrigin(0, 0);
  scene.statusText = scene.add.text(25, 250, 'score: 0', { color: 'white', fontSize: '9px' });
  scene.hpText = scene.add.text(25, 250, 'hp: 100', { color: 'white', fontSize: '9px' });
};

const removeTile = (tileset, tile) => {
  tileset.removeTileAt(tile.x + 1, tile.y - 1);
  tileset.removeTileAt(tile.x - 1, tile.y + 1);
  tileset.removeTileAt(tile.x - 1, tile.y - 1);
  tileset.removeTileAt(tile.x, tile.y - 1);
  tileset.removeTileAt(tile.x - 1, tile.y);
  tileset.removeTileAt(tile.x, tile.y);
  tileset.removeTileAt(tile.x, tile.y + 1);
  tileset.removeTileAt(tile.x + 1, tile.y);
  tileset.removeTileAt(tile.x + 1, tile.y + 1);
};

const setAssetPosition = (asset, x, y) => {
  asset.setPosition(x, y);
};

export {
  setText, createStatusCard, removeTile, setAssetPosition,
};