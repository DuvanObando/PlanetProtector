// --------------FUNCION NAVBAR------------

import {cargarDocumento, cargarPostulaciones, obtenerURLArchivo} from "./funciones_firebase.js";

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')
const oferta = document.querySelector('.oferta')


// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

function vistaPreviaOferta(URLFoto, titulo, estado) {
    const clase_oferta = {
        "proceso": "img_proceso",
        "aceptada": "img_aceptadas",
        "rechazada": "img_rechazadas",
    };
    return `<div class="img ${clase_oferta[estado]}">
    <h5>${titulo}</h5>
    <img src=${URLFoto} alt="Foto oferta">
    </div>`;
}

const elementoOfertasEnProceso = document.getElementById("ofertas_en_proceso");
elementoOfertasEnProceso.innerHTML = "<h2>En Proceso</h2>";
const elementoOfertasAceptadas = document.getElementById("ofertas_aceptadas");
elementoOfertasAceptadas.innerHTML = "<h2>Aceptadas</h2>";
const elementoOfertasRechazadas = document.getElementById("ofertas_rechazadas");
elementoOfertasRechazadas.innerHTML = "<h2>Rechazadas</h2>";

const postulacionesProceso = await cargarPostulaciones(JSON.parse(localStorage.getItem("usuario")).uid, "proceso");
const postulacionesAceptadas = await cargarPostulaciones(JSON.parse(localStorage.getItem("usuario")).uid, "aceptada");
const postulacionesRechazadas = await cargarPostulaciones(JSON.parse(localStorage.getItem("usuario")).uid, "rechazada");
const postulaciones = postulacionesProceso.concat(postulacionesAceptadas).concat(postulacionesRechazadas);

for (const postulacion of postulaciones) {
    const oferta = await cargarDocumento("ofertas", postulacion.data().oferta);
    const URLFoto = await obtenerURLArchivo(oferta.data().foto + "/foto.png");
    switch (postulacion.data().estado) {
        case "proceso":
            elementoOfertasEnProceso.innerHTML += vistaPreviaOferta(URLFoto, oferta.data().titulo, "proceso");
            break;
        case "aceptada":
            elementoOfertasAceptadas.innerHTML += vistaPreviaOferta(URLFoto, oferta.data().titulo, "aceptada");
            break;
        case "rechazada":
            elementoOfertasRechazadas.innerHTML += vistaPreviaOferta(URLFoto, oferta.data().titulo, "rechazada");
            break;
    }
}