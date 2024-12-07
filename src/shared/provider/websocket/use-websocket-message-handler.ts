import { useCallback } from "react";

import { MessageData } from "./types/message-data";

export const useWebSocketMessageHandler = () => {
  return useCallback((data: MessageData) => {
    switch (data.type) {
      case "joinSuccess":
        console.log("Join success:", data);
        break;
      case "error":
        console.error("Error received:", data.message);
        break;
      default:
        console.warn("Unknown message type:", (data as { type: string }).type);
    }
  }, []);
};
