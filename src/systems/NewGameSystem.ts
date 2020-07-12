import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import { createPlayerBody } from '../assemblages/PlayerBody'
import GameStateComponent from '../components/GameStateComponent'

export default class NewGameSystem extends System {
  newGame() {
    createPlayerBody(this.world)
  }

  execute() {
    this.queries.gameState.changed.forEach((entity) => {
      const state = entity.getComponent(GameStateComponent)
      if (state.screen === 'game') {
        this.newGame()
      }
    })
  }
}

NewGameSystem.queries = {
  gameState: {
    components: [GameStateComponent],
    listen: {
      changed: true,
    },
  },
}
