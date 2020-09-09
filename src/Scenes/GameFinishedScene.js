import 'phaser';
import config from '../Config/config';

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameFinished');
  }

  create () {
    this.gameOverText = this.add.text(0, 0, 'You win', { fontSize: '32px', fill: '#fff' });
    this.leaderboardTitle = this.add.text(0, 0, 'Leaderboard', { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);

    Phaser.Display.Align.In.Center(
      this.gameOverText,
      this.zone
    );

    Phaser.Display.Align.In.Center(
      this.leaderboardTitle,
      this.zone
    );

    this.leaderboardTitle.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.gameOverText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: function () {
        this.destroy;
      }
    });

    this.madeByTween = this.tweens.add({
      targets: this.leaderboardTitle,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: function () {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }.bind(this)
    });
  }
};