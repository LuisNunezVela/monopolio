import * as THREE from "https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { tablero } from "./tablero.js";
import { casillasGroup } from "./tablero.js";

window.moverToken = function (pasos) {
  stepsToMove += pasos; // acumulativo por si llamas varias veces
};

let stepsToMove = 0; // NEW: how many spaces to move (set by dado.js)

// Crear la escena y la cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const loader = new GLTFLoader();
camera.position.set(0, 80, 0);

const lookAtTarget = new THREE.Vector3(0, 0, 0);
camera.lookAt(lookAtTarget);

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luz ambiental (iluminación suave general)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Luz direccional (como el sol)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(50, 100, 50);
scene.add(directionalLight);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Agregar el cubo a la escena
scene.add(tablero);
scene.add(casillasGroup);

// Crear un elemento de texto para depuración
const debugText = document.createElement("div");
debugText.style.position = "absolute";
debugText.style.top = "10px";
debugText.style.left = "10px";
debugText.style.color = "white";
debugText.style.fontFamily = "Arial";
document.body.appendChild(debugText);

let somoToken = null;
//token
loader.load("/assets/models/Somo_Token.glb", function (gltf) {
  somoToken = gltf.scene;
  scene.add(somoToken);

  // Ajusta la escala si es necesario
  somoToken.scale.set(1, 1, 1); // Ejemplo: escalar a 100%

  // Centrar el modelo
  const box = new THREE.Box3().setFromObject(somoToken);
  const center = box.getCenter(new THREE.Vector3());
  somoToken.position.sub(center);

  // Cambiar material a gris
  somoToken.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({ color: 0x888888 });
    }
  });
});

// Variables para movimiento
let currentCasillaIndex = 0;
let moveSpeed = 0.1; // Velocidad de movimiento
let targetPosition =
  casillasGroup.children[currentCasillaIndex].position.clone(); // Posición objetivo inicial

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Animación
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Solo mover el token si el modelo ya está cargado
  if (somoToken) {
    const direction = new THREE.Vector3().subVectors(
      targetPosition,
      somoToken.position
    );
    const distance = direction.length();

    if (distance > 0.1) {
      direction.normalize();
      somoToken.position.add(direction.multiplyScalar(moveSpeed));
    } else if (stepsToMove > 0) {
      // Llegó a la casilla y quedan pasos
      currentCasillaIndex =
        (currentCasillaIndex + 1) % casillasGroup.children.length;
      targetPosition =
        casillasGroup.children[currentCasillaIndex].position.clone();
      stepsToMove--; // Disminuir los pasos restantes
    }
  }

  renderer.render(scene, camera);

  // Actualizar debug text
  debugText.innerHTML =
    `Camera position: ${camera.position.x.toFixed(
      2
    )}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}<br>` +
    `Camera look at: ${lookAtTarget.x.toFixed(2)}, ${lookAtTarget.y.toFixed(
      2
    )}, ${lookAtTarget.z.toFixed(2)}<br>` +
    `Token casilla: ${currentCasillaIndex}`;
}

// Optional: Responsive canvas
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
// Create a <p> element
const text = document.createElement("text");
text.innerHTML = "prueba de texto encima del canvas";

// Style it so it's visible over the canvas
text.style.position = "absolute";
text.style.top = "10rem";
text.style.left = "10rem";
text.style.color = "white";
text.style.fontSize = "20px";
text.style.zIndex = "10";

// Add it to the body
document.body.appendChild(text);
animate();
