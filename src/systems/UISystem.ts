import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'

export default class UISystem extends System {
  root: HTMLDivElement

  init() {
    this.root = document.getElementById('ui') as HTMLDivElement
  }

  execute() {
    this.queries.players.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)
      const points = Math.round(position.z * -1)

      this.root.innerHTML = `${points} points`
    })
  }
}

UISystem.queries = {
  players: {
    components: [PlayerTagComponent, PositionComponent],
  },
}
