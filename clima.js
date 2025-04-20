const apiKey = '1b1ab8708f61241f34908aa8cabdcf02';
const ciudad = 'Guatemala';

async function obtenerClima() {
  try {
    const climaActual = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
    const datosActual = await climaActual.json();

    const icono = datosActual.weather[0].icon;
    const descripcion = datosActual.weather[0].description;
    const temperatura = Math.round(datosActual.main.temp);

    document.getElementById('clima-actual').innerHTML = `
      <div class="clima-actual">
        <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="${descripcion}">
        <div>
          <h3>${temperatura}°C</h3>
          <p>${descripcion}</p>
        </div>
      </div>
    `;

    mostrarRecomendacion(temperatura);

    const climaFuturo = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
    const datosFuturo = await climaFuturo.json();

    const pronostico = document.getElementById('pronostico');
    pronostico.innerHTML = '';

    for (let i = 8; i <= 24; i += 8) {
      const dia = datosFuturo.list[i];
      const fecha = new Date(dia.dt * 1000);
      const diaNombre = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
      const temp = Math.round(dia.main.temp);
      const icon = dia.weather[0].icon;
      const desc = dia.weather[0].description;

      pronostico.innerHTML += `
        <div class="pronostico-card">
          <h4>${diaNombre}</h4>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
          <p>${temp}°C</p>
          <small>${desc}</small>
        </div>
      `;
    }

  } catch (error) {
    console.error(error);
    document.getElementById('clima-actual').innerHTML = `<p>No se pudo obtener el clima en este momento.</p>`;
  }
}

function mostrarRecomendacion(temp) {
  const div = document.getElementById('recomendacion');
  let texto = '';

  if (temp <= 18) {
    texto = '🌬️ Hace frío, te recomendamos llevar un suéter o chaqueta.';
  } else if (temp > 18 && temp <= 24) {
    texto = '🌤️ El clima es templado. Ropa cómoda es ideal.';
  } else {
    texto = '☀️ Hace calor, ¡lleva ropa fresca y mantente hidratado!';
  }

  div.textContent = texto;
}

document.addEventListener('DOMContentLoaded', obtenerClima);
