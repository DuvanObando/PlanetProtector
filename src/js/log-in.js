import { iniciarSesion } from "./funciones_firebase.js";
import {limpiarCampoPorId, obtenerContrasenaPorId, obtenerCorreoElectronicoPorId} from "./funciones_input.js";

var btnIniciarLogin = document.getElementById("btn_login");
btnIniciarLogin.addEventListener("click",  async function() {
    const correoElectronico = obtenerCorreoElectronicoPorId("correo_electronico_login");
    if (correoElectronico == null) {
        alert("Formato de correo electrónico inválido.");
        return;
    }
    const contrasena = obtenerContrasenaPorId("contrasena_login");
    if (contrasena == null) {
        alert("Formato de contraseña inválido. La longitud es de mínimo 8 máximo 30.");
        return;
    }
    const resultadoInicioSesion = await iniciarSesion(correoElectronico, contrasena);
    const usuario = resultadoInicioSesion[0];
    const tipoUsuario = resultadoInicioSesion[1];
    if (usuario == null) {
        alert("Error al iniciar sesión.");
        return;
    }
    if (tipoUsuario == null) {
        console.error("Un error grave ha ocurrido. Toca revisar la función de registro.");
        return;
    }
    limpiarCampoPorId("correo_electronico_login");
    limpiarCampoPorId("contrasena_login");
    if (tipoUsuario === "voluntario") {
        window.location.href = "./home_voluntario.html";
    } else if (tipoUsuario === "organización") {
        window.location.href = "./home_org.html";
    }
});