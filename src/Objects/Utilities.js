const addScenes = (game, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    game.scene.add(arr[i].key, arr[i].sceneConfig);
  }
};

const destroyObjs = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].destroy();
  }
};

const loadAssets = (scene, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    scene.load[arr[i].type](arr[i].key, arr[i].path, arr[i].opts);
  }
};

const createAnims = (scene, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    scene.anims.create(arr[i]);
  }
};

export {
  addScenes, destroyObjs, loadAssets, createAnims,
};