<<<<<<< HEAD
const apiKey = '1b1ab8708f61241f34908aa8cabdcf02';
const lat = 14.6349;
const lon = -90.5069;

async function obtenerClima() {
  try {
    const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric&lang=es`);
    const datos = await respuesta.json();

    const tempActual = Math.round(datos.current.temp);
    const descripcion = datos.current.weather[0].description;
    const humedad = datos.current.humidity;
    const viento = datos.current.wind_speed;
    const presion = datos.current.pressure;
    const sensacion = Math.round(datos.current.feels_like);
    const uv = datos.current.uvi;

    const tempManana = Math.round(datos.daily[1].temp.day);
    const tempPasado = Math.round(datos.daily[2].temp.day);

    const climaHTML = `
      <div class="cardm">
        <div class="card">
          <div class="main">${tempActual} °C</div>
          <div class="mainsub">Guatemala<br>${descripcion}</div>
        </div>
        <div class="card2">
          <div class="detalle">Humedad: ${humedad}%</div>
          <div class="detalle">Viento: ${viento} km/h</div>
          <div class="detalle">Sensación térmica: ${sensacion}°C</div>
          <div class="detalle">Presión: ${presion} mbar</div>
          <div class="detalle">Índice UV: ${uv}</div>
          <div class="card3">Saludable</div>
        </div>
      </div>
    `;

    document.getElementById('clima-actual').innerHTML = climaHTML;
    document.getElementById("temp-hoy").textContent = `${tempActual}°`;
    document.getElementById("temp-manana").textContent = `${tempManana}°`;
    document.getElementById("temp-pasadomanana").textContent = `${tempPasado}°`;

    let recomendacion = "";
    if (tempActual <= 15) {
      recomendacion = "🧥 ¡Hace frío! Lleva abrigo.";
    } else if (tempActual <= 25) {
      recomendacion = "👕 Clima agradable. Usa ropa ligera.";
    } else {
      recomendacion = "🧴 ¡Hace calor! Mantente hidratado.";
    }

    document.getElementById("recomendacion").textContent = recomendacion;

  } catch (error) {
    console.error('Error al obtener el clima:', error);
    document.getElementById('clima-actual').innerHTML = `
      <p style="color: #e53935; font-weight: bold;">⚠️ No se pudo cargar el clima. Verifica tu conexión o clave API.</p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', obtenerClima);
=======
const apiKey = '1b1ab8708f61241f34908aa8cabdcf02';
const ciudad = 'Guatemala';

async function obtenerClima() {
  try {
    // Clima actual
    const climaActual = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
    const datosActual = await climaActual.json();

    const descripcion = datosActual.weather[0].description;
    const temperatura = Math.round(datosActual.main.temp);

    // Inserta datos en la tarjeta
    document.getElementById("temperatura").textContent = `${temperatura}°C`;
    document.getElementById("descripcion").textContent = descripcion;

    mostrarRecomendacion(temperatura);

    // Pronóstico futuro
    const climaFuturo = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`);
    const datosFuturo = await climaFuturo.json();

    document.getElementById("dia1").textContent = `${Math.round(datosFuturo.list[8].main.temp)}°C`;
    document.getElementById("dia2").textContent = `${Math.round(datosFuturo.list[16].main.temp)}°C`;
    document.getElementById("dia3").textContent = `${Math.round(datosFuturo.list[24].main.temp)}°C`;

  } catch (error) {
    console.error("Error obteniendo clima:", error);
    document.getElementById("descripcion").textContent = "Error al cargar";
  }
}

function mostrarRecomendacion(temp) {
  const div = document.getElementById("recomendacion");
  let texto = "";

  if (temp <= 18) {
    texto = "🌬️ Hace frío, te recomendamos llevar un suéter o chaqueta.";
  } else if (temp > 18 && temp <= 24) {
    texto = "🌤️ El clima es templado. Ropa cómoda es ideal.";
  } else {
    texto = "☀️ Hace calor, ¡lleva ropa fresca y mantente hidratado!";
  }

  if (div) {
    div.textContent = texto;
  }
}

document.addEventListener("DOMContentLoaded", obtenerClima);
>>>>>>> b3f4ab589e8e61917dc2e86f271db43aa13e2ada
