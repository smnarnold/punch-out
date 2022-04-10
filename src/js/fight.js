import Screen from './screen.js';
import LittleMac from './partials/little-mac.js';

export default class Fight extends Screen {
  constructor(selector) {
    super(selector);

    this.littlemac = new LittleMac('.little-mac');
  }

  mount() {
    this.littlemac.isActive = true;
  }
}