import React, { useState } from 'react';
import backgroundImage from '../images/IMG_9812.JPG';
import logoLeft from '../images/logo_alcaldia.png'; // Importa el logo para la parte superior izquierda
import logoRight from '../images/logo_smde.png'; // Importa el logo para la parte superior derecha

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8415/login_bus', {
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
                onLogin(); // Llamar a la función onLogin para notificar al componente padre
            } else {
                setMessage('Credenciales incorrectas.');
            }
        } catch (error) {
            setMessage('Error al realizar la solicitud.');
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                width: '100vw', // Añadido para que ocupe todo el ancho
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative', // Añadir posición relativa para posicionar logos
            }}
        >
            {/* Contenedor para los logos */}
            <div style={{ position: 'absolute', top: 20, left: 20 }}>
                <img src={logoLeft} alt="Logo Izquierda" style={{ width: '100px' }} />
            </div>
            <div style={{ position: 'absolute', top: 20, right: 20 }}>
                <img src={logoRight} alt="Logo Derecha" style={{ width: '100px' }} />
            </div>

            <div className="container mt-5" style={{ maxWidth: '400px', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center mb-4" style={{ color: '#00FFFF' }}>Login</h2>
                <form onSubmit={handleLogin} className="p-4 border rounded" style={{ backgroundColor: '#f0f8ff' }}>
                    <div className="form-group">
                        <label htmlFor="username" style={{ color: '#00FFFF' }}>Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ingresa tu usuario"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" style={{ color: '#00FFFF' }}>Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#00FFFF', borderColor: '#00FFFF' }}>
                        Ingresar
                    </button>
                </form>
                {message && (
                    <p className="text-center mt-3" style={{ color: message === 'Login exitoso!' ? '#00FF00' : '#FF0000' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
