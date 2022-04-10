/* Audio */ 
import dodge from '../../sounds/dodge.mp3';
import punch from '../../sounds/punch.mp3';
import uppercut from '../../sounds/uppercut.mp3';

export default class LittleMac {
  constructor(selector) {
    this.dom = {
      el: document.querySelector(selector),
      spritesheet: document.querySelector(`${selector} .sprite-sheet`)
    };
    
    this.sounds = {
      dodge: new Audio(dodge),
      punch: new Audio(punch),
      uppercut: new Audio(uppercut),
    }
    
    this.isActive = false;
    this.isBusy = false;
    this.isAimingForTheFace = false;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('player1:left', e => this.dodge(e));
    document.addEventListener('player1:right', e => this.dodge(e, 'right'));
    document.addEventListener('player1:up', e => this.aimForTheHead(e));
    document.addEventListener('player1:down', e => this.block(e));
    document.addEventListener('player1:b', e => this.punch(e));
    document.addEventListener('player1:a', e => this.punch(e, 'right'));
    document.addEventListener('player1:start', e => this.uppercut(e));
  }
  
  dodge(e, dir = '') {
    if (this.isActive && !this.isBusy && e.detail.pressed) {
      this.isBusy = true;
      this.dom.el.className = `little-mac ${dir} dodge`;
      
      this.sounds.dodge.currentTime = 0;
      this.sounds.dodge.play();
      this.endAnimation();
    }
  }
  
  aimForTheHead(e) {
    this.isAimingForTheFace = e.detail.pressed;
  }
  
  block(e) {
    if (this.isActive && !this.isBusy && e.detail.pressed) {
      this.isBusy = true;
      this.dom.el.className = 'little-mac block';
    }
    
    if (this.isActive && this.isBusy && !e.detail.pressed) {
      this.isBusy = false;
      this.dom.el.className = 'little-mac idle';
    }
  }
  
  punch(e, dir = '') {
    if (this.isActive && !this.isBusy && e.detail.pressed) {
      this.isBusy = true;
      
      let className = `little-mac ${dir} `;
      className += this.isAimingForTheFace ? 'punch-to-face' : 'body-blow';
      this.dom.el.className = className;
      
      this.sounds.punch.currentTime = 0;
      this.sounds.punch.play();
      this.endAnimation();
    }
  }
  
  uppercut(e) {
    if (this.isActive && !this.isBusy && e.detail.pressed) {
      this.isBusy = true;
      this.dom.el.className = 'little-mac uppercut';
      
      this.sounds.uppercut.currentTime = 0;
      this.sounds.uppercut.play();
      this.endAnimation();
    }
  }
  
  endAnimation() {
    this.dom.el.addEventListener('animationend', () => {
      this.dom.el.className = 'little-mac idle';
      this.isBusy = false;
    }, {
      once: true,
      passive: true
    });
  }
}