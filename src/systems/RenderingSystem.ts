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
    renderer.setClearColor(0xc5c5c3)
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

    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
    // shadowLight.shadowCameraFov = 200
    shadowLight.castShadow = true
    shadowLight.position.set(0, 20, 0)
    shadowLight.shadowCameraTop = 60

    scene.add(shadowLight)
    scene.add(shadowLight.target)

    const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)
    scene.add(ambientLight)

    const objLoader = new OBJLoader()
    const mtlLoader = new MTLLoader()

    loadAssets(objLoader, mtlLoader, (models) => {
      this.models = models
    })

    const geometry = new THREE.BoxGeometry(10000, 2, 10000)
    const material = new THREE.MeshStandardMaterial({ color: '#333' })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = -4
    mesh.receiveShadow = true
    scene.add(mesh)

    this.scene = scene
    this.renderer = renderer
    this.camera = camera
    this.shadowLight = shadowLight
  }

  execute(delta, time) {
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
      this.camera.position.x = 0
      this.camera.position.y = position.y + 5
      this.camera.position.z = position.z + 6
      this.camera.lookAt(0, position.y, position.z)

      this.shadowLight.position.x = position.x
      this.shadowLight.position.y = position.y + 100
      this.shadowLight.position.z = position.z

      this.shadowLight.target.position.x = position.x
      this.shadowLight.target.position.y = position.y
      this.shadowLight.target.position.z = position.z
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
    components: [PlayerTagComponent, PositionComponent],
  },
}
