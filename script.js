if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("./sw.js")
          .then(() => console.log("Service Worker registrado"))
          .catch((err) => console.log("Error al registrar Service Worker", err));
      }
document.addEventListener("DOMContentLoaded", function () {
    const inputTarea = document.getElementById("txt_tarea");
    const btnAgregar = document.getElementById("btn_add");
    const listaTareas = document.getElementById("tareas");

    // Cargar tareas al iniciar
    function cargarTareas() {
        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        listaTareas.innerHTML = ""; // Limpiar la lista antes de recargar
        tareasGuardadas.forEach((tarea, index) => agregarElementoLista(tarea, index));
    }

    // Agregar nueva tarea
    btnAgregar.addEventListener("click", function () {
        const tarea = inputTarea.value.trim();
        if (tarea === "") {
            alert("Por favor, ingresa una tarea.");
            return;
        }

        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareasGuardadas.push(tarea);
        localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));

        agregarElementoLista(tarea, tareasGuardadas.length - 1);
        inputTarea.value = "";
    });

    // Función para agregar un elemento a la lista
    function agregarElementoLista(tarea, index) {
        const li = document.createElement("li");
        li.textContent = tarea;

        // Botón de eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function () {
            eliminarTarea(index);
        });

        // Botón de actualizar
        const btnActualizar = document.createElement("button");
        btnActualizar.textContent = "Actualizar";
        btnActualizar.addEventListener("click", function () {
            const nuevaTarea = prompt("Editar tarea:", tarea);
            if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
                actualizarTarea(index, nuevaTarea);
            }
        });

        li.appendChild(btnActualizar);
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    }

    // Función para eliminar tarea
    function eliminarTarea(index) {
        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareasGuardadas.splice(index, 1);
        localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
        cargarTareas(); // Recargar lista
    }

    // Función para actualizar tarea
    function actualizarTarea(index, nuevaTarea) {
        const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
        tareasGuardadas[index] = nuevaTarea;
        localStorage.setItem("tareas", JSON.stringify(tareasGuardadas));
        cargarTareas(); // Recargar lista
    }

    // Cargar tareas almacenadas al iniciar
    cargarTareas();
});

