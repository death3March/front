import { createContext } from "react";

import { ClientMessage } from "./pb/client-message";

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
