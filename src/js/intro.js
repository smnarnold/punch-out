import Screen from './screen.js';

/* Audio */ 

export default class Intro extends Screen {
  constructor(selector) {
    super(selector);

    this.goTo = new Event('menu');
  }

  mount() {
    setTimeout(() => this.dom.app.dispatchEvent(this.goTo), 4000);

  }
}