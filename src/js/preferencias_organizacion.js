const elementosPreferencias = document.querySelectorAll("label[name='preferencias']");
const elementoBtnGuardar = document.getElementById("btn_Guardar_preferencias_organizacion");
const estilo = getComputedStyle(document.body);
let preferencias = JSON.parse(sessionStorage.getItem("preferencias")) ?? [];

for (let elemento of elementosPreferencias) {
    if (preferencias.indexOf(elemento.innerHTML) !== -1) {
        elemento.style.backgroundColor = "gray";
    }
    elemento.addEventListener("click", function() {
        if (elemento.style.backgroundColor === "gray") {
            preferencias.splice(preferencias.indexOf(elemento.innerHTML), 1);
            elemento.style.backgroundColor = estilo.getPropertyValue("--button-color-alt");
            return;
        }
        preferencias.push(elemento.innerHTML);
        elemento.style.backgroundColor = "gray";
    });
}
elementoBtnGuardar.addEventListener("click", function() {
    sessionStorage.setItem("preferencias", JSON.stringify(preferencias));
    window.location.href = "./creacion_oferta1.html";
});