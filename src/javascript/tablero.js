import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/assets/img/monopolio.jpg'); // Update this with the correct path

const tableroGeometry = new THREE.PlaneGeometry(5, 5);

//const tableroMaterial = new THREE.MeshBasicMaterial({ color: 0x008000, side: THREE.DoubleSide });
const tableroMaterial = new THREE.MeshBasicMaterial({ map: texture }); // Apply texture
const tablero = new THREE.Mesh(tableroGeometry, tableroMaterial);
tablero.rotation.x = -1;
tablero.position.z = 0;
 
export {tablero};