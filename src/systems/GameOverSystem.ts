import { System, Not } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'

export default class GameOverSystem extends System {
  execute() {
    this.queries.players.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)

      if (position.y < -10) {
        entity.remove()
      }
    })
  }
}

GameOverSystem.queries = {
  players: {
    components: [PlayerTagComponent, PositionComponent],
  },
}
