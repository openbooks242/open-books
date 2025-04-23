<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'openbooks');

// Configuración de la aplicación
define('APP_NAME', 'Open Books');
define('APP_URL', 'http://localhost/openbooks');

// Configuración de sesión
session_start();

// Conexión a la base de datos
try {
    $conn = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME, DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}

// Funciones de utilidad
function sanitize($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function redirect($path) {
    header("Location: " . APP_URL . "/" . $path);
    exit();
}

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
    return isset($_SESSION['user_id']);
}
?> 