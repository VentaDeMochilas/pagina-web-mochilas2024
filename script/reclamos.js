document.addEventListener('DOMContentLoaded', function() {
    const reclamosForm = document.getElementById('reclamos-form');

    reclamosForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Capturamos los valores del formulario
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const reclamo = document.getElementById('reclamo');
        
        let isValid = true;

        // Validación del nombre
        if (nombre.value.trim() === "") {
            showError(nombre, "Por favor, ingresa tu nombre completo.");
            isValid = false;
        } else {
            clearError(nombre);
        }

        // Validación del email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email.value.trim())) {
            showError(email, "Por favor, ingresa un correo electrónico válido.");
            isValid = false;
        } else {
            clearError(email);
        }

        // Validación del teléfono
        const phonePattern = /^[0-9]{9}$/;
        if (!phonePattern.test(telefono.value.trim())) {
            showError(telefono, "Por favor, ingresa un número de teléfono válido (9 dígitos).");
            isValid = false;
        } else {
            clearError(telefono);
        }

        // Validación del reclamo
        if (reclamo.value.trim() === "") {
            showError(reclamo, "Por favor, describe tu reclamo.");
            isValid = false;
        } else {
            clearError(reclamo);
        }

        // Si todo es válido, mostramos el mensaje de éxito
        if (isValid) {
            document.getElementById('reclamos-success').style.display = 'block';
            reclamosForm.reset();
        }
    });

    // Función para mostrar el error
    function showError(input, message) {
        const errorElement = input.nextElementSibling;
        errorElement.innerText = message;
        errorElement.style.display = 'block';
        input.classList.add('error-input');
    }

    // Función para limpiar el error
    function clearError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.innerText = '';
        errorElement.style.display = 'none';
        input.classList.remove('error-input');
    }
});
