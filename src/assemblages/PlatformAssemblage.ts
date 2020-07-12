import { World } from 'ecsy'
import Color from 'color'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import ScaleComponent from '../components/ScaleComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'
import PlatformTagComponent from '../tags/PlatformTagComponent'

const STARTING_SIZE = 40
const PLATFORM_DEPTH = 20
const PLATFORM_WIDTH = 3
const PADDING = 4

export const createPlatform = (world: World, positionZ: number) => {
  const sturdiness = Math.random()
  const platformColor = Color('purple').darken(sturdiness).hex()
  const x = Math.random() * 6 - 3

  const stickHeight = 0.01
  const stickWidth = 2
  const platformHeight = 1
  const platformWidth = PLATFORM_WIDTH
  const platformDepth = PLATFORM_DEPTH

  const positionY = -0.5

  // stick
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z: positionZ, y: positionY })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: stickHeight, x: stickWidth, z: stickWidth })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })
    .addComponent(PlatformTagComponent)

  // platform
  world
    .createEntity()
    .addComponent(PositionComponent, { x, z: positionZ, y: stickHeight + 0.5 + positionY })
    .addComponent(ModelComponent, { type: 'box', color: platformColor })
    .addComponent(ScaleComponent, { y: platformHeight, x: platformWidth, z: platformDepth })
    .addComponent(RigidBodyComponent, { mass: 10 * sturdiness + 0.5, type: 'box' })
    .addComponent(PlatformTagComponent)

  return positionZ - (PLATFORM_DEPTH + PADDING)
}

export const createStartingPlatform = (world: World) => {
  world
    .createEntity()
    .addComponent(PositionComponent, { x: 0, z: -STARTING_SIZE / 2 + 1 })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: 0.1, x: 2, z: STARTING_SIZE })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })

  return -(STARTING_SIZE + PADDING + 10)
}
