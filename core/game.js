import { requestAnimFrame } from '../helpers.js';
import { gamepadAPI } from '../controller/gamepad.js';
import { constants } from '../constants.js';
import bg from './bg.png';

class Game {
  constructor(player, entity, enemy, engine, controls, auto) {
    this.player = player;
    this.entity = entity;
    this.enemy = enemy;
    this.controls = controls;
    this.auto = auto || false;
    this.state = constants;
    this.engine = engine;
    this.canvas = null;
    this.ctx = null;
    this.input = {};
  }

  init(updatedState) {
    this.state = updatedState;
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = constants.width;
    this.canvas.height = constants.height;
    this.canvas.style.background = `url(${this.state.background}) no-repeat`;
    this.canvas.style.backgroundSize = 'cover';

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
    const camX = clamp(-this.player.x + this.canvas.width / 2, -this.canvas.width, 0);
    const camY = 0;

    this.ctx.translate(camX, camY);

    this.engine.step(this.player, this.entity || null, this.enemy, this.input, this.state);
    [this.player, ...this.entity, this.enemy].forEach(e => this.draw(e));
  };

  draw = entity => {
    if (!entity.spritesheet) {
      this.ctx.fillStyle = entity.color;
      this.ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
      if (entity.selected) {
        this.ctx.strokeStyle = 'yellow';
        this.ctx.stroke();
        this.ctx.lineWidth = 5;
        this.ctx.strokeRect(entity.x, entity.y, entity.width, entity.height);
      }
    } else {
      const { spritesheet, currentStatus, currentStatusIndex, currentDirection } = entity;
      const { sheet } = spritesheet;
      const { x, y, w, h } = spritesheet[currentStatus][currentDirection][currentStatusIndex];

      entity.updateTick();
      entity.hasOwnProperty('randomMotion') && entity.generateRandomMotion();
      this.ctx.drawImage(sheet.image, x, y, w, h, entity.x, entity.y, w, h);
    }
  };
}

export default Game;
