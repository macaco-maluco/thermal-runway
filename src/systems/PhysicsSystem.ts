import { System, Not } from 'ecsy'
import Ammo from 'ammojs-typed'
import RigidBodyComponent from '../components/RigidBodyComponent'
import { AmmoRigidBodyStateComponent } from '../components/AmmoRigidBodyStateComponent'
import PositionComponent from '../components/PositionComponent'

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

      physicsWorld.setGravity(new Ammo.btVector3(0, -2, 0))

      this.physicsWorld = physicsWorld
    })
  }

  execute(delta, time) {
    if (!this.physicsWorld) return

    this.queries.uninitialised.results.forEach((entity) => {
      const rigidBody = entity.getComponent(RigidBodyComponent)
      const position = entity.getComponent(PositionComponent)

      const transform = new Ammo.btTransform()
      transform.setIdentity()
      transform.setOrigin(new Ammo.btVector3(position.x, position.y, position.z))
      transform.setRotation(new Ammo.btQuaternion(position.rotationX, position.rotationY, position.rotationZ, 1))
      const motionState = new Ammo.btDefaultMotionState(transform)

      const colShape = new Ammo.btBoxShape(
        new Ammo.btVector3(rigidBody.scaleX * 0.5, rigidBody.scaleY * 0.5, rigidBody.scaleZ * 0.5),
      )

      // https://gamedev.stackexchange.com/questions/113774/why-do-physics-engines-use-collision-margins
      colShape.setMargin(1)

      const localInertia = new Ammo.btVector3(0, 0, 0)
      colShape.calculateLocalInertia(rigidBody.mass, localInertia)

      const rbInfo = new Ammo.btRigidBodyConstructionInfo(rigidBody.mass, motionState, colShape, localInertia)
      const ammoRigidBody = new Ammo.btRigidBody(rbInfo)

      this.physicsWorld.addRigidBody(ammoRigidBody)

      entity.addComponent(AmmoRigidBodyStateComponent, { rigidBody: ammoRigidBody })
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

        position.rotationX = q.x()
        position.rotationY = q.y()
        position.rotationZ = q.z()
      }
    })
  }
}

PhysicsSystem.queries = {
  uninitialised: {
    components: [PositionComponent, RigidBodyComponent, Not(AmmoRigidBodyStateComponent)],
  },

  initialised: {
    components: [AmmoRigidBodyStateComponent],
  },
}
