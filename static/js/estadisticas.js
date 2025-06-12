document.addEventListener("DOMContentLoaded", () => {
  // === Gráfico de líneas ===
  fetch("/api/estadisticas/por-dia")
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => d.fecha);
      const valores = data.map(d => d.cantidad);
      new Chart(document.getElementById("graficoLineas"), {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Actividades por día",
            data: valores,
            fill: false,
            borderColor: "#ff69b4",
            tension: 0.3
          }]
        }
      });
    });

  // === Gráfico de torta ===
  fetch("/api/estadisticas/por-tipo")
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => d.tema);
      const valores = data.map(d => d.cantidad);
      new Chart(document.getElementById("graficoTorta"), {
        type: "pie",
        data: {
          labels,
          datasets: [{
            label: "Actividades por tipo",
            data: valores,
            backgroundColor: [
              "#ffb3c6", "#caffbf", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fdffb6", "#fcd5ce"
            ]
          }]
        }
      });
    });

  // === Gráfico de barras ===
  fetch("/api/estadisticas/por-horario")
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => d.mes);
      const manana = data.map(d => d.mañana);
      const medio = data.map(d => d.mediodía);
      const tarde = data.map(d => d.tarde);

      new Chart(document.getElementById("graficoBarras"), {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Mañana",
              data: manana,
              backgroundColor: "#a0c4ff"
            },
            {
              label: "Mediodía",
              data: medio,
              backgroundColor: "#ffb703"
            },
            {
              label: "Tarde",
              data: tarde,
              backgroundColor: "#ff6d00"
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { beginAtZero: true, stacked: true }
          }
        }
      });
    });
});
