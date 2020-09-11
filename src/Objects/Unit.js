import Phaser from 'phaser';
import HealthBar from './HealthBar';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = hp;
    this.hp = hp;
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
    this.hb = new HealthBar(scene, x - 40, y - 60, hp);
  }

  setMenuItem(item) {
    this.menuItem = item;
  }

  attack(target) {
    target.takeDamage(this.damage);
    this.scene.events.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage`);
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }

    this.hb.update(-damage);
  }

  heal() {
    if (this.medicalKits > 0) {
      this.hp += 10;
      this.medicalKits -= 1;

      this.hb.update(20);
    }
  }

  setLifeFrame(life) {
    const percentage = (life * 100) / this.maxHp;

    if (percentage === 0) {
      this.lifeSprite.setFrame(3);
    } else if (percentage < 33) {
      this.lifeSprite.setFrame(2);
    } else if (percentage < 70) {
      this.lifeSprite.setFrame(1);
    } else {
      this.lifeSprite.setFrame(0);
    }
  }
}