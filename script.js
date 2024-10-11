document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '🌜' : '🌞';
});

document.getElementById('login-btn').addEventListener('click', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.style.opacity = "0";
    setTimeout(() => {
        loginForm.classList.toggle('hidden');
        loginForm.style.opacity = "1";
    }, 300);
});

document.getElementById('blt_wrapper').addEventListener('mousedown', function() {
    const passInput = document.getElementById('password_input');
    passInput.type = 'text';
});

document.getElementById('blt_wrapper').addEventListener('mouseup', function() {
    const passInput = document.getElementById('password_input');
    passInput.type = 'password';
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!username || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    if (username === 'admin' && password === '123') {
        localStorage.setItem('user', username);
        alert('Login exitoso');
        // Implementar redirección
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

