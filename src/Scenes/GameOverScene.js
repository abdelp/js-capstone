import 'phaser';
import Button from '../Objects/Button';
import * as ScoresProvider from '../Objects/scoresProvider';

export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  async create(data) {
    this.gameFinishedText = this.add.text(300, 50, 'You have lost', { fontSize: '32px', fill: '#fff' });

    this.menuButton = new Button(this, 400, 530, 'blueButton1', 'blueButton2', 'menu', 'Title');
  }
}