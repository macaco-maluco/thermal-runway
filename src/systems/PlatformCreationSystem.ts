import { System } from 'ecsy'
import { createPlatform, createStartingPlatform } from '../assemblages/PlatformAssemblage'

export default class PlatformCreationSystem extends System {
  init() {
    createStartingPlatform(this.world)

    for (let i = 1; i < 100; i++) {
      createPlatform(this.world, Math.random() * 6 - 3, i)
    }
  }

  execute() {}
}
