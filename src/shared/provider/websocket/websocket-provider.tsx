import React, { useEffect, useRef, useState } from "react";

import { InboundMessage } from "./types/inbound-message";
import { OutboundMessage } from "./types/outbound-message";
import { useWebSocketMessageHandler } from "./use-websocket-message-handler";
import { WebSocketContext } from "./websocket-context";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const baseWsUrl = "ws://localhost:8080";
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleMessage = useWebSocketMessageHandler();

  const connectWebSocket = (
    room: string,
  ) => {
    if (isConnected || wsRef.current) {
      disconnectWebSocket();
    }

    const fullUrl = `${baseWsUrl}/${room}`;
    console.log("Connecting WebSocket...", fullUrl);

    const ws = new WebSocket(fullUrl);
    ws.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    ws.onmessage = (e) => {
      const data: InboundMessage = JSON.parse(e.data);
      handleMessage(data);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      wsRef.current = null;
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    wsRef.current = ws;
    console.log("WebSocket connected");
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      console.log("Disconnecting WebSocket...");
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
      console.log("WebSocket disconnected");
    }
  };

  const sendMessage = (data: OutboundMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  };

  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        connectWebSocket,
        disconnectWebSocket,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
