<<<<<<< HEAD
const apiKey = '1b1ab8708f61241f34908aa8cabdcf02';
const lat = 14.6349;  // Guatemala
const lon = -90.5069;

async function obtenerClima() {
  try {
    const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=metric&lang=es`);
    const datos = await respuesta.json();

    // Datos actuales y días siguientes
    const tempActual = Math.round(datos.current.temp);
    const descripcion = datos.current.weather[0].description;
    const humedad = datos.current.humidity;
    const viento = datos.current.wind_speed;
    const presion = datos.current.pressure;
    const sensacion = Math.round(datos.current.feels_like);
    const uv = datos.current.uvi;

    const tempManana = Math.round(datos.daily[1].temp.day);
    const tempPasado = Math.round(datos.daily[2].temp.day);

    // Generar tarjeta animada
    const climaHTML = `
      <div class="cardm">
        <div class="card">
          <svg class="weather" ... ></svg>
          <div class="main">${tempActual} °C</div>
          <div class="mainsub">Guatemala<br>${descripcion}</div>
        </div>
        <div class="card2">
          <div class="upper">
            <div class="humidity">
              <div class="humiditytext">Humedad<br>${humedad}%</div>
              <svg class="humiditysvg" ...></svg>
            </div>
            <div class="air">
              <div class="airtext">Viento<br>${viento} Km/h</div>
              <svg class="airsvg" ...></svg>
            </div>
          </div>
          <div class="lower">
            <div class="aqi">
              <svg class="aqisvg" ...></svg>
              <div class="aqitext">UV<br>${uv}</div>
            </div>
            <div class="realfeel">
              <svg class="rfsvg" ...></svg>
              <div class="realfeeltext">Sensación<br>${sensacion} °C</div>
            </div>
            <div class="pressure">
              <svg class="pressuresvg" ...></svg>
              <div class="pressuretext">Presión<br>${presion} mbar</div>
            </div>
            <div class="card3">Pronóstico</div>
          </div>
        </div>
      </div>
    `;

    // Mostrar en la tarjeta
    document.getElementById('clima-actual').innerHTML = climaHTML;
    document.getElementById("temp-hoy").textContent = `${tempActual}°`;
    document.getElementById("temp-manana").textContent = `${tempManana}°`;
    document.getElementById("temp-pasadomanana").textContent = `${tempPasado}°`;

    // Recomendación según temperatura actual
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
    document.getElementById('clima-actual').innerHTML = `<p>No se pudo cargar el clima.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', obtenerClima);



import KEYS from "../assets/Keys.js";

const $d = document;
const $entradas = $d.getElementById("entradas");
const $template = $d.getElementById("entrada-template")?.content;
const $fragment = $d.createDocumentFragment();
const options = { headers: { Authorization: `Bearer ${KEYS.secret}` } };
const FormatoDeMoneda = num => `Q ${num.slice(0, -2)}.${num.slice(-2)}`;

let products, prices;
console.log("🔑 KEY SECRETA:", KEYS.secret);

Promise.all([
    fetch("https://api.stripe.com/v1/products", options),
    fetch("https://api.stripe.com/v1/prices", options)
])
.then(responses => Promise.all(responses.map(res => res.json())))
.then(json => {
    products = json[0].data;
    prices = json[1].data;

    console.log("📦 Productos y precios desde Stripe:", products, prices);

    // 👉 Filtramos solo los productos válidos
    const productosPermitidos = [
        "prod_S7jtGpwQW2hxiX", // Entrada General
        "prod_S7k3l5kRaNgZmw"  // Pase a Atracciones
    ];

    prices.forEach(el => {
        let productData = products.find(product => product.id === el.product);
        if (!productData) return;

        if (!productosPermitidos.includes(productData.id)) return;

        // 🔤 Texto personalizado según el producto
        let texto = "";
        if (productData.name.toLowerCase().includes("general")) {
            texto = "🎟 Entrada general Q 25.00 GTQ";
        } else if (productData.name.toLowerCase().includes("pase")) {
            texto = "🪙 Pase a atracciones Q 150.00 GTQ";
        } else {
            texto = `${productData.name} ${FormatoDeMoneda(el.unit_amount_decimal)} ${(el.currency).toUpperCase()}`;
        }

        if ($template) {
            $template.querySelector(".entrada").setAttribute("data-price", el.id);
            $template.querySelector("img").src = productData.images[0];
            $template.querySelector("img").alt = productData.name;
            $template.querySelector("figcaption").innerText = texto;

            let $clone = $d.importNode($template, true);
            $fragment.appendChild($clone);
        }
    });

    if ($entradas) {
        $entradas.appendChild($fragment);
    }
})

.catch(error => {
    let message = error.statusText || "Ocurrió un error en la petición";
    if ($entradas) {
        $entradas.innerHTML = `Error: ${error.status}: ${message}`;
    }
});

document.addEventListener("click", async (e) => {
    if (e.target.matches(".comprar")) {
        console.log("✅ Botón Comprar clickeado");

        let entradaElement = e.target.closest(".entrada");
        let priceId = entradaElement.getAttribute("data-price");

        let tipoEntrada = entradaElement.querySelector("figcaption").innerText.split(" ")[0]; // Extrae el tipo de entrada
        let montoTotal = entradaElement.querySelector("figcaption").innerText.match(/\d+(\.\d+)?/)[0]; // Extrae el monto total

        console.log("📌 Datos capturados antes del pago:");
        console.log("Tipo de Entrada:", tipoEntrada);
        console.log("Monto Total:", montoTotal);

        if (!priceId) {
            console.error("❌ Error: No se encontró el priceId.");
            return;
        }
        fetch("http://localhost:3000/crear-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ priceId, quantity: 1 }] })
        })
        .then(res => res.json())
        .then(data => {
            console.log("🔹 Datos recibidos del servidor:", data);
        
            if (!data.id) {
                console.error("❌ Error: No se recibió un transactionId de Stripe.");
                return;
            }
        
            // 🔹 Redirigir a Stripe para procesar el pago
            Stripe(KEYS.public).redirectToCheckout({ sessionId: data.id });
        })
        .catch(error => console.error("❌ Error en la sesión de pago:", error));
    }
});

// ✅ ASIGNAR EVENTO AL BOTÓN "VOLVER AL INICIO"
document.addEventListener("DOMContentLoaded", function () {
    // Verifica si estamos en la página success.html
    if (window.location.pathname.includes("success.html")) {
        console.log("✅ Página de éxito detectada. Se aplicarán restricciones de salida.");

        // ✅ Alerta inicial SOLO en success.html
        setTimeout(() => {
            alert("⚠️ Asegúrese de descargar su ticket antes de salir de este sitio.");
        }, 500);

        let goHomeButton = document.getElementById("goHome");
        let downloadImageButton = document.getElementById("downloadImage");
        let downloadPDFButton = document.getElementById("downloadPDF");

        // ✅ Marcar como descargado cuando el usuario presiona "Descargar Imagen"
        if (downloadImageButton) {
            downloadImageButton.addEventListener("click", function () {
                downloadImage();
                localStorage.setItem("ticketDescargado", "true");
                console.log("✅ Ticket descargado como imagen.");
            });
        }

        // ✅ Marcar como descargado cuando el usuario presiona "Descargar PDF"
        if (downloadPDFButton) {
            downloadPDFButton.addEventListener("click", function () {
                downloadPDF();
                localStorage.setItem("ticketDescargado", "true");
                console.log("✅ Ticket descargado como PDF.");
            });
        }

        // ✅ Interceptar la salida desde el botón "Volver al Inicio"
        if (goHomeButton) {
            goHomeButton.addEventListener("click", function (event) {
                let ticketDescargado = localStorage.getItem("ticketDescargado");

                if (!ticketDescargado) {
                    event.preventDefault(); // Evita la redirección
                    alert("⚠️ Debes descargar tu ticket antes de salir.");
                } else {
                    console.log("✅ Ticket descargado. Redirigiendo al inicio...");
                    localStorage.removeItem("ticketDescargado");
                    window.location.href = "http://127.0.0.1:5501/index.html";
                }
            });
        }

        // ✅ Interceptar cierre de pestaña o recarga
        window.addEventListener("beforeunload", function (event) {
            let ticketDescargado = localStorage.getItem("ticketDescargado");

            if (!ticketDescargado) {
                event.preventDefault();
                event.returnValue = "⚠️ No has descargado tu ticket. ¿Estás seguro de que deseas salir?";
            }
        });

    } else {
        console.log("🔹 No estamos en la página de éxito. No se aplicarán restricciones.");
    }
});

=======
// script.js
import { createRoot } from 'react-dom/client';

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('nav-open');
        });
    }
});

