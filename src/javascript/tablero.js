import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

const textureLoader = new THREE.TextureLoader();

const rotacionCorregida = -Math.PI / 2
const tablero_txt = textureLoader.load('/assets/img/monopolio.jpg');

const tableroMaterial = new THREE.MeshBasicMaterial({ 
    map:tablero_txt,
    side: THREE.DoubleSide });

const verde = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const blanco = new THREE.MeshBasicMaterial({ color: 0xffffff });

const casillas = [];
const casillasGroup = new THREE.Group();
const cornerSize = 10;
const sideWidth = 5;
const sideHeight = 10;
const espacio = 1.05;
const espacioEsq = 1.70;
const numCasillasxlado = 11;
const tableroSize = 65;
//const tableroSize = 9 * sideWidth + 2 * cornerSize;

// geometrias
const tableroGeometry = new THREE.PlaneGeometry(tableroSize,tableroSize);
const casillaGeometry = new THREE.PlaneGeometry(sideWidth,sideHeight);

const tablero = new THREE.Mesh(tableroGeometry, tableroMaterial);
tablero.rotation.x = rotacionCorregida;
tablero.position.set(0,0,0);

for (let i = 0; i < numCasillasxlado * 4 - 4; i++) {
  const casilla = new THREE.Mesh(casillaGeometry, verde);
  casilla.rotation.x = rotacionCorregida;

  if (i < 10) {
    // Primera parte: ir a la izquierda (X-)
      
    // Restaurar la geometría rectangular para las demás casillas
    casilla.geometry = new THREE.PlaneGeometry(sideWidth, sideHeight);
    casilla.position.set(
        (tableroSize / 2) - (cornerSize / 2) - i * sideWidth * espacio, 0.01, (tableroSize / 2) - (cornerSize / 2)
    ); 
      
  } else if (i < 20) {
      // Segunda parte: bajar (Z-)
      const j = i - 10;
      casilla.position.set(
          -(tableroSize / 2) + (cornerSize / 2),
          0.01,
          (tableroSize / 2) - (cornerSize / 2) - (j + 1) * sideWidth * espacio
      );
      casilla.rotation.z = Math.PI / 2; // Rotar 90°
  } else if (i < 30) {
      // Tercera parte: ir a la derecha (X+)
      const j = i - 20;
      casilla.position.set(
          -(tableroSize / 2) + (cornerSize / 2) + (j + 1) * sideWidth * espacio,
          0.01,
          -(tableroSize / 2) + (cornerSize / 2)
      );
  } else {
      // Cuarta parte: subir (Z+)
      const j = i - 30;
      casilla.position.set(
          (tableroSize / 2) - (cornerSize / 2),
          0.01,
          -(tableroSize / 2) + (cornerSize / 2) + (j + 1) * sideWidth * espacio
      );
      casilla.rotation.z = Math.PI / 2; // Rotar 90°
  }

  casillas.push(casilla);
  casillasGroup.add(casilla);
}




export {tablero};
export {tableroSize};
export { casillas, casillasGroup };