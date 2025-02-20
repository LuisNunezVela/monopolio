import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
//si lo tengo instalado con npm install three entonces:
//import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a green cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create a debug text element
const debugText = document.createElement('div');
debugText.style.position = 'absolute';
debugText.style.top = '10px';
debugText.style.left = '10px';
debugText.style.color = 'white';
debugText.style.fontFamily = 'Arial';
document.body.appendChild(debugText);


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);

    // Update debug text
    debugText.innerHTML = `Camera pos: ${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}<br>` +
                          `View: ${cube.position.x.toFixed(2)}, ${cube.position.y.toFixed(2)}, ${cube.position.z.toFixed(2)}`;
}

animate();