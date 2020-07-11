import { World } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import ScaleComponent from '../components/ScaleComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'

export const createPlatform = (world: World, x: number, z: number) => {
  const stickHeight = 0.01
  const stickWidth = 0.5
  const platformHeight = 0.1
  const platformWidth = 2

  // stick
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: stickHeight, x: stickWidth, z: stickWidth })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })

  // platform
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z, y: stickHeight })
    .addComponent(ModelComponent, { type: 'box', color: 'purple' })
    .addComponent(ScaleComponent, { y: platformHeight, x: platformWidth, z: platformWidth })
    .addComponent(RigidBodyComponent, { mass: 5, type: 'box' })
}
