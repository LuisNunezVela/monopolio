import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
import { cube } from './cube.js'; // Importar el cubo
import {tablero} from './tablero.js'
import {casillasEsquinasGroup} from './casillas.js';

// Crear la escena y la cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;
camera.position.y = 0;
const lookAtTarget = new THREE.Vector3(0, 0, 0);
camera.lookAt(lookAtTarget);

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Agregar el cubo a la escena
scene.add(cube);
scene.add(tablero);
scene.add(casillasEsquinasGroup);


// Crear un elemento de texto para depuración
const debugText = document.createElement('div');
debugText.style.position = 'absolute';
debugText.style.top = '10px';
debugText.style.left = '10px';
debugText.style.color = 'white';
debugText.style.fontFamily = 'Arial';
document.body.appendChild(debugText);

// Animación
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    // Actualizar debug text
    debugText.innerHTML = 
        `Camera position: ${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}<br>` +
        `Camera look at: ${lookAtTarget.x.toFixed(2)}, ${lookAtTarget.y.toFixed(2)}, ${lookAtTarget.z.toFixed(2)}`;
}

animate();