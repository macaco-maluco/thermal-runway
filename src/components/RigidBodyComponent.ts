import { Component, Types } from 'ecsy'

type BodyType = 'box'

interface RigidBody {
  type: BodyType
  mass: number
}

export default class RigidBodyComponent extends Component<RigidBody> implements RigidBody {
  type: BodyType
  mass = 1
}

RigidBodyComponent.schema = {
  type: { type: Types.String },
  mass: { type: Types.Number },
}
