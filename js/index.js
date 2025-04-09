document.addEventListener("DOMContentLoaded", () => {
    const actividades = obtenerActividades();
    const tablaBody = document.querySelector("#tabla-actividades tbody");
  
    // Renderizar la tabla con las actividades
    actividades.forEach((actividad, index) => {
      const fila = document.createElement("tr");
  
      fila.innerHTML = `
        <td>${actividad.inicio}</td>
        <td>${actividad.termino || "-"}</td>
        <td>${actividad.comuna}</td>
        <td>${actividad.sector || "-"}</td>
        <td>${actividad.temaOtro || actividad.tema}</td>
        <td>${actividad.fotos[0]}</td>
      `;
  
      fila.addEventListener("click", () => mostrarDetalle(actividad));
      tablaBody.appendChild(fila);
    });
  
  });