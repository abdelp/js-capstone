import GameScene from './../Scenes/GameScene';
import BattleScene from './../Scenes/BattleScene';
import BootScene from './../Scenes/BootScene';
import PreloaderScene from './../Scenes/PreloaderScene';
import TitleScene from './../Scenes/TitleScene';
import OptionsScene from './../Scenes/OptionsScene';
import CreditsScene from './../Scenes/CreditsScene';
import UIScene from './../Scenes/UIScene';
import GameOverScene from './../Scenes/GameOverScene';

const scenes = [
  { key: 'Boot', sceneConfig: BootScene},
  { key: 'Preloader', sceneConfig: PreloaderScene},
  { key: 'Title', sceneConfig: TitleScene},
  { key: 'Options', sceneConfig: OptionsScene},
  { key: 'Credits', sceneConfig: CreditsScene},
  { key: 'Game', sceneConfig: GameScene},
  { key: 'Battle', sceneConfig: BattleScene},
  { key: 'UIScene', sceneConfig: UIScene},
  { key: 'GameOver', sceneConfig: GameOverScene}
];

export default scenes;