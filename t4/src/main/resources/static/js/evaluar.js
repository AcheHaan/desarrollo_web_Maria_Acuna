document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-evaluar").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const row = e.target.closest("tr");
      const actividadId = row.dataset.id;
      const select = row.querySelector("select");
      const nota = parseInt(select.value);

      if (!nota || nota < 1 || nota > 7) {
        alert("Seleccione una nota válida entre 1 y 7");
        return;
      }

      try {
        const res = await fetch("/evaluar", {
          method: "POST",
          headers: {"Content-Type": "application/x-www-form-urlencoded"},
          body: `actividadId=${actividadId}&nota=${nota}`
        });

        if (!res.ok) throw new Error("Error al guardar la nota");

        const nuevaNota = await res.json();
        row.querySelector(".nota").textContent = nuevaNota.toFixed(2);
        alert("¡Gracias por tu evaluación!");

      } catch (err) {
        alert("Ocurrió un error al enviar la nota.");
        console.error(err);
      }
    });
  });
});
