import { constants } from '../constants.js';

class PhysicsEntity {
  constructor(posX, posY, width, height, color, spritesheet = null) {
    this.width = width;
    this.height = height;

    // Store a half size for quicker calculations
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;

    // Position
    this.x = posX || 0;
    this.y = posY || 0;

    // Velocity
    this.vx = 0;
    this.vy = 0;

    // Acceleration
    this.ax = 0;
    this.ay = 0;

    this.color = color;

    // Status
    this.spritesheet = spritesheet;
    this.currentStatus =
      Object.keys(this.spritesheet).find(e => e === 'idle') ||
      Object.keys(this.spritesheet).filter(e => e !== 'sheet')[0];
    this.currentDirection = 'right';
    this.currentStatusIndex = 0;
    this.maxStatusIndex = this.spritesheet.sheet.particles
      ? this.spritesheet[this.currentStatus].length
      : this.spritesheet[this.currentStatus][this.currentDirection].length;

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
      this.maxStatusIndex = this.spritesheet.sheet.particles
        ? this.spritesheet[this.currentStatus].length
        : this.spritesheet[this.currentStatus][this.currentDirection].length;
    }
  }

  updateJumpBoundaries() {
    this.maxJump = this.y - 50;
  }

  updateBounds() {
    this.halfWidth = this.width * 0.5;
    this.halfHeight = this.height * 0.5;
  }

  // Getters for mid points
  get midX() {
    return this.halfWidth + this.x;
  }

  get midY() {
    return this.halfHeight + this.y;
  }

  // Getters for top, left, right, and bottom
  get top() {
    return this.y;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
  get bottom() {
    return this.y + this.height;
  }
}

export default PhysicsEntity;
