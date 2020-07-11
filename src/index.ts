import { World } from 'ecsy'
import RenderingSystem from './systems/RenderingSystem'
import PositionComponent from './components/PositionComponent'
import ModelComponent from './components/ModelComponent'
import { ThreeMeshStateComponent } from './components/ThreeMeshStateComponent'
import { PhysicsSystem } from './systems/PhysicsSystem'
import RigidBodyComponent from './components/RigidBodyComponent'
import { AmmoRigidBodyStateComponent } from './components/AmmoRigidBodyStateComponent'

const world = new World()

world.registerSystem(RenderingSystem)
world.registerSystem(PhysicsSystem)

world.registerComponent(PositionComponent)
world.registerComponent(ModelComponent)
world.registerComponent(ThreeMeshStateComponent)
world.registerComponent(RigidBodyComponent)
world.registerComponent(AmmoRigidBodyStateComponent)

world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: 6, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 })
  .addComponent(ModelComponent, { color: 'blue' })
  .addComponent(RigidBodyComponent, { mass: 1, scaleX: 1, scaleY: 1, scaleZ: 1, type: 'box' })

world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: 3, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 })
  .addComponent(ModelComponent, { color: 'red' })
  .addComponent(RigidBodyComponent, { mass: 1, scaleX: 1, scaleY: 1, scaleZ: 1, type: 'box' })
world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: -1.5, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0 })
  .addComponent(ModelComponent, { color: 'green' })
  .addComponent(RigidBodyComponent, { mass: 0, scaleX: 1, scaleY: 1, scaleZ: 1, type: 'box' })

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
