import { System, Entity } from 'ecsy'
import GameStateComponent from '../components/GameStateComponent'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PositionComponent from '../components/PositionComponent'
import FakePlayerTagComponent from '../tags/FakePlayerTagComponent'
import RigidBodyComponent from '../components/RigidBodyComponent'
import VelocityComponent from '../components/VelocityComponent'
import ScaleComponent from '../components/ScaleComponent'
import GravityComponent from '../components/GravityComponent'

export default class MainMenuSystem extends System {
  screenEnabled: boolean = false

  onScreenInit(entity: Entity) {
    const state = entity.getComponent(GameStateComponent)
    if (state.screen === 'main-menu') {
      this.screenEnabled = true
      this.world
        .createEntity()
        .addComponent(PlayerTagComponent)
        .addComponent(PositionComponent, { y: 2 })
        .addComponent(RigidBodyComponent, { mass: 1, type: 'sphere' })
        .addComponent(VelocityComponent, { z: -20 })
        .addComponent(ScaleComponent, { x: 0.6, y: 0.6, z: 0.6 })
        .addComponent(GravityComponent, { x: 0, y: 0, z: 0 })
        .addComponent(FakePlayerTagComponent)
    } else {
      this.screenEnabled = false
    }
  }

  execute() {
    this.queries.gameState.added.forEach((entity) => this.onScreenInit(entity))
    this.queries.gameState.changed.forEach((entity) => this.onScreenInit(entity))

    if (!this.enabled) {
      this.queries.fakeShip.results.forEach((entity) => {
        entity.remove()
      })
    } else {
      this.queries.fakeShip.results.forEach((entity) => {
        const position = entity.getComponent(PositionComponent)

        // if (position.y < 2) {
        //   const velocity = entity.getMutableComponent(VelocityComponent)
        //   velocity.y = 0.8
        // } else {
        //   const velocity = entity.getMutableComponent(VelocityComponent)
        //   velocity.y = 0.4
        // }
      })
    }
  }
}

MainMenuSystem.queries = {
  gameState: {
    components: [GameStateComponent],
    listen: {
      added: true,
      changed: true,
    },
  },

  fakeShip: {
    components: [FakePlayerTagComponent, PositionComponent],
  },
}
