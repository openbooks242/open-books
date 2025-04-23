// Función para verificar si hay una sesión activa
function checkSession() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const userName = sessionStorage.getItem('userName');
    const loginLinks = document.querySelectorAll('.login-link');

    if (isLoggedIn && userName) {
        // Cambiar todos los enlaces de "Iniciar sesión" por "Bienvenido [nombre]"
        loginLinks.forEach(link => {
            link.innerHTML = `<i class="fas fa-user"></i> Bienvenido, ${userName}`;
            link.href = '#';
            link.onclick = showUserMenu;
        });
    }
}

// Función para mostrar el menú de usuario
function showUserMenu(event) {
    event.preventDefault();
    Swal.fire({
        title: 'Menú de Usuario',
        html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button onclick="viewProfile()" class="swal2-confirm swal2-styled">Ver Perfil</button>
                <button onclick="logout()" class="swal2-confirm swal2-styled" style="background-color: #dc3545;">Cerrar Sesión</button>
            </div>
        `,
        showConfirmButton: false
    });
}

// Función para ver el perfil
function viewProfile() {
    const userEmail = sessionStorage.getItem('userEmail');
    Swal.fire({
        title: 'Perfil de Usuario',
        html: `
            <div style="text-align: left;">
                <p><strong>Nombre:</strong> ${sessionStorage.getItem('userName')}</p>
                <p><strong>Email:</strong> ${userEmail}</p>
            </div>
        `,
        confirmButtonColor: '#FF4500'
    });
}

// Función para cerrar sesión
function logout() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('isLoggedIn');
    
    Swal.fire({
        title: '¡Hasta pronto!',
        text: 'Has cerrado sesión correctamente',
        icon: 'success',
        confirmButtonColor: '#FF4500'
    }).then(() => {
        window.location.href = 'index.html';
    });
}

// Ejecutar la verificación de sesión cuando se carga la página
document.addEventListener('DOMContentLoaded', checkSession); 