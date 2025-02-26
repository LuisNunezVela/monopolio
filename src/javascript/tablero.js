import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/assets/img/monopolio.jpg');

const tableroGeometry = new THREE.BoxGeometry(5, 5,0.3);

//const tableroMaterial = new THREE.MeshBasicMaterial({ color: 0x008000, side: THREE.DoubleSide });
const tableroMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Apply texture
const tablero = new THREE.Mesh(tableroGeometry, tableroMaterial);
tablero.rotation.x = -Math.PI / 2;
tablero.position.set(0,0,0);
 
export {tablero};