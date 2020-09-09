import 'phaser';
import 'regenerator-runtime/runtime';
import config from './Config/config';
import scenes from './Config/scenes';
import Model from './Model';
import { addScenes } from './Objects/Utilities';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    addScenes(this, scenes);
    this.scene.start('Boot');
  }
}

window.game = new Game();