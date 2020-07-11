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
import PlatformCreationSystem from './systems/PlatformCreationSystem'

const world = new World()

world.registerComponent(PositionComponent)
world.registerComponent(ControllerComponent)
world.registerComponent(VelocityComponent)
world.registerComponent(ModelComponent)
world.registerComponent(ScaleComponent)
world.registerComponent(ThreeMeshStateComponent)
world.registerComponent(RigidBodyComponent)
world.registerComponent(AmmoRigidBodyStateComponent)

world.registerSystem(PlatformCreationSystem)
world.registerSystem(KeyboardSystem)
world.registerSystem(PlayerMovementSystem)
world.registerSystem(PhysicsSystem)
world.registerSystem(RenderingSystem)

// Player physics body
world
  .createEntity()
  .addComponent(PositionComponent, { y: 2 })
  .addComponent(ModelComponent, { color: 'red', type: 'character' })
  .addComponent(ScaleComponent, { x: 0.5, y: 0.5, z: 0.5 })
  .addComponent(ControllerComponent)
  .addComponent(VelocityComponent)
  .addComponent(RigidBodyComponent, { mass: 1, type: 'sphere' })

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
