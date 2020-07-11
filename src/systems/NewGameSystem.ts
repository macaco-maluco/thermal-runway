import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import { createPlayerBody } from '../assemblages/PlayerBody'

export default class NewGameSystem extends System {
  init() {
    createPlayerBody(this.world)
  }

  execute() {
    this.queries.players.removed.forEach(() => {
      createPlayerBody(this.world)
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
