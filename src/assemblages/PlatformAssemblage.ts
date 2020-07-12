import { World } from 'ecsy'
import Color from 'color'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import ScaleComponent from '../components/ScaleComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'
import PlatformTagComponent from '../tags/PlatformTagComponent'

const levels = [
  {
    platformDepth: [18, 20],
    platformWidth: [5, 8],
    platformX: [-2, 2],
    padding: [2, 4],
    sturdiness: [0.6, 0.9],
  },
  {
    platformDepth: [14, 18],
    platformWidth: [4, 7],
    platformX: [-2, 2],
    padding: [2, 5],
    sturdiness: [0.4, 0.9],
  },
  {
    platformDepth: [10, 16],
    platformWidth: [3, 7],
    platformX: [-3, 3],
    padding: [2, 6],
    sturdiness: [0.3, 0.9],
  },
  {
    platformDepth: [8, 14],
    platformWidth: [2, 7],
    platformX: [-4, 4],
    padding: [4, 10],
    sturdiness: [0.2, 0.9],
  },
  {
    platformDepth: [5, 14],
    platformWidth: [2, 4],
    platformX: [-4, 4],
    padding: [4, 12],
    sturdiness: [0.2, 0.6],
  },
  {
    platformDepth: [5, 12],
    platformWidth: [2, 3],
    platformX: [-5, 5],
    padding: [15, 20],
    sturdiness: [0.1, 0.2],
  },
]

const STARTING_SIZE = 40
const STARTING_PADDING = 20

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
  console.log('levelId', levelId)

  const stickHeight = 0.01
  const platformHeight = 1
  const sturdiness = getRandom(currentLevel.sturdiness)
  const x = getRandom(currentLevel.platformX)
  const platformWidth = getRandom(currentLevel.platformWidth)
  const platformDepth = getRandom(currentLevel.platformDepth)
  const padding = getRandom(currentLevel.padding)
  const stickWidth = platformDepth / 10

  const platformColor = Color('purple').darken(sturdiness).hex()

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
    .addComponent(PositionComponent, { x: 0, z: -STARTING_SIZE / 2 + 1 })
    .addComponent(ModelComponent, { type: 'box', color: 'blue' })
    .addComponent(ScaleComponent, { y: 0.1, x: 2, z: STARTING_SIZE })
    .addComponent(RigidBodyComponent, { mass: 0, type: 'box' })

  return -(STARTING_SIZE + STARTING_PADDING)
}
