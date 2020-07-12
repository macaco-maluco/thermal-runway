import { Component, Types } from 'ecsy'
import { ModelRef } from '../assets'

type ModelType = 'box' | 'sphere' | ModelRef

interface Model {
  color?: string
  type: ModelType
}

export default class ModelComponent extends Component<Model> implements Model {
  color: string = 'red'
  type: ModelType
}

ModelComponent.schema = {
  color: { type: Types.String },
  type: { type: Types.String },
}
