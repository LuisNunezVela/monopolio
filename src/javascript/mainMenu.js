import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const loader = new GLTFLoader();



loader.load(
	// resource URL
	'../assets/models/Dado.glb',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
  });






const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 40, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Audio
const listener = new THREE.AudioListener();
camera.add(listener);
const main_menu_theme = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load("/assets/audio/Main-Menu.mp3", function (buffer) {
  main_menu_theme.setBuffer(buffer);
  main_menu_theme.setLoop(true);
  main_menu_theme.setVolume(0.5);
});

// Green Rotating Cube
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate the cube
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

// UI Elements
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start-screen");
const mainMenu = document.getElementById("main-menu");

startBtn.addEventListener("click", () => {
  // Reproducir música
  if (main_menu_theme.buffer) {
    main_menu_theme.play();
  }

  // Ocultar pantalla de inicio
  startScreen.style.display = "none";

  // Mostrar menú principal
  mainMenu.style.display = "block";
});