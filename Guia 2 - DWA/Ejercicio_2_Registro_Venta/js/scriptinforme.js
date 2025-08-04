document.addEventListener('DOMContentLoaded', () => {
    // Se obtiene el JSON almacenado en el localStorage
    const ventasJSON = localStorage.getItem('ventas');

    // Si no existe el dato en localStorage, osea si no hay ventas registradas
    if (!ventasJSON) {
        
        // Se oculta el contenedor del informe
        document.getElementById('informeVentas').style.display = 'none';
        
        // Se obtiene el contenedor principal para insertar el mensaje
        const container = document.querySelector('.container');
        
        // Se crea un nuevo elemento para mostrar el aviso
        const aviso = document.createElement('div');
        
        // Se asigna Bootstrap con estilo de alerta y con un margen superior
        aviso.className = 'alert alert-info mt-4';
        
        // Se define el texto que se mostrara si no hay ventas
        aviso.textContent = 'No hay ventas registradas aún.';
        
        // Se inserta el aviso al final del contenedor
        container.appendChild(aviso);
        
        // Se termina la ejecucion para no procesar mas productos
        return;
    }

    // Se convierte el JSON a un arreglo JS
    const ventas = JSON.parse(ventasJSON);

    // Se inicia una variable acumuladora con el total general de las ventas
    let totalVentas = 0;
    
    // Se inicia un objeto contador para contar la cantidad vendida por producto
    const contadorProductos = {};

    // Se itera en un bucle cada venta registrada en el arreglo
    ventas.forEach(v => {
        
        // Se suma el total de cada venta al acumulador
        totalVentas += v.totalProducto;
        
        // Se cuenta la cantidad vendida a cada producto
        contadorProductos[v.nombre] = (contadorProductos[v.nombre] || 0) + v.cantidad;
    });

    // Se crean variables para identificar el producto con mas ventas
    let productoMasVendido = '';
    let maxCantidad = 0;

    // Se recorre en un bucle cada producto en el contador para encontrar el que mas se vende
    for (const producto in contadorProductos) {
        
        // Se verifica si la cantidad vendida es mayor que la actual
        if (contadorProductos[producto] > maxCantidad) {
            
            // Se actualiza la maxima cantidad y el producto mas vendido
            maxCantidad = contadorProductos[producto];
            productoMasVendido = producto;
        }
    }
    
    // Se crea un formateador para mostrar numeros como moneda con formato en español
    const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' });

    // Se actualiza el contendio del elemento para mostrar el total de las ventas
    document.getElementById('totalVentas').textContent = `💲 Total de ventas: $${formatter.format(totalVentas)}`;
    
    // Se actualiza el contenido del elemento para mostrar el producto mas vendido y la cantidad
    document.getElementById('productoMasVendido').textContent = `🏆 Producto más vendido: ${productoMasVendido} con ${maxCantidad} unidades`;

    // Se crea un string con cada producto, cantidad, separados con comas
    const resumenProductos = Object.entries(contadorProductos)
                .map(([nombre, cantidad]) => `${nombre}: ${cantidad} unidades`)
                .join(', ');

    // Se crea un nuevo parrafo para mostrar el resumen de los productos
    const resumenElem = document.createElement('p');
    
    // Se asignan las clases de Bootstrap para el estilo del texto y margen
    resumenElem.className = 'card-text mt-3';
    
    // Se inserta el texto en el parrafo creado
    resumenElem.textContent = `📋 Resumen de productos vendidos: ${resumenProductos}`;

    // Se agrega el parrafo resumen al cuerpo de la tarjeta
    document.querySelector('#informeVentas .card-body').appendChild(resumenElem);
});