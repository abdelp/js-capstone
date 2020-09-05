import 'phaser';
import HeroesMenu from './../Objects/HeroesMenu';
import ActionsMenu from './../Objects/ActionsMenu';
import EnemiesMenu from './../Objects/EnemiesMenu';
import Message from './../Objects/Message';

export default class UIScene extends Phaser.Scene {

  constructor() {
    super('UIScene');
  }

  createPanels(x, y, w, h) {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);

    this.graphics.strokeRect(x, y, w, h);
    this.graphics.fillRect(x, y, w, h);
    this.graphics.strokeRect(x + w, y, w, h);
    this.graphics.fillRect(x + w, y, w, h);
    this.graphics.strokeRect(x + (2 * w), y, w, h);
    this.graphics.fillRect(x + (2 * w), y, w, h);
  }

  create()
  {
    this.createPanels(10, 350, 260, 90);

    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(16, 363, this);           
    this.actionsMenu = new ActionsMenu(276, 363, this);            
    this.enemiesMenu = new EnemiesMenu(536, 363, this);

    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);
            
    this.battleScene = this.scene.get("BattleScene");                                

    this.input.keyboard.on("keydown", this.onKeyInput, this);
    this.events.on("SelectedAction", this.onSelectedAction, this);

    this.sys.events.on('wake', this.createMenu, this);

    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);        
    
    this.createMenu();
    this.currentMenu = this.heroesMenu;
    this.currentMenu.select(0);  
  }

  createMenu() {
    this.remapHeroes();
    this.remapEnemies();

    this.battleScene.nextTurn(); 
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection("attack", index);   
  }

  onSelectedAction(index) {
    if (this.currentMenu === this.heroesMenu) {
      this.currentMenu = this.actionsMenu
      this.currentMenu.select(0);
    } else if (this.currentMenu === this.actionsMenu) {
      this.currentMenu = this.enemiesMenu;
      this.enemiesMenu.select(0);
    } else if (this.currentMenu === this.enemiesMenu) {
      this.onEnemy(index);
    }
  }

  remapHeroes() {
    const heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  }

  remapEnemies() {
    const enemies = this.battleScene.enemies;
    this.enemiesMenu.remap(enemies);
  }

  onKeyInput(event) {
    if(this.currentMenu && this.currentMenu.selected) {
      if(event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
      } else if(event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
      } else if(event.code === "Space" || event.code === "Enter") {
        this.currentMenu.confirm();
      }
    }
  }
};