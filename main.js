/* CSS */
import './style.scss'
const screensCSS = import.meta.globEager('./src/styles/screens/*.scss');

/* JS */
import NESCntlr from 'nes-cntlr';
import debounce from 'lodash.debounce';
import Loading from './src/js/loading.js';
import Intro from './src/js/intro.js';
import Menu from './src/js/menu.js';
import Round from './src/js/round.js';
import Fight from './src/js/fight.js';

/* HTML */
import loadingHTML from "./src/html/loading.html?raw";
import introHTML from "./src/html/intro.html?raw";
import menuHTML from "./src/html/menu.html?raw";
import roundHTML from "./src/html/round.html?raw";
import fightHTML from "./src/html/fight.html?raw";

const app = document.querySelector('#app');
app.innerHTML = loadingHTML + introHTML + menuHTML + roundHTML + fightHTML;

/* --------------------------------- */
let player1 = new NESCntlr({
  virtual: 'always'
});

class Game {
  constructor() {
    this.dom = {
      app: document.querySelector('#app'),
    }

    this.screen = {
      active: null,
      loading: new Loading('.screen.loading'),
      intro: new Intro('.screen.intro'),
      menu: new Menu('.screen.menu'),
      round: new Round('.screen.round', {
        player: { 
          age: 17
        }, 
        round: 3
      }),
      fight: new Fight('.screen.fight'),
    }

    this.init();
  }
  
  init() {
    this.bindEvents();
    this.refresh();
    this.goToScreen('loading');
  }
  
  bindEvents() {
		window.addEventListener('orientationchange', e => this.refresh(e));
    window.addEventListener('resize', debounce(e => this.refresh(e), 300));

    this.dom.app.addEventListener('intro', () => this.goToScreen('intro'));
    this.dom.app.addEventListener('menu', () => this.goToScreen('menu'));
    this.dom.app.addEventListener('round', () => this.goToScreen('round'));
    this.dom.app.addEventListener('fight', () => this.goToScreen('fight'));
	}

  goToScreen(screen) {
    if (this.screen.active !== null) {
      this.screen[this.screen.active].activate(false);
    }
    
    if(this.screen[screen]) {
      this.screen.active = screen;
      this.screen[screen].activate(true);
    }
  }
  
  refresh() {
    const isMobile = this.isTouchDevice && window.innerWidth < 992;
    document.body.classList.toggle('mobile-device', isMobile);
  }
  
  get isTouchDevice() {
    let touchDetected = 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
    return touchDetected ? true : false;
  }
}

const game = new Game();
