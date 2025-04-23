<?php
require_once 'includes/auth_functions.php';

// Si el usuario ya está logueado, redirigir al inicio
if (isLoggedIn()) {
    header('Location: index.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Open Books</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <!-- Barra de navegación -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="index.html" class="logo-text">
                    <span class="logo-open">Open</span>
                    <span class="logo-books">Books</span>
                </a>
            </div>
        </div>
    </nav>

    <!-- Contenedor principal -->
    <div class="auth-container">
        <div class="auth-box">
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Iniciar Sesión</button>
                <button class="auth-tab" data-tab="register">Registrarse</button>
            </div>

            <!-- Formulario de Login -->
            <form id="loginForm" class="auth-form active">
                <div class="form-group">
                    <label for="loginUsername">Usuario o Email</label>
                    <input type="text" id="loginUsername" name="username" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Contraseña</label>
                    <input type="password" id="loginPassword" name="password" required>
                </div>
                <button type="submit" class="auth-button">Iniciar Sesión</button>
            </form>

            <!-- Formulario de Registro -->
            <form id="registerForm" class="auth-form">
                <div class="form-group">
                    <label for="registerUsername">Nombre de Usuario</label>
                    <input type="text" id="registerUsername" name="username" required>
                </div>
                <div class="form-group">
                    <label for="registerEmail">Email</label>
                    <input type="email" id="registerEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="registerFullName">Nombre Completo</label>
                    <input type="text" id="registerFullName" name="full_name" required>
                </div>
                <div class="form-group">
                    <label for="registerPassword">Contraseña</label>
                    <input type="password" id="registerPassword" name="password" required>
                </div>
                <button type="submit" class="auth-button">Registrarse</button>
            </form>
        </div>
    </div>

    <script>
        // Manejo de tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Remover clase active de todos los tabs y forms
                document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
                
                // Agregar clase active al tab y form seleccionado
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab + 'Form').classList.add('active');
            });
        });

        // Manejo del formulario de login
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            
            try {
                const response = await fetch('process/login_process.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Bienvenido!',
                        text: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        window.location.href = 'index.php';
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al procesar tu solicitud'
                });
            }
        });

        // Manejo del formulario de registro
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            
            try {
                const response = await fetch('process/register_process.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Registro exitoso!',
                        text: data.message,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        // Cambiar a la pestaña de login
                        document.querySelector('[data-tab="login"]').click();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al procesar tu solicitud'
                });
            }
        });
    </script>
</body>
</html> 