const MAX_VISIBILITY = 3;

const Card = ({title, imageUrl, description}) => (
    React.createElement('div', { className: 'card' },
        React.createElement('h2', null, title),
        imageUrl && React.createElement('img', { src: imageUrl, alt: title, style: { width: '100%', height: 'auto', borderRadius: '0.5rem', marginBottom: '0.5em' } }),
        React.createElement('p', null, description)
    )
);

const Carousel = ({items, containerId}) => {
    const [active, setActive] = React.useState(0);
    const count = items.length;

    return (
        React.createElement('div', { className: 'carousel' },
            active > 0 && React.createElement('button', { className: 'nav left', onClick: () => setActive(i => i - 1) }, React.createElement('i', { className: 'ti-chevron-left-outline' })),
            items.map((item, i) => (
                React.createElement('div', {
                    key: i,
                    className: 'card-container',
                    style: {
                        '--active': i === active ? 1 : 0,
                        '--offset': (active - i) / 3,
                        '--direction': Math.sign(active - i),
                        '--abs-offset': Math.abs(active - i) / 3,
                        'pointerEvents': active === i ? 'auto' : 'none',
                        'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                        'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
                    }
                },
                    React.createElement(Card, { title: item.title, imageUrl: item.imageUrl, description: item.description })
                )
            )),
            active < count - 1 && React.createElement('button', { className: 'nav right', onClick: () => setActive(i => i + 1) }, React.createElement('i', { className: 'ti-chevron-right-outline' }))
        )
    );
};

