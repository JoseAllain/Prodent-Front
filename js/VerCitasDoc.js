document.addEventListener('DOMContentLoaded', function() {
    cargarCitasPendientes();
});

function cargarCitasPendientes() {
    fetch('https://3.129.88.138/pendientes')
        .then(response => response.json())
        .then(citas => {
            citas.forEach(cita => {
                const citaDiv = document.createElement('div');
                citaDiv.classList.add('time-block');
                
                const horaParrafo = document.createElement('p');
                horaParrafo.textContent = `${cita.horaInicio} - ${cita.horaFin}`;
                
                const pacienteParrafo = document.createElement('p');
                pacienteParrafo.textContent = cita.nombrePaciente; // Asegúrate de que este campo exista en tu objeto cita

                citaDiv.appendChild(horaParrafo);
                citaDiv.appendChild(pacienteParrafo);

                // Añade el bloque de cita al día correspondiente
                const diaId = convertirDiaSemanaAId(cita.diaSemana);
                const scheduleDiv = document.getElementById(diaId);
                scheduleDiv.appendChild(citaDiv);
            });
        })
        .catch(error => {
            console.error('Error al cargar las citas:', error);
        });
}

function convertirDiaSemanaAId(diaSemana) {
    const dias = {
        'MONDAY': 'Lun-schedule',
        'TUESDAY': 'Mar-schedule',
        'WEDNESDAY': 'Mie-schedule',
        'THURSDAY': 'Jue-schedule',
        'FRIDAY': 'Vie-schedule'
        // Añade más días si es necesario.
    };
    return dias[diaSemana] || 'Dia-desconocido-schedule'; // Devuelve un ID por defecto si el día no se encuentra.
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


