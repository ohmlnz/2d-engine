import { setFps, stopLoop } from './helpers.js';

let canvas, ctx

class Game {
  constructor(player, entity, engine, controls) {
    this.player = player
    this.entity = entity
    this.engine = engine
    this.controls = controls
    this.fps = 60
  }

  set setFps(fps) {
    stopLoop()
    setFps(fps, this.render)
    return this.fps = fps
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
        const input = this.controls.checkInput(e)
        this.engine.step(this.player, [this.entity], input)
      }, false);
    })
    setFps(this.fps, this.render)
  }
  
  render = () => {
    ctx.fillStyle = this.player.color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);
  
    ctx.fillStyle = this.entity.color;
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.entity.x, this.entity.y, this.entity.width, this.entity.height);
  }  
}

export default Game;