import { System } from 'ecsy'
import PositionComponent from '../components/PositionComponent'

export class AISystem extends System {
  count = 0

  execute(delta, time) {
    this.queries.npcs.results.forEach((entity) => {
      const position = entity.getMutableComponent(PositionComponent)
      position.x = Math.sin(this.count)
      position.z = Math.cos(this.count)
      if (this.count > Math.PI * 2) this.count = 0
    })

    this.count += 0.05
  }
}

AISystem.queries = {
  npcs: {
    components: [PositionComponent],
  },
}
