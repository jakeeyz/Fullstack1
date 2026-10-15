const readline = require("node:readline/promises");
const { stdin: entrada, stdout: salida } = require("node:process");

// CREAR INTERFAZ PARA LEER DATOS DESDE LA TERMINAL
const teclado = readline.createInterface({
    input: entrada,
    output: salida
});

// LISTA TEMPORAL DE ESTUDIANTES
let estudiantes = [];

// VARIABLE PARA ASIGNAR UN CODIGO A CADA ESTUDIANTE
let siguienteId = 1;

// CREATE: CREAR UN ESTUDIANTE
function crearEstudiante(nombre) {
    const estudiante = {
        id: siguienteId,
        nombre: nombre
    };

    estudiantes.push(estudiante);
    siguienteId++;

    console.log("Estudiante registrado correctamente");
}

// READ: MOSTRAR TODOS LOS ESTUDIANTES
function listarEstudiantes() {
    if (estudiantes.length === 0) {
        console.log("No hay estudiantes registrados");
        return;
    }

    console.log("\n--- LISTA DE ESTUDIANTES ---");

    estudiantes.forEach(function (estudiante) {
        console.log(
            "Codigo: " + estudiante.id +
            " | Nombre: " + estudiante.nombre
        );
    });
}

// UPDATE: MODIFICAR EL NOMBRE DE UN ESTUDIANTE
function actualizarEstudiante(id, nuevoNombre) {
    const estudiante = estudiantes.find(function (e) {
        return e.id === id;
    });

    if (estudiante) {
        estudiante.nombre = nuevoNombre;
        console.log("Estudiante actualizado correctamente");
    } else {
        console.log("No se encontro al estudiante");
    }
}

// DELETE: ELIMINAR UN ESTUDIANTE
function eliminarEstudiante(id) {
    const cantidadAnterior = estudiantes.length;

    estudiantes = estudiantes.filter(function (e) {
        return e.id !== id;
    });

    if (estudiantes.length < cantidadAnterior) {
        console.log("Estudiante eliminado correctamente");
    } else {
        console.log("No se encontro al estudiante");
    }
}

// MENU PRINCIPAL DEL PROYECTO
async function iniciar() {
    let opcion = "";

    // EL MENU SE REPITE HASTA ELEGIR LA OPCION 5
    while (opcion !== "5") {
        console.log("\n=== CRUD DE ESTUDIANTES ===");
        console.log("1. Registrar estudiante");
        console.log("2. Listar estudiantes");
        console.log("3. Actualizar estudiante");
        console.log("4. Eliminar estudiante");
        console.log("5. Salir");

        opcion = (
            await teclado.question("Elige una opcion: ")
        ).trim();

        if (opcion === "1") {
            const nombre = (
                await teclado.question("Nombre del estudiante: ")
            ).trim();

            if (nombre !== "") {
                crearEstudiante(nombre);
            } else {
                console.log("El nombre no puede estar vacio");
            }

        } else if (opcion === "2") {
            listarEstudiantes();

        } else if (opcion === "3") {
            const id = Number(
                (await teclado.question("Codigo del estudiante: ")).trim()
            );

            if (!Number.isInteger(id) || id <= 0) {
                console.log("Ingrese un codigo valido");
                continue;
            }

            const nuevoNombre = (
                await teclado.question("Nuevo nombre: ")
            ).trim();

            if (nuevoNombre !== "") {
                actualizarEstudiante(id, nuevoNombre);
            } else {
                console.log("El nombre no puede estar vacio");
            }

        } else if (opcion === "4") {
            const id = Number(
                (await teclado.question("Codigo a eliminar: ")).trim()
            );

            if (Number.isInteger(id) && id > 0) {
                eliminarEstudiante(id);
            } else {
                console.log("Ingrese un codigo valido");
            }

        } else if (opcion === "5") {
            console.log("Programa finalizado - Igor");

        } else {
            console.log("Opcion no valida. Intente otra vez");
        }
    }

    // CERRAR LA INTERFAZ DE ENTRADA
    teclado.close();
}

// EJECUTAR EL PROGRAMA
iniciar();