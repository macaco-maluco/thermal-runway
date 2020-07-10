import { System } from 'ecsy'
import PositionComponent from '../components/PositionComponent'

export default class RenderingSystem extends System {
  execute(delta, time) {
    this.queries.position.results.forEach((entity) => {
      let pos = entity.getComponent(PositionComponent)
      console.log(`Entity with ID: ${entity.id} has component Position={x: ${pos.x}, y: ${pos.y}`)
    })
  }
}

RenderingSystem.queries = {
  position: {
    components: [PositionComponent],
  },
}
