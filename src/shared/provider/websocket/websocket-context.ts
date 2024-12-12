import { createContext } from "react";

import { ClientMessage } from "@/api/client-message_pb";

interface WebSocketContextValue {
	ws: WebSocket | null;
	disconnectWebSocket: () => void;
	sendMessage: (data: ClientMessage) => void;
}

export const WebSocketContext = createContext<WebSocketContextValue>({
	ws: null,
	disconnectWebSocket: () => {},
	sendMessage: () => {},
});
