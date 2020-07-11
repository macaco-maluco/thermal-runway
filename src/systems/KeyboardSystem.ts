import { System, Not } from 'ecsy'
import KeyboardControllerComponent from '../components/KeyboardControllerComponent'

export class KeyboardSystem extends System {
  arrowUp: boolean
  arrowDown: boolean
  arrowLeft: boolean
  arrowRight: boolean
  space: boolean
  shift: boolean

  init() {
    const handleDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          this.arrowUp = true
          break
        case 'ArrowDown':
          event.preventDefault()
          this.arrowDown = true
          break
        case 'ArrowLeft':
          event.preventDefault()
          this.arrowLeft = true
          break
        case 'ArrowRight':
          event.preventDefault()
          this.arrowRight = true
          break
        case ' ':
          event.preventDefault()
          this.space = true
          break
        case 'Shift':
          event.preventDefault()
          this.shift = true
          break
      }
    }

    const handleUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault()
          this.arrowUp = false
          break
        case 'ArrowDown':
          event.preventDefault()
          this.arrowDown = false
          break
        case 'ArrowLeft':
          event.preventDefault()
          this.arrowLeft = false
          break
        case 'ArrowRight':
          event.preventDefault()
          this.arrowRight = false
          break
        case ' ':
          event.preventDefault()
          this.space = false
          break
        case 'Shift':
          event.preventDefault()
          this.shift = false
          break
      }
    }

    document.addEventListener('keydown', handleDown)
    document.addEventListener('keyup', handleUp)
  }

  execute(delta, time) {
    this.queries.controllers.results.forEach((entity) => {
      const controller = entity.getMutableComponent(KeyboardControllerComponent)

      controller.up = this.arrowUp
      controller.down = this.arrowDown
      controller.left = this.arrowLeft
      controller.right = this.arrowRight
      controller.jump = this.space
      controller.boost = this.shift
    })
  }
}

KeyboardSystem.queries = {
  controllers: {
    components: [KeyboardControllerComponent],
  },
}
