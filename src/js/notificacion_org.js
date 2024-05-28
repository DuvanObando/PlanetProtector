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


// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la "crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show')
})

//----------------------FIN----------------------
class ElementoNotificacion {
    constructor(postulacion, oferta, voluntario) {
        this.postulacion = postulacion;
        this.oferta = oferta;
        this.voluntario = voluntario;
    }

    async contruir() {
        return `<div id=${this.postulacion.id} class="box_info">
    
            <img src=${this.voluntario.data().URLFoto} alt="Foto de perfil de voluntario">

            <p>El usuario ${this.voluntario.data().nombre} solicitó una postulación a la oferta titulada "${this.oferta.data().titulo}"</p>

            <div id=${this.postulacion.id + "like"} class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
            </div>
            <div id=${this.postulacion.id + "dislike"} class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M20 3h-1v13h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM4 16h7l-1.122 3.368A2 2 0 0 0 11.775 22H12l5-5.438V3H6l-3.937 8.649-.063.293V14a2 2 0 0 0 2 2z"></path></svg>
            </div>

        </div>`;
    }
}

const db = obtenerDB();
const elementoNotificaciones = document.getElementById("notificaciones_organizacion");
elementoNotificaciones.innerHTML = "";

function listenerPostulacionesProceso() {
    const q = query(collection(db, "postulaciones"), where("estado", "==", "proceso"));
    const desuscribir = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
            const postulacion = change.doc;
            const oferta = await cargarDocumento("ofertas", postulacion.data().oferta);
            const voluntario = await cargarDocumento("voluntarios", postulacion.data().voluntario);
            const notificacion = new ElementoNotificacion(postulacion, oferta, voluntario);
            switch (change.type) {
                case "added":
                    elementoNotificaciones.innerHTML += await notificacion.contruir();
                    const elementoLike = document.getElementById(postulacion.id + "like");
                    const elementoDislike = document.getElementById(postulacion.id + "dislike");
                    elementoLike.addEventListener("click", async function() {
                        await editarDocumento("postulaciones", postulacion.id, {
                            estado: "aceptada",
                        });
                        elementoNotificaciones.remove();
                    });
                    elementoDislike.addEventListener("click", async function() {
                        await editarDocumento("postulaciones", postulacion.id, {
                            estado: "rechazada",
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

listenerPostulacionesProceso();