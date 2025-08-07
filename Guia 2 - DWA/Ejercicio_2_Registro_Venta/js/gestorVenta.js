// Se espera que el contenido html este completo, que los campos requeridos esten completos

document.addEventListener('DOMContentLoaded', () =>{

    // Se obtiene la referencia al formulario
    const formulario = document.getElementById('productoForm');

    // Se obtiene la referencia de la tabla donde se agregaran los productos
    const tabla = document.getElementById('cuerpoTabla');

    // Un contador para enumerar las filas
    let contador = 1;

    const ventas = [];

    // Se agrega un evento que se ejecuta cuando se envia el formulario al hacer clic en el boton o enter
    formulario.addEventListener('submit', (e) =>{

        // Esto evita que la pagina se recargue al enviar el formulario
        e.preventDefault();

        // Se obtiene y quita los espacios del nombre del producto
        const nombre = document.getElementById('product').value.trim();

        // Se convierte el valor a numero decimal
        const precio = parseFloat(document.getElementById('precio').value);

        // Se convierte el valor a numero entero
        const cantidad = parseInt(document.getElementById('cant').value);

        // Se obtiene la descripcion del producto
        let descripcion = document.getElementById('desc').value.trim();

        // Si la descripcion esta sin texto entonces se muestra el mensaje por defecto
        if (!descripcion){
            descripcion = 'Sin descripción';
        }

        // Se valida que el nombre, precio y cantidad sean datos veridicos
        if (!nombre || isNaN(precio) || isNaN(cantidad) || precio <= 0 || cantidad <= 0){
            alert('Completa todos los campos'); // sino se muestra el mensaje
            return; // detiene la ejecucion y evita agregar el producto
        }

        // Se calcula el total del producto y se redondea a 2 decimales
        const totalProducto = precio * cantidad;

        ventas.push({nombre, precio, cantidad, descripcion, totalProducto});

        localStorage.setItem('ventas', JSON.stringify(ventas));

        // Se crea un nuevo elemento html para la tabla
        const fila = document.createElement('tr');

        // Se inserta el html dentro de la fila con las celdas y sus valores
        fila.innerHTML = `
            <td>${contador++}</td>
            <td>${nombre}</td>
            <td>$${precio}</td>
            <td>${cantidad}</td>
            <td>${descripcion}</td>
            <td>$${totalProducto.toFixed(2)}</td>
        `;

        // Se agrega la fila a la tabla
        tabla.appendChild(fila);

        // Se limpian los campos del formulario despues de agregar el producto
        formulario.reset();

        // Se vuelve autofocar el campo del producto
        document.getElementById('product').focus();
    });


    // Evento para detectar teclas en el formulario, ya es por defecto

    // Evento enter para registrar los productos. Es una funcion ya por defecto de JS
    formulario.addEventListener('keydown', function (e){
        // Se verifica si la tecla precionada es el ENTER
        if (e.key === 'Enter'){
            // Y verifica si el elemento activo es el textarea
            if (e.target.tagName.toLowerCase() === 'textarea'){
                // Evita que el enter inserte un salto de linea en el textarea
                e.preventDefault();
                // Y se dispara evento de submit para registrar el producto
                formulario.dispatchEvent(new Event('submit'));
            }
        }
    });
});