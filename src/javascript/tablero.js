import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/assets/img/monopolio.jpg');
const rotacionCorregida = -Math.PI / 2


texture.flipY = false;
texture.rotation = rotacionCorregida;
texture.center.set(0.5, 0.5);

const cornerSize = 10;
const sideWidth = 5;
const sideHeight = 10;
const espacio = 1.1;
const numCasillasxlado = 11;

const tableroSize = 9 * sideWidth + 2 * cornerSize;

const tableroGeometry = new THREE.PlaneGeometry(tableroSize,tableroSize);

//const tableroMaterial = new THREE.MeshBasicMaterial({ color: 0x008000, side: THREE.DoubleSide });
const tableroColor = new THREE.MeshBasicMaterial({ color: 0xff0000 });


const tableroMaterial = new THREE.MeshBasicMaterial({ 
    map:texture,
    side: THREE.DoubleSide });
const tablero = new THREE.Mesh(tableroGeometry, tableroMaterial);
tablero.rotation.x = -Math.PI / 2;

tablero.position.set(0,0,0);

const geometry_casilla = new THREE.PlaneGeometry(sideWidth,sideHeight);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const casillasGroup = new THREE.Group();



const casillas = [];

for (let i = 0; i < numCasillasxlado * 4; i++) {
    const casilla = new THREE.Mesh(geometry_casilla, material);
    casilla.position.set(-tableroSize/2 + i * sideWidth * espacio, 0.01, 0 );
    casilla.rotation.x = (rotacionCorregida);

    casillas.push(casilla);
    casillasGroup.add(casilla);
  }


export {tablero};
export {tableroSize};
export { casillas, casillasGroup };