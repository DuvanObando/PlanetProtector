import {crearDocumento, editarDocumento, subirArchivo} from "./funciones_firebase.js";

// --------------FUNCION NAVBAR------------

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')
const oferta = document.querySelector('.oferta')


// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

const elementoImagen = document.getElementById("imagen_creacion_oferta");
const elementoTitulo = document.getElementById("titulo_creacion_oferta");
const elementoDescripcion = document.getElementById("descripcion_creacion_oferta");
const elementoUbicacion = document.getElementById("ubicacion_creacion_oferta");
const elementoLimiteParticipantes = document.getElementById("limite_participantes_creacion_oferta");

const elementoBotonGuardar = document.getElementById("btn_Guardar_creacion_oferta");
elementoBotonGuardar.addEventListener("click", async function() {
    if (elementoImagen.value === "") {
        alert("No ha seleccionado una imagen.");
        return;
    }
    if (elementoTitulo.value === "") {
        alert("No le ha dado título a la oferta.");
        return;
    }
    if (elementoDescripcion.value === "") {
        alert("No ha proveído una descripción.");
        return;
    }
    if (elementoUbicacion.value === "") {
        alert("No ha ingresado dirección.");
        return;
    }
    if (elementoLimiteParticipantes.value === "") {
        alert("No ha ingresado límite de participantes.");
        return;
    }

    const idOferta = await crearDocumento("ofertas", {});
    const datosOferta = {
        descripcion: elementoDescripcion.value,
        foto: `imagenes_oferta/${idOferta}`,
        horarios: [
            {
                dias: [],
                rango_horas: {
                    hora_final: {
                        horas: -1,
                        minutos: -1,
                        segundos: -1,
                    },
                    hora_inicial: {
                        horas: -1,
                        minutos: -1,
                        segundos: -1,
                    }
                },
            },
        ],
        preferencias: [],
        titulo: elementoTitulo.value,
        ubicacion: elementoUbicacion.value,
        estado: true,
    };
    await editarDocumento("ofertas", idOferta, datosOferta);
    await subirArchivo(elementoImagen.files[0]);
})