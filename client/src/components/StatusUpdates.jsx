import React, { useEffect, useState } from "react";

const StatusUpdates = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8001/ws/status/");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("Raw WebSocket message:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed WebSocket message:", data);
        setMessages((prevMessages) => [...prevMessages, data.message]);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Status Updates</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default StatusUpdates;
