import { System, Entity } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import ScoreComponent from '../components/ScoreComponent'

export default class ScoringSystem extends System {
  execute() {
    this.queries.players.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)
      const score = entity.getMutableComponent(ScoreComponent)

      score.points = Math.round(position.z * -1)
    })
  }
}

ScoringSystem.queries = {
  players: {
    components: [PositionComponent, PlayerTagComponent, ScoreComponent],
  },
}

interface Controller {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  jump: boolean
}
