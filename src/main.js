import "./styles.css";
import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const canvas = document.querySelector("canvas.webGL")
// const loader = new GLTFLoader();

//scene + camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 35, sizes.width / sizes.height, 0.1, 1000 );
scene.add(camera)

camera.position.z = 5;


//objects

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//renderer
const renderer = new THREE.WebGLRenderer(
  {
    canvas: canvas
  }
);
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


