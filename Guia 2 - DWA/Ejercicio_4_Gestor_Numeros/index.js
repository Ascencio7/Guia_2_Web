// Se crean las variables
const prompt = require('prompt-sync')();
const { mostrarMenu} = require('./menu');

const {
    agregarNumero,
    mostrarNumero,
    sumaTotal,
    multiTotal,
    diviTotal,
    alCuadrado
} = require('./operaciones');

let numeros = [];

while (true){
    const opcion = mostrarMenu(prompt);


    switch (opcion){
        case '1':
            numeros = numeros.concat(agregarNumero(prompt));
            break;
        case '2':
            mostrarNumero(numeros);
            break;
        case '3':
            sumaTotal(numeros);
            break;
        case '4':
            multiTotal(numeros);
            break;
        case '5':
            diviTotal(numeros);
            break;
        case '6':
            alCuadrado(numeros);
            break;
        case '7':
            console.log('\nSaliendo del programa.\n');
            process.exit(0);
        default:
            console.log('\nOpción inválida. Intente de nuevo.');
    }

    console.log('\n');

}