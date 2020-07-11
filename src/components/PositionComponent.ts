import { Component, Types } from 'ecsy'

interface Position {
  x: number
  y: number
  z: number

  rotationX: number
  rotationY: number
  rotationZ: number
  rotationW: number
}

export default class PositionComponent extends Component<Position> implements Position {
  x: number
  y: number
  z: number
  rotationX: number
  rotationY: number
  rotationZ: number
  rotationW: number
}

PositionComponent.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  z: { type: Types.Number },
  rotationX: { type: Types.Number },
  rotationY: { type: Types.Number },
  rotationZ: { type: Types.Number },
  rotationW: { type: Types.Number },
}
