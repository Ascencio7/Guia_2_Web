// Una funcion para validar que si el numero es uno valido
function numValido(num){
    return !isNaN(num); // retorna si el numero es invalido
}

// Se exporta la funcion para que pueda ser utilizada en otros archivos
module.exports = { numValido};