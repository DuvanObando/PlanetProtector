import { registrarOrganizacion } from "./funciones_firebase.js";

var btnGuardarRegistroVoluntario = document.getElementById("btn_Guardar_registro_organizacion");
btnGuardarRegistroVoluntario.addEventListener('click', function() {
    // console.log("Botón presionado");
    const nombre = document.getElementById("nombre_registro_organizacion").value;
    // console.log(nombreUsuario);
    const nit = document.getElementById("nit_registro_organizacion").value;
    // console.log(numeroDocumento);
    const correoElectronico = document.getElementById("correo_electronico_registro_organizacion").value;
    // console.log(correoElectronico);
    const contrasena = document.getElementById("contrasena_registro_organizacion").value;
    // console.log(contrasena);
    const confirmacionContrasena = document.getElementById("confirmacion_contrasena_registro_organizacion").value;
    // console.log(confirmacionContrasena);
    if (contrasena !== confirmacionContrasena) {
        console.log("Las contraseñas no coinciden.");
        return;
    }
    registrarOrganizacion(correoElectronico, contrasena, {nit: nit, nombre: nombre});
});