import { System, Entity } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import ScoreComponent from '../components/ScoreComponent'
import VelocityComponent from '../components/VelocityComponent'

export default class ScoringSystem extends System {
  pointsElements: NodeListOf<Element>

  init() {
    this.pointsElements = document.querySelectorAll('.points-count')
  }

  execute() {
    this.queries.players.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)
      const velocity = entity.getComponent(VelocityComponent)
      const score = entity.getMutableComponent(ScoreComponent)

      score.points += position.grounded ? 0 : Math.round(velocity.z * -0.1)
      this.pointsElements.forEach((element) => {
        element.innerHTML = `${score.points}`
      })
    })
  }
}

ScoringSystem.queries = {
  players: {
    components: [PositionComponent, VelocityComponent, PlayerTagComponent, ScoreComponent],
  },
}
