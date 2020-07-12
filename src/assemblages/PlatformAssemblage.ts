import { World } from 'ecsy'
import Color from 'color'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import ScaleComponent from '../components/ScaleComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'
import PlatformTagComponent from '../tags/PlatformTagComponent'
import { PLATFORM_COLOR, STARTING_PLATFORM_COLOR } from '../palette'

const levels = [
  // {
  //   platformDepth: [20, 30],
  //   platformWidth: [6, 8],
  //   platformX: [-2, 2],
  //   padding: [4, 4],
  //   sturdiness: [0.9, 0.9],
  // },
  // {
  //   platformDepth: [20, 30],
  //   platformWidth: [5, 8],
  //   platformX: [-2, 2],
  //   padding: [4, 5],
  //   sturdiness: [0.7, 0.9],
  // },
  // {
  //   platformDepth: [20, 30],
  //   platformWidth: [4, 7],
  //   platformX: [-2, 2],
  //   padding: [4, 6],
  //   sturdiness: [0.4, 0.9],
  // },
  // {
  //   platformDepth: [20, 30],
  //   platformWidth: [4, 7],
  //   platformX: [-3, 3],
  //   padding: [4, 6],
  //   sturdiness: [0.3, 0.9],
  // },
  // {
  //   platformDepth: [20, 30],
  //   platformWidth: [4, 7],
  //   platformX: [-3, 3],
  //   padding: [6, 10],
  //   sturdiness: [0.9, 0.9],
  // },
  // {
  //   platformDepth: [20, 30],
  //   platformWidth: [4, 7],
  //   platformX: [-3, 3],
  //   padding: [8, 12],
  //   sturdiness: [0.9, 0.6],
  // },
  {
    platformDepth: [20, 30],
    platformWidth: [4, 7],
    platformX: [-3, 3],
    padding: [12, 14],
    sturdiness: [0.6, 0.8],
  },
]

const STARTING_SIZE = 40
const STARTING_PADDING = 26

function getRandom([low, high]: number[]) {
  const delta = high - low
  const value = Math.random() * delta
  return low + value
}

function getLevelFromPosition(position: number) {
  return Math.min(Math.round((position * -1) / 100), levels.length - 1)
}

export const createPlatform = (world: World, positionZ: number) => {
  const levelId = getLevelFromPosition(positionZ)
  const currentLevel = levels[levelId]

  const stickHeight = 0.01
  const platformHeight = 2
  const sturdiness = getRandom(currentLevel.sturdiness)
  const x = getRandom(currentLevel.platformX)
  const platformWidth = getRandom(currentLevel.platformWidth)
  const platformDepth = getRandom(currentLevel.platformDepth)
  const padding = getRandom(currentLevel.padding)
  const stickWidth = platformDepth / 10

  // const platformColor = Color('purple').darken(sturdiness).hex()
  const platformColor = PLATFORM_COLOR

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

  return positionZ - (platformDepth + padding)
}

export const createStartingPlatform = (world: World) => {
  world
    .createEntity()
    .addComponent(PositionComponent, { x: 0, z: -STARTING_SIZE / 2 + 1, y: 1, rotationX: 0 })
    .addComponent(ModelComponent, { type: 'box', color: STARTING_PLATFORM_COLOR })
    .addComponent(ScaleComponent, { y: 0.1, x: 6, z: STARTING_SIZE })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })
    .addComponent(PlatformTagComponent)

  return -(STARTING_SIZE + STARTING_PADDING)
}
