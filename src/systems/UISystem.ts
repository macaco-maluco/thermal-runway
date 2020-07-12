import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import ScoreComponent from '../components/ScoreComponent'
import GameStateComponent, { Screen } from '../components/GameStateComponent'
import KeyboardControllerComponent from '../components/KeyboardControllerComponent'
import GamepadControllerComponent from '../components/GamepadControllerComponent'

export default class UISystem extends System {
  root: HTMLDivElement
  mainMenu: HTMLDivElement
  screen: Screen

  init() {
    this.root = document.getElementById('ui') as HTMLDivElement
    this.mainMenu = document.getElementById('main-menu') as HTMLDivElement
  }

  hide(element: HTMLElement) {
    element.classList.add('hide')
  }

  show(element: HTMLElement) {
    element.classList.remove('hide')
  }

  setScreen(screen: Screen) {
    if (this.screen === screen) return

    this.screen = screen

    if (screen === 'main-menu') {
      this.show(this.mainMenu)
    } else {
      this.hide(this.mainMenu)
    }
  }

  execute() {
    this.queries.gameState.added.forEach((entity) => {
      const state = entity.getComponent(GameStateComponent)
      this.setScreen(state.screen)
    })

    this.queries.gameState.changed.forEach((entity) => {
      const state = entity.getComponent(GameStateComponent)
      const controller = entity.getComponent(KeyboardControllerComponent)
      const gamepad = entity.getComponent(GamepadControllerComponent)

      this.setScreen(state.screen)

      if ((controller.started || gamepad.started) && state.screen !== 'game') {
        const mutableState = entity.getMutableComponent(GameStateComponent)
        mutableState.screen = 'game'
      }
    })
  }
}

UISystem.queries = {
  players: {
    components: [PlayerTagComponent, ScoreComponent],
  },

  gameState: {
    components: [GameStateComponent, KeyboardControllerComponent, GamepadControllerComponent],
    listen: {
      changed: true,
      added: true,
    },
  },
}
