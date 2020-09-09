import 'phaser';
import config from '../Config/config';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super('Login');
  }

  preload() {
    this.load.html('nameform', 'assets/text/loginform.html');
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");

    const instructions = this.add.text(10, 10, 'Instructions:', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '32px '
    });

    this.add.text(10, 50, '- Collect the three food baskets to win.', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '16px '
    });

    this.add.text(10, 70, '- Be carefull with the enemies, they\'re hidden everywhere', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '16px '
    });

    this.add.text(10, 90, '- You can use two medical kits in the battle to heal.', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '16px '
    });

    this.add.text(10, 110, '- Use the up and down arrows to change items in the battle, and space or enter to pick them.', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '16px '
    });

    let text = this.add.text(10, 130, 'Please login to play', {
      color: 'white',
      fontFamily: 'Arial',
      fontSize: '32px '
    });

    const btnWidth = config.width/2;
    const btnHeight = config.height/2;

    let element = this.add.dom(btnWidth, btnHeight).createFromCache('nameform');

    element.addListener('click');

    element.on('click', function (event) {

      if (event.target.name === 'loginButton') {
        const inputUsername = this.getChildByName('username');

        if (inputUsername.value !== '') {
          this.removeListener('click');
          this.scene.tweens.add({
            targets: element.rotate3d,
            x: 1,
            w: 90,
            duration: 3000,
            ease: 'Power3'
          });

          this.scene.tweens.add({
            targets: element,
            scaleX: 2,
            scaleY: 2,
            y: 700,
            duration: 3000,
            ease: 'Power3',
            onComplete: function () {
              element.setVisible(false);
            }
          });

          this.scene.sys.scenePlugin.start('Game', {name: inputUsername.value});
        } else {
          this.scene.tweens.add({
            targets: text,
            alpha: 0.1,
            duration: 200,
            ease: 'Power3',
            yoyo: true
          });
        }
      }

    });

    this.tweens.add({
      targets: element,
      y: 300,
      duration: 3000,
      ease: 'Power3'
    });
  }
}