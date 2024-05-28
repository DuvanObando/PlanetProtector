import {cargarDocumento, cargarPostulacionesVoluntario, obtenerURLArchivo} from "./funciones_firebase.js";
import {generarOfertaPostulada} from "./funciones_generadoras.js";
import {guardarDatosOferta} from "./funciones_almacenamiento.js";

// --------------FUNCION NAVBAR------------

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')
const oferta = document.querySelector('.oferta')


// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

const elementoOfertasEnProceso = document.getElementById("ofertas_en_proceso");
elementoOfertasEnProceso.innerHTML = "<h2>En Proceso</h2>";
const elementoOfertasAceptadas = document.getElementById("ofertas_aceptadas");
elementoOfertasAceptadas.innerHTML = "<h2>Aceptadas</h2>";
const elementoOfertasRechazadas = document.getElementById("ofertas_rechazadas");
elementoOfertasRechazadas.innerHTML = "<h2>Rechazadas</h2>";

const postulacionesProceso = await cargarPostulacionesVoluntario(JSON.parse(localStorage.getItem("usuario")).uid, "proceso");
const postulacionesAceptadas = await cargarPostulacionesVoluntario(JSON.parse(localStorage.getItem("usuario")).uid, "aceptada");
const postulacionesRechazadas = await cargarPostulacionesVoluntario(JSON.parse(localStorage.getItem("usuario")).uid, "rechazada");
const postulaciones = postulacionesProceso.concat(postulacionesAceptadas).concat(postulacionesRechazadas);

for (const postulacion of postulaciones) {
    const oferta = await cargarDocumento("ofertas", postulacion.data().oferta);
    const URLFoto = await obtenerURLArchivo(oferta.data().foto);
    switch (postulacion.data().estado) {
        case "proceso":
            elementoOfertasEnProceso.innerHTML += generarOfertaPostulada(URLFoto, oferta.data().titulo, "proceso");
            break;
        case "aceptada":
            elementoOfertasAceptadas.innerHTML += generarOfertaPostulada(URLFoto, oferta.data().titulo, "aceptada");
            break;
        case "rechazada":
            elementoOfertasRechazadas.innerHTML += generarOfertaPostulada(URLFoto, oferta.data().titulo, "rechazada");
            break;
    }
    const elementoVistaPreviaOferta = document.getElementById(URLFoto);
    elementoVistaPreviaOferta.addEventListener("click", function() {
        guardarDatosOferta(oferta);
        window.location.href = "./selec_oferta.html";
    });
}