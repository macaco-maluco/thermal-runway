import { Component, Types } from 'ecsy'

interface Controller {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

export default class ControllerComponent extends Component<Controller> implements Controller {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

ControllerComponent.schema = {
  up: { type: Types.Boolean },
  down: { type: Types.Boolean },
  left: { type: Types.Boolean },
  right: { type: Types.Boolean },
}
