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
		const connectWebSocket = () => {
			ws.current = new WebSocket("ws://127.0.0.1:8080");

			ws.current.onopen = () => {
				console.log("WebSocket connection opened");
			};

			ws.current.onmessage = (event) => {
				console.log("Received message:", event.data);
				setMessage((prev) => (prev ? prev + event.data : event.data));
			};

			ws.current.onclose = () => {
				console.log("WebSocket connection closed");
				setTimeout(connectWebSocket, 1000);
			};

			ws.current.onerror = (error) => {
				console.error("WebSocket error:", error);
			};
		};

		connectWebSocket();

		return () => {
			if (ws.current) {
				ws.current.close();
				ws.current.onmessage = null;
			}
		};
	}, []);

	return <WebSocketContext.Provider value={{ ws: ws.current, message }}>{children}</WebSocketContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWebSocket = (): WebSocketContextType | null => {
	return useContext(WebSocketContext);
};
