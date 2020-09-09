import Unit from './Unit';

export default class PlayerCharacter extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, medicalKits, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.flipX = true;
    this.setScale(2);
    this.medicalKits = medicalKits;
  }
}