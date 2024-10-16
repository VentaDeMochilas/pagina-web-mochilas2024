// Función para registrar al usuario
function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        message.textContent = 'Las contraseñas no coinciden.';
        message.classList.remove('success');
        message.classList.add('error');
        return;
    }

    // Guardar el usuario en localStorage (simulación de registro)
    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user)); // Guardar como string JSON

    // Mostrar mensaje de éxito y redirigir
    message.textContent = 'Registro exitoso. Redirigiendo a la página de inicio de sesión...';
    message.classList.remove('error');
    message.classList.add('success');

    setTimeout(() => {
        window.location.href = 'iniciosesion.html'; // Redirigir a la página de inicio de sesión
    }, 2000);
}

// Función para mostrar/ocultar la contraseña
function togglePassword(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const passwordIcon = document.getElementById(iconId);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash'); // Cambiar a ojo tachado
    } else {
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye'); // Cambiar a ojo normal
    }
}
