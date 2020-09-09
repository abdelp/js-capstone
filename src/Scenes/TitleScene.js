import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const btnWidth = config.width / 2;
    const btnHeight = config.height / 2;

    this.gameButton = new Button(this, btnWidth, btnHeight - 100, 'blueButton1', 'blueButton2', 'Play', 'Login');
    this.optionsButton = new Button(this, btnWidth, btnHeight, 'blueButton1', 'blueButton2', 'Options', 'Options');
    this.leaderboardButton = new Button(this, btnWidth, btnHeight + 100, 'blueButton1', 'blueButton2', 'Scores', 'Leaderboard');
    this.creditsButton = new Button(this, btnWidth, btnHeight + 200, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}
