import CollisionDetector from './detector.js';
import CollisionResolver from './resolver.js';

let detector = new CollisionDetector();
let resolver = new CollisionResolver();

class Engine {
  handleConstantMotion(player, input) {
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

  handleAcceleration(player, input, constants) {
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

  async handleJumps(player, input, constants) {
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

  async step(player, entities, input, constants) {
    //handles positional logic
    //await this.handleAcceleration(player, input);
    await this.handleConstantMotion(player, input, constants);
    await this.handleJumps(player, input, constants);

    // detect and resolve each collision individually
    if (entities) {
      entities.forEach(collidee => {
        let collision = detector.isColliding(player, collidee);
        if (collision) {
          resolver.resolveElastic(player, collidee, constants);
        }
      });
    }
  }
}

export default Engine;
