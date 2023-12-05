document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        validarCredenciales();
    });
});


function validarCredenciales() {
    var tituloPagina = document.title;
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;

    // Objeto con los datos del usuario
    var userData = {
        correo: correo,
        clave: clave
    };

    // URL del endpoint de tu backend
    var url = 'http://localhost:8080/login'; // Ajusta según tu configuración

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas o error en el servidor');
        }
        return response.json();
    })
    .then(data => {
        if((data.id===1 && tituloPagina==='Inicio de Sesion Paciente')||(data.id!=1 && tituloPagina==='Inicio de Sesion Doctor')){
            console.log(tituloPagina)
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
            return;
        }
        else if(tituloPagina==='Inicio de Sesion Paciente'){
            loginSuccessHandler(data.id)
            console.log('Inicio de sesión exitoso', data);
            alert('Inicio de sesión exitoso');
            window.location.href = 'Home_Cliente.html';
        }
        else if(tituloPagina==='Inicio de Sesion Doctor'){
            loginSuccessHandler(data.id)
            console.log('Inicio de sesión exitoso', data);
            alert('Inicio de sesión exitoso');
            window.location.href = 'Home_Doctor.html';
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
    });

    
    // Función para codificar un string en base64
function base64Encode(str) {
    return btoa(unescape(encodeURIComponent(str)));
}


// Asumiendo que obtienes el id de usuario después del login
function loginSuccessHandler(userId) {
    // Codifica el ID del usuario
    var encodedId = base64Encode(userId.toString());

    // Almacena el ID codificado en localStorage
    localStorage.setItem('userId', encodedId);
}

}