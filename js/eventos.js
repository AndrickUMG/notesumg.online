const eventos = [
    {
      titulo: "Día del Padre",
      descripcion: "¡Celebra junto a papá con actividades y sorpresas especiales!",
      fecha: "18 de junio",
      imagen: "img/evento1.png"
    },
    {
      titulo: "Día de la Madre",
      descripcion: "Una jornada llena de amor, juegos y recuerdos con mamá.",
      fecha: "10 de mayo",
      imagen: "img/evento2.png"
    },
    {
        titulo: "Día de Hallowyn",
        descripcion: "El dia favorito de Don Samaco.",
        fecha: "31 de Octubre",
        imagen: "img/evento3.png"
      }
  ];
  
  const contenedor = document.getElementById("contenedor-eventos");
  
  eventos.forEach(evento => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "evento-card";
    tarjeta.innerHTML = `
      <img src="${evento.imagen}" alt="${evento.titulo}">
      <h3>${evento.titulo}</h3>
      <p>${evento.descripcion}</p>
      <p><strong>${evento.fecha}</strong></p>
    `;
    contenedor.appendChild(tarjeta);
  });
  