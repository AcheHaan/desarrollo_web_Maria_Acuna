document.addEventListener("DOMContentLoaded", () => {
    // Gráfico de líneas: Actividades por día
    new Chart(document.getElementById("graficoLineas"), {
      type: "line",
      data: {
        labels: ["01/06", "02/06", "03/06", "04/06", "05/06", "06/06", "07/06"],
        datasets: [{
          label: "Actividades por día",
          data: [2, 4, 3, 5, 1, 3, 2],
          fill: false,
          borderColor: "#ff69b4",
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        }
      }
    });
  
    // Gráfico de torta: Actividades por tipo
    new Chart(document.getElementById("graficoTorta"), {
      type: "pie",
      data: {
        labels: ["Música", "Deporte", "Ciencias", "Tecnología", "Juegos", "Comida"],
        datasets: [{
          label: "Actividades por tipo",
          data: [4, 3, 2, 3, 1, 2],
          backgroundColor: ["#ffb3c6", "#caffbf", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fdffb6"]
        }]
      },
      options: {
        responsive: true
      }
    });
  
    // Gráfico de barras: Actividades por mes y momento del día
    new Chart(document.getElementById("graficoBarras"), {
      type: "bar",
      data: {
        labels: ["Abril", "Mayo", "Junio"],
        datasets: [
          {
            label: "Mañana",
            data: [2, 3, 4],
            backgroundColor: "#ffafcc"
          },
          {
            label: "Mediodía",
            data: [1, 2, 3],
            backgroundColor: "#cdb4db"
          },
          {
            label: "Tarde",
            data: [3, 1, 2],
            backgroundColor: "#b5ead7"
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });
  