import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './PagoTarjetaSube.css';

const PagoTarjetaSube = ({ goBack }) => {
    const [currentMessage, setCurrentMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    // Crear una instancia de Audio para el archivo MP3
    const paseAbordoAudio = new Audio('/audio/pase.mp3');

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
        <div className="pago-tarjeta-sube">
            <button className="back-button" onClick={goBack}>
                ← Volver
            </button>
            <h1>Estado de la Tarjeta SUBE</h1>
            {showMessage && (
                <div className={`message-container ${currentMessage === 'PASE a BORDO' ? 'pass' : 'stop'}`}>
                    <p className="message">{currentMessage}</p>
                    {currentMessage === 'PASE a BORDO' && (
                        <div className="bus-animation">
                            <div className="bus"></div>
                            <div className="passenger"></div>
                        </div>
                    )}
                    {currentMessage === 'RECARGUE su SALDO' && (
                        <div className="stop-sign">
                            <div className="stop-hand">✋</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PagoTarjetaSube;
