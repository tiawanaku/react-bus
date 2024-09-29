// src/components/PagoEfectivo.js
import React from 'react';

const PagoEfectivo = ({ goBack }) => {
    return (
        <div>
            <button className="btn btn-secondary mb-3" onClick={goBack}>
                ← Volver
            </button>
            <h2>PAGO EN EFECTIVO</h2>
            {/* Contenido específico para PAGO EN EFECTIVO */}
        </div>
    );
};

export default PagoEfectivo;
