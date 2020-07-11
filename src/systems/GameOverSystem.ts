import { System, Not } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'

export default class GameOverSystem extends System {
  reloaded: boolean

  execute() {
    this.queries.players.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)

      if (position.y < -10 && !this.reloaded) {
        window.location.reload()
        this.reloaded = true
      }
    })
  }
}

GameOverSystem.queries = {
  players: {
    components: [PlayerTagComponent, PositionComponent],
  },
}
