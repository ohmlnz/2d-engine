class Engine {
	step(elapsed) {
		let gx = GRAVITY_X * elapsed;
		let gy = GRAVITY_Y * elapsed;
		let entity;
		let entities = this.entities;
		
		for (let i = 0, length = entities.length; i < length; i++) {
			entity = entities[i];
			switch (entity.type) {
				case PhysicsEntity.DYNAMIC:
					entity.vx += entity.ax * elapsed + gx;
					entity.vy += entity.ay * elapsed + gy;
					entity.x  += entity.vx * elapsed;
					entity.y  += entity.vy * elapsed;
					break;
				case PhysicsEntity.KINEMATIC:
					entity.vx += entity.ax * elapsed;
					entity.vy += entity.ay * elapsed;
					entity.x  += entity.vx * elapsed;
					entity.y  += entity.vy * elapsed;
					break;
			}
		}
		
		let collisions = this.collider.detectCollisions(
			this.player, 
			this.collidables
		);

		if (collisions != null) {
			this.solver.resolve(this.player, collisions);
		}
	}
}

export default Engine;