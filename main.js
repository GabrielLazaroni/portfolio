import * as THREE from "three"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  1,
  1000,
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor("#0C0C0C")
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material = new THREE.MeshBasicMaterial({
  color: "#1e1e1e",
  side: THREE.BackSide,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

function createWireframeCube(geometry) {
  const edges = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({ color: "#1e1e1e" })
  const wireframe = new THREE.LineSegments(edges, lineMaterial)
  wireframe.scale.set(3, 3, 3)
  const scale = 10
  wireframe.scale.set(scale, scale, scale)
  cube.add(wireframe)
}
createWireframeCube(geometry)

const geometry2 = new THREE.BoxGeometry(2, 2, 2)
const material2 = new THREE.MeshBasicMaterial({ color: "#000" })
const cube2 = new THREE.Mesh(geometry2, material2)
cube2.position.set(-6, 2, 0)
scene.add(cube2)

function createWireframeCube2(geometry) {
  const edges = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({ color: "#919191" })
  const wireframe = new THREE.LineSegments(edges, lineMaterial)
  const scale = 2
  wireframe.scale.set(scale, scale, scale)
  cube2.add(wireframe)
}
createWireframeCube2(geometry2)

const geometry3 = new THREE.BoxGeometry(2, 2, 2)
const material3 = new THREE.MeshBasicMaterial({ color: "#000" })
const cube3 = new THREE.Mesh(geometry3, material3)
cube3.position.set(6, -2, 0)
scene.add(cube3)
camera.position.z = 8

function createWireframeCube3(geometry) {
  const edges = new THREE.EdgesGeometry(geometry)
  const lineMaterial = new THREE.LineBasicMaterial({ color: "#919191" })
  const wireframe = new THREE.LineSegments(edges, lineMaterial)
  const scale = 2
  wireframe.scale.set(scale, scale, scale)
  cube3.add(wireframe)
}
createWireframeCube3(geometry3)

let rotationSpeed1 = 0.003
let rotationSpeed2 = 0.003
let rotationSpeed3 = 0.003

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += rotationSpeed1
  cube.rotation.y += rotationSpeed1

  cube2.rotation.x += rotationSpeed2
  cube2.rotation.y += rotationSpeed2

  cube3.rotation.x += rotationSpeed3
  cube3.rotation.y += rotationSpeed3

  renderer.render(scene, camera)
}
animate()

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("item")) {
    handleClickOnItem1()
  } else if (event.target.classList.contains("item1")) {
    handleClickOnItem2()
  } else if (event.target.classList.contains("item2")) {
    handleClickOnItem3()
  } else if (event.target.classList.contains("item3")) {
    handleClickOnItem4()
  }
})

function handleClickOnItem1() {
  rotationSpeed2 = 0.003
  rotationSpeed3 = 0.003
  rotationSpeed1 = rotationSpeed1 === 0.003 ? 0.04 : 0.003
}

function handleClickOnItem2() {
  rotationSpeed1 = 0.003
  rotationSpeed2 = 0.003
  rotationSpeed3 = rotationSpeed3 === 0.003 ? 0.04 : 0.003
}

function handleClickOnItem3() {
  rotationSpeed1 = 0.003
  rotationSpeed3 = 0.003
  rotationSpeed2 = rotationSpeed2 === 0.003 ? 0.04 : 0.003
}

function handleClickOnItem4() {
  rotationSpeed1 = 0.003
  rotationSpeed2 = 0.003
  rotationSpeed3 = 0.003
}

const particleCount = 1000
const particles = []

for (let i = 0; i < particleCount; i++) {
  const particle = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 0.01, 0.01),
    new THREE.MeshBasicMaterial({ color: "#919191" }),
  )
  particle.position.set(
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
  )
  scene.add(particle)
  particles.push(particle)
}

function updateParticlesToCenter() {
  const centerX = 0
  const centerY = 0

  particles.forEach((particle) => {
    const dx = centerX - particle.position.x
    const dy = centerY - particle.position.y
    const dz = -10 - particle.position.z
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

    if (distance > 0.1) {
      particle.position.x += (dx / distance) * 0.02
      particle.position.y += (dy / distance) * 0.02
      particle.position.z += (dz / distance) * 0.02
    }
  })
}

function render() {
  requestAnimationFrame(render)
  updateParticlesToCenter()
  renderer.render(scene, camera)
}

render()
