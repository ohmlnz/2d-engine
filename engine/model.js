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

	// Setters for the position, velocity, 
	// and acceleration
	set pos({ x, y }) {
		return {
			[this.x]: x,
      [this.y]: y
    }
  }
  
  set setX(x) {
    return this.x = x
  }

  set setY(y) {
    return this.y = y
  }
}

export default PhysicsEntity;