import {cargarOfertas, obtenerURLArchivo} from "./funciones_firebase.js";
import {generarOferta} from "./funciones_generadoras.js";
import {guardarDatosOferta} from "./funciones_almacenamiento.js";
// import '../css/home_voluntario.css';

// --------------FUNCION NAVBAR------------

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')

// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

const elementoOfertas = document.getElementById("ofertas");
elementoOfertas.innerHTML = "";
const ofertas = await cargarOfertas(["Aventura"]);
for (const oferta of ofertas) {
    const URLFoto = await obtenerURLArchivo(oferta.data().foto + "/foto.png")
    elementoOfertas.innerHTML += generarOferta(URLFoto, oferta.data().titulo, oferta.data().descripcion);
    const elementoOferta = document.getElementById(URLFoto);
    elementoOferta.addEventListener("click", function() {
        guardarDatosOferta(oferta);
        window.location.href = "./selec_oferta.html";
    });
}