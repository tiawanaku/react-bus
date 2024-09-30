// src/components/Home.js
import React from 'react';

const Home = ({ onPaymentSelect }) => {
    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="mb-4">Seleccione un método de pago</h2>
            <button 
                className="btn btn-primary mb-3" 
                onClick={() => onPaymentSelect('QR')}
            >
                PAGO con QR
            </button>
            <button 
                className="btn btn-primary mb-3" 
                onClick={() => onPaymentSelect('TARJETA_SUBE')}
            >
                PAGO con TARJETA SUBE
            </button>
            <button 
                className="btn btn-primary mb-3" 
                onClick={() => onPaymentSelect('EFECTIVO')}
            >
                PAGO EN EFECTIVO
            </button>
            <button 
                className="btn btn-primary" 
                onClick={() => onPaymentSelect('Criptomonedas')}
            >
                PAGO con Criptomonedas
            </button>
        </div>
    );
};

export default Home;
