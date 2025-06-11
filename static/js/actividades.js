const actividades = [
    {
      region: "Región Metropolitana",
      comuna: "Santiago",
      sector: "Centro Histórico",
      organizador: "Fundación Cultura Viva",
      email: "contacto@culturaviva.cl",
      celular: "+569.12345678",
      contactarPor: [
        { medio: "instagram", info: "@culturaviva" },
        { medio: "whatsapp", info: "+569.12345678" }
      ],
      inicio: "2024-07-01 15:00",
      termino: "2024-07-01 18:00",
      descripcion: "Taller de arte urbano para jóvenes del centro.",
      tema: "otro",
      temaOtro: "arte",
      nombre: "Taller de Muralismo",
      fotos: [
        "img/mural1.jpg",
        "img/mural2.jpg"
      ]
    },
    {
      region: "Valparaíso",
      comuna: "Viña del Mar",
      sector: "",
      organizador: "Red Deportiva Juvenil",
      email: "deportes@rdj.cl",
      celular: "+569.98765432",
      contactarPor: [
        { medio: "telegram", info: "@rdjdeportes" }
      ],
      inicio: "2024-07-05 10:00",
      termino: "2024-07-05 13:00",
      descripcion: "Encuentro de fútbol sub-17 en cancha pública.",
      tema: "deporte",
      nombre: "Torneo Juvenil de Fútbol",
      fotos: [
        "img/futbol1.jpg"
      ]
    },
    {
      region: "Biobío",
      comuna: "Concepción",
      sector: "Parque Industrial",
      organizador: "Asociación de Emprendedores",
      email: "info@emprendebio.cl",
      celular: "",
      contactarPor: [],
      inicio: "2024-07-10 09:00",
      termino: "2024-07-10 12:00",
      descripcion: "Charla sobre nuevas tecnologías aplicadas a pymes.",
      tema: "tecnología",
      nombre: "Innovación para PYMES",
      fotos: [
        "img/tech1.jpg",
        "img/tech2.jpg",
        "img/tech3.jpg"
      ]
    },
    {
      region: "Los Lagos",
      comuna: "Puerto Montt",
      sector: "",
      organizador: "Grupo de Danza Austral",
      email: "danza@austral.cl",
      celular: "+569.33445566",
      contactarPor: [
        { medio: "tiktok", info: "tiktok.com/@danzasaustral" }
      ],
      inicio: "2024-07-12 18:00",
      termino: "2024-07-12 21:00",
      descripcion: "",
      tema: "baile",
      nombre: "Festival de Danza Patagónica",
      fotos: [
        "img/danza1.jpg"
      ]
    },
    {
      region: "Coquimbo",
      comuna: "La Serena",
      sector: "Universidad",
      organizador: "Centro Científico Regional",
      email: "eventos@ccr.cl",
      celular: "",
      contactarPor: [
        { medio: "otra", info: "https://eventoscientificos.cl" }
      ],
      inicio: "2024-07-15 11:00",
      termino: "2024-07-15 14:00",
      descripcion: "Presentación de avances en astronomía regional.",
      tema: "ciencias",
      nombre: "Charlas Científicas de Invierno",
      fotos: [
        "img/ciencia1.jpg",
        "img/ciencia2.jpg"
      ]
    }
  ];
  
  function obtenerActividades() {
    return actividades;
  }
  