class Controls {
  constructor() {
    this.keyMap = {
      32: null,
      39: null,
      37: null,
      68: null,
      65: null
    }
  }

  checkInput(k) { 
    this.keyMap[k.keyCode] = k.type === 'keydown'
    return this.keyMap
  }
}

export default Controls