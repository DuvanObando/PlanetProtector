import { registrarOrganizacion } from "./funciones_firebase.js";
import {
    limpiarCampoPorId,
    obtenerContrasenaPorId,
    obtenerCorreoElectronicoPorId,
    obtenerNombrePorId,
    obtenerNumeroPorId
} from "./funciones_input.js";

var btnGuardarRegistroOrganizacion = document.getElementById("btn_Guardar_registro_organizacion");
btnGuardarRegistroOrganizacion.addEventListener("click", async function() {
    const nombre = obtenerNombrePorId("nombre_registro_organizacion");
    if (nombre == null) {
        alert("Nombre inválido.");
        return;
    }
    const nit = obtenerNumeroPorId("nit_registro_organizacion");
    if (nit == null) {
        alert("NIT inválido.");
        return;
    }
    const correoElectronico = obtenerCorreoElectronicoPorId("correo_electronico_registro_organizacion");
    if (correoElectronico == null) {
        alert("Correo electrónico inválido.");
        return;
    }
    const contrasena = obtenerContrasenaPorId("contrasena_registro_organizacion");
    if (contrasena == null) {
        alert("Formato inválido. La longitud tiene que ser de mínimo 8 y máximo 30.");
        return;
    }
    const confirmacionContrasena = obtenerContrasenaPorId("confirmacion_contrasena_registro_organizacion");
    if (contrasena !== confirmacionContrasena) {
        alert("Las contraseñas no coinciden")
        return;
    }
    await registrarOrganizacion(correoElectronico, contrasena, {nit: nit, nombre: nombre})
    limpiarCampoPorId("nombre_registro_organizacion");
    limpiarCampoPorId("nit_registro_organizacion");
    limpiarCampoPorId("correo_electronico_registro_organizacion");
    limpiarCampoPorId("contrasena_registro_organizacion");
    limpiarCampoPorId("confirmacion_contrasena_registro_organizacion");
    alert("Registro completo");
    window.location.href = "./log-in.html";
});