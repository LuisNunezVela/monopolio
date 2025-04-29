import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

const textureLoader = new THREE.TextureLoader();

const rotacionCorregida = -Math.PI / 2;
const tablero_txt = textureLoader.load('/assets/img/monopolio.jpg');
const casilla_txt = textureLoader.load('/assets/img/casilla.png');

const tableroMaterial = new THREE.MeshBasicMaterial({
    map: tablero_txt,
    side: THREE.DoubleSide
});

const casillaMaterial = new THREE.MeshBasicMaterial({
    map: casilla_txt,
    side: THREE.DoubleSide
});

const verde = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const casillas = [];
const casillasGroup = new THREE.Group();

const sideWidth = 5;
const sideHeight = 10;
const espacio = 1.0;
const numCasillasxlado = 11;
const tableroSize = 50;

// Geometrías base
const tableroGeometry = new THREE.PlaneGeometry(tableroSize, tableroSize);
const casillaGeometry = new THREE.PlaneGeometry(sideWidth, sideHeight);

const tablero = new THREE.Mesh(tableroGeometry, verde);
tablero.rotation.x = rotacionCorregida;
tablero.position.set(0, 0, 0);

for (let i = 0; i < numCasillasxlado * 4 - 4; i++) {
    let casilla;
    let j;

    if (i % 10 === 0) {
        // Esquinas cuadradas
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
            const offsetX = (tableroSize / 2) + (sideHeight / 2) - sideHeight - (i - 1) * sideWidth * espacio;
            const offsetZ = (tableroSize / 2) + (sideHeight / 2);
            casilla.position.set(offsetX, 0.01, offsetZ);
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
            const offsetZ = (tableroSize / 2) + (sideHeight / 2) - sideHeight - (j - 1) * sideWidth * espacio;
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
            const offsetX = -(tableroSize / 2) - (sideHeight / 2) + sideHeight + (j - 1) * sideWidth * espacio;
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
            const offsetZ = -(tableroSize / 2) - (sideHeight / 2) + sideHeight + (j - 1) * sideWidth * espacio;
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
