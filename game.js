import { requestAnimFrame } from './helpers.js';

let canvas, ctx, input = {}

class Game {
  constructor(player, entity, engine, controls) {
    this.player = player
    this.entity = entity
    this.engine = engine
    this.controls = controls
  }

  init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 250;
  
    // return if browser doesn't support WebGL or if failure
    if (!window.WebGLRenderingContext || !ctx) return;
    
    ['keydown', 'keyup'].forEach((event) => {
      document.addEventListener(event, e => {
        input = this.controls.checkInput(e)
      }, false);
    })

    this.animate()
  }

  animate = () => {
    requestAnimFrame(this.animate);
    ctx.clearRect(0, 0, 500, 250)
    this.engine.step(this.player, [this.entity], input)
    this.draw()
  }
  
  draw = () => {
    ctx.fillStyle = this.player.color;
		ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    ctx.fillStyle = this.entity.color;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.entity.x, this.entity.y, this.entity.width, this.entity.height);
  }  
}

export default Game;