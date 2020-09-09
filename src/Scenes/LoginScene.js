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
    let text = this.add.text(10, 10, 'Please login to play', {
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

          this.scene.sys.scenePlugin.start('Game', {warriorName: inputUsername.value});
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