import { World } from 'ecsy'
import RenderingSystem from './systems/RenderingSystem'
import PositionComponent from './components/PositionComponent'

const world = new World()

world.registerSystem(RenderingSystem)
world.registerComponent(PositionComponent)

const cube = world.createEntity()
cube.addComponent(PositionComponent, { x: 0, y: 0 })

let lastTime = performance.now()

function run() {
  // Compute delta and elapsed time
  let time = performance.now()
  let delta = time - lastTime

  // Run all the systems
  world.execute(delta, time)

  lastTime = time
  requestAnimationFrame(run)
}

run()
