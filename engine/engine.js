import CollisionDetector from './detector.js'
import CollisionResolver from './resolver.js'
let detector = new CollisionDetector()
let resolver = new CollisionResolver()


class Engine {
	step(player, entities, input) {
		// handles positional logic
		new Promise((resolve, reject) => {
			if (input === 37 || input === 65) {
				player.setX = player.x - 3
			} else if (input === 39 || input === 68) {
				player.setX = player.x + 3
			}
			resolve()
		}).then(() => {
			// detect and resolve each collision individually
			entities.forEach(collidee => {
				let collision = detector.isColliding(player, collidee)
				if (collision) {
					resolver.resolveElastic(player, collidee)
				}
			})
		})			
	}
}

export default Engine;