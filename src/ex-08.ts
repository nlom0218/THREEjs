import * as THREE from 'three'
import { WEBGL } from './webgl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()

  // 카메라

  // 시야각, 화각
  // 확대 촬영을 원하면, 망원 렌저: 85mm이상, 화각(FOV): 28도 이하
  // 인간의 눈과 비슷한 촬영을 원하면, 표준 렌즈: 50mm, 화각(FOV): 47도
  // 럽은 범위 촬영을 원하면, 광각 렌즈: 35mm 이하, 화각(FOW): 63도 이상
  const fov = 120

  // 종횡비 = 가로 세로 비율
  // 모니터 속 viewport를 기준으로 설정
  const aspect = window.innerWidth / window.innerHeight

  // 카메라에 시점이 시작하는 위치
  const near = 0.1

  // 카메라에 시점이 끝나는 위치
  const far = 1000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 1

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true

  document.body.appendChild(renderer.domElement)

  // OrbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2
  controls.maxDistance = 6
  controls.maxPolarAngle = Math.PI / 2
  controls.update()

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  // ambientLight.castShadow = true // 그림자x
  // scene.add(ambientLight)

  const directionLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionLight.castShadow = true // 그림자 ㅐ
  directionLight.shadow.mapSize.width = 2048
  directionLight.shadow.mapSize.height = 2048
  directionLight.shadow.radius = 8
  directionLight.position.set(0.7, 0.7, 0.7)

  const dlHelper = new THREE.DirectionalLightHelper(
    directionLight,
    0.2,
    0x0000ff
  )
  scene.add(dlHelper)
  scene.add(directionLight)

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3)
  // scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.castShadow = true // 그림자 o
  scene.add(pointLight)
  // pointLight.position.set(-1.5, 1.5, 1.5)
  const plHelper = new THREE.PointLightHelper(pointLight, 0.1, 0x0000ff)
  // scene.add(plHelper)

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5)
  rectLight.position.set(0.5, 0.5, 1)
  rectLight.castShadow = true // 그림자 x
  // rectLight.lookAt(0, 0, 0)
  // scene.add(rectLight)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  spotLight.position.set(1, 3, -1)
  spotLight.castShadow = true // 그림자 o
  // scene.add(spotLight)

  // const geometry = new THREE.SphereGeometry(0.5, 32, 16)
  // const geometry = new THREE.IcosahedronBufferGeometry(0.5, 0)
  const geometry = new THREE.ConeGeometry(0.4, 0.7, 6)

  // material
  const obj1 = new THREE.MeshStandardMaterial({ color: 0x004fff })
  const cube = new THREE.Mesh(geometry, obj1)

  cube.position.y = 0
  cube.position.x = 0

  cube.castShadow = true

  scene.add(cube)

  const geometry2 = new THREE.IcosahedronBufferGeometry(0.5, 0)

  // material
  const obj2 = new THREE.MeshStandardMaterial({ color: 0x004fff })
  const cube2 = new THREE.Mesh(geometry2, obj2)

  cube2.position.set(-1, 0, 0.1)

  cube2.castShadow = true

  scene.add(cube2)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5

  plane.receiveShadow = true
  scene.add(plane)

  const animate = () => {
    requestAnimationFrame(animate)

    cube.rotation.y += 0.01
    cube2.rotation.x -= 0.01
    cube2.rotation.y += 0.02

    controls.update()
    renderer.render(scene, camera)
  }

  animate()

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
