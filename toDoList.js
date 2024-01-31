// Arrays para almacenar las tareas pendientes y las tareas hechas
let tareasPendientes = [];
let tareasHechas = [];

document.getElementById("agregarTareaForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener el valor del input
    let nuevaTareaInput = document.getElementById("nuevaTarea");
    let nuevaTarea = nuevaTareaInput.value.trim();

    if (nuevaTarea !== "") {
        // Agregar la nueva tarea al array de tareas pendientes
        tareasPendientes.push(nuevaTarea);

        // Incrementar el contador de tareas pendientes
        actualizarContadorPendientes();

        actualizarContadorHechas();

        // Renderizar la lista de tareas pendientes
        renderizarTareasPendientes();

        // Limpiar el input después de agregar la tarea
        nuevaTareaInput.value = "";
    }else {
        let mensajeError = document.createElement('p');
        mensajeError.textContent = 'Debes completar el campo primero';
    
        // Agregar clases de Bootstrap 5
        mensajeError.classList.add('alert', 'alert-danger', 'fw-bold');
    
        // Seleccionar el contenedor del formulario (o cualquier contenedor adecuado)
        let contenedorFormulario = document.getElementById('agregarTareaForm');
    
        // Agregar el mensaje de error al contenedor
        contenedorFormulario.appendChild(mensajeError);
    }
});

function renderizarTareasPendientes() {
    let listaTareasPendientes = document.getElementById("tareasPendientes");
    listaTareasPendientes.innerHTML = "";

    tareasPendientes.forEach(function (tarea, index) {
        let nuevaLi = document.createElement("li");
        nuevaLi.textContent = tarea;

        let iconoCheck = document.createElement("i");
        iconoCheck.className = "fas fa-check-circle";
        iconoCheck.addEventListener("click", function () {
            moverTareaAHechas(index);
        });

        // Agregar un icono de "tacho de basura" con un evento de clic para eliminar la tarea
        let iconoBasura = document.createElement("i");
        iconoBasura.className = "fas fa-trash-alt";
        iconoBasura.addEventListener("click", function () {
            eliminarTarea(index, true); // true indica que es una tarea pendiente
        });

        // Agregar un icono de "editar" con un evento de clic para editar la tarea
        let iconoEditar = document.createElement("i");
        iconoEditar.className = "fas fa-edit";
        iconoEditar.addEventListener("click", function () {
            activarEdicionTarea(index);
        });

        nuevaLi.appendChild(iconoCheck);
        nuevaLi.appendChild(iconoBasura);
        nuevaLi.appendChild(iconoEditar);

        listaTareasPendientes.appendChild(nuevaLi);

        let listaTareasPendientes = document.getElementById("tareasPendientes");
        setTimeout(() => {
            listaTareasPendientes.classList.add("slide-in");
        }, 100);
        });
}
// Función para mover una tarea de tareas pendientes a tareas hechas
function moverTareaAHechas(index) {
    let tareaMovida = tareasPendientes.splice(index, 1)[0];
    tareasHechas.push(tareaMovida);

    // Renderizar las listas actualizadas
    renderizarTareasPendientes();
    renderizarTareasHechas();

    // Actualizar el contador de tareas pendientes
    actualizarContadorPendientes();

    actualizarContadorHechas()
}

function renderizarTareasHechas() {
    let listaTareasHechas = document.getElementById("tareasHechas");
    listaTareasHechas.innerHTML = "";

    tareasHechas.forEach(function (tarea, index) {
        let nuevaLi = document.createElement("li");
        nuevaLi.textContent = tarea;

        // Agregar un icono de "tacho de basura" con un evento de clic para eliminar la tarea
        let iconoBasura = document.createElement("i");
        iconoBasura.className = "fas fa-trash-alt";
        iconoBasura.addEventListener("click", function () {
            eliminarTarea(index, false); // false indica que es una tarea hecha
        });

        // Agregar un icono de "revertir" con un evento de clic para llevar la tarea de hecha a pendiente
        let iconoRevertir = document.createElement("i");
        iconoRevertir.className = "fas fa-undo-alt";
        iconoRevertir.addEventListener("click", function () {
            revertirTareaApendientes(index);
        });

        nuevaLi.appendChild(iconoBasura);
        nuevaLi.appendChild(iconoRevertir);

        listaTareasHechas.appendChild(nuevaLi);

        let listaTareasHechas = document.getElementById("tareasHechas");
        setTimeout(() => {
            listaTareasHechas.classList.add("slide-in");
        }, 100);

        });
}


