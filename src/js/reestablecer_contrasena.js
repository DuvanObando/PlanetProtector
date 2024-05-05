import { reestablecerContrasena } from "./funciones_firebase.js";
import { obtenerCorreoElectronicoPorId } from "./funciones_input.js";

var btnEnviarReestablecerContrasena = document.getElementById("btn_enviar_reestablecer_contrasena");
btnEnviarReestablecerContrasena.addEventListener("click", async function() {
    const correoElectronico = obtenerCorreoElectronicoPorId("correo_electronico_reestablecer_contrasena");
    if (correoElectronico == null) {
        alert("Correo electrónico inválido.");
        return;
    }
    await reestablecerContrasena(correoElectronico);
});