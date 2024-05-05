import { registrarVoluntario } from "./funciones_firebase.js";

var btnGuardarRegistroVoluntario = document.getElementById("btn_Guardar_registro_voluntario");
btnGuardarRegistroVoluntario.addEventListener('click', function() {
    // console.log("Botón presionado");
    const nombre = document.getElementById("nombre_registro_voluntario").value;
    // console.log(nombreUsuario);
    const numeroDocumento = document.getElementById("numero_documento_registro_voluntario").value;
    // console.log(numeroDocumento);
    const correoElectronico = document.getElementById("correo_electronico_registro_voluntario").value;
    // console.log(correoElectronico);
    const contrasena = document.getElementById("contrasena_registro_voluntario").value;
    // console.log(contrasena);
    const confirmacionContrasena = document.getElementById("confirmacion_contrasena_registro_voluntario").value;
    // console.log(confirmacionContrasena);
    if (contrasena !== confirmacionContrasena) {
        console.log("Las contraseñas no coinciden.");
        return;
    }
    registrarVoluntario(correoElectronico, contrasena, {numeroDocumento: numeroDocumento, nombre: nombre});
});