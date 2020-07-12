import { World } from 'ecsy'
import RenderingSystem from './systems/RenderingSystem'
import GamepadSystem from './systems/GamepadSystem'
import PositionComponent from './components/PositionComponent'
import ModelComponent from './components/ModelComponent'
import { ThreeMeshStateComponent } from './components/ThreeMeshStateComponent'
import { PhysicsSystem } from './systems/PhysicsSystem'
import RigidBodyComponent from './components/RigidBodyComponent'
import { AmmoRigidBodyStateComponent } from './components/AmmoRigidBodyStateComponent'
import ScaleComponent from './components/ScaleComponent'
import KeyboardControllerComponent from './components/KeyboardControllerComponent'
import GamepadControllerComponent from './components/GamepadControllerComponent'
import VelocityComponent from './components/VelocityComponent'
import { KeyboardSystem } from './systems/KeyboardSystem'
import { PlayerMovementSystem } from './systems/PlayerMovementSystem'
import PlatformCreationSystem from './systems/PlatformCreationSystem'
import PlayerTagComponent from './tags/PlayerTagComponent'
import PlayerViewSystem from './systems/PlayerViewSystem'
import PlayerViewTagComponent from './tags/PlayerViewTagComponent'
import GameOverSystem from './systems/GameOverSystem'
import ScoreComponent from './components/ScoreComponent'
import ScoringSystem from './systems/ScoringSystem'
import NewGameSystem from './systems/NewGameSystem'
import UISystem from './systems/UISystem'
import PlatformTagComponent from './tags/PlatformTagComponent'
import GameStateComponent from './components/GameStateComponent'

const world = new World()

world.registerComponent(PositionComponent)
world.registerComponent(KeyboardControllerComponent)
world.registerComponent(GamepadControllerComponent)
world.registerComponent(VelocityComponent)
world.registerComponent(ModelComponent)
world.registerComponent(ScaleComponent)
world.registerComponent(ThreeMeshStateComponent)
world.registerComponent(RigidBodyComponent)
world.registerComponent(AmmoRigidBodyStateComponent)
world.registerComponent(PlayerTagComponent)
world.registerComponent(PlayerViewTagComponent)
world.registerComponent(ScoreComponent)
world.registerComponent(PlatformTagComponent)
world.registerComponent(GameStateComponent)

world.registerSystem(NewGameSystem)
world.registerSystem(GameOverSystem)
world.registerSystem(PlatformCreationSystem)
world.registerSystem(KeyboardSystem)
world.registerSystem(GamepadSystem)
world.registerSystem(PlayerMovementSystem)
world.registerSystem(PhysicsSystem)
world.registerSystem(PlayerViewSystem)
world.registerSystem(RenderingSystem)
world.registerSystem(UISystem)
world.registerSystem(ScoringSystem)

// Game state entity
world
  .createEntity()
  .addComponent(GameStateComponent)
  .addComponent(KeyboardControllerComponent)
  .addComponent(GamepadControllerComponent)

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
