import {cargarOfertas, obtenerURLArchivo} from "./funciones_firebase.js";

// --------------FUNCION NAVBAR------------

// const iconmenu = document.querySelector('.bx_menu')
// const menu = document.querySelector('.menu')
//
// // La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
// iconmenu.addEventListener('click', function(){
//     menu.classList.toggle('menu_show')
// })

//----------------------FIN----------------------

// A partir de la información de una oferta, construye la estructura en html.
export async function generarOferta(datosOferta) {
    const URLFoto = await obtenerURLArchivo(datosOferta["foto"] + "/foto.png");
    return `<button id=${datosOferta["foto"] + "/foto.png"} class="box_ofertas">
        <div>    
            <div style="display: flex; align-content: center;">
                <img src="${URLFoto}" alt="Foto de oferta">
            </div>
            <div>
                ${datosOferta["descripcion"]}
            </div>
        </div>
    </button>`;
}

const elementoOfertas = document.getElementById("ofertas_previas");
elementoOfertas.innerHTML = "";
const ofertas = await cargarOfertas(["Aventura"]);
for (const oferta of ofertas) {
    elementoOfertas.innerHTML += await generarOferta(oferta.data());

}
