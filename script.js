document.getElementById('toggle-theme').addEventListener('click', function() {
    const body = document.body;
    if (body.style.getPropertyValue('--bg-color') === '#333') {
        body.style.setProperty('--bg-color', '#fff');
        body.style.setProperty('--text-color', '#333');
    } else {
        body.style.setProperty('--bg-color', '#333');
        body.style.setProperty('--text-color', '#ccc');
    }
});

document.getElementById('login-btn').addEventListener('click', function() {
    document.getElementById('login-form').style.display = 'block';
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === '123') {
        alert('Login exitoso');
        // Redirigir a la página principal de la aplicación o manejar el login
    } else {
        alert('Credenciales incorrectas');
    }
}
