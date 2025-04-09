import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

const geometry_casilla = new THREE.PlaneGeometry(5,10);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//const parentObject = new THREE.Group();

const parentObject = new THREE.Mesh(geometry_casilla, material);
parentObject.position.set(0, 0.01, 0); // un poco sobre el tablero para que no se "empotre"
parentObject.rotation.set(-Math.PI / 2, 0, 0);

//parentObject.add(casilla);
// Export the parent object (which now contains all the casillas)
export { parentObject };
