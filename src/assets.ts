import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

interface PreloadAsset {
  model: string
  material: string
}

export interface ModelMap extends Map<ModelRef, THREE.Group> {}

export type ModelRef = 'ship1' | 'ship2'

const preloadAssets = new Map<ModelRef, PreloadAsset>()

preloadAssets.set('ship1', { model: 'spaceCraft4.obj', material: 'spaceCraft4.mtl' })
preloadAssets.set('ship2', { model: 'spaceCraft6.obj', material: 'spaceCraft6.mtl' })

export const loadAssets = (
  objLoader: OBJLoader,
  mtlLoader: MTLLoader,
  done: (models: ModelMap) => void,
  asset: IterableIterator<[string, PreloadAsset]> = preloadAssets.entries(),
  models: ModelMap = new Map(),
) => {
  const currentAsset = asset.next()

  if (currentAsset.done) {
    return done(models)
  }

  const [id, { model, material }] = currentAsset.value // idk why this doesn't type

  mtlLoader.load(material, (loadedMaterial) => {
    objLoader.setMaterials(loadedMaterial).load(model, (loadedModel) => {
      loadedModel.scale.x = 1
      loadedModel.scale.y = 1
      loadedModel.scale.z = 1

      loadedModel.traverse((o) => {
        o.castShadow = true
      })

      const group = new THREE.Group()
      group.add(loadedModel)

      models.set(id, loadedModel)

      loadAssets(objLoader, mtlLoader, done, asset, models)
    })
  })
}
