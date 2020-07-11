import { System } from 'ecsy'
import ControllerComponent from '../components/ControllerComponent'
import VelocityComponent from '../components/VelocityComponent'
import PositionComponent from '../components/PositionComponent'
import { AmmoRigidBodyStateComponent } from '../components/AmmoRigidBodyStateComponent'

export class PlayerMovementSystem extends System {
  execute() {
    this.queries.players.results.forEach((entity) => {
      const controller = entity.getComponent(ControllerComponent)
      const velocity = entity.getMutableComponent(VelocityComponent)
      const position = entity.getMutableComponent(PositionComponent)
      const rigidBody = entity.getComponent(AmmoRigidBodyStateComponent)
      const movementSpeed = 0.1 // could be its own component (like player attributes)
      const jumpPower = 1

      velocity.x = controller.left ? -movementSpeed : controller.right ? movementSpeed : 0
      velocity.z = controller.up ? -movementSpeed : controller.down ? movementSpeed : 0
      velocity.y = position.grounded && controller.jump ? jumpPower : 0
    })
  }
}

PlayerMovementSystem.queries = {
  players: {
    components: [ControllerComponent, PositionComponent, AmmoRigidBodyStateComponent, VelocityComponent],
  },
}
