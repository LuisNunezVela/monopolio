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
const texture = textureLoader.load('/assets/img/carcel.jpg');
const casillaEsquinaGeometry = new THREE.PlaneGeometry(1, 1);
const casillaMaterial = new THREE.MeshBasicMaterial({ map: texture });
const casillaEsquina = new THREE.Mesh(casillaEsquinaGeometry, casillaMaterial);
casillaEsquina.position.set(-3, 3, 0);


export {casillaEsquina};


