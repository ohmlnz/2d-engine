class CollisionResolver {
  resolveElastic(player, entity, constants) {
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

export default CollisionResolver;
