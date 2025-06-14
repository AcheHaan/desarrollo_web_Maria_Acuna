document.addEventListener("DOMContentLoaded", () => {
  let paginaActual = 1;
  const tablaBody = document.querySelector("#tabla-actividades tbody");
  const detalleDiv = document.getElementById("detalle-actividad");
  const infoDiv = document.getElementById("info-actividad");
  const galeriaDiv = document.getElementById("galeria-fotos");
  const popupFoto = document.getElementById("popup-foto");
  const fotoGrande = document.getElementById("foto-grande");
  const volverListado = document.getElementById("volver-listado");
  const cerrarPopup = document.getElementById("cerrar-popup");

  const tabla = document.querySelector("table");
  const botonPortada = document.querySelector(".boton-link");

  const crearPaginacion = (pagina, totalPaginas) => {
    const paginacion = document.getElementById("paginacion");
    paginacion.innerHTML = "";

    if (pagina > 1) {
      const prev = document.createElement("button");
      prev.textContent = "Anterior";
      prev.onclick = () => cargarActividades(pagina - 1);
      paginacion.appendChild(prev);
    }

    if (pagina < totalPaginas) {
      const next = document.createElement("button");
      next.textContent = "Siguiente";
      next.onclick = () => cargarActividades(pagina + 1);
      paginacion.appendChild(next);
    }
  };

  const cargarActividades = async (pagina = 1) => {
    const response = await fetch(`/tarea2/actividad?pagina=${pagina}`);
    const data = await response.json();

    tablaBody.innerHTML = "";
    data.actividades.forEach((actividad) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${actividad.inicio}</td>
        <td>${actividad.termino || "-"}</td>
        <td>${actividad.comuna}</td>
        <td>${actividad.sector || "-"}</td>
        <td>${actividad.temaOtro || actividad.tema}</td>
        <td>${actividad.nombre}</td>
        <td>${actividad.organizador}</td>
        <td>${actividad.fotos.length}</td>
      `;
      fila.addEventListener("click", () => mostrarDetalle(actividad));
      tablaBody.appendChild(fila);
    });

    crearPaginacion(data.pagina_actual, data.total_paginas);
  };

  const mostrarDetalle = (actividad) => {
    tabla.style.display = "none";
    detalleDiv.style.display = "block";
    botonPortada.style.display = "none";
    


    infoDiv.innerHTML = `
      <p><strong>Nombre:</strong> ${actividad.nombre}</p>
      <p><strong>Región:</strong> ${actividad.region}</p>
      <p><strong>Comuna:</strong> ${actividad.comuna}</p>
      <p><strong>Sector:</strong> ${actividad.sector || "-"}</p>
      <p><strong>Organizador:</strong> ${actividad.organizador}</p>
      <p><strong>Email:</strong> ${actividad.email}</p>
      <p><strong>Celular:</strong> ${actividad.celular || "-"}</p>
      <p><strong>Inicio:</strong> ${actividad.inicio}</p>
      <p><strong>Término:</strong> ${actividad.termino || "-"}</p>
      <p><strong>Descripción:</strong> ${actividad.descripcion || "-"}</p>
      <p><strong>Tema:</strong> ${actividad.tema === "otro" ? actividad.temaOtro : actividad.tema}</p>
      <p><strong>Contactar por:</strong> ${
        actividad.contactarPor.length > 0
          ? actividad.contactarPor
              .map(cp => `${cp.nombre.charAt(0).toUpperCase() + cp.nombre.slice(1)} (${cp.identificador})`)
              .join(", ")
          : "-"
      }</p>


    `;

    galeriaDiv.innerHTML = "";
    actividad.fotos.forEach((foto) => {
      const img = document.createElement("img");
      img.src = foto;
      img.width = 320;
      img.height = 240;
      img.style.margin = "5px";
      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        fotoGrande.src = foto;
        popupFoto.style.display = "block";
      });

      galeriaDiv.appendChild(img);
    });
    // Al final de mostrarDetalle
    document.getElementById("comentario-actividad-id").value = actividad.id;
    cargarComentarios(actividad.id);

  };

  volverListado.addEventListener("click", () => {
    detalleDiv.style.display = "none";
    tabla.style.display = "table";
    botonPortada.style.display = "block";
  });

  cerrarPopup.addEventListener("click", () => {
    popupFoto.style.display = "none";
    fotoGrande.src = "";
  });

  // Cargar la primera página al inicio
  cargarActividades(1);
});

async function cargarComentarios(actividadId) {
  const res = await fetch(`/tarea2/comentarios/${actividadId}`);
  const comentarios = await res.json();
  const lista = document.getElementById("lista-comentarios");
  lista.innerHTML = "";
  comentarios.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.fecha} — ${c.nombre}: ${c.texto}`;
    lista.appendChild(li);
  });
}

document.getElementById("form-comentario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const texto = document.getElementById("texto").value.trim();
  const actividadId = document.getElementById("comentario-actividad-id").value;

  if (nombre.length < 3 || nombre.length > 80 || texto.length < 5) {
    document.getElementById("comentario-error").textContent = "Revise los datos ingresados.";
    return;
  }

  const res = await fetch("/tarea2/comentario/agregar", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({nombre, texto, actividad_id: actividadId})
  });
  const data = await res.json();

  if (data.success) {
    document.getElementById("comentario-error").textContent = "";
    e.target.reset();
    cargarComentarios(actividadId);
  } else {
    document.getElementById("comentario-error").textContent = data.error;
  }
});
