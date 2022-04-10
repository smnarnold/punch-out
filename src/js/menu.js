import Screen from './screen.js';
import {Howl, Howler} from 'howler';

/* Audio */ 
import passkey1 from '../sounds/passkey-1.mp3';
import passkey2 from '../sounds/passkey-2.mp3';
import passkey3 from '../sounds/passkey-3.mp3';
import startgame from '../sounds/start-game.mp3';

export default class Menu extends Screen {
  constructor(selector) {
    super(selector);

    this.prefix = 'menu';
    
    this.dom.new = document.querySelector(`${selector} .${this.prefix}__btn--new`);
    this.dom.continue = document.querySelector(`${selector} .${this.prefix}__btn--continue`);
    this.dom.selected = document.querySelector(`${selector} .${this.prefix}__btn--selected`);
    this.dom.code = document.querySelector(`${selector} .${this.prefix}__pwd__code`);
    this.dom.glove = document.querySelector(`${selector} .${this.prefix}__title__glove`);
    
    this.sounds = {
      passkey1: new Audio(passkey1),
      passkey2: new Audio(passkey2),
      passkey3: new Audio(passkey3),
      passkey4: new Audio(passkey2),
      startGame: new Audio(startgame),
    }
    
    this.option = 'new';
    this.gameStarted = false;
    
    this.pwd = {
      index: 0,
      code: ['-','-','-','-','-','-','-','-','-']
    }

    this.goTo = new Event('round');

    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('player1:up', e => this.pressedUp(e));
    document.addEventListener('player1:down', e => this.pressedDown(e));
    document.addEventListener('player1:left', e => this.pressedLeft(e));
    document.addEventListener('player1:right', e => this.pressedRight(e));
    document.addEventListener('player1:start', e => this.pressedStart(e));

    this.dom.glove.addEventListener('animationend', () => this.dom.app.dispatchEvent(this.goTo));    
  }
  
  pressedUp(e) {
    if (this.isActive && e.detail.pressed) {
      if (!this.gameStarted && this.option === 'continue') { 
        this.selectNew();
      }
    }
  }

  pressedDown(e) {
    if (this.isActive && e.detail.pressed) {
      if (!this.gameStarted && this.option === 'new') {
        this.selectContinue();
      }
    }
  }
  
  pressedLeft(e) {
    if (this.isActive && e.detail.pressed) {
      if (!this.gameStarted && this.option === 'continue') { 
        this.updateCar(-1);
      }
    }
  }
  
  pressedRight(e) {
    if (this.isActive && e.detail.pressed) {
      if (!this.gameStarted && this.option === 'continue') { 
        this.updateCar(1);
      }
    }
  }
  
  pressedStart(e) {
    if (this.isActive && e.detail.pressed && !this.gameStarted) {
      if (this.option === 'new') {
        this.startGame();
      } else {
        this.pwdIncrementIndex();
      }
    }
  }
  
  /* methods */
  
  startGame() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.sounds.startGame.currentTime = 0;
      this.sounds.startGame.play();
      this.dom.el.classList.add('game-started');
    }
  }
  
  selectNew() {
    this.resetPwd();
    this.option = 'new';
    this.dom.new.classList.add(`${this.prefix}__btn--selected`);
    this.dom.continue.classList.remove(`${this.prefix}__btn--selected`);
  }
  
  selectContinue() {
    this.option = 'continue';
    this.dom.new.classList.remove(`${this.prefix}__btn--selected`);
    this.dom.continue.classList.add(`${this.prefix}__btn--selected`);
  }

  pwdIncrementIndex() {
    if (this.pwd.code[0] === '-') {
      this.selectNew();
    } else {
      this.pwd.index++;
    
      if (this.pwd.index < this.pwd.code.length) {
        this.updateCar(1);
      } else {
        this.selectNew();
      }
    }
  }
  
  updateCar(nbr) {
    let car = this.pwd.code[this.pwd.index];
      
    if (car === '-') car = -1;
    car += nbr;

    if (car > 9) car = 0;
    else if(car < 0) car = 9;
    
    const sound = this.sounds[`passkey${car % 4 + 1}`];
    sound.currentTime = 0;
    sound.play();

    this.pwd.code[this.pwd.index] = car;
    this.updatePwd();
  }
  
  resetPwd() {
    this.pwd.index = 0;
    this.pwd.code = ['-','-','-','-','-','-','-','-','-'];
    this.updatePwd();
  }
  
  updatePwd() {
    const code = this.pwd.code.join('');
    this.dom.code.innerText = code.replace(/([0-9-]{3})([0-9-]{3})([0-9-]{3})/, '$1 $2 $3');
  }
}