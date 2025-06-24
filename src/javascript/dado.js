// Función para lanzar los dados
function lanzarDados() {
    let dado1 = Math.floor(Math.random() * 6) + 1;
    let dado2 = Math.floor(Math.random() * 6) + 1;
    let suma = dado1 + dado2;
    
    // Mostrar los resultados en la página
document.getElementById("resultado").innerHTML = `Dado 1: ${dado1} <br> Dado 2: ${dado2} <br> Suma: ${suma}`;

// Llamar a la función en main.js
if (typeof window.moverToken === 'function') {
    window.moverToken(suma);
}
}



// Agregar un event listener al botón 
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("lanzarDadosBtn").addEventListener("click", lanzarDados);
});
