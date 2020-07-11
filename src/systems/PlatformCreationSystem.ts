import { System } from 'ecsy'
import { createPlatform } from '../assemblages/PlatformAssemblage'

export default class PlatformCreationSystem extends System {
  init() {
    createPlatform(this.world, 0, 0)

    for (let i = 1; i < 100; i++) {
      createPlatform(this.world, Math.random() * 6 - 3, -10 * i)
    }
  }

  execute() {}
}
