import { Component, Types } from 'ecsy'

interface KeyboardController {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
}

export default class KeyboardControllerComponent extends Component<KeyboardController> implements KeyboardController {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
}

KeyboardControllerComponent.schema = {
  up: { type: Types.Boolean },
  down: { type: Types.Boolean },
  left: { type: Types.Boolean },
  right: { type: Types.Boolean },
  jump: { type: Types.Boolean },
}
