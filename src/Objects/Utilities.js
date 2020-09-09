function addScenes(game, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    game.scene.add(arr[i].key, arr[i].sceneConfig);
  }
}

function destroyObjs(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].destroy();
  }
}

function loadAssets(scene, arr) {
  for (let i = 0; i < arr.length; i++) {
    scene.load[arr[i].type](arr[i].key, arr[i].path, arr[i].opts);
  }
}

function createAnims(scene, arr) {
  for (let i = 0; i < arr.length; i += 1) {
    scene.anims.create(arr[i]);
  }
}

export {
  addScenes, destroyObjs, loadAssets, createAnims,
};