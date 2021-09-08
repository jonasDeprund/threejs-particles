import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture1 = textureLoader.load('/textures/images/1.jpg');
const particleTexture2 = textureLoader.load('/textures/images/2.jpg');
const particleTexture3 = textureLoader.load('/textures/images/3.jpg');
const particleTexture4 = textureLoader.load('/textures/images/4.jpg');
const particleTexture5 = textureLoader.load('/textures/images/5.jpg');
const particleTexture6 = textureLoader.load('/textures/images/6.jpg');
const particleTexture7 = textureLoader.load('/textures/images/7.jpg');
const particleTexture8 = textureLoader.load('/textures/images/8.jpg');
const particleTexture9 = textureLoader.load('/textures/images/9.jpg');
const particleTexture10 = textureLoader.load('/textures/images/10.jpg');
const particleTexture11 = textureLoader.load('/textures/images/11.jpg');

const arrayImages = new Array(
  particleTexture1,
  particleTexture2,
  particleTexture3,
  particleTexture4,
  particleTexture5,
  particleTexture6,
  particleTexture7,
  particleTexture8,
  particleTexture9,
  particleTexture10,
  particleTexture11
);

/**
 * PARTICLES
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 50;

// Images random

const positions = new Float32Array(count * 3);

// let num = Math.floor(Math.random() * arrayImages.length);
let displayImages = [];

for (let i = 0; i < count * 3; i++) {
  // set number
  positions[i] = (Math.random() - 0.5) * 10;
  displayImages = Math.floor(Math.random() * arrayImages.length);
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

// Material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 1;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.map = ;

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Test cube
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);
// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
