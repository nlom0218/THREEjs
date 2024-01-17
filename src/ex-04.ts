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

  const geometry = new THREE.SphereGeometry(0.3, 32, 16)

  // 텍스처 추가
  const textureLoader = new THREE.TextureLoader()
  const textureBaseColor = textureLoader.load(
    '../static/img/wood_basecolor.jpg'
  )
  const textureHeightMap = textureLoader.load('../static/img/wood_height.png')
  const textureNormalMap = textureLoader.load('../static/img/wood_normal.jpg')
  const textureRoughnessMap = textureLoader.load(
    '../static/img/wood_roughness.jpg'
  )

  // material
  const material01 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
  })
  const obj1 = new THREE.Mesh(geometry, material01)
  obj1.position.x = -1.5

  scene.add(obj1)

  // material
  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
  })
  const obj2 = new THREE.Mesh(geometry, material02)
  obj2.position.x = -0.5

  scene.add(obj2)

  // material
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.03,
  })
  const obj3 = new THREE.Mesh(geometry, material03)
  obj3.position.x = 0.5

  scene.add(obj3)

  // material
  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.03,
    roughnessMap: textureRoughnessMap,
    roughness: 0.9,
  })
  const obj4 = new THREE.Mesh(geometry, material04)
  obj4.position.x = 1.5

  scene.add(obj4)

  const render = (time: number) => {
    time *= 0.0005

    // obj1.rotation.y = time
    // obj2.rotation.y = time
    // obj3.rotation.y = time
    // obj4.rotation.y = time
    // obj5.rotation.y = time

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
