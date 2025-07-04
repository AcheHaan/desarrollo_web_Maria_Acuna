document.addEventListener('DOMContentLoaded', () => {
  const regionSelect = document.getElementById('region');
  const comunaSelect = document.getElementById('comuna');
  const contactarSelect = document.getElementById('contactar');
  const contactarInfo = document.getElementById('contactar-info');
  const contactarInfoLabel = document.getElementById('contactar-info-label');
  const temaSelect = document.getElementById('tema');
  const otroTemaInput = document.getElementById('otro-tema');
  const otroTemaLabel = document.getElementById('otro-tema-label');
  const agregarFotoBtn = document.getElementById('agregar-foto');
  const formulario = document.getElementById('formulario-actividad');
  const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
  const confirmarBtn = document.getElementById('confirmar');
  const cancelarBtn = document.getElementById('cancelar');
  const mensajeExito = document.getElementById('mensaje-exito');
  const volverPortadaBtn = document.getElementById('volver-portada');
  const fechaInicio = document.getElementById('fecha-inicio');
  const fechaFin = document.getElementById('fecha-fin');

  regionSelect.addEventListener("change", async () => {
    const regionId = regionSelect.value;
    comunaSelect.innerHTML = '<option value="">Cargando comunas...</option>';
    comunaSelect.disabled = true;

    if (regionId) {
      try {
        const response = await fetch(`/api/comunas/${regionId}`);
        const comunas = await response.json();

        comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
        comunas.forEach(comuna => {
          const option = document.createElement("option");
          option.value = comuna.id;
          option.textContent = comuna.nombre;
          comunaSelect.appendChild(option);
        });

        comunaSelect.disabled = false;
      } catch (error) {
        comunaSelect.innerHTML = '<option value="">Error al cargar comunas</option>';
        console.error("Error al cargar comunas:", error);
      }
    } else {
      comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
      comunaSelect.disabled = true;
    }
  });

  contactarSelect.addEventListener('change', () => {
    if (contactarSelect.value) {
      contactarInfo.style.display = 'inline-block';
      contactarInfoLabel.style.display = 'inline-block';
    } else {
      contactarInfo.style.display = 'none';
      contactarInfoLabel.style.display = 'none';
      contactarInfo.value = '';
    }
  });

  temaSelect.addEventListener('change', () => {
    const mostrarOtro = temaSelect.value === 'otro';
    otroTemaInput.style.display = mostrarOtro ? 'inline-block' : 'none';
    otroTemaLabel.style.display = mostrarOtro ? 'inline-block' : 'none';
    if (!mostrarOtro) otroTemaInput.value = '';
  });

  const ahora = new Date();
  const formato = (d) => d.toISOString().slice(0, 16);
  fechaInicio.value = formato(ahora);
  const fin = new Date(ahora.getTime() + 3 * 60 * 60 * 1000);
  fechaFin.value = formato(fin);

  agregarFotoBtn.addEventListener('click', () => {
    const actuales = document.querySelectorAll('input[type="file"]');
    if (actuales.length >= 5) {
      alert('Solo se permiten hasta 5 fotos.');
      return;
    }
    const nuevoInput = document.createElement('input');
    nuevoInput.type = 'file';
    nuevoInput.name = 'foto';
    nuevoInput.accept = 'image/*';
    document.getElementById('foto').parentNode.insertBefore(nuevoInput, agregarFotoBtn);
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const fotos = document.querySelectorAll('input[type="file"]');
    let hayFoto = false;
    fotos.forEach(f => {
      if (f.files.length > 0) hayFoto = true;
    });
    if (!hayFoto) {
      alert('Debe agregar al menos una fotografía.');
      return;
    }

    if (contactarSelect.value && contactarInfo.value.trim().length < 4) {
      alert('Ingrese al menos 4 caracteres para el ID o URL de contacto.');
      return;
    }

    if (temaSelect.value === 'otro') {
      const tema = otroTemaInput.value.trim();
      if (tema.length < 3 || tema.length > 15) {
        alert('El tema debe tener entre 3 y 15 caracteres.');
        return;
      }
    }

    const inicio = new Date(fechaInicio.value);
    const termino = new Date(fechaFin.value);
    if (fechaFin.value && termino <= inicio) {
      alert('La fecha y hora de término debe ser posterior a la de inicio.');
      return;
    }

    mensajeConfirmacion.style.display = 'block';
    formulario.style.display = 'none';
  });

  confirmarBtn.addEventListener('click', () => {
    mensajeConfirmacion.style.display = 'none';
    mensajeExito.style.display = 'block';
    formulario.submit();
  });

  cancelarBtn.addEventListener('click', () => {
    mensajeConfirmacion.style.display = 'none';
    formulario.style.display = 'block';
  });

});
