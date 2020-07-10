import * as THREE from 'three'
import { System } from 'ecsy'
import PositionComponent from '../components/PositionComponent'

export default class RenderingSystem extends System {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer

  init() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    function handleWindowResize() {
      const height = window.innerHeight
      const width = window.innerWidth
      const aspect = width / height

      renderer.setSize(width, height)

      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleWindowResize, false)

    camera.position.z = 5

    createLights().forEach((light) => scene.add(light))

    const geometry = new THREE.BoxGeometry()
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    var cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    this.scene = scene
    this.renderer = renderer
    this.camera = camera
  }

  execute(delta, time) {
    this.queries.position.results.forEach((entity) => {
      let pos = entity.getComponent(PositionComponent)
      console.log(`Entity with ID: ${entity.id} has component Position={x: ${pos.x}, y: ${pos.y}`)
    })

    this.renderer.render(this.scene, this.camera)
  }
}

RenderingSystem.queries = {
  position: {
    components: [PositionComponent],
  },
}

function createLights() {
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

  const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
  shadowLight.position.set(150, 350, 350)

  const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)

  return [hemisphereLight, shadowLight, ambientLight]
}
