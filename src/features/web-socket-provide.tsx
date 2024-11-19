import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

interface WebSocketProviderProps {
	children: ReactNode;
}

interface WebSocketContextType {
	ws: WebSocket | null;
	message: string | null;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
	const ws = useRef<WebSocket | null>(null);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		ws.current = new WebSocket("ws://127.0.0.1:8080");

		ws.current.onopen = () => {
			console.log("WebSocket connection opened");
		};

		ws.current.onmessage = (event) => {
			console.log("Received message:", event.data);
			setMessage(event.data);
		};

		ws.current.onclose = () => {
			console.log("WebSocket connection closed");
		};

		ws.current.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		return () => {
			if (ws.current) {
				ws.current.close();
			}
		};
	}, []);

	return <WebSocketContext.Provider value={{ ws: ws.current, message }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = (): WebSocketContextType | null => {
	return useContext(WebSocketContext);
};
