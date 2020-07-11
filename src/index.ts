import { World } from 'ecsy'
import RenderingSystem from './systems/RenderingSystem'
import PositionComponent from './components/PositionComponent'
import ModelComponent from './components/ModelComponent'
import { ThreeMeshStateComponent } from './components/ThreeMeshStateComponent'
import { AISystem } from './systems/AISystem'

const world = new World()

world.registerSystem(RenderingSystem)
world.registerSystem(AISystem)

world.registerComponent(PositionComponent)
world.registerComponent(ModelComponent)
world.registerComponent(ThreeMeshStateComponent)

world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: 0, z: 0 })
  .addComponent(ModelComponent, { color: 'red' })

world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: 1.5, z: 0 })
  .addComponent(ModelComponent, { color: 'blue' })

world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: -1.5, z: 0 })
  .addComponent(ModelComponent, { color: 'green' })

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
