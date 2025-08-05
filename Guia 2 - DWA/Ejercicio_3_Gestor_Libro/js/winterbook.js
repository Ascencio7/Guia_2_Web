// Se espera que el contenido html este completo, que los campos requeridos esten completos

document.addEventListener('DOMContentLoaded', () => {
    
    // Se obtiene las referencias de html del formulario
    const formulario = document.getElementById('libroForm');
    const tabla = document.getElementById('cuerpoTabla');
    const btnSubmit = formulario.querySelector('button[type="submit"]');

    // Se carga el arreglo de los libros desde localStorage o se inicia como un arreglo vacio
    let libros = JSON.parse(localStorage.getItem('libros')) || [];
    
    // Se crea una variable para guardar el indice del libro que se esta editanto
    let libroEditado = null;

    // Una variable contadora para enumera las filas de la tabla
    let contador = 1;

    // Función para renderizar tabla completa (sin filtro)
    function actualizarTabla() {
        renTabla(libros);
    }

    // Función para renderizar tabla con listado dado (filtrado o completo)
    function renTabla(listadoLibros){
        
        // Se limpia el contenido actual de la tabla
        tabla.innerHTML = '';
        
        // Una variable contadora para enumerar las filas que se vayan viendo
        let contadorLocal = 1;

        // Se itera por cada libro del listado recibido
        listadoLibros.forEach((libro, index) => {
            
            // Se crea una fila de la tabla
            const fila = document.createElement('tr');

            // Se definen los datos del libro en la tabla
            fila.innerHTML = `
                <td>${contadorLocal++}</td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.genero}</td>
                <td>${libro.descripcion}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2 editar" data-index="${index}">✏️ Editar</button>
                    <button class="btn btn-danger btn-sm eliminar" data-index="${index}">🗑️ Eliminar</button>
                </td>
            `;

            // Se agrega la fila a la tabla
            tabla.appendChild(fila);
        });
    }

    // Se llama para mostrar la tabla al cargar la pagina
    actualizarTabla();

    // Un evento que se ejecuta al enviar el formulario
    formulario.addEventListener('submit', (e) => {
        
        // Se evita que se recargue la pagina
        e.preventDefault();

        // Se obtienen y se limpian los espacios en los campos del formulario
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const genero = document.getElementById('genero').value.trim();
        let descripcion = document.getElementById('desc').value.trim();

        // Se verifica para validar que los campos necesarios no esten vacios
        if (!titulo || !autor || !genero) {
            alert('Completa todos los campos obligatorios');
            return;
        }

        // Y si no hay una descripcion que se asigne el texto por defecto
        if (!descripcion) {
            descripcion = 'Sin descripción';
        }

        const libro = { titulo, autor, genero, descripcion };

        if (libroEditado !== null) {
            
            // Si se esta editando entonces que se reemplace el libro existente
            libros[libroEditado] = libro;
            libroEditado = null;
            
            // Debe cambiar el texto del boton a Agregar libro
            btnSubmit.textContent = 'Agregar libro';
        } else {
            
            // Si no se agrega el libro nuevo al arreglo
            libros.push(libro);
        }

        // Se guarda la lista actualizada en localStorage
        localStorage.setItem('libros', JSON.stringify(libros));
        
        // Se actualiza la tabla para mostrar los cambios
        actualizarTabla();
        
        // Se limpia el formulario para nuevos datos
        formulario.reset();
        
        // Se coloca el foco en el campo del titulo
        document.getElementById('titulo').focus();
    });

    // Delegación de eventos para editar o eliminar
    tabla.addEventListener('click', (e) => {
        
        // Una constante para el indice afectado del libro
        const index = e.target.dataset.index;

        // Se confirma si quiere eliminar el libro de la tabla 
        if (e.target.classList.contains('eliminar')) {
            if (confirm('¿Estás seguro de eliminar este libro?')) {
                // 
                libros.splice(index, 1);
                localStorage.setItem('libros', JSON.stringify(libros));
                actualizarTabla();
            }
        }

        if (e.target.classList.contains('editar')) {
            
            // Se cargan los datos del libro a los inputs para editar
            const libro = libros[index];
            document.getElementById('titulo').value = libro.titulo;
            document.getElementById('autor').value = libro.autor;
            document.getElementById('genero').value = libro.genero;
            
            // Si la descripcion esta vacio se deja el campo vacio
            document.getElementById('desc').value = libro.descripcion === 'Sin descripción' ? '' : libro.descripcion;

            // Se guarda el indice para saber que estamos editando
            libroEditado = index;
            
            // Se cambia el texto del boton para indicar la edicion
            btnSubmit.textContent = 'Guardar cambios';
        }
    });

    // Enviar con ENTER en textarea
    formulario.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName.toLowerCase() === 'textarea') {
            e.preventDefault();
            formulario.dispatchEvent(new Event('submit'));
        }
    });

    // Función para filtrar libros
    function filtarLibros(){
        
        // Se obtienen los valores filtrados en minusculas para una busqueda no sencible
        const autorFiltrado = document.getElementById('filtrarAutor').value.toLowerCase();
        const generoFiltrado = document.getElementById('filtrarGenero').value.toLowerCase();

        // Se filtran los libros que contengan el texto en autor y genero
        const librosFiltrados = libros.filter(libro => {
            const autorBuscado = libro.autor.toLowerCase().includes(autorFiltrado);
            const generoBuscado = libro.genero.toLowerCase().includes(generoFiltrado);
            return autorBuscado && generoBuscado;
        });

        // Se renderiza la tabla con los libros filtrados
        renTabla(librosFiltrados);
    }

    // Se escuchan los cambios en los inputs del filtro para actualizar la tabla en tiempo real
    document.getElementById('filtrarAutor').addEventListener('input', filtarLibros);
    document.getElementById('filtrarGenero').addEventListener('input', filtarLibros);
});