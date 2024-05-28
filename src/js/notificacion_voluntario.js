import {
    collection,
    onSnapshot,
    query,
    where,
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import {cargarDocumento, editarDocumento, obtenerDB} from "./funciones_firebase.js";

// --------------FUNCION NAVBAR------------

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')
const oferta = document.querySelector('.oferta')


// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------
class ElementoNotificacion {
    constructor(postulacion, oferta, organizacion, estado) {
        this.postulacion = postulacion;
        this.oferta = oferta;
        this.organizacion = organizacion;
        this.estado = estado;
    }

    async contruir() {
        return `<div id=${this.postulacion.id} class="box_info"> 
            <p>La organización ${this.organizacion.data().nombre} respondió "${this.estado}" a la postulación a la oferta titulada "${this.oferta.data().titulo}"</p>
            <div id=${this.postulacion.id + "like"} class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
            </div>
        </div>`;
    }
}

const db = obtenerDB();
const elementoNotificaciones = document.getElementById("notificaciones_voluntario");
elementoNotificaciones.innerHTML = "";

function listenerPostulacionesVoluntario() {
    const q = query(collection(db, "postulaciones"), where("estado", "!=", "proceso"), where("confirmada", "==", false));
    const desuscribir = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
            const postulacion = change.doc;
            const oferta = await cargarDocumento("ofertas", postulacion.data().oferta);
            const organizacion = await cargarDocumento("organizaciones", oferta.data().publicante);
            const notificacion = new ElementoNotificacion(postulacion, oferta, organizacion, postulacion.data().estado);
            switch (change.type) {
                case "added":
                    elementoNotificaciones.innerHTML += await notificacion.contruir();
                    const elementoLike = document.getElementById(postulacion.id + "like");
                    elementoLike.addEventListener("click", async function() {
                        await editarDocumento("postulaciones", postulacion.id, {
                            confirmada: true,
                        });
                        elementoNotificaciones.remove();
                    });
                    break;
                case "modified":
                    break;
                case "removed":
                    break;
            }
        });
    });
}

listenerPostulacionesVoluntario();
