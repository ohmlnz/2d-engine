class CollisionDetector {
  isColliding(collider, collidee) {
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
}

export default CollisionDetector;
