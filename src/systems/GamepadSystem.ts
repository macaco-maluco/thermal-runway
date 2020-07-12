import { System, Not } from 'ecsy'
import GamepadControllerComponent from '../components/GamepadControllerComponent'

export default class GamepadSystem extends System {
  execute() {
    const gamepads = navigator.getGamepads()

    this.queries.controllers.results.forEach((entity) => {
      const controller = entity.getMutableComponent(GamepadControllerComponent)

      const gamepad = gamepads[0]
      if (gamepad === null) return

      controller.up = gamepad.buttons[12].pressed
      controller.down = gamepad.buttons[13].pressed
      controller.left = gamepad.buttons[14].pressed
      controller.right = gamepad.buttons[15].pressed
      controller.jump = gamepad.buttons[0].pressed
      controller.boost = gamepad.buttons[2].pressed
      controller.started = controller.jump || controller.boost
    })
  }
}

GamepadSystem.queries = {
  controllers: {
    components: [GamepadControllerComponent],
  },
}
