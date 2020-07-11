import { System, Entity } from 'ecsy'
import GamepadControllerComponent from '../components/GamepadControllerComponent'
import KeyboardControllerComponent from '../components/KeyboardControllerComponent'
import VelocityComponent from '../components/VelocityComponent'
import PositionComponent from '../components/PositionComponent'

export class PlayerMovementSystem extends System {
  execute() {
    this.queries.players.results.forEach((entity) => {
      const keyboard = entity.getComponent(KeyboardControllerComponent)
      const gamepad = entity.getComponent(GamepadControllerComponent)

      if (!gamepad.started && !keyboard.started) return

      const boost = keyboard.boost || gamepad.boost
      const left = keyboard.left || gamepad.left
      const right = keyboard.right || gamepad.right
      const up = keyboard.up || gamepad.up
      const down = keyboard.down || gamepad.down
      const jump = keyboard.jump || gamepad.jump

      const velocity = entity.getMutableComponent(VelocityComponent)
      const position = entity.getMutableComponent(PositionComponent)
      const forwardSpeed = 15 // could be its own component (like player attributes)
      const breakSpeed = 2
      const turnSpeed = 8
      const jumpPower = 2
      const boostSpeed = 40

      velocity.x = left ? -turnSpeed : right ? turnSpeed : 0
      velocity.z = boost ? -boostSpeed : down ? -breakSpeed : -forwardSpeed
      velocity.y = position.grounded && jump ? jumpPower : 0
    })
  }
}

PlayerMovementSystem.queries = {
  players: {
    components: [KeyboardControllerComponent, GamepadControllerComponent, PositionComponent, VelocityComponent],
  },
}

interface Controller {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
}
