import PhysicsEntity from './entity';

class Particle extends PhysicsEntity {
  constructor(posX, posY, width, height, color, spritesheet = null) {
    super(posX, posY, width, height, color);
    // Status
    this.spritesheet = spritesheet;
    this.currentStatus = Object.keys(this.spritesheet).filter(
      e => e !== 'sheet'
    )[0];
    this.currentStatusIndex = 0;
    this.maxStatusIndex = this.spritesheet[this.currentStatus].length;

    // Ticks
    this.currentTick = 0;

    // Framerate
    this.framerate = 8;
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
      this.maxStatusIndex = this.spritesheet[this.currentStatus].length;
    }
  }

  updateJumpBoundaries() {
    this.maxJump = this.y - 50;
  }
}

export default Particle;
