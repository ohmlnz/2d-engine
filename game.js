import { requestAnimFrame } from './helpers.js';
import { gamepadAPI } from './controller/gamepad.js';
import { constants } from './constants.js';

let canvas,
  ctx,
  input = {};

class Game {
  constructor(player, entity, engine, controls, auto) {
    this.player = player;
    this.entity = entity;
    this.controls = controls;
    this.auto = auto || false;
    this.constants = constants;
    this.engine = engine;
  }

  init(updatedState) {
    this.constants = updatedState;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 250;

    // return if browser doesn't support WebGL or if failure
    if (!window.WebGLRenderingContext || !ctx) return;

    if (!this.auto) {
      //keyboard controls
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

  clamp = (value, min, max) => {
    if (value >= max) {
      return max;
    } else if (value <= min) {
      return min;
    } else {
      return value;
    }
  };

  animate = () => {
    requestAnimFrame(this.animate);

    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset current transformation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // clamp the camera position to the world bounds while centering the camera around the player
    const camX = this.clamp(-this.player.x + canvas.width / 2, -1000, 800);
    const camY = -120 + canvas.height / 2;

    ctx.translate(camX, camY);

    this.engine.step(this.player, this.entity || null, input, this.constants);
    this.draw();
  };

  draw = () => {
    if (!this.player.status) {
      ctx.fillStyle = this.player.color;
      ctx.fillRect(
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height
      );
    } else {
      const {
        status,
        currentStatus,
        currentStatusIndex,
        currentDirection
      } = this.player;
      const { sheet } = status;
      const { x, y, w, h } = status[currentStatus][currentDirection][
        currentStatusIndex
      ];

      this.player.updateTick();

      // Draw the sprite
      ctx.drawImage(
        sheet.image,
        x,
        y,
        w,
        h,
        this.player.x,
        this.player.y,
        w,
        h
      );
    }

    // Draw entities
    if (this.entity.length) {
      this.entity.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.width, e.height);
      });
    }
  };
}

export default Game;
