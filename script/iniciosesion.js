// Función para el inicio de sesión
function login(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Obtener el usuario registrado de localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Verificar si existe el usuario registrado en localStorage
    if (storedUser && usernameInput === storedUser.username && passwordInput === storedUser.password) {
        message.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
        message.classList.remove('error');
        message.classList.add('success');

        // Redirigir a la página principal después de 2 segundos
        setTimeout(() => {
            window.location.href = 'solopagina.html'; // Redirige a la página principal
        }, 2000);
    } else {
        message.textContent = 'Usuario o contraseña incorrectos. Por favor crea una cuenta.';
        message.classList.remove('success');
        message.classList.add('error');
    }
}

// Función para mostrar/ocultar la contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        // Mostrar la contraseña y cambiar el ícono a "ojo tachado"
        passwordInput.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    } else {
        // Ocultar la contraseña y cambiar el ícono a "ojo abierto"
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    }
}
