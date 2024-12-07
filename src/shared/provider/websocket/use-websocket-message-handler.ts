import { useCallback } from "react";

import { InboundMessage } from "./types/inbound-message";

export const useWebSocketMessageHandler = () => {
    return useCallback((data: InboundMessage) => {
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
