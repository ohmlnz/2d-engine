class PhysicsEntity {
  constructor(posX, posY, width, height, color) {
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
  }

  selected = false;

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
