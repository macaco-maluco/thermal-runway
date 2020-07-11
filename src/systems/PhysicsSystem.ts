import { System, Not } from 'ecsy'
import * as THREE from 'three'
import Ammo from 'ammojs-typed'
import RigidBodyComponent from '../components/RigidBodyComponent'
import { AmmoRigidBodyStateComponent } from '../components/AmmoRigidBodyStateComponent'
import PositionComponent from '../components/PositionComponent'
import ScaleComponent from '../components/ScaleComponent'
import VelocityComponent from '../components/VelocityComponent'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import { ThreeMeshStateComponent } from '../components/ThreeMeshStateComponent'

export class PhysicsSystem extends System {
  physicsWorld: Ammo.btDiscreteDynamicsWorld

  init() {
    Ammo(Ammo).then(() => {
      const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration()
      const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration)
      const overlappingPairCache = new Ammo.btDbvtBroadphase()
      const solver = new Ammo.btSequentialImpulseConstraintSolver()

      const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
        dispatcher,
        overlappingPairCache,
        solver,
        collisionConfiguration,
      )

      physicsWorld.setGravity(new Ammo.btVector3(0, -20, 0))

      this.physicsWorld = physicsWorld
    })
  }

  execute(delta, time) {
    if (!this.physicsWorld) return

    this.queries.removed.removed.forEach((entity) => {
      const rigidBody = entity.getComponent(AmmoRigidBodyStateComponent)
      this.physicsWorld.removeRigidBody(rigidBody.rigidBody)
      entity.removeComponent(AmmoRigidBodyStateComponent)
    })

    this.queries.uninitialised.results.forEach((entity) => {
      const rigidBody = entity.getComponent(RigidBodyComponent)
      const position = entity.getComponent(PositionComponent)
      const scale = entity.getComponent(ScaleComponent)

      const transform = new Ammo.btTransform()
      transform.setIdentity()
      transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z))
      transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1))
      const motionState = new Ammo.btDefaultMotionState(transform)

      const colShape =
        rigidBody.type === 'sphere'
          ? new Ammo.btSphereShape(scale.x * 0.5)
          : new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5))

      // https://gamedev.stackexchange.com/questions/113774/why-do-physics-engines-use-collision-margins
      colShape.setMargin(0.05)

      const localInertia = new Ammo.btVector3(0, 0, 0)
      colShape.calculateLocalInertia(rigidBody.mass, localInertia)

      const rbInfo = new Ammo.btRigidBodyConstructionInfo(rigidBody.mass, motionState, colShape, localInertia)
      const ammoRigidBody = new Ammo.btRigidBody(rbInfo)

      ammoRigidBody.setActivationState(4)
      ammoRigidBody.setRestitution(0.5)

      this.physicsWorld.addRigidBody(ammoRigidBody)

      entity.addComponent(AmmoRigidBodyStateComponent, { rigidBody: ammoRigidBody })
    })

    this.queries.motion.results.forEach((entity) => {
      const velocity = entity.getComponent(VelocityComponent)
      const rigidBody = entity.getComponent(AmmoRigidBodyStateComponent)
      const bodyVelocity = rigidBody.rigidBody.getLinearVelocity()

      const newBodyVelocity = new Ammo.btVector3(
        bodyVelocity.x() + (velocity.x - bodyVelocity.x()) * 0.2,
        bodyVelocity.y(),
        bodyVelocity.z() + (velocity.z - bodyVelocity.z()) * 0.1,
      )

      const jumpImpulse = new Ammo.btVector3(0, velocity.y, 0)

      rigidBody.rigidBody.setLinearVelocity(newBodyVelocity)
      rigidBody.rigidBody.applyCentralImpulse(jumpImpulse)
    })

    this.physicsWorld.stepSimulation(delta, 1)

    const tmpTrans = new Ammo.btTransform()

    this.queries.initialised.results.forEach((entity) => {
      const position = entity.getMutableComponent(PositionComponent)
      const rigidBody = entity.getComponent(AmmoRigidBodyStateComponent)

      const ms = rigidBody.rigidBody.getMotionState()
      if (ms) {
        ms.getWorldTransform(tmpTrans)
        const p = tmpTrans.getOrigin()
        const q = tmpTrans.getRotation()

        position.x = p.x()
        position.y = p.y()
        position.z = p.z()

        const euler = new THREE.Euler()
        euler.setFromQuaternion(new THREE.Quaternion(q.x(), q.y(), q.z(), q.w()))

        position.rotationX = euler.x
        position.rotationY = euler.y
        position.rotationZ = euler.z
      }
    })

    this.queries.jumpable.results.forEach((entity) => {
      const scale = entity.getComponent(ScaleComponent)
      const position = entity.getMutableComponent(PositionComponent)
      const testFrom = new Ammo.btVector3(position.x, position.y, position.z)
      const testTo = new Ammo.btVector3(testFrom.x(), testFrom.y() - scale.x, testFrom.z())
      const res = new Ammo.ClosestRayResultCallback(testFrom, testTo)
      this.physicsWorld.rayTest(testFrom, testTo, res)
      position.grounded = res.hasHit()
    })
  }
}

PhysicsSystem.queries = {
  uninitialised: {
    components: [PositionComponent, ScaleComponent, RigidBodyComponent, Not(AmmoRigidBodyStateComponent)],
  },

  initialised: {
    components: [AmmoRigidBodyStateComponent],
  },

  removed: {
    components: [RigidBodyComponent],
    listen: {
      removed: true,
    },
  },

  motion: {
    components: [AmmoRigidBodyStateComponent, PositionComponent, VelocityComponent],
  },

  jumpable: {
    components: [PositionComponent, PlayerTagComponent, ScaleComponent],
  },
}
