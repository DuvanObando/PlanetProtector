// --------------FUNCION NAVBAR------------

import {editarDocumento, obtenerURLArchivo, subirArchivo} from "./funciones_firebase.js";

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')

// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

const elementoIcono = document.getElementById("icono_perfil_voluntario");
const elementoSelectorImagen = document.getElementById("selector_imagen_perfil_voluntario");
const elementoNumeroDocumento = document.getElementById("numero_documento_perfil_voluntario");
const elementoNombre = document.getElementById("nombre_perfil_voluntario");
const elementoCorreoElectronico = document.getElementById("correo_electronico_perfil_voluntario");
const elementoBotonHojaVida = document.getElementById("btn_hoja_vida_perfil_voluntario");
const elementoSelectorHojaVida = document.getElementById("selector_hoja_vida_perfil_voluntario");
const elementoDescripcion = document.getElementById("descripcion_perfil_voluntario");

elementoIcono.addEventListener("click", function() {
    if (!confirm("¿Está seguro de que quiere cambiar su foto de perfil? Esta acción no se puede deshacer.")) {
        return;
    }
    elementoSelectorImagen.click();
});
elementoSelectorImagen.addEventListener("change", async function() {
    const imagen = elementoSelectorImagen.files[0];
    if (imagen) {
        const reader = new FileReader();
        reader.addEventListener("load", function() {
            elementoIcono.innerHTML = `<img src=${reader.result} alt="Imagen de perfil del voluntario">`;
        });
        reader.readAsDataURL(imagen);
        await subirArchivo(imagen, `archivos_usuarios/voluntarios/${JSON.parse(localStorage.getItem("usuario")).uid}`, "foto.png");
        const URLFoto = await obtenerURLArchivo(`archivos_usuarios/voluntarios/${JSON.parse(localStorage.getItem("usuario")).uid}/foto.png`);
        await editarDocumento("voluntarios", JSON.parse(localStorage.getItem("usuario")).uid, {
            URLFoto: URLFoto,
        });
        localStorage.setItem("URLFoto", URLFoto);
    }
});
elementoBotonHojaVida.addEventListener("click", function() {
    if (!confirm("¿Está seguro de que quiere subir otra hoja de vida? Esta acción no se puede deshacer.")) {
        return;
    }
    elementoSelectorHojaVida.click();
});
elementoSelectorHojaVida.addEventListener("change", async function() {
    const archivo = elementoSelectorHojaVida.files[0];
    if (archivo) {
        const reader = new FileReader();
        reader.addEventListener("load", function() {
            elementoBotonHojaVida.innerHTML = `<h3>¡Hoja de vida subida!</h3>`;
        });
        reader.readAsDataURL(archivo);
        await subirArchivo(archivo, `archivos_usuarios/voluntarios/${JSON.parse(localStorage.getItem("usuario")).uid}`, "hoja_vida.pdf");
        const URLHojaVida = await obtenerURLArchivo(`archivos_usuarios/voluntarios/${JSON.parse(localStorage.getItem("usuario")).uid}/hoja_vida.pdf`);
        await editarDocumento("voluntarios", JSON.parse(localStorage.getItem("usuario")).uid, {
            URLHojaVida: URLHojaVida,
        });
        localStorage.setItem("URLHojaVida", URLHojaVida);
    }
});
elementoDescripcion.addEventListener("keypress", async function(evento) {
    if (evento.key === "Enter") {
        if (!confirm("¿Está seguro de que quiere cambiar su descripción? Esta acción no se puede deshacer.")) {
            return;
        }
        evento.preventDefault();
        await editarDocumento("voluntarios", JSON.parse(localStorage.getItem("usuario")).uid, {
            descripcion: elementoDescripcion.value,
        });
        localStorage.setItem("descripcion", elementoDescripcion.value);
    }
});

elementoNumeroDocumento.innerHTML = localStorage.getItem("numeroDocumento");
elementoNombre.innerHTML = localStorage.getItem("nombre");
elementoCorreoElectronico.innerHTML = localStorage.getItem("correoElectronico");
const URLFoto = localStorage.getItem("URLFoto");
if (URLFoto !== "undefined") {
    elementoIcono.innerHTML = `<img src=${URLFoto} alt="Imagen de perfil del voluntario">`;
}
const URLHojaVida = localStorage.getItem("URLHojaVida");
if (URLHojaVida !== "undefined") {
    elementoBotonHojaVida.innerHTML = `<h3>¡Hoja de vida subida!</h3>`;
}