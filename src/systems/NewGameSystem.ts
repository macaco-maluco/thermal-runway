import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import { createPlayerBody } from '../assemblages/PlayerBody'
import { createStartingPlatform, createPlatform } from '../assemblages/PlatformAssemblage'

export default class NewGameSystem extends System {
  newGame() {
    createPlayerBody(this.world)
    createStartingPlatform(this.world)

    for (let i = 1; i < 100; i++) {
      createPlatform(this.world, Math.random() * 6 - 3, i)
    }
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
