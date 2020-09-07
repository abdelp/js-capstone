import 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);

    this.lifeSprite = this.scene.add.sprite(x, y - 70, 'life', 0);
    this.type = type;
    this.maxHp = this.hp = hp;
    this.lifeText = this.scene.add.text(x - 90, y - 105, `${this.hp}/${this.maxHp}`);
    this.lifeText.setOrigin(0, 0);
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
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
    if(this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;   
      this.menuItem = null;
    }
    this.setLifeFrame(this.hp);
    this.setLifeText();
  }

  heal(target, hp) {
    if(target.living) {
      target.hp += hp;
    }
  }

  setLifeFrame(life) {
    const percentage = life * 100 / this.maxHp;

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

  setLifeText() {
    this.lifeText.setText(`${this.hp}/${this.maxHp}`);
  }
}