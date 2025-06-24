import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

const textureLoader = new THREE.TextureLoader();

const rotacionCorregida = -Math.PI / 2;

// Load the main board texture
const tablero_txt = textureLoader.load('/assets/img/monopolio.jpg');

// ✅ Array of texture paths for casillas (add more here)
const casillaTexturePaths = [
    '/assets/img/casilla-0.png',
    '/assets/img/casilla-1.png',

    // Add more paths as needed
];

// ✅ Load all casilla textures
const casillaTextures = casillaTexturePaths.map(path => textureLoader.load(path));

const tableroMaterial = new THREE.MeshBasicMaterial({
    map: tablero_txt,
    side: THREE.DoubleSide
});

const verde = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const casillas = [];
const casillasGroup = new THREE.Group();

const sideWidth = 5;
const sideHeight = 10;
const espacio = 1.0;
const numCasillasxlado = 11;
const tableroSize = 45;

// Geometría del tablero
const tableroGeometry = new THREE.PlaneGeometry(tableroSize, tableroSize);
const tablero = new THREE.Mesh(tableroGeometry, verde);
tablero.rotation.x = rotacionCorregida;
tablero.position.set(0, 0, 0);

// Generación de casillas
for (let i = 0; i < numCasillasxlado * 4 - 4; i++) {
    let casilla;
    let j;

    const isCorner = i % 10 === 0;

    // ✅ Assign texture by index
    const texture = casillaTextures[i % casillaTextures.length];
    const casillaMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

    if (isCorner) {
        casilla = new THREE.Mesh(new THREE.PlaneGeometry(sideHeight, sideHeight), casillaMaterial);
    } else {
        casilla = new THREE.Mesh(new THREE.PlaneGeometry(sideWidth, sideHeight), casillaMaterial);
    }

    casilla.rotation.x = rotacionCorregida;

    // PRIMER LADO - arriba (de derecha a izquierda)
    if (i < 10) {
        if (i === 0) {
            casilla.position.set(
                (tableroSize / 2) + (sideHeight / 2),
                0.01,
                (tableroSize / 2) + (sideHeight / 2)
            );
        } else {
            const offsetX =
                (tableroSize / 2) +
                (sideHeight / 2) - 
                sideHeight + 
                (sideHeight - sideWidth) / 2 - 
                (i - 1) * sideWidth * espacio;
            casilla.position.set(offsetX, 0.01, (tableroSize / 2) + (sideHeight / 2));
        }
    }

    // SEGUNDO LADO - derecha (de arriba hacia abajo)
    else if (i < 20) {
        j = i - 10;
        if (j === 0) {
            casilla.position.set(
                -(tableroSize / 2) - (sideHeight / 2),
                0.01,
                (tableroSize / 2) + (sideHeight / 2)
            );
        } else {
            const offsetZ =
                (tableroSize / 2) +
                (sideHeight / 2) -
                sideHeight +
                (sideHeight - sideWidth) / 2 -
                (j - 1) * sideWidth * espacio;
            casilla.position.set(-(tableroSize / 2) - (sideHeight / 2), 0.01, offsetZ);
        }
        casilla.rotation.z = -Math.PI / 2;
    }

    // TERCER LADO - abajo (de izquierda a derecha)
    else if (i < 30) {
        j = i - 20;
        if (j === 0) {
            casilla.position.set(
                -(tableroSize / 2) - (sideHeight / 2),
                0.01,
                -(tableroSize / 2) - (sideHeight / 2)
            );
        } else {
            const offsetX =
                -(tableroSize / 2) -
                (sideHeight / 2) +
                sideHeight -
                (sideHeight - sideWidth) / 2 +
                (j - 1) * sideWidth * espacio;
            casilla.position.set(offsetX, 0.01, -(tableroSize / 2) - (sideHeight / 2));
        }
        casilla.rotation.x = Math.PI / 2;
    }

    // CUARTO LADO - izquierda (de abajo hacia arriba)
    else {
        j = i - 30;
        if (j === 0) {
            casilla.position.set(
                (tableroSize / 2) + (sideHeight / 2),
                0.01,
                -(tableroSize / 2) - (sideHeight / 2)
            );
        } else {
            const offsetZ =
                -(tableroSize / 2) -
                (sideHeight / 2) +
                sideHeight -
                (sideHeight - sideWidth) / 2 +
                (j - 1) * sideWidth * espacio;
            casilla.position.set((tableroSize / 2) + (sideHeight / 2), 0.01, offsetZ);
        }
        casilla.rotation.z = Math.PI / 2;
    }

    casillas.push(casilla);
    casillasGroup.add(casilla);
}

export { tablero };
export { tableroSize };
export { casillas, casillasGroup };
