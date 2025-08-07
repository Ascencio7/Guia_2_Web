// Una funcion para mostrar el menu y las opciones

function mostrarMenu(prompt){
    console.log('1. Agregar número');
    console.log('2. Mostrar números');
    console.log('3. Sumar todos los números');
    console.log('4. Multiplicar todos los números');
    console.log('5. Dividir todos los números');
    console.log('6. Mostrar el cuadrado de todos los números');
    console.log('7. Salir');

    // Se solicita que se elija una opcion y lo retorna
    return prompt('\nElige una opcion: ');
}

// Se exporta la funcion para que pueda ser utilizada en otros archivos
module.exports = { mostrarMenu};