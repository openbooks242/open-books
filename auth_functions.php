<?php
session_start();
require_once __DIR__ . '/../config/database.php';

function registerUser($username, $email, $password, $full_name) {
    global $pdo;
    
    try {
        // Verificar si el usuario ya existe
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $email]);
        
        if ($stmt->rowCount() > 0) {
            return ['success' => false, 'message' => 'El usuario o email ya existe'];
        }
        
        // Hash de la contraseña
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        // Insertar nuevo usuario
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)");
        $stmt->execute([$username, $email, $hashed_password, $full_name]);
        
        return ['success' => true, 'message' => 'Usuario registrado exitosamente'];
    } catch (PDOException $e) {
        return ['success' => false, 'message' => 'Error al registrar usuario: ' . $e->getMessage()];
    }
}

function loginUser($username, $password) {
    global $pdo;
    
    try {
        // Buscar usuario
        $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = ? OR email = ?");
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($password, $user['password'])) {
            return ['success' => false, 'message' => 'Usuario o contraseña incorrectos'];
        }
        
        // Generar token de sesión
        $session_token = bin2hex(random_bytes(32));
        $expires_at = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        // Guardar sesión
        $stmt = $pdo->prepare("INSERT INTO sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)");
        $stmt->execute([$user['id'], $session_token, $expires_at]);
        
        // Establecer cookie de sesión
        setcookie('session_token', $session_token, time() + 86400, '/', '', true, true);
        
        return ['success' => true, 'message' => 'Login exitoso'];
    } catch (PDOException $e) {
        return ['success' => false, 'message' => 'Error al iniciar sesión: ' . $e->getMessage()];
    }
}

function isLoggedIn() {
    global $pdo;
    
    if (!isset($_COOKIE['session_token'])) {
        return false;
    }
    
    try {
        $stmt = $pdo->prepare("
            SELECT u.id, u.username 
            FROM users u 
            JOIN sessions s ON u.id = s.user_id 
            WHERE s.session_token = ? AND s.expires_at > NOW()
        ");
        $stmt->execute([$_COOKIE['session_token']]);
        
        return $stmt->fetch() ? true : false;
    } catch (PDOException $e) {
        return false;
    }
}

function logoutUser() {
    global $pdo;
    
    if (isset($_COOKIE['session_token'])) {
        try {
            $stmt = $pdo->prepare("DELETE FROM sessions WHERE session_token = ?");
            $stmt->execute([$_COOKIE['session_token']]);
        } catch (PDOException $e) {
            // Log error
        }
        
        setcookie('session_token', '', time() - 3600, '/', '', true, true);
    }
    
    session_destroy();
}
?> 