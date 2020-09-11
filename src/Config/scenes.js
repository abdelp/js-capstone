import GameScene from '../Scenes/GameScene';
import BattleScene from '../Scenes/BattleScene';
import BootScene from '../Scenes/BootScene';
import PreloaderScene from '../Scenes/PreloaderScene';
import TitleScene from '../Scenes/TitleScene';
import OptionsScene from '../Scenes/OptionsScene';
import CreditsScene from '../Scenes/CreditsScene';
import UIScene from '../Scenes/UIScene';
import GameOverScene from '../Scenes/GameOverScene';
import LeaderboardScene from '../Scenes/LeaderboardScene';
import LoginScene from '../Scenes/LoginScene';
import GameFinishedScene from '../Scenes/GameFinishedScene';

const scenes = [
  { key: 'Boot', sceneConfig: BootScene },
  { key: 'Preloader', sceneConfig: PreloaderScene },
  { key: 'Title', sceneConfig: TitleScene },
  { key: 'Options', sceneConfig: OptionsScene },
  { key: 'Credits', sceneConfig: CreditsScene },
  { key: 'Game', sceneConfig: GameScene },
  { key: 'Battle', sceneConfig: BattleScene },
  { key: 'UIScene', sceneConfig: UIScene },
  { key: 'GameOver', sceneConfig: GameOverScene },
  { key: 'Leaderboard', sceneConfig: LeaderboardScene },
  { key: 'Login', sceneConfig: LoginScene },
  { key: 'GameFinished', sceneConfig: GameFinishedScene },
];

export default scenes;