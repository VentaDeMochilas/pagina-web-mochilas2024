document.addEventListener('DOMContentLoaded', function() {
    const deliveryForm = document.getElementById('delivery-form');

    deliveryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Capturamos los valores del formulario
        const nombreDelivery = document.getElementById('nombre-delivery');
        const direccion = document.getElementById('direccion');
        const telefonoDelivery = document.getElementById('telefono-delivery');
        const fechaEntrega = document.getElementById('fecha-entrega');

        let isValid = true;

        // Validación del nombre
        if (nombreDelivery.value.trim() === "") {
            showError(nombreDelivery, "Por favor, ingresa tu nombre completo.");
            isValid = false;
        } else {
            clearError(nombreDelivery);
        }

        // Validación de la dirección
        if (direccion.value.trim() === "") {
            showError(direccion, "Por favor, ingresa la dirección de entrega.");
            isValid = false;
        } else {
            clearError(direccion);
        }

        // Validación del teléfono
        const phonePattern = /^[0-9]{9}$/;
        if (!phonePattern.test(telefonoDelivery.value.trim())) {
            showError(telefonoDelivery, "Por favor, ingresa un número de teléfono válido (9 dígitos).");
            isValid = false;
        } else {
            clearError(telefonoDelivery);
        }

        // Validación de la fecha de entrega
        if (fechaEntrega.value.trim() === "") {
            showError(fechaEntrega, "Por favor, selecciona una fecha de entrega válida.");
            isValid = false;
        } else {
            clearError(fechaEntrega);
        }

        // Si todo es válido, mostramos el mensaje de éxito
        if (isValid) {
            document.getElementById('delivery-success').style.display = 'block';
            deliveryForm.reset();
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
