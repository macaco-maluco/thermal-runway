import { SystemStateComponent, Types } from 'ecsy'
import Ammo from 'ammojs-typed'

interface AmmoRigidBodyState {
  rigidBody: Ammo.btRigidBody
}

export class AmmoRigidBodyStateComponent extends SystemStateComponent<AmmoRigidBodyState>
  implements AmmoRigidBodyState {
  rigidBody: Ammo.btRigidBody
}

AmmoRigidBodyStateComponent.schema = {
  rigidBody: { type: Types.Ref },
}
