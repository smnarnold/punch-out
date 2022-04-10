import Screen from './screen.js';
import {Howl, Howler} from 'howler';

/* Audio */ 
import load from '../sounds/loading.ogg';

export default class Loading extends Screen {
  constructor(selector) {
    super(selector);

    this.dom.top = document.querySelector(`.screen${selector} .nes-top`);

    this.audio = {
      load: new Howl({
        src: [load],
        volume: 1
      }),
    }

    this.goTo = new Event('intro');

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('player1:start', e => this.transition(e));

    this.dom.top.addEventListener('animationend', () => this.dom.app.dispatchEvent(this.goTo));
  }

  transition(e) {
    if (this.isActive && e.detail.pressed) {
      this.audio.load.play();
      
      this.dom.el.classList.add('animate');
    }
  }
}