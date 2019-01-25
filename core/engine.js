import CollisionDetector from './detector.js'
import CollisionResolver from './resolver.js'
import { constants } from '../constants.js'

let detector = new CollisionDetector()
let resolver = new CollisionResolver()


class Engine {
	updatePosition(obj) {
		obj.vx += obj.ax;
		obj.x += obj.vx;
	}

	// updateJump(obj) {
	// 	obj.vy += obj.ay;
	// 	obj.y += obj.vy;
	// }

	step(player, entities, input) {
		//handles positional logic
		new Promise((resolve, reject) => {
			if (input[39]) {
				player.ax = constants.acc
			} else if (input[37]) {
				player.ax = -constants.acc
			} else {
				player.ax = 0
				player.vx = 0
			}

			// jumps

			if (input[32]) {
				if (!player.isJumping) {
					player.isJumping = true
				}
			}

			if (player.isJumping && !player.isFalling) {
				player.y -= 5
				if (player.y < player.maxJump) {
					player.isJumping = false
					player.isFalling = true
				}
			} else {
				player.y += 3.5
				if (player.y > 200) {
					player.isFalling = false
					player.ay = 0
					player.vy = 0
					player.y = 200
				}
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