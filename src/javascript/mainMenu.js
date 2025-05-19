import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/+esm';

// UI Elements
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("start-screen");
const mainMenu = document.getElementById("main-menu");

const scene = new THREE.Scene();
const loader = new GLTFLoader();
let dadoModelo = null;
let spawnInterval = null;

// Añade estas variables globales
let world;
const diceArray = [];
const fixedTimeStep = 1.0 / 60.0; // 60 FPS
const scaleFactor = 1; // Ajusta según tu modelo

// Inicializar mundo físico
function initPhysics() {
    world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
}

// Función para crear un nuevo dado
function spawnDice() {
    if (!dadoModelo) return;

    // Clonar el modelo para múltiples dados
    const diceMesh = dadoModelo.clone();
    diceMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
    // Posición inicial aleatoria
    const x = (Math.random() - 0.5) * 10;
    const y = 10 + Math.random() * 5;
    const z = (Math.random() - 0.5) * 10;
    diceMesh.position.set(x, y, z);
    scene.add(diceMesh);

    // Cuerpo físico (usando una caja como forma)
    const diceShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
    const diceBody = new CANNON.Body({
        mass: 1,
        shape: diceShape,
        position: new CANNON.Vec3(x, y, z),
        material: new CANNON.Material({ restitution: 0.4, friction: 0.5 })
    });
    
    // Añadir rotación inicial aleatoria
    diceBody.angularVelocity.set(
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10
    );
    
    world.addBody(diceBody);
    
    // Guardar referencia
    diceArray.push({
        mesh: diceMesh,
        body: diceBody
    });

    const diceData = {
        mesh: diceMesh,
        body: diceBody
    };

    // 🧹 Eliminar el dado después de 3 segundos
    setTimeout(() => {
        scene.remove(diceMesh);
        world.removeBody(diceBody);
        const index = diceArray.indexOf(diceData);
        if (index !== -1) diceArray.splice(index, 1);
    }, 2500);
}

// Inicialización
initPhysics();

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


//  mejor aún, usa OrbitControls para mover la cámara
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
  // Actualizar física
    world.step(fixedTimeStep);
    // Sincronizar modelos 3D con cuerpos físicos
    diceArray.forEach(dice => {
        dice.mesh.position.copy(dice.body.position);
        dice.mesh.quaternion.copy(dice.body.quaternion);
    });
    
    renderer.render(scene, camera);
}
animate();

startBtn.addEventListener("click", () => {
  // Reproducir música
  if (main_menu_theme.buffer) {
    main_menu_theme.play();
  }
if (!spawnInterval) {
        // Crear un dado inmediatamente
        spawnDice();
        
        // Crear un nuevo dado cada 5 segundos
        spawnInterval = setInterval(() => {
            spawnDice();
        }, 3000); // 5000 ms = 5 segundos
        
    }
  // Ocultar pantalla de inicio
  startScreen.style.display = "none";
  // Mostrar menú principal
  mainMenu.style.display = "flex";
});