import {crearDocumento, editarDocumento, obtenerURLArchivo, obtenerUsuarioActivo} from "./funciones_firebase.js";

// --------------FUNCION NAVBAR------------

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')
const oferta = document.querySelector('.oferta')


// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

const elementoTitulo = document.getElementById("titulo_oferta");
const elementoFoto = document.getElementById("foto_oferta");
const elementoDescripcion = document.getElementById("descripcion_oferta");
const elementoHorario = document.getElementById("horario_oferta");
const elementoUbicacion = document.getElementById("ubicacion_oferta");
const elementoBtnAplicar = document.getElementById("btn_Aplicar_oferta");

elementoTitulo.innerText = sessionStorage.getItem("titulo");
const URLFoto = await obtenerURLArchivo(sessionStorage.getItem("foto"));
elementoFoto.innerHTML = `<img src="${URLFoto}" alt="Foto de oferta">`;
elementoDescripcion.innerHTML = `<p>${sessionStorage.getItem("descripcion")}</p>`;
elementoHorario.innerText = sessionStorage.getItem("horario");
elementoUbicacion.innerText = sessionStorage.getItem("ubicacion");
elementoBtnAplicar.addEventListener("click", async function() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    const idPostulacion = await crearDocumento("postulaciones", {
        fecha: mm + '/' + dd + '/' + yyyy,
        voluntario: obtenerUsuarioActivo().uid,
        publicacion: sessionStorage.getItem("id_oferta"),
        estado: "proceso",
    });
    sessionStorage.clear();
    alert("Postulado correctamente");
    window.location.href = "./home_voluntario.html";
});