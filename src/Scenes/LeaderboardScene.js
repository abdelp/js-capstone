import Phaser from 'phaser';
import Button from '../Objects/Button';
import { getScores } from '../Objects/scoresProvider';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  async create() {
    this.leaderboardTitle = this.add.text(300, 80, 'Leaderboard', { fontSize: '26px', fill: '#fff' });

    this.scoreList = (await getScores()).data.result;
    this.scoreList = this.scoreList.sort((a, b) => b.score - a.score);

    const length = this.scoreList.length > 10 ? 11 : this.scoreList.length;

    for (let i = 0; i < length; i += 1) {
      this.add.text(300, 115 + (i * 15), `${this.scoreList[i].user} ${this.scoreList[i].score}`, { color: 'white' });
    }

    this.menuButton = new Button(this, 400, 530, 'blueButton1', 'blueButton2', 'menu', 'Title');
  }
}