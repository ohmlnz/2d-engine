import { constants } from '../constants.js'

class PhysicsEntity {
	constructor(posX, posY, color) {
    this.width  = 20;
    this.height = 20;

    // Store a half size for quicker calculations
    this.halfWidth = this.width * .5;
    this.halfHeight = this.height * .5;

    // Position
    this.x = posX || 0;
    this.y = posY || 0;

    // Velocity
    this.vx = 0;
    this.vy = 0;

    // Acceleration
    this.ax = 0;
    this.ay = 0;

    // Color
    this.color = color;

    // Speed
    this.speed = constants.acc

    // Jump
    this.isJumping = false
    this.isFalling = false
    this.maxJump = 150  
	}

	updateBounds() {
		this.halfWidth = this.width * .5;
		this.halfHeight = this.height * .5;
	}

  // Getters for the mid point of the rect
  get midX() {
    return this.halfWidth + this.x;
  }

  get midY() {
    return this.halfHeight + this.y;
  }

  // Getters for the top, left, right, and bottom
  // of the rectangle
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