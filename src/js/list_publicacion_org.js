import {
    collection,
    onSnapshot,
    query,
    where,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import {cargarDocumentos, editarDocumento, obtenerDB, obtenerURLArchivo} from "./funciones_firebase.js";
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

const elementoHistorialOfertas = document.getElementById("historial_ofertas");
elementoHistorialOfertas.innerHTML = "";
const db = obtenerDB();

const q = query(collection(db, "ofertas"), where("publicante", "==", JSON.parse(localStorage.getItem("usuario")).uid));
const ofertas = await cargarDocumentos(q);
for (const oferta of ofertas) {
    const URLFoto = await obtenerURLArchivo(oferta.data().foto);
    elementoHistorialOfertas.innerHTML += `<div class="box_oferta">
        <div class="info_box">

            <div class="img">
                <img src=${URLFoto} alt="Foto de la oferta">
            </div>

            <p>${oferta.data().descripcion}</p>

        </div>

        <div id=${oferta.id + "editar"} class="box_btn">
            <div class="editar">
                <button class="btn_editar">Editar</button>
            </div>

            <div id=${oferta.id + "eliminar"} class="eliminar">
                <button class="btn_eliminar">Eliminar</button>
            </div>
        </div>

    </div>`;
}
for (const oferta of ofertas) {
    const elementoBotonEditar = document.getElementById(oferta.id + "editar");
    const elementoBotonEliminar = document.getElementById(oferta.id + "eliminar");
    elementoBotonEditar.addEventListener("click", function() {
        console.log(oferta.data())
        guardarDatosOferta(oferta);
        sessionStorage.setItem("idOferta", oferta.id);
        window.location.href = "./creacion_oferta1.html";
    });
    elementoBotonEliminar.addEventListener("click", async function() {
        await editarDocumento("ofertas", oferta.id, {
            estado: false,
        })
    });
}