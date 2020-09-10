import Phaser from 'phaser';
import PlayerCharacter from '../Objects/PlayerCharacter';
import Enemy from '../Objects/Enemy';
import { destroyObjs } from '../Objects/Utilities';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.gameScene = this.scene.get('Game');
    this.warrior = this.gameScene.warrior;
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);
  }

  startBattle() {
    const aragorn = new PlayerCharacter(this, 150, 200, 'player', 1, 'Aragorn', this.gameScene.warrior.hp, this.gameScene.warrior.medicalKits, 50);

    this.add.existing(aragorn);

    const orc = new Enemy(this, 450, 200, 'ork', null, 'orc', 100, 10);
    this.add.existing(orc);

    this.heroes = [aragorn];
    this.enemies = [orc];
    this.units = this.heroes.concat(this.enemies);
    this.index = -1;

    this.scene.run('UIScene');
  }

  nextTurn() {
    const endGame = this.checkEndBattle();

    if (endGame === 1) {
      this.endBattle();
      return;
    } if (endGame === -1) {
      this.scene.sleep('UIScene');
      this.scene.start('GameOver', { name: this.warrior.name, score: this.warrior.points });
      return;
    }

    do {
      this.index += 1;
      if (this.index >= this.units.length) this.index = 0;
    } while (!this.units[this.index].living);

    if (this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit('PlayerTurn', this.index);
    } else {
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);

      this.units[this.index].attack(this.heroes[r]);
      this.gameScene.events.emit('health points updated', this.heroes[r].hp);

      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  }

  checkEndBattle() {
    const victory = !this.enemies.some(enemy => enemy.living);
    const gameOver = !this.heroes.some(heroe => heroe.living);
    let result = 0;

    if (victory) {
      result = 1;
    } else if (gameOver) {
      result = -1;
    }

    return result;
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    } else if (action === 'heal') {
      if (this.heroes[target].medicalKits > 0) {
        this.units[this.index].heal();
      }
    }

    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  endBattle() {
    this.gameScene.events.emit('update score points', 20);
    this.heroes.length = 0;
    this.enemies.length = 0;
    destroyObjs(this.units);
    this.units.length = 0;
    this.scene.sleep('UIScene');
    this.scene.switch('Game');
  }
}