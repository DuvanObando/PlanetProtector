// De una oferta, guarda en sessionStorage todos los datos de una oferta.
export function guardarDatosOferta(oferta) {
    sessionStorage.setItem("foto", oferta.data().foto);
    sessionStorage.setItem("titulo", oferta.data().titulo);
    sessionStorage.setItem("descripcion", oferta.data().descripcion);
    let horario = `Desde ${oferta.data().fechas.inicial} hasta ${oferta.data().fechas.final} los `;
    const nombresDias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    let dias = oferta.data().horarios[0].dias;
    for (let i = 1; i < dias.length; i++) {
        horario += dias[i] ? nombresDias[i] + " " : "";
    }
    let horas = oferta.data().horarios[0].horas;
    horario += `desde las ${horas.inicial} hasta ${horas.final}.`;
    sessionStorage.setItem("horario", horario);
    sessionStorage.setItem("ubicacion", oferta.data().ubicacion);
    sessionStorage.setItem("id_oferta", oferta.id);
    sessionStorage.setItem("preferencias", JSON.stringify(oferta.data().preferencias));
    sessionStorage.setItem("fecha_inicial", oferta.data().fechas.inicial);
    sessionStorage.setItem("fecha_final", oferta.data().fechas.final);
    sessionStorage.setItem("hora_inicial", oferta.data().horarios[0].horas.inicial);
    sessionStorage.setItem("hora_final", oferta.data().horarios[0].horas.final);
    sessionStorage.setItem("dias", JSON.stringify(oferta.data().horarios[0].dias));
    sessionStorage.setItem("limite_participantes", oferta.data().limite_participantes);
}
