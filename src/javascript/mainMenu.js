import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const loader = new GLTFLoader();
let dadoModelo = null;

loader.load(
	'/assets/models/Dado.glb',function ( gltf ) {
    dadoModelo = gltf.scene
 scene.add(dadoModelo);
    
    // Añade estos logs para debuggear
    console.log("Modelo cargado:", dadoModelo);
    console.log("Posición:", dadoModelo.position);
    console.log("Escala:", dadoModelo.scale);
    
    // Ajusta la escala si es necesario
    dadoModelo.scale.set(1, 1, 1); // Ejemplo: escalar a 100%
    
    // Centrar el modelo
    const box = new THREE.Box3().setFromObject(dadoModelo);
    const center = box.getCenter(new THREE.Vector3());
    dadoModelo.position.sub(center);
  });


const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 0, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x87CEEB); // Celeste en hexadecimal THREE.js
// O con fondo con transparencia
//renderer.setClearAlpha(0); // Hacer el fondo transparente para usar CSS


// O mejor aún, usa OrbitControls para mover la cámara
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

//esto añade una fuente de luz como un foco
const light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(0, 40, 0);
scene.add(light);


// Esto añade iluminacion global
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Intensidad 0.5
scene.add(ambientLight);

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

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  

  if (dadoModelo) {
        dadoModelo.rotation.x += 0.00;
        dadoModelo.rotation.y += 0.01;
        dadoModelo.rotation.z += 0.0;
    }
  

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