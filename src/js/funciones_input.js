// Acepta todo caracter visible.
function contrasenaEsValida(contrasena) {
    return !(contrasena.match("[ -~]{8,30}") === null);
}

// Basado en el estándar RFC 2822
function correoElectronicoEsValido(correoElectronico) {
    return !(correoElectronico.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?") === null);
}

function nombreEsValido(nombre) {
    return !(nombre.match("[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ,.\- ]{1,200}") === null);
}

function numeroEsValido(numero) {
    return !(numero.match("[0-9]{1,30}") === null);
}

export function obtenerCorreoElectronicoPorId(idElemento) {
    const correoElectronico = document.getElementById(idElemento).value;
    if (!correoElectronicoEsValido(correoElectronico)) {
        return null;
    }
    return correoElectronico;
}

export function obtenerContrasenaPorId(idElemento) {
    const contrasena = document.getElementById(idElemento).value;
    if (!contrasenaEsValida(contrasena)) {
        return null;
    }
    return contrasena;
}

export function obtenerNombrePorId(idElemento) {
    const nombre = document.getElementById(idElemento).value;
    if (!nombreEsValido(nombre)) {
        return null;
    }
    return nombre;
}

export function obtenerNumeroPorId(idElemento) {
    const numero = document.getElementById(idElemento).value;
    if (!numeroEsValido(numero)) {
        return null;
    }
    return numero;
}