// --------------FUNCION NAVBAR------------

const iconmenu = document.querySelector('.bx_menu')
const menu = document.querySelector('.menu')

// La herramienta toggle se encarga de verificar si una propiedad o en este caso una clase esta o no, dado caso si esta la quita y si no la crea
iconmenu.addEventListener('click', function(){
    menu.classList.toggle('menu_show') 
})

//----------------------FIN----------------------

const elementoFechaInicial = document.getElementById('fecha_inicial_creacion_oferta');
const elementoFechaFinal = document.getElementById('fecha_final_creacion_oferta');
const elementoHoraInicial = document.getElementById('hora_inicial_creacion_oferta');
const elementoHoraFinal = document.getElementById('hora_final_creacion_oferta');
const elementosDiasSemana = document.querySelectorAll("input[type='checkbox']");
const elementoBtnGuardar = document.getElementById("btn_Guardar_horarios_organizacion");

// Si se ingresaron datos previamente, entonces los datos aparecen como la última vez.
let fecha_inicial = sessionStorage.getItem("fecha_inicial") ?? "";
elementoFechaInicial.value = fecha_inicial;
let fecha_final = sessionStorage.getItem("fecha_final") ?? "";
elementoFechaFinal.value = fecha_final;
let hora_inicial = sessionStorage.getItem("hora_inicial") ?? "";
elementoHoraInicial.value = hora_inicial;
let hora_final = sessionStorage.getItem("hora_final") ?? "";
elementoHoraFinal.value = hora_final;
let dias = JSON.parse(sessionStorage.getItem("dias") ?? "[]");
for (let i = 0; i < dias.length; i++) {
    elementosDiasSemana[i].checked = dias[i];
}

// Guardado de datos en sessionStorage.
elementoFechaInicial.addEventListener("change", function() {
    sessionStorage.setItem("fecha_inicial", elementoFechaInicial.value);
});
elementoFechaFinal.addEventListener("change", function() {
    sessionStorage.setItem("fecha_final", elementoFechaFinal.value);
});
elementoHoraInicial.addEventListener("change", function() {
    sessionStorage.setItem("hora_inicial", elementoHoraInicial.value);
});
elementoHoraFinal.addEventListener("change", function() {
    sessionStorage.setItem("hora_final", elementoHoraFinal.value);
});
for (let elementoDiaSemana of elementosDiasSemana) {
    elementoDiaSemana.addEventListener("change", function() {
        for (let i = 0; i < elementosDiasSemana.length; i++) {
            dias[i] = elementosDiasSemana[i].checked;
        }
        sessionStorage.setItem("dias", JSON.stringify(dias));
    });
}

elementoBtnGuardar.addEventListener("click", function() {
    if (elementoFechaInicial.value === "") {
        alert("Debes seleccionar una fecha inicial.");
        return;
    }
    if (elementoFechaFinal.value === "") {
        alert("Debes seleccionar una fecha final.");
        return;
    }
    if (dias.indexOf(true) === -1) {
        alert("Debes seleccionar al menos un día de la semana.");
        return;
    }
    if (elementoHoraInicial.value === "") {
        alert("Debes seleccionar una hora inicial.");
        return;
    }
    if (elementoHoraFinal.value === "") {
        alert("Debes seleccionar una hora final.");
        return;
    }
    window.location.href = "./creacion_oferta1.html";
});