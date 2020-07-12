import { Component, Types } from 'ecsy'

interface Gravity {
  x?: number
  y?: number
  z?: number
}

export default class GravityComponent extends Component<Gravity> implements Gravity {
  x: number = 0
  y: number = 0
  z: number = 0
}

GravityComponent.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  z: { type: Types.Number },
}
