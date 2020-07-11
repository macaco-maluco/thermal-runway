import { System, Not } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'

export default class GameOverSystem extends System {
  reloaded: boolean

  execute(delta, time) {
    const gamepads = navigator.getGamepads()

    this.queries.controllers.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)

      if (position.y < -10 && !this.reloaded) {
        window.location.reload()
        this.reloaded = true
      }
    })
  }
}

GameOverSystem.queries = {
  controllers: {
    components: [PlayerTagComponent, PositionComponent],
  },
}
