// src/components/PagoTarjetaSube.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const PagoTarjetaSube = ({ goBack }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Conectar al servidor Socket.IO
        const socket = io('http://localhost:3000'); // Cambia esto al puerto de tu servidor Node.js

        // Escuchar los mensajes MQTT desde el servidor Node.js
        socket.on('mqtt_message', (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Desconectar cuando el componente se desmonte
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <button className="btn btn-secondary mb-3" onClick={goBack}>
                ← Volver
            </button>
            <h1>Mensajes Recibidos</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{`Topic: ${msg.topic}, Message: ${msg.message}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default PagoTarjetaSube;
