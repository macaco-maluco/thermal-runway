import { World } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import ScaleComponent from '../components/ScaleComponent'
import KeyboardControllerComponent from '../components/KeyboardControllerComponent'
import GamepadControllerComponent from '../components/GamepadControllerComponent'
import VelocityComponent from '../components/VelocityComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import ScoreComponent from '../components/ScoreComponent'

export const createPlayerBody = (world: World) => {
  // Player physics body
  world
    .createEntity()
    .addComponent(PositionComponent, { y: 2 })
    // .addComponent(ModelComponent, { color: 'red', type: 'sphere' })
    .addComponent(ScaleComponent, { x: 0.6, y: 0.6, z: 0.6 })
    .addComponent(KeyboardControllerComponent)
    .addComponent(GamepadControllerComponent)
    .addComponent(VelocityComponent)
    .addComponent(RigidBodyComponent, { mass: 1, type: 'sphere' })
    .addComponent(PlayerTagComponent)
    .addComponent(ScoreComponent)
}
