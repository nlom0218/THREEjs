import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()

  // 카메라

  // 시야각, 화각
  // 확대 촬영을 원하면, 망원 렌저: 85mm이상, 화각(FOV): 28도 이하
  // 인간의 눈과 비슷한 촬영을 원하면, 표준 렌즈: 50mm, 화각(FOV): 47도
  // 럽은 범위 촬영을 원하면, 광각 렌즈: 35mm 이하, 화각(FOW): 63도 이상
  const fov = 150

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

  document.body.appendChild(renderer.domElement)

  // 빛

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
  // scene.add(ambientLight)

  const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionLight.position.set(0.7, 0.7, 0.7)

  const dlHelper = new THREE.DirectionalLightHelper(
    directionLight,
    0.2,
    0x0000ff
  )
  // scene.add(dlHelper)
  // scene.add(directionLight)

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.3)
  // scene.add(hemisphereLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  // scene.add(pointLight)
  pointLight.position.set(0.5, 0.5, 0.5)
  const plHelper = new THREE.PointLightHelper(pointLight, 0.1, 0x0000ff)
  // scene.add(plHelper)

  const pointLight2 = new THREE.PointLight(0xffffff, 1)
  // scene.add(pointLight2)
  pointLight2.position.set(-2, 1, 0.5)
  const plHelper2 = new THREE.PointLightHelper(pointLight2, 0.1, 0x0000ff)
  // scene.add(plHelper2)

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5)
  rectLight.position.set(0.5, 0.5, 1)
  // rectLight.lookAt(0, 0, 0)
  // scene.add(rectLight)

  const spotLight = new THREE.SpotLight(0xffffff, 0.5)
  scene.add(spotLight)

  const geometry = new THREE.SphereGeometry(0.5, 32, 16)

  // material
  const material01 = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const cube = new THREE.Mesh(geometry, material01)
  cube.rotation.y = 0.5
  cube.position.y = 0
  cube.position.x = 0

  scene.add(cube)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5

  scene.add(plane)

  const render = (time: number) => {
    time *= 0.0005

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
