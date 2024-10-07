import React, { useState, useEffect } from 'react';
import './PagoEfectivo.css';
import io from 'socket.io-client';

const PagoEfectivo = ({ goBack, username }) => { // Recibe username como prop
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [currentMessage, setCurrentMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    // Crea una instancia de Audio para el archivo MP3
    const paseAbordoAudio = new Audio('/audio/pase.mp3');

    const handlePayment = async (type) => {
        setIsLoading(true);
        setMessage('');
    
        try {
            const response = await fetch('http://localhost:8545/bus_20', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ valor: "1", tipo: type, usuario: username }), // Incluye el username en el JSON
            });
    
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
    
            const data = await response.text();
            setMessage(`Pago de boleto ${type} exitoso`);
            listenToWebSocket();
        } catch (error) {
            console.error('Payment error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const listenToWebSocket = () => {
        const socket = io('http://localhost:3000');

        socket.on('mqtt_message', (data) => {
            if (data.message === '1') {
                setCurrentMessage('PASE a BORDO');
                setShowMessage(true);
                // Reproduce el audio cuando se muestra el mensaje "PASE a BORDO"
                paseAbordoAudio.play();
            } else if (data.message === '0') {
                setCurrentMessage('RECARGUE su SALDO');
                setShowMessage(true);
            }
        });

        return () => {
            socket.disconnect();
        };
    };

    useEffect(() => {
        const socket = io('http://68.183.138.159:3000');

        socket.on('mqtt_message', (data) => {
            if (data.message === '1') {
                setCurrentMessage('PASE a BORDO');
                setShowMessage(true);
                // Reproduce el audio cuando se muestra el mensaje "PASE a BORDO"
                paseAbordoAudio.play();
            } else if (data.message === '0') {
                setCurrentMessage('RECARGUE su SALDO');
                setShowMessage(true);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        let timer;
        if (showMessage) {
            timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [showMessage]);

    return (
        <div className="pago-efectivo-container">
            <button className="back-button" onClick={goBack}>
                ← Volver
            </button>
            <h2>PAGO EN EFECTIVO</h2>
            <div className="buttons-container">
                <button 
                    className="payment-button preferential"
                    onClick={() => handlePayment('Preferencial')}
                    disabled={isLoading}
                >
                    Boleto Preferencial
                    <span className="cost">1 Bs</span>
                </button>
                <button 
                    className="payment-button regular"
                    onClick={() => handlePayment('Regular')}
                    disabled={isLoading}
                >
                    Boleto Regular
                    <span className="cost">1.50 Bs</span>
                </button>
            </div>
            {isLoading && <p className="loading">Procesando pago...</p>}
            {message && <p className="message">{message}</p>}
            {showMessage && <p className="message">{currentMessage}</p>}
        </div>
    );
};

export default PagoEfectivo;

