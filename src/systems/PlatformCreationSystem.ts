import { System } from 'ecsy'
import { createPlatform, createStartingPlatform } from '../assemblages/PlatformAssemblage'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'

export default class PlatformCreationSystem extends System {
  nextPosition: number
  startingPosition: number

  init() {
    this.startingPosition = createStartingPlatform(this.world)
    this.nextPosition = this.startingPosition
  }

  execute() {
    this.queries.players.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)

      if (position.z - 500 < this.nextPosition) {
        this.nextPosition = createPlatform(this.world, this.nextPosition)
      }
    })

    this.queries.removedPlayers.removed.forEach(() => {
      this.nextPosition = this.startingPosition
    })
  }
}

PlatformCreationSystem.queries = {
  players: {
    components: [PlayerTagComponent, PositionComponent],
  },

  removedPlayers: {
    components: [PlayerTagComponent],
    listen: {
      removed: true,
    },
  },
}
