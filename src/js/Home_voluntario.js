import {cargarOfertas, generarOferta} from "./funciones_firebase.js";
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
const ofertas = await cargarOfertas(["playa"]);
for (const oferta of ofertas) {
    elementoOfertas.innerHTML += await generarOferta(oferta.data());
}