import { requestAnimFrame } from './helpers.js';

let canvas,
  ctx,
  input = {};

class Game {
  constructor(player, entity, engine, controls, auto) {
    this.player = player;
    this.entity = entity;
    this.engine = engine;
    this.controls = controls;
    this.auto = auto || false;
  }

  init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 250;

    // return if browser doesn't support WebGL or if failure
    if (!window.WebGLRenderingContext || !ctx) return;

    if (!this.auto) {
      ['keydown', 'keyup'].forEach(event => {
        document.addEventListener(
          event,
          e => {
            input = this.controls.checkInput(e);
          },
          false
        );
      });
    } else {
      input = this.controls;
    }

    this.animate();
  }

  animate = () => {
    requestAnimFrame(this.animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.engine.step(this.player, this.entity ? this.entity : null, input);
    this.draw();
  };

  draw = () => {
    ctx.fillStyle = this.player.color;
    ctx.fillRect(
      this.player.x,
      this.player.y,
      this.player.width,
      this.player.height
    );

    if (this.entity.length) {
      this.entity.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.width, e.height);
      });
    }
  };
}

export default Game;
