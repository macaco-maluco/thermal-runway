import { Component, Types } from 'ecsy'

interface Score {
  points: number
}

export default class ScoreComponent extends Component<Score> implements Score {
  points: number
}

ScoreComponent.schema = {
  points: { type: Types.Number },
}
