document.addEventListener('DOMContentLoaded', function() {
    var logoutLink = document.getElementById('logoutLink');

    if(logoutLink) {
        logoutLink.addEventListener('click', function() {
            localStorage.clear(); // Esto limpiará todo el localStorage
            // Si quieres limpiar elementos específicos, usa localStorage.removeItem('clave');
            localStorage.removeItem('userId')
            window.location.href = 'index.html'; // Redirige al usuario a la página de inicio de sesión
        });
    }
});
