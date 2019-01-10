// Rect collision tests the edges of each rect to
// test whether the objects are overlapping the other

class CollisionDetector {
	collideRect(collider, collidee) {
	// Store the collider and collidee edges
	let l1 = collider.getLeft();
	let t1 = collider.getTop();
	let r1 = collider.getRight();
	let b1 = collider.getBottom();
	
	let l2 = collidee.getLeft();
	let t2 = collidee.getTop();
	let r2 = collidee.getRight();
	let b2 = collidee.getBottom();
	
	// If the any of the edges are beyond any of the
	// others, then we know that the box cannot be
	// colliding
	if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
		return false;
	}
	
	// If the algorithm made it here, it had to collide
	return true;
	}
}

export default CollisionDetector;