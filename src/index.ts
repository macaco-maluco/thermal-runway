import { World } from 'ecsy'
import RenderingSystem from './systems/RenderingSystem'
import PositionComponent from './components/PositionComponent'
import ModelComponent from './components/ModelComponent'
import { ThreeMeshStateComponent } from './components/ThreeMeshStateComponent'
import { PhysicsSystem } from './systems/PhysicsSystem'
import RigidBodyComponent from './components/RigidBodyComponent'
import { AmmoRigidBodyStateComponent } from './components/AmmoRigidBodyStateComponent'
import ScaleComponent from './components/ScaleComponent'
import ControllerComponent from './components/ControllerComponent'
import VelocityComponent from './components/VelocityComponent'
import { KeyboardSystem } from './systems/KeyboardSystem'
import { PlayerMovementSystem } from './systems/PlayerMovementSystem'

const world = new World()

world.registerSystem(KeyboardSystem)
world.registerSystem(PlayerMovementSystem)
world.registerSystem(PhysicsSystem)
world.registerSystem(RenderingSystem)

world.registerComponent(PositionComponent)
world.registerComponent(ControllerComponent)
world.registerComponent(VelocityComponent)
world.registerComponent(ModelComponent)
world.registerComponent(ScaleComponent)
world.registerComponent(ThreeMeshStateComponent)
world.registerComponent(RigidBodyComponent)
world.registerComponent(AmmoRigidBodyStateComponent)

world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: 6, z: 0.9 })
  .addComponent(ModelComponent, { color: 'blue' })
  .addComponent(ScaleComponent, { x: 1, y: 1, z: 1 })
  .addComponent(RigidBodyComponent, { mass: 1, type: 'box' })

// Player physics body
world
  .createEntity()
  .addComponent(PositionComponent, { x: -0.9, y: 3, z: 0 })
  .addComponent(ModelComponent, { color: 'red' })
  .addComponent(ScaleComponent, { x: 0.5, y: 0.5, z: 0.5 })
  .addComponent(ControllerComponent)
  .addComponent(VelocityComponent)
  .addComponent(RigidBodyComponent, { mass: 1, type: 'sphere' })

// floor
world
  .createEntity()
  .addComponent(PositionComponent, { x: 0, y: -1.5, z: 0 })
  .addComponent(ModelComponent, { color: 'green' })
  .addComponent(ScaleComponent, { x: 10, y: 0.2, z: 10 })
  .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })

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
