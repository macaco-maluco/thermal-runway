import { System, Not } from 'ecsy'
import ControllerComponent from '../components/ControllerComponent'

export class GamepadSystem extends System {
  execute(delta, time) {
    const gamepads = navigator.getGamepads()
    const gamepad = gamepads[0]

    if (!gamepad) return

    this.queries.controllers.results.forEach((entity) => {
      const controller = entity.getMutableComponent(ControllerComponent)

      controller.up = gamepad.buttons[12].pressed
      controller.down = gamepad.buttons[13].pressed
      controller.left = gamepad.buttons[14].pressed
      controller.right = gamepad.buttons[15].pressed
    })
  }
}

GamepadSystem.queries = {
  controllers: {
    components: [ControllerComponent],
  },
}
