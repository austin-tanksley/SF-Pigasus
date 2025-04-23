import "./styles.css";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import materials from './materials.js'


// 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


const canvas = document.querySelector("canvas.webGL")

//scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 25, sizes.width / sizes.height, 0.1, 1000 );
scene.add(camera)

camera.position.z = 4 ;
camera.position.y = 3;
camera.position.x = 2;
const controls = new OrbitControls(camera, canvas);
controls.target.y = .75;
controls.enableDamping = true;

//lights
const ambient = new THREE.AmbientLight(0xffffff, 2)

const point_light_01 = new THREE.PointLight(0xffffff, 1);
point_light_01.position.x = -.5;
point_light_01.position.y = 2;
point_light_01.position.z = -.2;
scene.add(point_light_01, ambient)
const helper_01 = new THREE.PointLightHelper( point_light_01, .2 );
// scene.add( helper_01 );

const point_light_02 = new THREE.PointLight(0xffffff, 2);
point_light_02.position.set(-2,.4,.4)
scene.add(point_light_02)
const helper_02 = new THREE.PointLightHelper( point_light_02, .2 );
// scene.add( helper_02 );

const point_light_03 = new THREE.PointLight(0xffffff, 2);
point_light_03.position.set(1,.6,-1)
scene.add(point_light_03)
const helper_03 = new THREE.PointLightHelper( point_light_03, .2 );
// scene.add( helper_03 );

const spot_light = new THREE.SpotLight(0xffffff, 8);
spot_light.position.set(1,3,1);
spot_light.lookAt( 0, 1, 0);
const spot_helper = new THREE.SpotLightHelper(spot_light);

scene.add(spot_light);

//models
const pig_mat = materials.gold_paint;
const gltfLoader = new GLTFLoader()
gltfLoader.load(
  '/pigasus.glb',
  (gltf) => {
    console.log(gltf)
    gltf.scene.children[0].children[0].material = pig_mat;
    gltf.scene.children[0].children[0].map = pig_mat;
    scene.add(gltf.scene.children[0])
  },
  () => {
    console.log('progress')
  }
)

const floor_mat = materials.floor_mat;


const plane = new THREE.Mesh(
new THREE.PlaneGeometry(40,40,22,22), 
floor_mat
);
plane.rotation.x = -(Math.PI * .5)
scene.add(plane);

//renderer
const renderer = new THREE.WebGLRenderer(
  {
    canvas: canvas
  }
);
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)


const frame = () => {

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
frame()