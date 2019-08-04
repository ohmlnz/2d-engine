import { requestAnimFrame } from '../helpers.js';
import { gamepadAPI } from '../controller/gamepad.js';
import { constants } from '../constants.js';

class Game {
  constructor(player, entity, engine, controls, auto) {
    this.player = player;
    this.entity = entity;
    this.controls = controls;
    this.auto = auto || false;
    this.constants = constants;
    this.engine = engine;
    this.canvas = null;
    this.ctx = null;
    this.input = {};
  }

  init(updatedState) {
    this.constants = updatedState;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 700;
    this.canvas.height = 250;

    // return if browser doesn't support WebGL or if failure
    if (!window.WebGLRenderingContext || !this.ctx) return;

    if (!this.auto) {
      //keyboard controls
      ['keydown', 'keyup'].forEach(event => {
        document.addEventListener(
          event,
          e => {
            this.input = this.controls.checkInput(e);
          },
          false
        );
      });
    } else {
      this.input = this.controls;
    }

    this.animate();
  }

  animate = () => {
    const clamp = (value, min, max) => {
      if (value >= max) {
        return max;
      } else if (value <= min) {
        return min;
      } else {
        return value;
      }
    };

    requestAnimFrame(this.animate);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset current transformation
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // clamp the camera position to the world bounds while centering the camera around the player
    const camX = clamp(-this.player.x + this.canvas.width / 2, -1000, 800);
    const camY = -120 + this.canvas.height / 2;

    this.ctx.translate(camX, camY);

    this.engine.step(
      this.player,
      this.entity || null,
      this.input,
      this.constants
    );
    this.draw();
  };

  draw = () => {
    if (!this.player.spritesheet) {
      this.ctx.fillStyle = this.player.color;
      this.ctx.fillRect(
        this.player.x,
        this.player.y,
        this.player.width,
        this.player.height
      );
    } else {
      const {
        spritesheet,
        currentStatus,
        currentStatusIndex,
        currentDirection
      } = this.player;
      const { sheet } = spritesheet;
      const { x, y, w, h } = spritesheet[currentStatus][currentDirection][
        currentStatusIndex
      ];

      this.player.updateTick();

      // Draw the sprite
      this.ctx.drawImage(
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
        this.ctx.fillStyle = e.color;
        this.ctx.fillRect(e.x, e.y, e.width, e.height);
      });
    }

    // Draw particles
  };
}

export default Game;
