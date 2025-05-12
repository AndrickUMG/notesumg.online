const apiKey = '8c4c4d975ff84d588ab00943251205';
const ciudad = 'Zacapa';

// Clima actual
fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciudad}&lang=es`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('.temperatura').innerHTML = `↑${data.current.temp_c}° ↓${data.current.feelslike_c}°`;
        document.querySelector('.clima-icon img').src = `https:${data.current.condition.icon}`;
        document.querySelector('.descripcion').innerText = data.current.condition.text;
        document.querySelector('.viento').innerText = `🌬 ${data.current.wind_kph} km/h ${data.current.wind_dir}`;
    })
    .catch(err => console.error('Error al obtener datos del clima:', err));

// Alertas
fetch(`https://api.weatherapi.com/v1/alerts.json?key=${apiKey}&q=${ciudad}&lang=es`)
    .then(response => response.json())
    .then(data => {
        const alertasDiv = document.getElementById('alertas');
        if (data.alert && data.alert.alert.length > 0) {
            let contenido = '<h2>⚠ Alertas climáticas</h2>';
            data.alert.alert.forEach(alerta => {
                contenido += `
                    <div class="alerta">
                        <h3>${alerta.headline}</h3>
                        <p><strong>Evento:</strong> ${alerta.event}</p>
                        <p><strong>Áreas:</strong> ${alerta.areas}</p>
                        <p><strong>Severidad:</strong> ${alerta.severity}</p>
                        <p><strong>Descripción:</strong> ${alerta.desc}</p>
                        <p><strong>Instrucción:</strong> ${alerta.instruction}</p>
                    </div>
                `;
            });
            alertasDiv.innerHTML = contenido;
        } else {
            alertasDiv.innerHTML = '<h2>Sin alertas activas</h2><p>Actualmente no hay alertas meteorológicas importantes.</p>';
        }
    })
    .catch(err => console.error('Error al obtener alertas:', err));