// Función para actualizar el contador de tareas pendientes
function actualizarContadorPendientes() {
    let contadorElement = document.getElementById("contadorTareas");
    contadorElement.textContent = "Tareas pendientes: " + tareasPendientes.length;
}

function actualizarContadorHechas() {
    let contadorElement = document.getElementById("contadorTareasHechas");
    contadorElement.textContent = "Tareas realizadas: " + tareasHechas.length;
}


function eliminarTarea(index, esPendiente) {
    if (esPendiente) {
        tareasPendientes.splice(index, 1);
    } else {
        tareasHechas.splice(index, 1);
    }

    // Renderizar las listas actualizadas
    renderizarTareasPendientes();
    renderizarTareasHechas();

    // Actualizar los contadores
    actualizarContadorPendientes();
    actualizarContadorHechas();
}

function revertirTareaApendientes(index) {
    let tareaRevertida = tareasHechas.splice(index, 1)[0];
    tareasPendientes.push(tareaRevertida);

    // Renderizar las listas actualizadas
    renderizarTareasPendientes();
    renderizarTareasHechas();

    // Actualizar los contadores
    actualizarContadorPendientes();
    actualizarContadorHechas();
}

// Función para activar la edición de una tarea pendiente
function activarEdicionTarea(index) {
    // Obtener el elemento de la lista que contiene la tarea
    let liElement = document.getElementById("tareasPendientes").getElementsByTagName("li")[index];

    // Crear un campo de entrada para la edición
    let inputEditar = document.createElement("input");
    inputEditar.type = "text";
    inputEditar.value = tareasPendientes[index];

    // Reemplazar el texto de la tarea con el campo de entrada
    liElement.innerHTML = "";
    liElement.appendChild(inputEditar);

    // Enfocar el campo de entrada
    inputEditar.focus();

    // Agregar un evento para capturar la tecla "Enter" y guardar la edición
    inputEditar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            // Validar que el campo de edición no esté vacío
            if (inputEditar.value.trim() !== "") {
                tareasPendientes[index] = inputEditar.value.trim();
                renderizarTareasPendientes();
            } else {
                let errorEdicion = document.createElement('p')
                errorEdicion.textContent = 'No podes dejar vacío este campo'

                errorEdicion.classList.add('alert', 'alert-danger', 'fw-bold', 'fs-6');
                liElement.appendChild(errorEdicion)
            }
        }
    });
}

function buscarTarea() {
    // Obtener el valor del campo de búsqueda
    let searchText = document.getElementById("search").value.toLowerCase().trim();
    let formContainer = document.getElementById("buscarForm");
    let noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No se han encontrado resultados';

    let foundResults = false; // Flag to check if any results are found

    // Iterar sobre las tareas pendientes y buscar la coincidencia
    tareasPendientes.forEach(function (tarea, index) {
        let tareaLower = tarea.toLowerCase();
        let tareaElement = document.getElementById("tareasPendientes").getElementsByTagName("li")[index];

        // Verificar si la tarea contiene el texto de búsqueda
        if (tareaLower.includes(searchText)) {
            // Resaltar o mostrar la tarea correspondiente
            tareaElement.style.borderRadius = "5px";
            tareaElement.style.padding = "5px";
            tareaElement.style.backgroundColor = "green";
            foundResults = true; // Set flag to true if a result is found
        } else {
            // Restaurar el estilo original de la tarea
            tareaElement.style.backgroundColor = "";
        }
    });

    // Iterar sobre las tareas hechas y buscar la coincidencia
    tareasHechas.forEach(function (tarea, index) {
        let tareaLower = tarea.toLowerCase();
        let tareaElement = document.getElementById("tareasHechas").getElementsByTagName("li")[index];

        // Verificar si la tarea contiene el texto de búsqueda
        if (tareaLower.includes(searchText)) {
            // Resaltar o mostrar la tarea correspondiente
            tareaElement.style.backgroundColor = "green";
            foundResults = true; // Set flag to true if a result is found
        } else {
            // Restaurar el estilo original de la tarea
            tareaElement.style.backgroundColor = "";
        }
    });

    // If no results are found, append the no results message
    if (!foundResults) {
        // Check if the message already exists before appending
        let existingMessage = formContainer.querySelector('p');
        if (!existingMessage) {
            formContainer.appendChild(noResultsMessage);
        }
    } else {
        // If results are found, remove any existing no results message
        let existingMessage = formContainer.querySelector('p');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}