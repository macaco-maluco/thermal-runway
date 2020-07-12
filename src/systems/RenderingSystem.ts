import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { System, Not } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import { ThreeMeshStateComponent } from '../components/ThreeMeshStateComponent'
import ScaleComponent from '../components/ScaleComponent'
import PlayerTagComponent from '../tags/PlayerTagComponent'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { ModelMap, loadAssets } from '../assets'
import { AmmoRigidBodyStateComponent } from '../components/AmmoRigidBodyStateComponent'
import {
  SURFACE_COLOR,
  PLAYER_LIGHT_COLOR,
  AMBIENT_LIGHT_COLOR,
  BACKGROUND_COLOR,
  PLAYER_LIGHT_INTENSITY,
  AMBIENT_LIGHT_INTENSITY,
} from '../palette'

export default class RenderingSystem extends System {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  shadowLight: THREE.DirectionalLight

  models: ModelMap

  init() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(BACKGROUND_COLOR)
    renderer.shadowMapEnabled = true

    document.getElementById('canvas').appendChild(renderer.domElement)

    function handleWindowResize() {
      const height = window.innerHeight
      const width = window.innerWidth
      const aspect = width / height

      renderer.setSize(width, height)

      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleWindowResize, false)

    camera.position.y = 4
    camera.position.z = 7
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    const shadowLight = new THREE.DirectionalLight(PLAYER_LIGHT_COLOR, PLAYER_LIGHT_INTENSITY)
    // shadowLight.shadowCameraFov = 200
    shadowLight.castShadow = true
    shadowLight.position.set(0, 20, 0)
    shadowLight.shadowCameraTop = 60

    scene.add(shadowLight)
    scene.add(shadowLight.target)

    const ambientLight = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY)
    scene.add(ambientLight)

    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()

    loadAssets(objLoader, mtlLoader, (models) => {
      this.models = models
    })

    scene.fog = new THREE.Fog(BACKGROUND_COLOR, 50, 600)

    scene.add(createSurface())

    this.scene = scene
    this.renderer = renderer
    this.camera = camera
    this.shadowLight = shadowLight
  }

  execute() {
    if (!this.models) return

    this.queries.removed.removed.forEach((entity) => {
      const mesh = entity.getComponent(ThreeMeshStateComponent)
      if (mesh) {
        this.scene.remove(mesh.mesh)
      }
      entity.removeComponent(ThreeMeshStateComponent)
    })

    this.queries.uninitialised.results.forEach((entity) => {
      const model = entity.getComponent(ModelComponent)
      const scale = entity.getComponent(ScaleComponent)

      const mesh =
        model.type === 'sphere'
          ? createSphere(model.color)
          : model.type === 'box'
          ? createBox(model.color)
          : this.models.get(model.type)

      mesh.scale.set(scale.x, scale.y, scale.z)

      this.scene.add(mesh)

      entity.addComponent(ThreeMeshStateComponent, { mesh })
    })

    this.queries.initialised.results.forEach((entity) => {
      const { mesh } = entity.getComponent(ThreeMeshStateComponent)
      const position = entity.getComponent(PositionComponent)
      mesh.position.x = position.x
      mesh.position.y = position.y
      mesh.position.z = position.z

      mesh.rotation.x = position.rotationX
      mesh.rotation.y = position.rotationY
      mesh.rotation.z = position.rotationZ
    })

    this.queries.cameraTracker.results.forEach((entity) => {
      const position = entity.getComponent(PositionComponent)
      const { rigidBody } = entity.getComponent(AmmoRigidBodyStateComponent)

      const velocity = Math.abs(rigidBody.getLinearVelocity().z())
      const velocityFactor = velocity > 30 ? (velocity - 30) / 20 : 0

      this.camera.position.x = 0
      this.camera.position.y = position.y + 3.5 + velocityFactor * 2.4
      this.camera.position.z = position.z + 5 + velocityFactor * 4
      this.camera.lookAt(0, position.y, position.z)

      this.shadowLight.position.x = position.x
      this.shadowLight.position.y = position.y + 100
      this.shadowLight.position.z = position.z

      this.shadowLight.target.position.x = position.x
      this.shadowLight.target.position.y = position.y
      this.shadowLight.target.position.z = position.z

      // this.surface.position.z = position.z
    })

    this.renderer.render(this.scene, this.camera)
  }
}

const createBox = (color: string) => {
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.receiveShadow = true
  mesh.castShadow = true
  return mesh
}

const createSphere = (color: string) => {
  const geometry = new THREE.SphereBufferGeometry()
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  return mesh
}

function createSurface(worldWidth = 30, worldLength = 20000) {
  const geometry = new THREE.PlaneBufferGeometry(
    worldWidth,
    worldLength,
    Math.round(worldWidth / 5),
    Math.round(worldLength / 5),
  )

  const vertices = geometry.attributes.position.array as number[]
  for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
    vertices[j + 2] = Math.random() * 2
  }

  const material = new THREE.MeshPhongMaterial({
    color: SURFACE_COLOR,
    flatShading: true,
  })

  const mesh = new THREE.Mesh(geometry, material)

  mesh.rotation.x = -90 * (Math.PI / 180)
  mesh.position.y = -6
  mesh.position.z = -worldLength / 2 + 20
  mesh.receiveShadow = true

  return mesh
}

RenderingSystem.queries = {
  uninitialised: {
    components: [ModelComponent, ScaleComponent, Not(ThreeMeshStateComponent)],
  },

  initialised: {
    components: [PositionComponent, ThreeMeshStateComponent],
  },

  removed: {
    components: [ModelComponent],
    listen: {
      removed: true,
    },
  },

  cameraTracker: {
    components: [PlayerTagComponent, PositionComponent, AmmoRigidBodyStateComponent],
  },
}
