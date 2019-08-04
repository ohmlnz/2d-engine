class Engine {
  constructor() {
    this.player = null;
    this.input = null;
    this.constants = null;
  }

  async step(player, entities, input, constants) {
    this.player = player;
    this.input = input;
    this.constants = constants;

    // handles positional logic
    //await this.handleAcceleration();
    await this.handleConstantMotion();
    await this.handleJumps();

    // detects and resolve each collision individually
    if (entities) {
      entities.forEach(collidee => {
        let collision = this.isColliding(collidee);
        if (collision) {
          this.resolveElastic(collidee, constants);
        }
      });
    }
  }

  handleConstantMotion() {
    const { input, player } = this;
    if (input['RIGHT']) {
      player.updateDirection('right');
      player.currentStatus !== 'walking' &&
        !player.isJumping &&
        player.updateStatus('walking');
      player.x += 5;
    } else if (input['LEFT']) {
      player.updateDirection('left');
      player.currentStatus !== 'walking' && player.updateStatus('walking');
      player.x -= 5;
    } else if (player.currentStatus === 'walking') {
      player.updateStatus('idle');
    }
  }

  handleAcceleration() {
    const { input, player, constants } = this;
    if (input['RIGHT']) {
      player.ax = constants.acc;
    } else if (input['LEFT']) {
      player.ax = -constants.acc;
    } else {
      player.ax = 0;
      player.vx = 0;
    }

    player.vx += player.ax;
    player.x += player.vx;
  }

  async handleJumps() {
    const { input, player, constants } = this;
    if (input['UP'] && !player.isJumping && !player.isFalling) {
      player.isJumping = true;
      player.updateStatus('jumping');
    }

    if (player.isJumping && !player.isFalling) {
      player.y -= 5;
      if (player.y < player.maxJump) {
        player.isJumping = false;
        player.isFalling = true;
      }
    } else if (player.isFalling) {
      player.updateJumpBoundaries();
      player.y += 3.5;
      // if player touches the ground
      if (player.y > constants.y) {
        player.updateStatus('idle');
        player.isFalling = false;
        player.ay = 0;
        player.vy = 0;
        player.y = constants.y;
      }
    }
  }

  isColliding(collidee) {
    const collider = this.player;
    let l1 = collider.left;
    let t1 = collider.top;
    let r1 = collider.right;
    let b1 = collider.bottom;

    let l2 = collidee.left;
    let t2 = collidee.top;
    let r2 = collidee.right;
    let b2 = collidee.bottom;

    if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
      return false;
    }

    return true;
  }

  resolveElastic(entity, constants) {
    const { player } = this;
    let pMidX = player.midX;
    let pMidY = player.midY;
    let aMidX = entity.midX;
    let aMidY = entity.midY;

    let dx = (aMidX - pMidX) / entity.halfWidth;
    let dy = (aMidY - pMidY) / entity.halfHeight;

    let absDX = Math.abs(dx);
    let absDY = Math.abs(dy);

    // If the distance between the normalized x and y
    // position is less than a small threshold (.1 in this case)
    // then this object is approaching from a corner
    if (Math.abs(absDX - absDY) < 0.1) {
      if (dx < 0) {
        // Set the player x to the right side
        player.x = entity.right;
        // If the player is approaching from negative X
      } else {
        // Set the player x to the left side
        player.x = entity.left - player.width;
      }
      // If the player is approaching from positive Y
      if (dy < 0) {
        // Set the player y to the bottom
        player.y = entity.bottom;
        // If the player is approaching from negative Y
      } else {
        // Set the player y to the top
        player.y = entity.top - player.height;
      }

      // If the object is approaching from the sides
    } else if (absDX > absDY) {
      // If the player is approaching from positive X
      if (dx < 0) {
        player.x = entity.right;
      } else {
        // If the player is approaching from negative X
        player.x = entity.left - player.width;
      }
      // If this collision is coming from the top or bottom more
    } else {
      // If the player is approaching from positive Y
      if (dy < 0) {
        player.y = entity.bottom;
      } else {
        // If the player is approaching from negative Y
        player.y = entity.top - player.height;

        // stop falling if collides with top part of entity
        if (player.currentStatus === 'jumping') {
          player.updateStatus('idle');
        }
        player.isFalling = false;
        player.isJumping = false;
      }
    }

    // re-enable falling boolean if exceeds bounds of entity
    if (
      (player.left + (player.width - 5) <= entity.left ||
        player.right - (player.width - 5) >= entity.right) &&
      !player.isJumping &&
      player.y < constants.y
    ) {
      player.isFalling = true;
    }
  }
}

export default Engine;
