class Controls {
  constructor(x, y) {
    this.keyMap = {
      32: null,
      39: null,
      37: null,
      68: null,
      65: null
    }
    this.x = x
    this.y = y
  }

  get posX() {
    return this.x
  }

  get posY() {
    return this.y
  }

  checkValidInput(k) { 
    for (let i in this.keyMap) {
      if (+i === k.keyCode) {
        console.log(this.keyMap)
        this.computeCoordinates(i)
        // check for multiple inputs
        this.keyMap[k.keyCode] = k.type == 'keydown'
      }
    }
  }

  computeCoordinates(key) {
    if (key === 37 || key === 65) {
      this.x -= 3
    } else if (key === 39 || key === 68) {
      this.x += 3
    }

    if (key === 32) {
      this.handleJump()
    }
  }

  handleJump() {
    this.interval = setInterval(() => {
      if (this.y < 40) { 
        clearInterval(this.interval)
        this.innerInterval = setInterval(() => {
          if (this.y >= 100) clearInterval(this.innerInterval)
          this.y += 2.5
        })
      }
      this.y -= 2.5
    }, 1)
  }
}

export default Controls;