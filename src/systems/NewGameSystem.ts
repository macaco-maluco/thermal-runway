import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import { createPlayerBody } from '../assemblages/PlayerBody'

export default class NewGameSystem extends System {
  newGame() {
    createPlayerBody(this.world)
  }

  init() {
    this.newGame()
  }

  execute() {
    this.queries.players.removed.forEach(() => {
      this.newGame()
    })
  }
}

NewGameSystem.queries = {
  players: {
    components: [PlayerTagComponent],
    listen: {
      removed: true,
    },
  },
}
