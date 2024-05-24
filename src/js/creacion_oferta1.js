import {crearDocumento, editarDocumento, obtenerUsuarioActivo, subirArchivo} from "./funciones_firebase.js";

// --------------FUNCION NAVBAR------------

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')
const oferta = document.querySelector('.oferta')


// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

const elementoImagen = document.getElementById("imagen_creacion_oferta");
const elementoTitulo = document.getElementById("titulo_creacion_oferta");
const elementoDescripcion = document.getElementById("descripcion_creacion_oferta");
const elementoUbicacion = document.getElementById("ubicacion_creacion_oferta");
const elementoLimiteParticipantes = document.getElementById("limite_participantes_creacion_oferta");
const elementoBtnGuardar = document.getElementById("btn_Guardar_creacion_oferta");

// TODO: Guardar el objeto File persistentemente entre páginas.
// elementoImagen.files[0] = JSON.parse(sessionStorage.getItem("imagen")) ?? "";
elementoImagen.addEventListener("change", function() {
    // Esto no funciona.
    sessionStorage.setItem("imagen", JSON.stringify(elementoImagen.files[0]));
});
elementoTitulo.value = sessionStorage.getItem("titulo") ?? "";
elementoTitulo.addEventListener("change", function() {
    sessionStorage.setItem("titulo", elementoTitulo.value);
});
elementoDescripcion.value = sessionStorage.getItem("descripcion") ?? "";
elementoDescripcion.addEventListener("change", function() {
    sessionStorage.setItem("descripcion", elementoDescripcion.value);
});
elementoUbicacion.value = sessionStorage.getItem("ubicacion") ?? "";
elementoUbicacion.addEventListener("change", function() {
    sessionStorage.setItem("ubicacion", elementoUbicacion.value);
});
elementoLimiteParticipantes.value = sessionStorage.getItem("limite_participantes") ?? "";
elementoLimiteParticipantes.addEventListener("change", function() {
    if (isNaN(elementoLimiteParticipantes.value)) {
        alert("El límite de participantes tiene que ser un número.");
        return;
    }
    elementoLimiteParticipantes.value = parseInt(elementoLimiteParticipantes.value);
    if (elementoLimiteParticipantes < 1) {
        alert("El límite de participantes tiene que ser un número entero positivo.");
        return;
    }
    sessionStorage.setItem("limite_participantes", elementoLimiteParticipantes.value);
});

elementoBtnGuardar.addEventListener("click", async function() {
    if (obtenerUsuarioActivo()) {} else {
        alert("Las credenciales del usuario ya no son válidas, inicie sesión nuevamente.");
        return;
    }
    if (elementoImagen.value === "") {
        alert("No ha seleccionado una imagen.");
        return;
    }
    if (elementoTitulo.value === "") {
        alert("No le ha dado título a la oferta.");
        return;
    }
    if (elementoDescripcion.value === "") {
        alert("No ha proveído una descripción.");
        return;
    }
    if (elementoUbicacion.value === "") {
        alert("No ha ingresado dirección.");
        return;
    }
    if (elementoLimiteParticipantes.value === "") {
        alert("No ha ingresado límite de participantes.");
        return;
    }
    if (sessionStorage.getItem("preferencias") == null || sessionStorage.getItem("preferencias").length === 0) {
        alert("Se debe seleccionar al menos una preferencia.");
        return;
    }
    if (sessionStorage.getItem("fecha_inicial") == null) {
        alert("Se debe especificar los horarios y fechas.");
        return;
    }

    const idOferta = await crearDocumento("ofertas", {});
    const datosOferta = {
        descripcion: elementoDescripcion.value,
        fechas: {
            inicial: sessionStorage.getItem("fecha_inicial"),
            final: sessionStorage.getItem("fecha_final"),
        },
        foto: `imagenes_ofertas/${idOferta}`,
        horarios: [
            {
                dias: JSON.parse(sessionStorage.getItem("dias")),
                horas: {
                    inicial: sessionStorage.getItem("hora_inicial"),
                    final: sessionStorage.getItem("hora_final"),
                }
            }
        ],
        preferencias: JSON.parse(sessionStorage.getItem("preferencias")),
        publicante: obtenerUsuarioActivo().uid,
        titulo: elementoTitulo.value,
        ubicacion: elementoUbicacion.value,
        estado: true,
    };
    await editarDocumento("ofertas", idOferta, datosOferta);
    await subirArchivo(elementoImagen.files[0], `imagenes_ofertas/${idOferta}`, "foto.png");
    sessionStorage.clear();
    window.location.href = "./Home_voluntario.html";
});