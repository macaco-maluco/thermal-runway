import { Component, Types } from 'ecsy'

interface Position {
  x?: number
  y?: number
  z?: number

  grounded?: boolean

  rotationX?: number
  rotationY?: number
  rotationZ?: number
  rotationW?: number
}

export default class PositionComponent extends Component<Position> implements Position {
  x: number = 0
  y: number = 0
  z: number = 0

  grounded: boolean = false

  rotationX: number = 0
  rotationY: number = 0
  rotationZ: number = 0
  rotationW: number = 1
}

PositionComponent.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  z: { type: Types.Number },

  grounded: { type: Types.Boolean },

  rotationX: { type: Types.Number },
  rotationY: { type: Types.Number },
  rotationZ: { type: Types.Number },
  rotationW: { type: Types.Number },
}
