document.addEventListener('DOMContentLoaded', function() {
    var registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        submitRegistrationForm();
    });
});

function submitRegistrationForm() {

    // Añade la validación del teléfono aquí, antes de enviar el formulario
    if (!validatePhoneNumber()) {
        return; // Detiene la ejecución si el número de teléfono no es válido
    }
    
    var nombre = document.getElementById('nombre').value;
    var dni = document.getElementById('dni').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;

    // Crear el objeto de datos para enviar al servidor
    var formData = {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        correo: correo,
        clave: clave
    };

    // Aquí debes colocar la URL a la que tu backend está escuchando
    var url = 'https://3.129.88.138/registro';

    // Ejemplo de solicitud AJAX utilizando la API Fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas o error en el servidor');
        }
        return response.json();
    })
    .then(data => {
        console.log('Registro exitoso:', data);
        alert('Registro exitoso');
        window.location.href = 'InicioSesion.html';
    })
    .catch((error) => {
        console.error('Error en el registro:', error);
        alert('Hubo un error al registrar. Por favor, inténtelo de nuevo.');
    });
}

function onlyNumbers(event) {
    // Permitir solo números
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
        event.preventDefault();
        return false;
    }
    return true;
}

function validateInputLength(element, maxLength) {
    var errorSpanId = element.id + "-error";
    var errorSpan = document.getElementById(errorSpanId);
    if (element.value.length !== maxLength) {
         errorSpan.style.display = "block";
    } else {
        errorSpan.style.display = "none";
    }
}

function validatePhoneNumber() {
    var telefono = document.getElementById('telefono').value;
    var telefonoRegex = /^9\d{8}$/; // Regex que verifica si el número comienza con 9 y tiene 9 dígitos en total

    if (!telefonoRegex.test(telefono)) {
        alert('El número de teléfono debe comenzar con 9 y tener 9 dígitos en total.');
        return false;
    }

    return true;
}
