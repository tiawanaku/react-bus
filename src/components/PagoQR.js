// src/components/PagoQR.js
import React from 'react';

const PagoQR = ({ goBack }) => {
    return (
        <div>
            <button className="btn btn-secondary mb-3" onClick={goBack}>
                ← Volver
            </button>
            <h2>PAGO con QR</h2>
            {/* Contenido específico para PAGO con QR */}
        </div>
    );
};

export default PagoQR;
