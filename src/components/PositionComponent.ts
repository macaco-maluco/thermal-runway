import { Component, Types } from 'ecsy'

interface Position {
  x: number
  y: number
}

export default class PositionComponent extends Component<Position> implements Position {
  x = 0
  y = 0
}

PositionComponent.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
}
