import {editarDocumento} from "./funciones_firebase.js";

const elementosPreferencias = document.querySelectorAll("label[name='preferencias']");
const elementoBtnGuardar = document.getElementById("btn_Guardar_preferencias_voluntario");
let preferencias = localStorage.getItem("preferencias");
if (preferencias === "undefined") {
    preferencias = [];
}

for (let elemento of elementosPreferencias) {
    if (preferencias.indexOf(elemento.innerHTML) !== -1) {
        elemento.style.backgroundColor = "gray";
    }
    elemento.addEventListener("click", function() {
        if (elemento.style.backgroundColor === "gray") {
            preferencias.splice(preferencias.indexOf(elemento.innerHTML), 1);
            const estilo = getComputedStyle(document.body);
            elemento.style.backgroundColor = estilo.getPropertyValue("--button-color-alt");
            return;
        }
        preferencias.push(elemento.innerHTML);
        elemento.style.backgroundColor = "gray";
    });
}
elementoBtnGuardar.addEventListener("click", async function() {
    localStorage.setItem("preferencias", JSON.stringify(preferencias));
    await editarDocumento("voluntarios", JSON.parse(localStorage.getItem("usuario")).uid, {
        preferencias: preferencias,
    });
    window.location.href = "./perfil_voluntario.html";
});
