import { System } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import ScoreComponent from '../components/ScoreComponent'
import GameStateComponent, { Screen } from '../components/GameStateComponent'
import KeyboardControllerComponent from '../components/KeyboardControllerComponent'
import GamepadControllerComponent from '../components/GamepadControllerComponent'

const SCREEN_CHANGE_THROTTLE = 20

export default class UISystem extends System {
  root: HTMLDivElement
  mainMenu: HTMLDivElement
  screens: Map<Screen, HTMLElement> = new Map()
  screen: Screen
  prevScreen: Screen
  screenChangeThrottle: number

  init() {
    this.root = document.getElementById('ui') as HTMLDivElement
    this.screens.set('main-menu', document.getElementById('main-menu'))
    this.screens.set('game-over', document.getElementById('game-over'))
  }

  hide(screenId: Screen) {
    const screen = this.screens.get(screenId)
    if (!screen) return
    screen.classList.add('hide')
  }

  show(screenId: Screen) {
    const screen = this.screens.get(screenId)
    if (!screen) return
    screen.classList.remove('hide')
  }

  setScreen(screen: Screen) {
    if (this.screen === screen) return

    this.screenChangeThrottle = SCREEN_CHANGE_THROTTLE

    this.prevScreen = this.screen
    this.screen = screen

    this.hide(this.prevScreen)
    this.show(this.screen)
  }

  execute() {
    if (this.screenChangeThrottle > 0) this.screenChangeThrottle--

    this.queries.gameState.added.forEach((entity) => {
      const state = entity.getComponent(GameStateComponent)
      this.setScreen(state.screen)
    })

    this.queries.gameState.changed.forEach((entity) => {
      const state = entity.getComponent(GameStateComponent)
      const controller = entity.getComponent(KeyboardControllerComponent)
      const gamepad = entity.getComponent(GamepadControllerComponent)

      this.setScreen(state.screen)

      if (this.screenChangeThrottle <= 0) {
        if ((controller.started || gamepad.started) && state.screen === 'main-menu') {
          const mutableState = entity.getMutableComponent(GameStateComponent)
          mutableState.screen = 'game'
        } else if ((controller.started || gamepad.started) && state.screen === 'game-over') {
          const mutableState = entity.getMutableComponent(GameStateComponent)
          mutableState.screen = 'main-menu'
        }
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
