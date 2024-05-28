import {cargarDocumento, iniciarSesion, obtenerURLArchivo} from "./funciones_firebase.js";
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
        console.error("Un error grave ha ocurrido. Toca revisar la función de registro o login.");
        return;
    }
    limpiarCampoPorId("correo_electronico_login");
    limpiarCampoPorId("contrasena_login");

    // Guardado de datos del usuario que inició sesión.
    localStorage.clear();
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("tipo", tipoUsuario);
    localStorage.setItem("correoElectronico", usuario.email);
    if (tipoUsuario === "voluntario") {
        const voluntario = await cargarDocumento("voluntarios", usuario.uid);
        console.log(voluntario.data())
        localStorage.setItem("correoElectronico", voluntario.data().correoElectronico);
        localStorage.setItem("nombre", voluntario.data().nombre);
        localStorage.setItem("numeroDocumento", voluntario.data().numeroDocumento);
        localStorage.setItem("preferencias", JSON.stringify(voluntario.data().preferencias));
        localStorage.setItem("URLHojaVida", voluntario.data().URLHojaVida);
        localStorage.setItem("URLFoto", voluntario.data().URLFoto);
        localStorage.setItem("descripcion", voluntario.data().descripcion);
    } else if (tipoUsuario === "organización") {
        const organizacion = await cargarDocumento("organizaciones", usuario.uid);
        localStorage.setItem("correoElectronico", organizacion.data().correoElectronico);
        localStorage.setItem("nombre", organizacion.data().nombre);
        localStorage.setItem("nit", organizacion.data().nit);
    }

    if (tipoUsuario === "voluntario") {
        window.location.href = "./home_voluntario.html";
    } else if (tipoUsuario === "organización") {
        window.location.href = "./home_org.html";
    }
});