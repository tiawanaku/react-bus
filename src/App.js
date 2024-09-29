// src/App.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import Login from './components/Login';
import Home from './components/Home';
import PagoQR from './components/PagoQR';
import PagoTarjetaSube from './components/PagoTarjetaSube';
import PagoEfectivo from './components/PagoEfectivo';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    // Función para manejar el login exitoso
    const handleLogin = () => {
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
                <Login onLogin={handleLogin} />
            ) : (
                // Mostrar el contenido dependiendo del método de pago seleccionado
                <>
                    {!selectedPaymentMethod && <Home onPaymentSelect={handlePaymentSelection} />}
                    {selectedPaymentMethod === 'QR' && <PagoQR goBack={goBackToHome} />}
                    {selectedPaymentMethod === 'TARJETA_SUBE' && <PagoTarjetaSube goBack={goBackToHome} />}
                    {selectedPaymentMethod === 'EFECTIVO' && <PagoEfectivo goBack={goBackToHome} />}
                </>
            )}
        </div>
    );
}

export default App;
