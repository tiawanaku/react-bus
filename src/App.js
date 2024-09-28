import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Conectar con el servidor Socket.IO
    const socket = io('http://localhost:3000'); // Cambia al puerto de tu servidor Node.js

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
      <h1>Mensajes Recibidos</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{`Topic: ${msg.topic}, Message: ${msg.message}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
