import 'phaser';
import PlayerCharacter from './../Objects/PlayerCharacter';
import Enemy from './../Objects/Enemy';
import destroyObjs from './../Objects/Utilities';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create()
  {
    this.cameras.main.setBackgroundColor("rgba(0, 200, 0, 0.5)");
    this.startBattle();
    this.sys.events.on('wake', this.startBattle, this);             
  }

  startBattle() {
    var warrior = new PlayerCharacter(this, 250, 80, "player", 1, "Aragorn", 100, 20);        
    this.add.existing(warrior);
    
    // player character - mage
    // var mage = new PlayerCharacter(this, 250, 100, "player", 4, "Mage", 80, 8);
    // this.add.existing(mage);            

    const ork = new Enemy(this, 80, 80, "ork", null, "Ork", 50, 3);
    this.add.existing(ork);

    // var dragonOrange = new Enemy(this, 50, 100, "dragonorrange", null,"Dragon2", 50, 3);
    // this.add.existing(dragonOrange);
    
    // array with heroes
    this.heroes = [ warrior ];
    // array with enemies
    this.enemies = [ ork ];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run("UIScene");
  }

  nextTurn() {
    if(this.checkEndBattle()) {           
      this.endBattle();
      return;
    }

    do {
      this.index++;
      if(this.index >= this.units.length) this.index = 0;
    } while(!this.units[this.index].living);

    if(this.units[this.index] instanceof PlayerCharacter) {
      this.events.emit("PlayerSelect", this.index);
    } else {
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while(!this.heroes[r].living);

      this.units[this.index].attack(this.heroes[r]);  
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  }

  checkEndBattle() {        
    let victory = !this.enemies.some(enemy => enemy.living);
    let gameOver = !this.heroes.some(heroe => heroe.living);

    return victory || gameOver;
  }

  receivePlayerSelection(action, target) {
    if (action == "attack") {            
        this.units[this.index].attack(this.enemies[target]);              
    }
    // next turn in 3 seconds
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
  }

  endBattle() {
    this.heroes.length = 0;
    this.enemies.length = 0;
    destroyObjs(this.units);
    this.units.length = 0;
    this.scene.sleep('UIScene');
    this.scene.switch('Game');
  }
}