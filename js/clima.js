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
