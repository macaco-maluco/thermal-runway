import { Component, Types } from 'ecsy'

interface Scale {
  x: number
  y: number
  z: number
}

export default class ScaleComponent extends Component<Scale> implements Scale {
  x: number
  y: number
  z: number
}

ScaleComponent.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
  z: { type: Types.Number },
}
