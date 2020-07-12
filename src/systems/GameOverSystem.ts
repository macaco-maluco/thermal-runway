import { System, Not } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'
import PlatformTagComponent from '../tags/PlatformTagComponent'
import GameStateComponent from '../components/GameStateComponent'

export default class GameOverSystem extends System {
  execute() {
    let reset = false

    this.queries.players.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)

      if (position.y < -5) {
        reset = true
        entity.remove()
      }
    })

    if (reset) {
      this.queries.gameState.results.forEach((entity) => {
        const state = entity.getMutableComponent(GameStateComponent)
        state.screen = 'game-over'
      })

      for (let i = this.queries.platforms.results.length - 1; i >= 0; i--) {
        this.queries.platforms.results[i].remove()
      }
    }
  }
}

GameOverSystem.queries = {
  players: {
    components: [PlayerTagComponent, PositionComponent],
  },

  platforms: {
    components: [PlatformTagComponent],
  },

  gameState: {
    components: [GameStateComponent],
  },
}
