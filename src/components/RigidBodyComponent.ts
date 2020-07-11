import { Component, Types } from 'ecsy'

type BodyType = 'box'

interface RigidBody {
  type: BodyType
  scaleX: number
  scaleY: number
  scaleZ: number
  mass: number
}

export default class RigidBodyComponent extends Component<RigidBody> implements RigidBody {
  type: BodyType
  scaleX = 1
  scaleY = 1
  scaleZ = 1
  mass = 1
}

RigidBodyComponent.schema = {
  type: { type: Types.String },
  scaleX: { type: Types.Number },
  scaleY: { type: Types.Number },
  scaleZ: { type: Types.Number },
  mass: { type: Types.Number },
}
