// Home.js
import React, { useState, useEffect } from 'react';
import './Home.css'; // Asegúrate de crear este archivo CSS

const Home = ({ onPaymentSelect, onLogout }) => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        return date.toLocaleString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="home-container">
            <h2 className="title">Seleccione un método de pago</h2>
            <div className="payment-buttons">
                <button 
                    className="payment-button sube-button"
                    onClick={() => onPaymentSelect('TARJETA_SUBE')}
                >
                    <span className="emoji">💳</span>
                    PAGO con TARJETA SUBE
                    <div className="datetime">{formatDateTime(currentDateTime)}</div>
                </button>
                <button 
                    className="payment-button cash-button"
                    onClick={() => onPaymentSelect('EFECTIVO')}
                >
                    <span className="emoji">💵</span>
                    PAGO EN EFECTIVO
                    <div className="datetime">{formatDateTime(currentDateTime)}</div>
                </button>
            </div>
            <button 
                className="logout-button"
                onClick={() => {
                    console.log('Botón de cerrar sesión presionado');
                    onLogout();
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

export default Home;
