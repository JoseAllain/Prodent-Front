document.addEventListener('DOMContentLoaded', function() {
    cargarHorariosDisponibles();
    verificarCitaPaciente();
});

function cargarHorariosDisponibles() {
    fetch('http://localhost:8080/disponibles')
        .then(response => response.json())
        .then(horarios => {
            horarios.forEach(horario => {
                const horarioCheckbox = document.createElement('input');
                horarioCheckbox.setAttribute('type', 'checkbox');
                horarioCheckbox.classList.add('checkbox');
                horarioCheckbox.value = horario.idHorario;

                const label = document.createElement('label');
                label.textContent = `${horario.horaInicio} - ${horario.horaFin}`;

                const div = document.createElement('div');
                div.classList.add('time-block');
                div.appendChild(label);
                div.appendChild(horarioCheckbox);

                const diaId = convertirDiaSemanaAId(horario.diaSemana);
                document.getElementById(diaId).appendChild(div);
            });

            document.querySelectorAll('.checkbox').forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                    toggleCheckboxes(this);
                    toggleRegisterButton();
                });
            });

            toggleRegisterButton();
        })
        .catch(error => {
            console.error('Error al cargar los horarios:', error);
        });
}

function toggleCheckboxes(selectedCheckbox) {
    document.querySelectorAll('.checkbox').forEach(function(checkbox) {
        if (checkbox !== selectedCheckbox) {
            checkbox.checked = false;
        }
    });
}

function toggleRegisterButton() {
    const registerButton = document.querySelector('.register-appointment');
    const isAnyCheckboxChecked = Array.from(document.querySelectorAll('.checkbox')).some(checkbox => checkbox.checked);
    registerButton.disabled = !isAnyCheckboxChecked;
}

function verificarCitaPaciente() {
    const idPaciente = getUserIdFromLocalStorage();
    console.log('ID del paciente:', idPaciente); // Deberías ver el ID correcto en la consola
    if (idPaciente) {
        fetch(`http://localhost:8080/tieneCita/${idPaciente}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(tieneCita => {
                console.log('El paciente tiene cita:', tieneCita); // Deberías ver 'true' o 'false'
                if (tieneCita) {
                    alert('Ya tienes una cita registrada. No puedes registrar otra.');
                    deshabilitarRegistro();
                } else {
                    habilitarRegistro(); // Asegúrate de que esta línea esté presente
                }
            })
            .catch(error => {
                console.error('Error al verificar la cita del paciente:', error);
            });
    } else {
        console.error('No se encontró el ID del paciente en el almacenamiento local.');
    }
}


function deshabilitarRegistro() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.disabled = true;
    });

    const registerButton = document.querySelector('.register-appointment');
    registerButton.disabled = true;
}

function habilitarRegistro() {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.disabled = false;
    });

    const registerButton = document.querySelector('.register-appointment');
    registerButton.disabled = false;
}

function registerAppointment() {
    const idHorarioSeleccionado = obtenerIdHorarioSeleccionado();
    const idPaciente = getUserIdFromLocalStorage();
    const datosCita = {
        idHorario: idHorarioSeleccionado,
        idPaciente: idPaciente
    };

    fetch('http://localhost:8080/registrarC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosCita),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar la cita');
        }
        return response.json();
    })
    .then(data => {
        console.log('Cita registrada:', data);
        alert('Cita registrada exitosamente.');
        window.location.href = 'Home_Cliente.html';
    })
    .catch(error => {
        console.error('Error al registrar la cita:', error);
        alert('Hubo un error al registrar la cita.');
    });
}

function obtenerIdHorarioSeleccionado() {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    if (checkboxes.length > 0) {
        return checkboxes[0].value;
    } else {
        alert('Por favor, selecciona un horario para la cita.');
        throw new Error('No se ha seleccionado un horario.');
    }
}

function getUserIdFromLocalStorage() {
    var encodedId = localStorage.getItem('userId');
    if (encodedId) {
        return base64Decode(encodedId);
    }
    return null;
}

function base64Decode(str) {
    if (isBase64(str)) {
        return decodeURIComponent(escape(atob(str)));
    } else {
        console.log("La cadena no está en formato base64 válido.");
        return null;
    }
}

function isBase64(str) {
    var validBase64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    for (var i = 0; i < str.length; i++) {
        if (validBase64Chars.indexOf(str.charAt(i)) === -1) {
            return false;
        }
    }
    return str.length % 4 === 0;
}

function convertirDiaSemanaAId(diaSemana) {
    const dias = {
        'MONDAY': 'Lun-schedule',
        'TUESDAY': 'Mar-schedule',
        'WEDNESDAY': 'Mie-schedule',
        'THURSDAY': 'Jue-schedule',
        'FRIDAY': 'Vie-schedule'
    };
    return dias[diaSemana] || 'Dia-desconocido-schedule';
}

function showSchedule(scheduleId, selectedTab) {
    var schedules = document.querySelectorAll('.schedule');
    schedules.forEach(function(schedule) {
        schedule.style.display = 'none';
    });

    var selectedSchedule = document.getElementById(scheduleId);
    if (selectedSchedule) {
        selectedSchedule.style.display = 'block';
    }

    var tabs = document.querySelectorAll('.days button');
    tabs.forEach(function(tab) {
        tab.classList.remove('active');
    });

    selectedTab.classList.add('active');
}
