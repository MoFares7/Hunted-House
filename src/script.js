import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

//Fog

const fog = new THREE.Fog('#262837' , 2 , 22 )
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')


grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * Lights
 */

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial({color: '#4CAF50'})
material.roughness = 0
gui.add(material, 'metalness').min(0).max(1).step(0.001)
//gui.add(material, 'roughness').min(0).max(4).step(0.001)

/**
 * Objects
 */

// Group
const zhouse = new THREE.Group()
scene.add(zhouse)

// floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(20, 20),
    new THREE.MeshStandardMaterial({
         map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture})
)
// plane.receiveShadow = true
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = - 0.5


scene.add( floor)

// Walls

const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(6,4,6),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture 
    })
)
walls.position.y= 1.6
zhouse.add(walls)

// door

const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2.7,3.3 , 100 ,100),
new THREE.MeshStandardMaterial({ 

    map: doorColorTexture,
    transparent: true,
    alphaMap:doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.2,
    normalMap: doorNormalTexture,
     metalnessMap: doorMetalnessTexture, 
    roughness: doorRoughnessTexture,
})

)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.rotation.y =1.57
door.position.x =3.01
door.position.y = 1.2

zhouse.add(door)


// head
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(4.6,2,4.6),
    new THREE.MeshStandardMaterial({color : '#b35f45'})
    )
    roof.position.y = 4.6
    roof.rotation.set(0,2.36,0) 
    zhouse.add(roof)

    // Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.castShadow = true
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.castShadow = true
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.castShadow = true
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.castShadow = true
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

zhouse.add(bush1, bush2, bush3, bush4)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.castShadow = true
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.castShadow = true
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

doorLight.position.set(4, 2.2, -0.7)
zhouse.add(doorLight)





/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.setClearColor('#262837')
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

   

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
/*

//Drawe Red cubee

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000})
const mesh  = new THREE.Mesh(geometry , material)
scene.add(mesh)

 To position and scale 

mesh.position.set(0.7,-0.6,1)
mesh.scale.set(2,0.5,0.5)



This group to move set of object

group.add(cub1)
const cub2= new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color : 0x00ff00})
)
cub2.position.x = -2
group.add(cub2)

 /For aniation cub /

gsap.to(cub1.position , {  duration: 1 , delay: 1 , x:2 })
gsap.to(cub1.position , {  duration: 1 , delay: 2 , x:0 })
gsap.to(cub1.position , {  duration: 1 , delay: 2 , x:-2})


// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
 // const colorTexture = textureLoader.load('/textures/checkerboard-2x2.png')
 /*const colorTexture = textureLoader.load(
     '/door.jpg',
     () =>
     {
         console.log('textureLoader: loading finished')
     },
     () =>
     {
         console.log('textureLoader: loading progressing')
     },
     () =>
     {
         console.log('textureLoader: loading error')
     }
 )
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
 //colorTexture.wrapT = THREE.MirroredRepeatWrapping
 // colorTexture.repeat.x = 2
 // colorTexture.repeat.y = 3
 // colorTexture.offset.x = 0.5
 // colorTexture.offset.y = 0.5
 // colorTexture.rotation = Math.PI * 0.25
 // colorTexture.center.x = 0.5
 // colorTexture.center.y = 0.5
 colorTexture.generateMipmaps = false
 colorTexture.minFilter = THREE.NearestFilter
 colorTexture.magFilter = THREE.NearestFilter
 
 const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
 const heightTexture = textureLoader.load('/textures/door/height.jpg')
 const normalTexture = textureLoader.load('/textures/door/normal.jpg')
 const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
 const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
 const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

*/

/**
 * Textures
 */
 /*const loadingManager = new THREE.LoadingManager()
 loadingManager.onStart = () =>
 {
     console.log('loadingManager: loading started')
 }
 loadingManager.onLoaded = () =>
 {
     console.log('loadingManager: loading finished')
 }
 loadingManager.onProgress = () =>
 {
     console.log('loadingManager: loading progressing')
 }
 loadingManager.onError = () =>
 {
     console.log('loadingManager: loading error')
 }
 */


