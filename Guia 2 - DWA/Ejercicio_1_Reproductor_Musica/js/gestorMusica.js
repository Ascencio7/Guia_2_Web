// Se obtiene las referencias de elementos HTML
const formulario = document.getElementById('songForm');
const playlist = document.getElementById('playlist');
const botonPlay = document.getElementById('playButton');
const audioPlay = document.getElementById('audioPlayer');
const archivoInput = document.getElementById('file');

// Se crean variables para una lista y la reproducción

// Un array para guardar la información de las canciones
let canciones = [];

// Una variable contadora que indica la canción que está sonando
let indiceCancionActual = 0;

// Se crea un evento para agregar la canción al dar clic en Agregar
formulario.addEventListener('submit', (e) => {
    // Esta línea evita que el formulario recargue la página
    e.preventDefault();

    // Se crean variables para obtener los valores ingresados del formulario
    const titulo = document.getElementById('title').value;
    const artista = document.getElementById('artist').value;
    // Esto obtiene el archivo seleccionado de la PC
    const archivo = archivoInput.files[0];

    // Se valida que se haya seleccionado un archivo de audio .mp3
    if (!archivo || !archivo.type.startsWith('audio/')) {
        // Si no es así, entonces se muestra un alert
        alert('Selecciona un archivo .mp3 válido');
        // Detiene la función si no es válida
        return;
    }

    // Se crea una URL para reproducir el archivo sin subirlo
    const url = URL.createObjectURL(archivo);

    // Se agrega el objeto con los datos de la canción en el array
    canciones.push({ titulo, artista, url });

    // Se actualiza la lista visual
    actualizarPlaylist();

    // Se limpia el formulario
    formulario.reset();
});

// Una función para actualizar la lista de las canciones y recibir arreglo para mostrar las canciones
function actualizarPlaylist(songsToShow = canciones) {
    // Se limpia el contenido actual del listado
    playlist.innerHTML = '';

    // Esta línea es por cada canción del arreglo a mostrar
    songsToShow.forEach((cancion, index) => {
        // Se crea un elemento li para cada canción
        const li = document.createElement('li');

        // Se crea un span para la información de texto
        const songInfo = document.createElement('span');

        // Se asigna la clase CSS
        songInfo.className = 'song-info';

        // Es el texto con el título y artista
        songInfo.textContent = `${cancion.titulo} - ${cancion.artista}`;

        // Se crea un contenedor para los botones de acciones
        const actions = document.createElement('div');
        actions.className = 'song-actions';

        // Se crea el botón para subir la canción en la lista
        const upBtn = document.createElement('button');
        upBtn.textContent = '⬆️'; // un emoji de PC
        upBtn.title = 'Subir'; // Un texto visible al pasar el mouse

        // Solo habilitar si la canción está en la lista original y no es la primera
        const originalIndexUp = canciones.indexOf(cancion);
        upBtn.disabled = originalIndexUp <= 0;

        // Y al hacer clic se llama a la función para mover la canción hacia arriba
        upBtn.onclick = () => {
            moveUp(originalIndexUp);
        };

        // Se crea un botón para bajar la canción en la lista
        const downBtn = document.createElement('button');
        downBtn.textContent = '⬇️';
        downBtn.title = 'Bajar';

        // Se busca por el índice original para validar la posición
        const originalIndexDown = canciones.indexOf(cancion);
        downBtn.disabled = originalIndexDown === -1 || originalIndexDown >= canciones.length - 1;

        // Al hacer clic se llama a la función para mover la canción hacia abajo
        downBtn.onclick = () => {
            moveDown(originalIndexDown);
        };

        // Se crea un botón para eliminar la canción de la lista
        const delBtn = document.createElement('button');
        delBtn.textContent = '❌';
        delBtn.title = 'Eliminar';

        // Y al hacer clic se elimina la canción si existe en la lista
        delBtn.onclick = () => {
            const originalIndexDel = canciones.indexOf(cancion);
            if (originalIndexDel !== -1) {
                deleteSong(originalIndexDel);
            }
        };

        // Se agregan los botones al contenedor de las acciones
        actions.appendChild(upBtn);
        actions.appendChild(downBtn);
        actions.appendChild(delBtn);

        // Se agregan el texto y los botones al elemento li
        li.appendChild(songInfo);
        li.appendChild(actions);

        // Se agregan los elementos a la lista
        playlist.appendChild(li);
    });
}

// Una función para mover la canción hacia arriba en la lista
function moveUp(index) {
    if (index > 0) {
        // Esto intercambia la posición con la canción anterior
        [canciones[index], canciones[index - 1]] = [canciones[index - 1], canciones[index]];
        // Y se refresca la lista para reflejar cambios
        actualizarPlaylist();
    }
}

// Una función para mover la canción hacia abajo en la lista
function moveDown(index) {
    if (index < canciones.length - 1) {
        // Esto intercambia la posición con la canción siguiente
        [canciones[index], canciones[index + 1]] = [canciones[index + 1], canciones[index]];
        // Y se refresca la lista para reflejar cambios
        actualizarPlaylist();
    }
}

// Una función para eliminar la canción de la lista
function deleteSong(index) {
    // Esto elimina el elemento en la posición del índice
    canciones.splice(index, 1);
    // Y se refresca la lista para actualizar la vista
    actualizarPlaylist();
}

// Un evento para el botón de reproducir toda la lista
botonPlay.addEventListener('click', () => {
    if (canciones.length === 0) {
        // Se verifica si no hay canciones, sino, se muestra el siguiente mensaje
        alert('No hay canciones en la lista.');
        return;
    }

    // Si hay, entonces se muestra el mensaje con la lista de canciones ingresadas que se van a reproducir
    alert('Reproduciendo canciones en orden:\n' + canciones.map(s => `${s.titulo} - ${s.artista}`).join('\n'));
    indiceCancionActual = 0; // se empieza desde la primera canción
    playCurrentSong(); // se llama a la función para iniciar la reproducción
});

// Una función para reproducir la canción actual y avanzar a la siguiente automáticamente
function playCurrentSong() {
    // Si ya no hay canciones se detiene el reproductor
    if (indiceCancionActual >= canciones.length) return;

    // Se crea una variable para obtener la canción actual
    const cancion = canciones[indiceCancionActual];
    // Se asigna la fuente de la canción al reproductor
    audioPlay.src = cancion.url;
    // Y se reproduce el audio
    audioPlay.play();

    // Cuando termine la canción se avanza a la siguiente
    audioPlay.onended = () => {
        indiceCancionActual++;
        playCurrentSong();
    };
}

// Filtrar canciones por nombre de artista

// Se obtienen las referencias HTML y el input
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Un evento tipo 'submit' del formulario de búsqueda
searchForm.addEventListener('submit', (e) => {
    // Esto evita recargar la página al enviar la búsqueda
    e.preventDefault();

    // Se obtiene el texto buscado, se quitan los espacios y se convierte en minúsculas para comparar
    const consulta = searchInput.value.trim().toLowerCase();

    // Si el campo está vacío se muestra toda la lista
    if (!consulta) {
        actualizarPlaylist();
        return;
    }

    // Se crea una variable para guardar y verificar que el artista ingresado tenga canciones que mostrar
    const cancionesFiltradas = canciones.filter(cancion => cancion.artista.toLowerCase().includes(consulta));

    // Se actualiza la lista mostrando las canciones del artista
    actualizarPlaylist(cancionesFiltradas);
});