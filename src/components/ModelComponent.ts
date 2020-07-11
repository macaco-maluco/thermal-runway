import { Component, Types } from 'ecsy'

type ModelType = 'box' | 'sphere' | 'character'

interface Model {
  color: string
  type: ModelType
}

export default class ModelComponent extends Component<Model> implements Model {
  color: string
  type: ModelType
}

ModelComponent.schema = {
  color: { type: Types.String },
  type: { type: Types.String },
}