const juegos = [
    { title: 'Montaña Rusa Tornado', imageUrl: 'atraccion1_thumb.jpg', description: '¡Adrenalina al máximo en nuestra increíble montaña rusa!' },
    { title: 'Carrusel Mágico', imageUrl: 'atraccion2_thumb.jpg', description: 'Un clásico para toda la familia. ¡Sube y disfruta!' },
    { title: 'Columpio Volador', imageUrl: 'atraccion3_thumb.jpg', description: 'Siente la emoción de volar por los aires con vistas espectaculares.' },
    // Agrega más juegos aquí
];

const productos = [
    { title: 'Peluche Samaco Grande', imageUrl: 'peluche1_thumb.jpg', description: 'El recuerdo perfecto de tu visita.' },
    { title: 'Gorra Edición Limitada', imageUrl: 'gorra1_thumb.jpg', description: 'Lleva el espíritu del parque contigo.' },
    { title: 'Taza Don Samaco Park', imageUrl: 'taza1_thumb.jpg', description: 'Disfruta de tu bebida favorita con nuestro logo.' },
    // Agrega más productos aquí
];

const juegosCarouselRoot = createRoot(document.getElementById('juegos-carousel'));
juegosCarouselRoot.render(React.createElement(Carousel, { items: juegos }));

const productosCarouselRoot = createRoot(document.getElementById('productos-carousel'));
productosCarouselRoot.render(React.createElement(Carousel, { items: productos }));
>>>>>>> b3f4ab589e8e61917dc2e86f271db43aa13e2ada
