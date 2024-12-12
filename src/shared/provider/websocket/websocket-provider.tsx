import { create, fromBinary, toBinary } from "@bufbuild/protobuf";
import { ReactNode, useCallback, useEffect, useRef } from "react";

import { ClientMessage, ClientMessageSchema } from "@/api/client-message_pb";
import { ServerMessageSchema } from "@/api/server-message_pb";

import { useServerMessageHandler } from "./use-server-message-handler";
import { WebSocketContext } from "./websocket-context";

export interface WebSocketProviderProps {
	roomCode: string;
	children: ReactNode;
}

export const WebSocketProvider = ({ roomCode, children }: WebSocketProviderProps) => {
	const baseWsUrl = import.meta.env.VITE_WS_URL;
	const ws = useRef<WebSocket | null>(null);

	const handleMessage = useServerMessageHandler();

	const disconnectWebSocket = useCallback(() => {
		if (ws.current) {
			console.group("Disconnecting WebSocket...");
			ws.current.close();
			ws.current = null;
			console.log("WebSocket closed");
			console.groupEnd();
		}
	}, []);

	const sendMessage = useCallback((data: ClientMessage) => {
		if (ws.current && ws.current.readyState === WebSocket.OPEN) {
			const binary = toBinary(ClientMessageSchema, data);
			ws.current.send(binary);
		} else {
			console.warn("WebSocket is not open. Cannot send message.");
		}
	}, []);

	const connectWebSocket = useCallback(() => {
		console.log("Connecting WebSocket...", baseWsUrl);

		ws.current = new WebSocket(baseWsUrl);
		ws.current.onopen = () => {
			console.log("WebSocket connection opened");

			const message = create(ClientMessageSchema, {
				type: {
					case: "roomJoinRequest",
					value: {
						type: "ROOM_JOIN_REQUEST",
						data: {
							roomCode: roomCode,
						},
					},
				},
			});

			sendMessage(message);
		};

		ws.current.onmessage = async (e) => {
			const arrayBuffer = await e.data.arrayBuffer();
			const data = fromBinary(ServerMessageSchema, new Uint8Array(arrayBuffer));
			handleMessage(data);
		};

		ws.current.onclose = () => {
			console.log("WebSocket connection closed");
		};

		ws.current.onerror = (err) => {
			console.error("WebSocket error:", err);
		};
	}, [baseWsUrl, handleMessage, roomCode, sendMessage]);

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
