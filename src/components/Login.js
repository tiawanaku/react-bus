// Login.js
import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('http://64.225.54.113:9052/login_bus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': '3l4Lt02024',
                },
                body: JSON.stringify({
                    user: username,
                    password: password,
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();

            if (data[0].result === 1) {
                setMessage('Login exitoso!');
                onLogin(username); // Asegúrate de pasar el username aquí
            } else {
                setMessage('Credenciales incorrectas.');
            }
        } catch (error) {
            setMessage('Error al realizar la solicitud.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="username">Usuario</label>
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>
            {message && (
                <p className={`message ${message === 'Login exitoso!' ? 'success' : 'error'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default Login;
