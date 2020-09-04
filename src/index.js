import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BattleScene from './Scenes/BattleScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    const scenes = [
      { key: 'Boot', sceneConfig: BootScene},
      { key: 'Preloader', sceneConfig: PreloaderScene},
      { key: 'Title', sceneConfig: TitleScene},
      { key: 'Options', sceneConfig: OptionsScene},
      { key: 'Credits', sceneConfig: CreditsScene},
      { key: 'Game', sceneConfig: GameScene},
      { key: 'Battle', sceneConfig: BattleScene}
    ];
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