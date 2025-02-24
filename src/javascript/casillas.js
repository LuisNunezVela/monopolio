import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';
/*
export class Propiedad {
    constructor(nombre, precioCompra, precioAlquiler) {
        this.nombre = nombre;
        this.precioCompra = precioCompra;
        this.precioAlquiler = precioAlquiler;
    }

    mostrarInfo() {
        console.log(`📍 ${this.nombre}`);
        console.log(`💰 Precio de compra: $${this.precioCompra}`);
        console.log(`🏠 Precio de alquiler: $${this.precioAlquiler}`);
    }
}

// Crear las propiedades y exportarlas
export const propiedades = [
    new Propiedad("Avenida Vermont", 200, 25),6
    new Propiedad("Avenida Brasil", 300, 35),
    new Propiedad("Avenida Pedraza", 250, 30),
    new Propiedad("Avenida Murillo", 400, 50),
    new Propiedad("Avenida Banzer", 350, 40),
];
*/

const textureLoader = new THREE.TextureLoader();
const carcel = textureLoader.load('/assets/img/carcel.jpg');
const go = textureLoader.load('/assets/img/go.jpg');
//const parqueo texture load
//const ve a la carcel texture load

const casillaEsquinaGeometry = new THREE.PlaneGeometry(1, 1);
const carcelMaterial = new THREE.MeshBasicMaterial({ map: carcel });
const goMaterial = new THREE.MeshBasicMaterial({ map: go });



const casillaEsquina1 = new THREE.Mesh(casillaEsquinaGeometry, carcelMaterial);
const casillaEsquina2 = new THREE.Mesh(casillaEsquinaGeometry, carcelMaterial);
const casillaEsquina3 = new THREE.Mesh(casillaEsquinaGeometry, carcelMaterial);
const casillaEsquina4 = new THREE.Mesh(casillaEsquinaGeometry, goMaterial);

casillaEsquina1.position.set(-3, 3, 0);
casillaEsquina2.position.set(3, 3, 0);
casillaEsquina3.position.set(3, -3, 0);
casillaEsquina4.position.set(-3, -3, 0);

const casillasEsquinasGroup = new THREE.Group();
casillasEsquinasGroup.add(casillaEsquina1);
casillasEsquinasGroup.add(casillaEsquina2);
casillasEsquinasGroup.add(casillaEsquina3);
casillasEsquinasGroup.add(casillaEsquina4);

export {casillasEsquinasGroup};


