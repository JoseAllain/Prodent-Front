document.addEventListener('DOMContentLoaded', function() {
    // Cargar los horarios cuando la página esté lista
    fetchHorarios();
    
    // Configura el listener para el botón de actualizar
    document.getElementById('updateButton').addEventListener('click', function() {
        let allChecked = true;
        
        // Recorre cada contenedor de horarios para verificar si al menos un checkbox está marcado
        document.querySelectorAll('.schedule').forEach(function(schedule) {
            const checkedCheckboxes = schedule.querySelectorAll('input[type="checkbox"]:checked').length;
            if (checkedCheckboxes === 0) {
                allChecked = false;
                // Aquí puedes añadir lógica adicional, como resaltar el contenedor
            }
        });

        if (allChecked) {
            // Si todos los contenedores tienen al menos un checkbox marcado, llama a la función de actualización
            actualizarDisponibilidadMasiva();
        } else {
            alert('Por favor, marca al menos una hora en cada día.');
        }
    });
});

function fetchHorarios() {
    // Reemplazar con la URL real de tu API
    const url = 'https://3.129.88.138/mostrarHorariosDelDoctor';

    fetch(url)
        .then(response => response.json())
        .then(horarios => mostrarHorarios(horarios))
        .catch(error => console.error('Error al obtener horarios:', error));
}

function mostrarHorarios(horarios) {
    // Aquí va la lógica para mostrar los horarios en la página
    // Por ejemplo, podrías iterar sobre el array de horarios y
    // actualizar el estado checked de cada checkbox según la disponibilidad
}

function actualizarDisponibilidadMasiva() {
    // Reemplazar con la URL real de tu API
    const url = 'https://3.129.88.138/actualizarDisponibilidadMasiva';

    const disponibilidadPorId = {};
    // Llena disponibilidadPorId con los IDs de los horarios y su disponibilidad
    document.querySelectorAll('.schedule .time-block input[type="checkbox"]').forEach(checkbox => {
        const horarioId = checkbox.getAttribute('data-horario-id');
        disponibilidadPorId[horarioId] = checkbox.checked;
    });

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(disponibilidadPorId),
    })
    .then(response => {
        if(response.ok) {
            console.log('Disponibilidad actualizada con éxito');
            alert('Horario actualizado con exito');
            window.location.href = 'Home_Doctor.html';
        } else {
            throw new Error('Respuesta de red no fue ok.');
        }
    })
    .catch(error => console.error('Error al actualizar disponibilidad:', error));
}

        
        
        function showSchedule(scheduleId, selectedTab) {
            // Oculta todos los horarios
            var schedules = document.querySelectorAll('.schedule');
            schedules.forEach(function(schedule) {
                schedule.style.display = 'none';
            });

            // Muestra el horario correspondiente al botón clicado
            var selectedSchedule = document.getElementById(scheduleId);
            if (selectedSchedule) {
                selectedSchedule.style.display = 'block';
            }
            
            // Obtiene todos los botones dentro del contenedor con la clase 'days'
            var tabs = document.querySelectorAll('.days button');
            tabs.forEach(function(tab) {
                tab.classList.remove('active');
            });

            // Añade la clase 'active' al botón que fue clickeado
            selectedTab.classList.add('active');
        }
        // Llama a showSchedule para el primer botón al cargar la página
        document.addEventListener('DOMContentLoaded', function() {
            showSchedule('Lun-schedule', document.querySelector('.days button:first-child'));
        });
   
        function validateAllSchedules() {
            const allSchedules = document.querySelectorAll('.schedule');
            let isValid = true;

            allSchedules.forEach(schedule => {
                const checkboxes = schedule.querySelectorAll('input[type="checkbox"]');
                const hasSelection = Array.from(checkboxes).some(checkbox => checkbox.checked);

                if (!hasSelection) {
                isValid = false;
                // Puedes agregar más lógica aquí, como resaltar el día en rojo o mostrar un mensaje de error.
                }
            });

            if (isValid) {
                alert('Horario actualizado exitosamente.');
                window.location.href = 'Home_Doctor.html';
            } else {
                alert('Por favor, selecciona al menos una hora en cada día.');
            }
        }
