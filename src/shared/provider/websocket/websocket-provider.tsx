import React, { useCallback, useEffect, useRef, useState } from "react";

import { ClientMessage } from "./pb/client-message";
import { ServerMessage } from "./pb/server-message";
import { useServerMessageHandler } from "./use-server-message-handler";
import { WebSocketContext } from "./websocket-context";

interface WebSocketProviderProps {
	children: React.ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
	const baseWsUrl = "ws://127.0.0.1:8080";
	const wsRef = useRef<WebSocket | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const handleMessage = useServerMessageHandler();

	const disconnectWebSocket = useCallback(() => {
		if (wsRef.current) {
			console.log("Disconnecting WebSocket...");
			wsRef.current.close();
			wsRef.current = null;
			setIsConnected(false);
			console.log("WebSocket disconnected");
		}
	}, []);

	const connectWebSocket = useCallback(() => {
		if (isConnected || wsRef.current) {
			disconnectWebSocket();
		}

		console.log("Connecting WebSocket...", baseWsUrl);

		const ws = new WebSocket(baseWsUrl);
		ws.onopen = () => {
			console.log("WebSocket connection established");
			setIsConnected(true);
		};

		ws.onmessage = (e) => {
			const data: ServerMessage = e.data;
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
	}, [baseWsUrl, isConnected, disconnectWebSocket, handleMessage]);

	const sendMessage = useCallback((data: ClientMessage) => {
		if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
			wsRef.current.send(data.serializeBinary());
		} else {
			console.warn("WebSocket is not open. Cannot send message.");
		}
	}, []);

	useEffect(() => {
		connectWebSocket();

		return () => {
			disconnectWebSocket();
		};
	}, [connectWebSocket, disconnectWebSocket]);

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
