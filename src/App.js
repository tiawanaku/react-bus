// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import Login from './components/Login';
import Home from './components/Home';
import PagoTarjetaSube from './components/PagoTarjetaSube';
import PagoEfectivo from './components/PagoEfectivo';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); // Estado para almacenar el username
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    // Función para manejar el login exitoso y almacenar el username
    const handleLogin = (user) => {
        console.log('Logged in as:', user); // Depuración: verifica el valor de 'user'
        setUsername(user); // Almacena el username
        setIsLoggedIn(true);
    };

    // Función para manejar la selección de métodos de pago
    const handlePaymentSelection = (method) => {
        setSelectedPaymentMethod(method);
    };

    // Función para volver al "HOME"
    const goBackToHome = () => {
        setSelectedPaymentMethod('');
    };

    return (
        <div className="App container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            {/* Renderizar el componente de Login si el usuario no está autenticado */}
            {!isLoggedIn ? (
                <Login onLogin={handleLogin} /> // Pasa la función handleLogin al componente Login
            ) : (
                <>
                    {/* Mostrar el contenido dependiendo del método de pago seleccionado */}
                    {!selectedPaymentMethod && <Home onPaymentSelect={handlePaymentSelection} />}
                    {selectedPaymentMethod === 'TARJETA_SUBE' && <PagoTarjetaSube goBack={goBackToHome} />}
                    {selectedPaymentMethod === 'EFECTIVO' && <PagoEfectivo goBack={goBackToHome} username={username} />} {/* Pasa el username al componente PagoEfectivo */}
                </>
            )}
        </div>
    );
}

export default App;
