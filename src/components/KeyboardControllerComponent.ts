import { Component, Types } from 'ecsy'

interface KeyboardController {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
  boost: boolean
  started: boolean
}

export default class KeyboardControllerComponent extends Component<KeyboardController> implements KeyboardController {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
  boost: boolean
  started: boolean
}

KeyboardControllerComponent.schema = {
  up: { type: Types.Boolean },
  down: { type: Types.Boolean },
  left: { type: Types.Boolean },
  right: { type: Types.Boolean },
  jump: { type: Types.Boolean },
  boost: { type: Types.Boolean },
  started: { type: Types.Boolean },
}
