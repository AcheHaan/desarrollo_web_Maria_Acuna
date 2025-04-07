document.addEventListener("DOMContentLoaded", () => {
    const actividades = obtenerActividades();
    const tablaBody = document.querySelector("#tabla-actividades tbody");
    const detalleDiv = document.getElementById("detalle-actividad");
    const infoDiv = document.getElementById("info-actividad");
    const galeriaDiv = document.getElementById("galeria-fotos");
    const popupFoto = document.getElementById("popup-foto");
    const fotoGrande = document.getElementById("foto-grande");
  
    const volverListado = document.getElementById("volver-listado");
    const volverPortada = document.getElementById("volver-portada");
    const cerrarPopup = document.getElementById("cerrar-popup");
  
    // Renderizar la tabla con las actividades
    actividades.forEach((actividad, index) => {
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
  
    function mostrarDetalle(actividad) {
      // Ocultar la tabla y mostrar el detalle
      document.querySelector("table").style.display = "none";
      document.querySelector(".boton-link").style.display = "none"
      detalleDiv.style.display = "block";
  
      // Mostrar información textual
      infoDiv.innerHTML = `
        <p><strong>Región:</strong> ${actividad.region}</p>
        <p><strong>Comuna:</strong> ${actividad.comuna}</p>
        <p><strong>Sector:</strong> ${actividad.sector || "-"}</p>
        <p><strong>Organizador:</strong> ${actividad.organizador}</p>
        <p><strong>Email:</strong> ${actividad.email}</p>
        <p><strong>Celular:</strong> ${actividad.celular || "-"}</p>
        <p><strong>Contactar por:</strong> ${actividad.contactarPor.map(c => `${c.medio}: ${c.info}`).join(", ") || "-"}</p>
        <p><strong>Inicio:</strong> ${actividad.inicio}</p>
        <p><strong>Término:</strong> ${actividad.termino || "-"}</p>
        <p><strong>Descripción:</strong> ${actividad.descripcion || "-"}</p>
        <p><strong>Tema:</strong> ${actividad.tema === "otro" ? actividad.temaOtro : actividad.tema}</p>
        <p><strong>Nombre:</strong> ${actividad.nombre}</p>
      `;
  
      // Mostrar galería de fotos
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
    }
  
    // Botones para navegación
    volverListado.addEventListener("click", () => {
      detalleDiv.style.display = "none";
      document.querySelector("table").style.display = "table";
      document.querySelector(".boton-link").style.display = "block"
    });

  
    cerrarPopup.addEventListener("click", () => {
      popupFoto.style.display = "none";
      fotoGrande.src = "";
    });
  });
  