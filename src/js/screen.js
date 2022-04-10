import merge from 'lodash.merge';

export default class Screen {
  constructor(selector, settings = {}) {
    this.dom = {
      app: document.querySelector('#app'),
      el: document.querySelector(selector),
    }

    this.settings = {
      original: {}
    };

    this.isActive = false;
  }

  activate(state = true) {
    this.isActive = state;
    this.dom.el.classList.toggle('is-active', state);
    if (state) this.mount();
    else this.unmount();
  }

  set updateSettings(settingsObj) {
    this.settings = merge(this.settings, this.settings.original);
    
    if (this.isObject(settingsObj)) {
      this.settings = merge(this.settings, settingsObj);
    }
  }

  isObject(el) {
    return typeof el === 'object' && !Array.isArray(el) && el !== null;
  }

  mount() {}
  unmount() {}
}