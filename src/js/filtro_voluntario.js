// --------------FUNCION NAVBAR------------

import {cargarOfertasEnProceso, obtenerURLArchivo, obtenerUsuarioActivo} from "./funciones_firebase.js";

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
const ofertas = await cargarOfertasEnProceso(obtenerUsuarioActivo().uid);
for (const oferta of ofertas) {
    const URLFoto = await obtenerURLArchivo(oferta.foto + "/foto.png");
    elementoOfertasEnProceso.innerHTML += `<div class="img img_proceso">
    <h5>${oferta.titulo}</h5>
    <img src=${URLFoto} alt="Foto oferta">
    </div>`;
}
