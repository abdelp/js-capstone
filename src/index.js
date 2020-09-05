import 'phaser';
import config from './Config/config';
import scenes from './Config/scenes';
import Model from './Model';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.addScenes(scenes);
    this.scene.start('Boot');
  }

  addScenes(arr) {
    for(let i = 0; i < arr.length; i += 1) {
      this.scene.add(arr[i].key, arr[i].sceneConfig);
    }
  }
}

window.game = new Game();