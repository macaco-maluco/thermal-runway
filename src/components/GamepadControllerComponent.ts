import { Component, Types } from 'ecsy'

interface GamepadController {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
}

export default class GamepadControllerComponent extends Component<GamepadController> implements GamepadController {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
}

GamepadControllerComponent.schema = {
  up: { type: Types.Boolean },
  down: { type: Types.Boolean },
  left: { type: Types.Boolean },
  right: { type: Types.Boolean },
  jump: { type: Types.Boolean },
}
