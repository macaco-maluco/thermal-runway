import { System } from 'ecsy'
import ControllerComponent from '../components/ControllerComponent'
import VelocityComponent from '../components/VelocityComponent'
import PositionComponent from '../components/PositionComponent'

export class PlayerMovementSystem extends System {
  execute() {
    this.queries.players.results.forEach((entity) => {
      const controller = entity.getComponent(ControllerComponent)
      const velocity = entity.getMutableComponent(VelocityComponent)
      const position = entity.getMutableComponent(PositionComponent)
      const movementSpeed = 0.1 // could be its own component (like player attributes)
      const turnSpeed = 0.5

      velocity.rotationY = controller.left ? turnSpeed : controller.right ? -turnSpeed : 0
      velocity.x = controller.up ? movementSpeed : controller.down ? -movementSpeed : 0
      //   velocity.z = controller.up ? -speed : controller.down ? speed : 0
    })
  }
}

PlayerMovementSystem.queries = {
  players: {
    components: [ControllerComponent, PositionComponent, VelocityComponent],
  },
}
