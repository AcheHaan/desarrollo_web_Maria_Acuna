document.addEventListener("DOMContentLoaded", () => {
    const actividades = obtenerActividades();
    const tablaBody = document.querySelector("#tabla-actividades tbody");
  
    actividades.forEach((actividad) => {
      const fila = document.createElement("tr");
  
      fila.innerHTML = `
        <td>${actividad.inicio}</td>
        <td>${actividad.termino || "-"}</td>
        <td>${actividad.comuna}</td>
        <td>${actividad.sector || "-"}</td>
        <td>${actividad.temaOtro || actividad.tema}</td>
      `;
  
      const celdaFoto = document.createElement("td");
      const img = document.createElement("img");
      img.src = actividad.fotos[0];
      img.alt = "Foto actividad";
      img.style.width = "60px";
      img.style.height = "auto";
      celdaFoto.appendChild(img);
  
      fila.appendChild(celdaFoto);
      fila.addEventListener("click", () => mostrarDetalle(actividad));
      tablaBody.appendChild(fila);
    });
  });
  