import { System, Entity } from 'ecsy'
import GamepadControllerComponent from '../components/GamepadControllerComponent'
import KeyboardControllerComponent from '../components/KeyboardControllerComponent'
import VelocityComponent from '../components/VelocityComponent'
import PositionComponent from '../components/PositionComponent'
import { AmmoRigidBodyStateComponent } from '../components/AmmoRigidBodyStateComponent'

export class PlayerMovementSystem extends System {
  execute() {
    this.queries.players.results.forEach((entity) => {
      const keyboard = entity.getComponent(KeyboardControllerComponent)
      const gamepad = entity.getComponent(GamepadControllerComponent)

      const left = keyboard.left || gamepad.left
      const right = keyboard.right || gamepad.right
      const up = keyboard.up || gamepad.up
      const down = keyboard.down || gamepad.down
      const jump = keyboard.jump || gamepad.jump

      const velocity = entity.getMutableComponent(VelocityComponent)
      const position = entity.getMutableComponent(PositionComponent)
      const rigidBody = entity.getComponent(AmmoRigidBodyStateComponent)
      const movementSpeed = 0.1 // could be its own component (like player attributes)
      const jumpPower = 1

      velocity.x = left ? -movementSpeed : right ? movementSpeed : 0
      velocity.z = up ? -movementSpeed : down ? movementSpeed : 0
      velocity.y = position.grounded && jump ? jumpPower : 0
    })
  }
}

PlayerMovementSystem.queries = {
  players: {
    components: [
      KeyboardControllerComponent,
      GamepadControllerComponent,
      PositionComponent,
      AmmoRigidBodyStateComponent,
      VelocityComponent,
    ],
  },
}

interface Controller {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
}

function controll(entity: Entity, controller: Controller) {}
