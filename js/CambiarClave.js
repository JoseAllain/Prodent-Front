
        // Función para abrir el modal
        function abrirModal() {
            document.getElementById('modal').style.display = 'flex';
        }

        // Función para cerrar el modal
        function cerrarModal() {
            document.getElementById('modal').style.display = 'none';
            // Puedes limpiar los campos del formulario si es necesario
            document.getElementById('claveActual').value = '';
            document.getElementById('nuevaClave').value = '';
        }

        // Función para confirmar cambios en la contraseña
        // Función para confirmar cambios en la contraseña
        function confirmar() {
            var claveActual = document.getElementById('claveActual').value;
            var nuevaClave = document.getElementById('nuevaClave').value;
        
            if (claveActual && nuevaClave) {
                if (claveActual !== nuevaClave) {
                    var datosCambioClave = {
                        claveActual: claveActual,
                        nuevaClave: nuevaClave
                    };
        
                    fetch('http://localhost:8080/cambiarClave', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(datosCambioClave),
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la respuesta del servidor');
                        }
                        return response.text(); // O response.text() si el servidor no devuelve un JSON
                    })
                    .then(data => {
                        // Si el servidor devuelve un mensaje, puedes usar 'data' para mostrarlo
                        alert(data.message || 'Contraseña cambiada exitosamente.');
                        cerrarModal();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('Contraseña actual incorrecta o nueva contraseña invalida.');
                    });
        
                } else {
                    alert('La nueva contraseña debe ser diferente de la contraseña actual.');
                }
            } else {
                alert('Por favor, llena ambos campos.');
            }
        }
