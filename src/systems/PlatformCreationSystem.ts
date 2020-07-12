import { System } from 'ecsy'
import { createPlatform, createStartingPlatform } from '../assemblages/PlatformAssemblage'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'

export default class PlatformCreationSystem extends System {
  nextPosition: number
  startingPosition: number

  execute() {
    this.queries.players.removed.forEach(() => {
      this.nextPosition = this.startingPosition
    })

    this.queries.players.added.forEach((entity) => {
      this.startingPosition = createStartingPlatform(this.world)
      this.nextPosition = this.startingPosition
    })

    this.queries.playerPosition.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)

      if (position.z - 500 < this.nextPosition) {
        this.nextPosition = createPlatform(this.world, this.nextPosition)
      }
    })
  }
}

PlatformCreationSystem.queries = {
  playerPosition: {
    components: [PlayerTagComponent, PositionComponent],
  },

  players: {
    components: [PlayerTagComponent],
    listen: {
      removed: true,
      added: true,
    },
  },
}
