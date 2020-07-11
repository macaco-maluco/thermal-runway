import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { System, Not } from 'ecsy'
import PositionComponent from '../components/PositionComponent'
import ModelComponent from '../components/ModelComponent'
import { ThreeMeshStateComponent } from '../components/ThreeMeshStateComponent'
import ScaleComponent from '../components/ScaleComponent'

export default class RenderingSystem extends System {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer

  character: THREE.Group

  init() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xc5c5c3)

    document.body.appendChild(renderer.domElement)

    function handleWindowResize() {
      const height = window.innerHeight
      const width = window.innerWidth
      const aspect = width / height

      renderer.setSize(width, height)

      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleWindowResize, false)

    camera.position.y = 2
    camera.position.z = 4
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    createLights().forEach((light) => scene.add(light))

    const loader = new FBXLoader()
    loader.load('character.fbx', (object) => {
      object.scale.x = 0.005
      object.scale.y = 0.005
      object.scale.z = 0.005

      const group = new THREE.Group()
      group.add(object)

      this.character = group
    })

    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.target.set(0, 100, 0)
    // controls.update()

    this.scene = scene
    this.renderer = renderer
    this.camera = camera
  }

  execute(delta, time) {
    if (!this.character) return

    this.queries.uninitialised.results.forEach((entity) => {
      const model = entity.getComponent(ModelComponent)
      const scale = entity.getComponent(ScaleComponent)

      console.log('this.character', this.character)

      const mesh =
        model.type === 'sphere'
          ? createSphere(model.color)
          : model.type === 'character'
          ? this.character
          : createBox(model.color)

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

      mesh.quaternion.set(position.rotationX, position.rotationY, position.rotationZ, position.rotationW)
    })

    this.renderer.render(this.scene, this.camera)
  }
}

const createBox = (color: string) => {
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}

const createSphere = (color: string) => {
  const geometry = new THREE.SphereBufferGeometry()
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}

RenderingSystem.queries = {
  uninitialised: {
    components: [ModelComponent, ScaleComponent, Not(ThreeMeshStateComponent)],
  },

  initialised: {
    components: [PositionComponent, ThreeMeshStateComponent],
  },
}

function createLights() {
  // const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
  shadowLight.position.set(150, 350, 350)

  const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)

  return [shadowLight, ambientLight]
}
