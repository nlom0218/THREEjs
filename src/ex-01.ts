import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  // 장면
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x004fff)

  // 카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  // 캔버스
  const canvas = document.querySelector('#ex-01') as HTMLCanvasElement

  // 렌더러
  const renderer = new THREE.WebGLRenderer({ canvas })

  const render = (time: number) => {
    time *= 0.001

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
