import { SystemStateComponent, Types } from 'ecsy'

interface ThreeMeshState {
  mesh: THREE.Mesh
}

export class ThreeMeshStateComponent extends SystemStateComponent<ThreeMeshState> implements ThreeMeshState {
  mesh: THREE.Mesh
}

ThreeMeshStateComponent.schema = {
  mesh: { type: Types.Ref },
}
