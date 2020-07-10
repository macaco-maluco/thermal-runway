import { Component, Types } from 'ecsy'

interface Model {
  color: string
}

export default class ModelComponent extends Component<Model> implements Model {
  color: string
}

ModelComponent.schema = {
  color: { type: Types.String },
}
