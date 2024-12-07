import { createContext } from "react";

import { OutboundMessage } from "./types/outbound-message";

interface WebSocketContextValue {
  isConnected: boolean;
  connectWebSocket: () => void;
  disconnectWebSocket: () => void;
  sendMessage: (data: OutboundMessage) => void;
}

export const WebSocketContext = createContext<WebSocketContextValue>({
  isConnected: false,
  connectWebSocket: () => {},
  disconnectWebSocket: () => {},
  sendMessage: () => {},
});
