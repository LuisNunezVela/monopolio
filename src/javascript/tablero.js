import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/assets/img/monopolio.jpg');

const tableroGeometry = new THREE.BoxGeometry(0.3,5,5);

//const tableroMaterial = new THREE.MeshBasicMaterial({ color: 0x008000, side: THREE.DoubleSide });
const tableroColor = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Aplica color al mesh
const tableroMaterial = new THREE.MeshBasicMaterial({ 
    map:texture,
    side: THREE.DoubleSide }); // Aplica la textura importada
const tablero = new THREE.Mesh(tableroGeometry, tableroMaterial);
tablero.rotation.z = Math.PI / 2;

tablero.position.set(0,0,0);
 
export {tablero};