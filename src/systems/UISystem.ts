import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import ScoreComponent from '../components/ScoreComponent'

export default class UISystem extends System {
  root: HTMLDivElement

  init() {
    this.root = document.getElementById('ui') as HTMLDivElement
  }

  execute() {
    this.queries.players.results.forEach((entity) => {
      const score = entity.getComponent(ScoreComponent)
      this.root.innerHTML = `${score.points} points`
    })
  }
}

UISystem.queries = {
  players: {
    components: [PlayerTagComponent, ScoreComponent],
  },
}
