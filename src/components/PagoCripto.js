import React from 'react';
import UniPayment from 'unipayment-client';
import configuration from './configuration.json';

const PagoCripto = ({ goBack }) => {
    const client = new UniPayment.uni_payment_client(configuration);

    const handleCreateInvoice = () => {
        const parameters = {
            app_id: 'ff1480fb-8bf5-474e-99cc-95fb4dcc5d28',
            title: 'PAGO con Criptomonedas',
            description: 'Descripción del pago',
            lang: 'es',
            price_amount: 0.22, // Cambia esto según el monto a pagar
            price_currency: 'USD',
            notify_url: '',
            redirect_url: '',
            order_id: '#123456' // Puedes generar un ID único para cada transacción
        };

        console.log('Parámetros para crear la factura:', parameters);

        client.createInvoice(parameters).then(response => {
            console.log(response);
            if (response.code === 'OK') {
                // Redirigir al usuario a la URL de la factura
                window.location.href = response.data.invoice_url;
            }
        }).catch(error => {
            console.error('Error al crear la factura:', error);
        });
    };

    return (
        <div>
            <button className="btn btn-secondary mb-3" onClick={goBack}>
                ← Volver
            </button>
            <h2>PAGO con Criptomonedas</h2>
            <button className="btn btn-primary" onClick={handleCreateInvoice}>
                Crear Factura
            </button>
            {/* Aquí puedes añadir más contenido relacionado con el pago */}
        </div>
    );
};

export default PagoCripto;
