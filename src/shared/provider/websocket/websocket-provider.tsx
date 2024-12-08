import React, { useCallback, useEffect, useRef } from "react";

import { ClientMessage, RoomJoinRequest } from "./pb/client-message";
import { ServerMessage } from "./pb/server-message";
import { useServerMessageHandler } from "./use-server-message-handler";
import { WebSocketContext } from "./websocket-context";

interface WebSocketProviderProps {
	playerId: number;
	roomCode: string;
	children: React.ReactNode;
}

export const WebSocketProvider = ({ playerId, roomCode, children }: WebSocketProviderProps) => {
	const baseWsUrl = "ws://127.0.0.1:8080";
	const ws = useRef<WebSocket | null>(null);

	const handleMessage = useServerMessageHandler();

	const disconnectWebSocket = useCallback(() => {
		if (ws.current) {
			console.log("Disconnecting WebSocket...");
			ws.current.close();
			ws.current = null;
			console.log("---WebSocket disconnected---");
		}
	}, []);

	const sendMessage = useCallback((data: ClientMessage) => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			console.log("Sending message:", data.serializeBinary());
			ws.current.send(data.serializeBinary());
		} else {
			console.log(ws.current, ws.current?.readyState);
			console.warn("WebSocket is not open. Cannot send message.");
		}
	}, []);

	const connectWebSocket = useCallback(() => {
		console.log("Connecting WebSocket...", baseWsUrl);

		ws.current = new WebSocket(baseWsUrl);
		ws.current.onopen = () => {
			console.log("WebSocket connection opened");
			const joinRequestData = new RoomJoinRequest.Data();
			joinRequestData.playerId = playerId;
			joinRequestData.roomCode = roomCode;

			const joinRequest = new RoomJoinRequest();
			joinRequest.data = joinRequestData;

			const message = new ClientMessage();
			message.roomJoinRequest = joinRequest;
			sendMessage(message);
		};

		ws.current.onmessage = (e) => {
			const data: ServerMessage = e.data;
			console.log("Received message:", e.data);
			handleMessage(data);
		};

		ws.current.onclose = () => {
			console.log("WebSocket connection closed");
		};

		ws.current.onerror = (err) => {
			console.error("WebSocket error:", err);
		};
	}, [baseWsUrl, handleMessage, playerId, roomCode, sendMessage]);

	useEffect(() => {
		connectWebSocket();
		return () => {
			disconnectWebSocket();
		};
	}, [disconnectWebSocket, connectWebSocket]);

	return (
		<WebSocketContext.Provider
			value={{
				ws: ws.current,
				disconnectWebSocket: disconnectWebSocket,
				sendMessage: sendMessage,
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};
