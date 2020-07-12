import { System, Not } from 'ecsy'
import { createPlatform, createStartingPlatform } from '../assemblages/PlatformAssemblage'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'
import GameStateComponent from '../components/GameStateComponent'
import FakePlayerTagComponent from '../tags/FakePlayerTagComponent'

export default class PlatformCreationSystem extends System {
  nextPosition: number
  startingPosition: number
  inGame: boolean = false

  execute() {
    this.queries.gameState.changed.forEach((entity) => {
      const state = entity.getComponent(GameStateComponent)
      this.inGame = state.screen === 'game'
    })

    if (this.inGame) {
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
}

PlatformCreationSystem.queries = {
  gameState: {
    components: [GameStateComponent],
    listen: {
      changed: true,
    },
  },

  playerPosition: {
    components: [PlayerTagComponent, PositionComponent],
  },

  players: {
    components: [PlayerTagComponent, Not(FakePlayerTagComponent)],
    listen: {
      removed: true,
      added: true,
    },
  },
}
