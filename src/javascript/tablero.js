import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/assets/img/monopolio.jpg');
texture.flipY = false;
texture.rotation = -Math.PI / 2;
texture.center.set(0.5, 0.5);

const tableroGeometry = new THREE.PlaneGeometry(45,45);

//const tableroMaterial = new THREE.MeshBasicMaterial({ color: 0x008000, side: THREE.DoubleSide });
const tableroColor = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Aplica color al mesh
const tableroMaterial = new THREE.MeshBasicMaterial({ 
    map:texture,
    side: THREE.DoubleSide });
const tablero = new THREE.Mesh(tableroGeometry, tableroMaterial);
tablero.rotation.x = Math.PI / 2;

tablero.position.set(0,0,0);
 
export {tablero};