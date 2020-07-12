import * as THREE from 'three'
import { System, Not } from 'ecsy'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import PlayerViewTagComponent from '../tags/PlayerViewTagComponent'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import ScaleComponent from '../components/ScaleComponent'
import { AmmoRigidBodyStateComponent } from '../components/AmmoRigidBodyStateComponent'
import FakePlayerTagComponent from '../tags/FakePlayerTagComponent'

export default class PlayerViewSystem extends System {
  playerPosition: PositionComponent
  playerScale: ScaleComponent
  playerYaw = 0
  playerPitch = 0
  playerViewScale = 0.05
  playerRemoved = false

  execute() {
    // When a new player component is added,
    // we want to create a view component for it
    this.queries.playerRigidBody.added.forEach((entity) => {
      this.world
        .createEntity()
        .addComponent(PlayerViewTagComponent)
        .addComponent(PositionComponent)
        .addComponent(ScaleComponent, { x: this.playerViewScale, y: this.playerViewScale, z: this.playerViewScale })
        .addComponent(ModelComponent, { type: 'ship2' })
    })

    this.queries.playerRigidBody.results.forEach((entity) => {
      this.playerPosition = entity.getComponent(PositionComponent)
      this.playerScale = entity.getComponent(ScaleComponent)

      const { rigidBody } = entity.getComponent(AmmoRigidBodyStateComponent)
      const velocity = rigidBody.getLinearVelocity()

      const yawVector = new THREE.Vector2(velocity.x(), velocity.z())
      const pitchVector = new THREE.Vector2(velocity.z(), velocity.y())

      this.playerYaw = yawVector.angle() + 90 * (Math.PI / 180)
      this.playerPitch = pitchVector.angle() + 180 * (Math.PI / 180)
    })

    this.queries.playerRigidBody.removed.forEach((entity) => {
      this.playerRemoved = true
    })

    this.queries.playerView.results.forEach((entity) => {
      if (this.playerRemoved) {
        this.playerRemoved = false
        entity.remove()
        return
      }

      const playerViewPosition = entity.getMutableComponent(PositionComponent)
      playerViewPosition.x = this.playerPosition.x
      playerViewPosition.y = this.playerPosition.y - this.playerScale.x / 2 + 0.2
      playerViewPosition.z = this.playerPosition.z

      playerViewPosition.rotationY = this.playerYaw * -1
      playerViewPosition.rotationX = this.playerPitch * -1
    })
  }
}

PlayerViewSystem.queries = {
  playerRigidBody: {
    components: [
      PlayerTagComponent,
      PositionComponent,
      ScaleComponent,
      AmmoRigidBodyStateComponent,
      Not(FakePlayerTagComponent),
    ],
    listen: {
      added: true,
      changed: true,
      removed: true,
    },
  },

  playerView: {
    components: [PlayerViewTagComponent],
  },
}
