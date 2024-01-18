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
  const fov = 100

  // 종횡비 = 가로 세로 비율
  // 모니터 속 viewport를 기준으로 설정
  const aspect = window.innerWidth / window.innerHeight

  // 카메라에 시점이 시작하는 위치
  const near = 0.1

  // 카메라에 시점이 끝나는 위치
  const far = 1000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  camera.position.x = 0
  camera.position.y = 1
  camera.position.z = 1
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 0, 1)
  scene.add(pointLight)

  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

  // material
  const material01 = new THREE.MeshStandardMaterial({ color: 0xff7f00 })
  const cube = new THREE.Mesh(geometry, material01)
  cube.rotation.y = 0.5

  scene.add(cube)

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
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
