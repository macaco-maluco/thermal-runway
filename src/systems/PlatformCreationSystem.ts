import { System } from 'ecsy'
import { createPlatform } from '../assemblages/PlatformAssemblage'

export default class PlatformCreationSystem extends System {
  init() {
    createPlatform(this.world, 0, 0)
    createPlatform(this.world, 3, 1)
    createPlatform(this.world, 2, 3)
  }

  execute() {}
}
