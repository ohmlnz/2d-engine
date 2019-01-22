import CollisionDetector from './detector.js'
import CollisionResolver from './resolver.js'
import { constants } from '../constants.js'

let detector = new CollisionDetector()
let resolver = new CollisionResolver()


class Engine {
	updatePosition(obj) {
		//update velocity
		obj.vx += obj.ax;
		obj.vy += obj.ay;
		
		//update position
		obj.x += obj.vx;
		obj.y += obj.vy;

	}

	step(player, entities, input) {
		//handles positional logic
		new Promise((resolve, reject) => {
			if (input[39]) {
				player.ax = constants.acc
			} else {
				player.ax = 0
			}
			
			if (input[37]) {
				player.ax = -constants.acc
			} 

			this.updatePosition(player)
			resolve()
		}).then(() => {
			// detect and resolve each collision individually
			if (entities) {
				entities.forEach(collidee => {
					let collision = detector.isColliding(player, collidee)
					if (collision) {
						resolver.resolveElastic(player, collidee)
					}
				})
			}
		})			
	}
}

export default Engine;