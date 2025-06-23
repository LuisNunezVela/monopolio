import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';
import {tablero} from './tablero.js'
import {casillasGroup} from './tablero.js'

// Crear la escena y la cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,80,0);

const lookAtTarget = new THREE.Vector3(0, 0, 0);
camera.lookAt(lookAtTarget);

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Agregar el cubo a la escena
scene.add(tablero);
scene.add(casillasGroup);

// Crear un elemento de texto para depuración
const debugText = document.createElement('div');
debugText.style.position = 'absolute';
debugText.style.top = '10px';
debugText.style.left = '10px';
debugText.style.color = 'white';
debugText.style.fontFamily = 'Arial';
document.body.appendChild(debugText);

//token
// Crear un token (pieza de jugador)
const tokenGeometry = new THREE.SphereGeometry(2, 32, 32); // Radio 2
const tokenMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Rojo
const token = new THREE.Mesh(tokenGeometry, tokenMaterial);
scene.add(token);

// Variables para movimiento
let currentCasillaIndex = 0;
let moveSpeed = 0.1; // Velocidad de movimiento
let targetPosition = casillasGroup.children[currentCasillaIndex].position.clone(); // Posición objetivo inicial


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Animación
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // Movimiento del token hacia la casilla objetivo
    const direction = new THREE.Vector3().subVectors(targetPosition, token.position);
    const distance = direction.length();

    if (distance > 0.1) {
        direction.normalize();
        token.position.add(direction.multiplyScalar(moveSpeed));
    } else {
        // Llegó a la casilla, pasar a la siguiente
        currentCasillaIndex = (currentCasillaIndex + 1) % casillasGroup.children.length;
        targetPosition = casillasGroup.children[currentCasillaIndex].position.clone();
    }

    renderer.render(scene, camera);

    // Actualizar debug text
    debugText.innerHTML = 
        `Camera position: ${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}<br>` +
        `Camera look at: ${lookAtTarget.x.toFixed(2)}, ${lookAtTarget.y.toFixed(2)}, ${lookAtTarget.z.toFixed(2)}<br>` +
        `Token casilla: ${currentCasillaIndex}`;
}

// Optional: Responsive canvas
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();