import PhysicsEntity from './entity';
import { constants } from '../../constants.js';

class Player extends PhysicsEntity {
  constructor(posX, posY, width, height, color, spritesheet = null) {
    super(posX, posY, width, height, color);
    // Status
    this.spritesheet = spritesheet;
    this.currentStatus = 'idle';
    this.currentDirection = 'right';
    this.currentStatusIndex = 0;
    this.maxStatusIndex = this.spritesheet[this.currentStatus][
      this.currentDirection
    ].length;

    // Ticks
    this.currentTick = 0;

    // Speed
    this.speed = constants.acc;

    // Jump
    this.isJumping = false;
    this.isFalling = false;
    this.maxJump = this.y - 50;

    // Framerate
    this.framerate = 8;
  }

  updateDirection(direction) {
    this.currentDirection = direction;
  }

  updateTick() {
    this.currentTick++;

    // Sprite animations
    if (this.currentTick >= this.framerate) {
      this.currentTick = 0;
      this.currentStatusIndex++;
    }

    // Sprite arrays indexes
    if (this.currentStatusIndex >= this.maxStatusIndex) {
      this.currentStatusIndex = 0;
    }
  }

  updateStatus(status) {
    if (this.spritesheet) {
      this.currentStatus = status;
      this.currentTick = 0;
      this.currentStatusIndex = 0;
      this.maxStatusIndex = this.spritesheet[this.currentStatus][
        this.currentDirection
      ].length;
    }
  }

  updateJumpBoundaries() {
    this.maxJump = this.y - 50;
  }
}

export default Player;
