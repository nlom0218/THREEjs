import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 2

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40)

  // material
  const material01 = new THREE.MeshBasicMaterial({ color: 0xff7f00 })
  const obj1 = new THREE.Mesh(geometry, material01)
  obj1.position.x = -2

  scene.add(obj1)

  // material
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    // metalness: 0.6,
    // roughness: 0.4,
    // wireframe: true,
    // transparent: true,
    // opacity: 0.5,
  })
  const obj2 = new THREE.Mesh(geometry, material02)
  obj2.position.x = -1

  scene.add(obj2)

  // material
  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xff7f00,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  })
  const obj3 = new THREE.Mesh(geometry, material03)

  scene.add(obj3)

  // material
  const material04 = new THREE.MeshLambertMaterial({ color: 0xff7f00 })
  const obj4 = new THREE.Mesh(geometry, material04)
  obj4.position.x = 1

  scene.add(obj4)

  // material
  const material05 = new THREE.MeshPhongMaterial({
    color: 0xff7f00,
    shininess: 60,
    specular: 0x004ff,
  })
  const obj5 = new THREE.Mesh(geometry, material05)
  obj5.position.x = 2

  scene.add(obj5)

  const render = (time: number) => {
    time *= 0.0005

    obj1.rotation.y = time
    obj2.rotation.y = time
    obj3.rotation.y = time
    obj4.rotation.y = time
    obj5.rotation.y = time

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)

  // 반응형
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
