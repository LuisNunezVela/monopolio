import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Crear el cubo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

export { cube }; // Exportamos el cubo
