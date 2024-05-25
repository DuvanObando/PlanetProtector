// Genera una vista de una oferta con un título, la foto, y la descripción.
export function generarOferta(URLFoto, titulo, descripcion) {
    return `<button id=${URLFoto} class="box_ofertas">
        <div>    
            <div>
                <h5>${titulo}</h5>
            </div>
            <div style="display: flex; align-content: center;">
                <img src="${URLFoto}" alt="Foto de oferta">
            </div>
            <div>
                ${descripcion}
            </div>
        </div>
    </button>`;
}

// Genera una vista de una oferta con un título y con la foto.
export function generarOfertaPostulada(URLFoto, titulo, estado) {
    const clase_oferta = {
        "proceso": "img_proceso",
        "aceptada": "img_aceptadas",
        "rechazada": "img_rechazadas",
    };
    return `<div id=${URLFoto} class="img ${clase_oferta[estado]}">
    <h5>${titulo}</h5>
    <img src=${URLFoto} alt="Foto oferta">
    </div>`;
}
