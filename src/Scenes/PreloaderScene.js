import 'phaser';
import { destroyObjs, loadAssets } from './../Objects/Utilities';

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    this.add.image(400, 200, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', function () {
      const objects = [ progressBar, progressBox, loadingText, percentText ];
      destroyObjs(objects);
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    const assets = [
      {key: 'blueButton1', path: 'assets/ui/blue_button02.png', type: 'image'},
      {key: 'blueButton2', path: 'assets/ui/blue_button03.png', type: 'image'},
      {key: 'phaserLogo', path: 'assets/logo.png', type: 'image'},
      {key: 'box', path: 'assets/ui/grey_box.png', type: 'image'},
      {key: 'checkedBox', path: 'assets/ui/blue_boxCheckmark.png', type: 'image'},
      {key: 'bgMusic', path: ['assets/TownTheme.mp3'], type: 'audio'}
    ];

    loadAssets(this, assets);
  }

  ready () {
    this.readyCount++;
    if (this.readyCount === 2) this.scene.start('Title');
  }
};
