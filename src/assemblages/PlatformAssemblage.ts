import { World } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import ScaleComponent from '../components/ScaleComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'
import PlatformTagComponent from '../tags/PlatformTagComponent'

const STARTING_SIZE = 80
const PLATFORM_DEPTH = 20
const PLATFORM_WIDTH = 3
const PADDING = 10

export const createPlatform = (world: World, x: number, z: number) => {
  const stickHeight = 0.01
  const stickWidth = 2
  const platformHeight = 1
  const platformWidth = PLATFORM_WIDTH
  const platformDepth = PLATFORM_DEPTH

  const position = -z * (PLATFORM_DEPTH + PADDING) - STARTING_SIZE + 5

  // stick
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z: position })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: stickHeight, x: stickWidth, z: stickWidth })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })
    .addComponent(PlatformTagComponent)

  // platform
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z: position, y: stickHeight + 0.5 })
    .addComponent(ModelComponent, { type: 'box', color: 'purple' })
    .addComponent(ScaleComponent, { y: platformHeight, x: platformWidth, z: platformDepth })
    .addComponent(RigidBodyComponent, { mass: 5, type: 'box' })
    .addComponent(PlatformTagComponent)
}

export const createStartingPlatform = (world: World) => {
  world
    .createEntity()
    .addComponent(PositionComponent, { x: 0, z: -STARTING_SIZE / 2 + 1 })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: 0.1, x: 2, z: STARTING_SIZE })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })
}
