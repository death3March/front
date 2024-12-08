import { createContext } from "react";

import { ClientMessage } from "./types/client-message";

interface WebSocketContextValue {
  isConnected: boolean;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
  sendMessage: (data: ClientMessage) => void;
}

export const WebSocketContext = createContext<WebSocketContextValue>({
  isConnected: false,
  connectWebSocket: () => {},
  disconnectWebSocket: () => {},
  sendMessage: () => {},
});
