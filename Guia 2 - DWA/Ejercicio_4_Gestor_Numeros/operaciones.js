// Se importa la funcion numValido desde el modulo de utils.js
const { numValido} = require('./utils');


// Una funcion para agregar los numeros al arreglo
function agregarNumero(prompt){
    
    // Se pide que se ingrese el numero separado por un espacio
    const entrada = prompt('\nIngresa numeros separados con espacios: ');
    
    // Se divide la cadena entre partes usando el espacio
    const parts = entrada.split(' ');
    
    // Se crea un arreglo vacio que contendra los numeros ingresados
    const numeros = [];

    // Se itera cada parte de los numeros
    for (let part of parts){
        
        // Se parsean los numeros como float
        const num = parseFloat(part);
        
        // Se verifica que el numero ingresado sea valido
        if (numValido(num)){
            // Si es asi se agrega al arreglo
            numeros.push(num);
        }else{
            // Sino se muestra el valor ingresado que no es valido
            console.log(`\nEl valor '${part}' no es un número válido.`);
        }
    }

    // Retorna el arreglo con los numeros validos
    return numeros;
}


// Una funcion para mostrar los numeros
function mostrarNumero(arreglo){
    // Se verifica que si el arreglo es identico a 0
    if (arreglo.length === 0){
        // entonces se muestra el siguiente mensaje
        console.log('\nNo hay numeros que mostrar.');
        return;
    }else{
        // Si el arreglo tiene datos se muestra los numeros separados con comas
        console.log(`\nLos numeros ingresados: ${arreglo.join(', ')}`);
    }
}


// Una funcion para sumar todos los numeros
function sumaTotal(arreglo){
    // Se verifica que si el arreglo es identico a 0
    if (arreglo.length === 0){
        // entonces se muestra el siguiente mensaje
        console.log('\nNo hay números para sumar.');
        return; // retorna al menu
    }else{
        
        // Se suma todos los numeros usando reduce y empieza desde 0
        const suma = arreglo.reduce((acumulador, valor) => acumulador + valor, 0);
    
        // Y se muestra el resultado
        console.log(`\nLa suma de todos los números es: ${suma}`);
    }
}


// Una funcion para multiplicar todos los numeros
function multiTotal(arreglo){
    // Se verifica que si el arreglo es identico a 0
    if (arreglo.length === 0){
        // entonces se muestra el siguiente mensaje
        console.log('\nNo hay números para multiplicar.');
        return; // retorna al menu
    }else{
        
        // Se multiplica todos los numeros usando reduce y empieza desde 1
        const multi = arreglo.reduce((acumulador, valor) => acumulador * valor, 1);

        // Y se muestra el resultado
        console.log(`\nLa multiplicación de todos los números es: ${multi}`);
    }
}


// Una funcion para dividir todos los numeros
function diviTotal(arreglo){
    // Se verifica que si el arreglo es identico a 0
    if (arreglo.length === 0){
        // entonces se muestra el siguiente mensaje
        console.log('\nNo hay números para dividir.');
        return; // retorna al menu
    }else{
        
        // Se divide todos los numeros usando reduce y empieza desde el primer numero
        const resultado = arreglo.reduce((acumulador, valor) => acumulador / valor);

        // Y se muestra el resultado
        console.log(`\nLa división de todos los números es: ${resultado.toFixed(2)}`);
    }
}


// Una funcion para elevar al cuadrado todos los numeros
function alCuadrado(arreglo){
    // Se verifica que si el arreglo es identico a 0
    if (arreglo.length === 0){
        // entonces se muestra el siguiente mensaje
        console.log('\nNo hay números para elevar al cuadrado.');
        return; // retorna al menu
    }else{
        // Se eleva al cuadrado todos los numeros usando map
        const cuadrado = arreglo.map(num => num ** 2);

        // Y se muestra el resultado
        console.log(`\nEl cuadrado de todos los números es: ${cuadrado}`);
    }
}


// Se exporta la funcion para que pueda ser utilizada en otros archivos
module.exports = {
    agregarNumero,
    mostrarNumero,
    sumaTotal,
    multiTotal,
    diviTotal,
    alCuadrado
};


/*

    reduce(): Es un metodo para reducir TODOS los elementos a un SOLO VALOR

    arreglo es el arreglo de los numeros

    (acumulador, valor) => acumulador + valor: Esto es una funcion para ejecutar por cada elemento del arreglo

    acumulador es el que guarda el resultado parcial de la operacion

    valor es el valor actual del arreglo

    0... es el valor inicial del acumulador


*/