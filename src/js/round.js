import Screen from './screen.js';
import {Howl, Howler} from 'howler';

/* Audio */ 
import crowd from '../sounds/crowd.mp3';

export default class Round extends Screen {
  constructor(selector, settings) {
    super(selector);

    this.settings = {
      original: {
        player: {
          name: 'Little Mac',
          ranked: 3,
          age: 17,
          weight: 107,
          desc: 'From Bronx<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;N.Y.'
        },
        opponent: {
          name: 'Glass Joe',
          ranked: 2,
          age: 38,
          weight: 110,
          desc: 'From<br>&nbsp;Paris<br>&nbsp;&nbsp;&nbsp;France'
        },
        round: 1
      }
    }

    this.dom.roundWrapper = document.querySelector(`${selector} .round__wrapper`);

    this.dom.player = {
      desc: document.querySelector(`${selector} .player__desc`),
      age: document.querySelector(`${selector} .player__age`),
      record: {
        w: document.querySelector(`${selector} .player__w`),
        l: document.querySelector(`${selector} .player__l`),
        ko: document.querySelector(`${selector} .player__ko`),
      },
      weight: document.querySelector(`${selector} .player__weight`),
      picture: document.querySelector(`${selector} .player__picture`),
      ranked: document.querySelector(`${selector} .player__rank`),
      name: document.querySelector(`${selector} .player__name`),
    }

    this.dom.board = {
      el: document.querySelector(`${selector} .board`),
      title: document.querySelector(`${selector} .board__title`),
    }

    this.sounds = {
      crowd: new Audio(crowd)
    }

    this.goTo = new Event('fight');

    this.updateSettings = settings;
    this.init();
  }

  init() {
    this.updateHTML();
    this.bindEvents();
  }

  updateHTML() {
    this.updatePlayerHTML();
    this.updateBoardHTML();
  }

  updatePlayerHTML() {
    this.dom.player.age.innerText = this.settings.player.age;
  }

  updateBoardHTML() {
    let title = "Round";
    
    if (this.settings.round === 3) {
      title = "Final Round";
    }
    this.dom.board.el.className = `board board--nbr${this.settings.round}`;
    this.dom.board.title.innerText = title;
  }

  bindEvents() {
    document.addEventListener('player1:start', e => this.transition(e));

    this.dom.roundWrapper.addEventListener('transitionend', () => {
      setTimeout(() => this.dom.app.dispatchEvent(this.goTo), 2500);
    });    
  }

  transition(e) {
    if (this.isActive && e.detail.pressed) {
      this.sounds.crowd.currentTime = 0;
      this.sounds.crowd.play();
      this.dom.el.classList.add('transition');
    }
  }
}