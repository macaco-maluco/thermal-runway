import { System } from 'ecsy'
import PositionComponent from '../components/PositionComponent'

export class AISystem extends System {
  execute() {
    this.queries.npcs.results.forEach((entity) => {
      const position = entity.getMutableComponent(PositionComponent)
      position.x += 0.01
    })
  }
}

AISystem.queries = {
  npcs: {
    components: [PositionComponent],
  },
}
