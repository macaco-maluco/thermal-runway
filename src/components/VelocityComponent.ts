import { Component, Types } from 'ecsy'

interface Velocity {
  x?: number
  y?: number
  z?: number

  rotationY?: number
}

export default class VelocityComponent extends Component<Velocity> implements Velocity {
  x: number = 0
  y: number = 0
  z: number = 0

  rotationY: number = 0
}

VelocityComponent.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  z: { type: Types.Number },

  rotationY: { type: Types.Number },
}
