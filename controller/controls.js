class Controls {
  constructor(player) {
    this.player = player
    this.keyMap = {
      32: null,
      39: null,
      37: null,
      68: null,
      65: null
    }
  }

  checkInput(k) { 
    for (let i in this.keyMap) {
      if (+i === k.keyCode) {
        return +i
        // check for multiple inputs
        //this.keyMap[k.keyCode] = k.type == 'keydown'
      }
    }
  }
}

export default Controls