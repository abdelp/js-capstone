import Phaser from 'phaser';
import Button from '../Objects/Button';
import { getScores } from '../Objects/scoresProvider';

export default class gameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  async create() {
    this.gameFinishedText = this.add.text(300, 50, 'You have lost', { fontSize: '32px', fill: '#fff' });

    this.scoreList = (await getScores()).data.result;
    this.scoreList = this.scoreList.sort((a, b) => b.score - a.score);

    const length = this.scoreList.length > 10 ? 11 : this.scoreList.length;

    for (let i = 0; i < length; i += 1) {
      this.add.text(300, 115 + (i * 15), `${this.scoreList[i].user} ${this.scoreList[i].score}`, { color: 'white' });
    }

    this.menuButton = new Button(this, 400, 530, 'blueButton1', 'blueButton2', 'menu', 'Title');
  }
}