import { registrarVoluntario } from "./funciones_firebase.js";
import {
    limpiarCampoPorId,
    obtenerContrasenaPorId,
    obtenerCorreoElectronicoPorId,
    obtenerNombrePorId,
    obtenerNumeroPorId
} from "./funciones_input.js";

var btnGuardarRegistroVoluntario = document.getElementById("btn_Guardar_registro_voluntario");
btnGuardarRegistroVoluntario.addEventListener("click", async function() {
    const nombre = obtenerNombrePorId("nombre_registro_voluntario");
    if (nombre == null) {
        alert("Nombre inválido.");
        return;
    }
    const numeroDocumento = obtenerNumeroPorId("numero_documento_registro_voluntario");
    if (numeroDocumento == null) {
        alert("Número de documento inválido.");
        return;
    }
    const correoElectronico = obtenerCorreoElectronicoPorId("correo_electronico_registro_voluntario");
    if (correoElectronico == null) {
        alert("Correo electrónico inválido.");
        return;
    }
    const contrasena = obtenerContrasenaPorId("contrasena_registro_voluntario");
    if (contrasena == null) {
        alert("Formato inválido. La longitud tiene que ser de mínimo 8 y máximo 30.");
        return;
    }
    const confirmacionContrasena = obtenerContrasenaPorId("confirmacion_contrasena_registro_voluntario");
    if (contrasena !== confirmacionContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
    }
    await registrarVoluntario(correoElectronico, contrasena, {numeroDocumento: numeroDocumento, nombre: nombre})
    limpiarCampoPorId("nombre_registro_voluntario");
    limpiarCampoPorId("numero_documento_registro_voluntario");
    limpiarCampoPorId("correo_electronico_registro_voluntario");
    limpiarCampoPorId("contrasena_registro_voluntario");
    limpiarCampoPorId("confirmacion_contrasena_registro_voluntario");
    alert("Registro completo");
    window.location.href = "./log-in.html";
});