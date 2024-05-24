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
const ofertas = await cargarOfertas(["Aventura"]);
for (const oferta of ofertas) {
    elementoOfertas.innerHTML += await generarOferta(oferta.data());
    const elementoOferta = document.getElementById(oferta.data().foto + "/foto.png");
    elementoOferta.addEventListener("click", function() {
        sessionStorage.setItem("foto", oferta.data().foto + "/foto.png");
        sessionStorage.setItem("titulo", oferta.data().titulo);
        sessionStorage.setItem("descripcion", oferta.data().descripcion);
        let horario = `Desde ${oferta.data().fechas.inicial} hasta ${oferta.data().fechas.final} los `;
        const nombresDias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
        let dias = oferta.data().horarios[0].dias;
        for (let i = 1; i < dias.length; i++) {
            horario += dias[i] ? nombresDias[i] + " " : "";
        }
        let horas = oferta.data().horarios[0].horas;
        horario += `desde las ${horas.inicial} hasta ${horas.final}.`;
        sessionStorage.setItem("horario", horario);
        sessionStorage.setItem("ubicacion", oferta.data().ubicacion);
        sessionStorage.setItem("id_oferta", oferta.id);
        window.location.href = "./selec_oferta.html";
    });
}