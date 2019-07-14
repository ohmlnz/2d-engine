import { keys } from '../constants.js';

class Controls {
  constructor() {
    this.keyMap = {
      RIGHT: false,
      LEFT: false,
      UP: false
    };
  }

  checkInput(k) {
    this.keyMap[keys[k.keyCode]] = k.type === 'keydown';
    return this.keyMap;
  }
}

export default Controls;
