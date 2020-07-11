import { World } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import ScaleComponent from '../components/ScaleComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'

const STARTING_SIZE = 80

export const createPlatform = (world: World, x: number, z: number) => {
  const stickHeight = 0.01
  const stickWidth = 0.5
  const platformHeight = 0.1
  const platformWidth = 2

  // stick
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z: z - STARTING_SIZE })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: stickHeight, x: stickWidth, z: stickWidth })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })

  // platform
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z: z - STARTING_SIZE, y: stickHeight + 0.5 })
    .addComponent(ModelComponent, { type: 'box', color: 'purple' })
    .addComponent(ScaleComponent, { y: platformHeight, x: platformWidth, z: platformWidth * 3 })
    .addComponent(RigidBodyComponent, { mass: 5, type: 'box' })
}

export const createStartingPlatform = (world: World) => {
  world
    .createEntity()
    .addComponent(PositionComponent, { x: 0, z: -STARTING_SIZE / 2 })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: 0.1, x: 2, z: STARTING_SIZE })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })
}
