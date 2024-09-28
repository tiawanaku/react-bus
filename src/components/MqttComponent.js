// src/components/MqttComponent.js
import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MqttComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Configuración de conexión
    const options = {
      host: '64.225.54.113',
      port: 1883,
      protocol: 'mqtt',
      username: 'admin',
      password: 'elalto2024'
    };

    // Conectar al broker MQTT
    const client = mqtt.connect(options);

    client.on('connect', () => {
      console.log('Conectado al broker MQTT');

      // Suscribirse al topic
      client.subscribe('respuesta_lectura', (err) => {
        if (!err) {
          console.log('Suscrito al topic respuesta_lectura');
        } else {
          console.error('Error al suscribirse al topic:', err);
        }
      });
    });

    // Mostrar mensajes recibidos
    client.on('message', (topic, message) => {
      console.log(`Mensaje recibido en topic ${topic}: ${message.toString()}`);
      setMessages((prevMessages) => [...prevMessages, message.toString()]);
    });

    // Manejar errores
    client.on('error', (err) => {
      console.error('Error de conexión:', err);
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h2>Mensajes MQTT</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MqttComponent;
