import {useEffect, useState} from "react";

import {Data} from "../Api/data.ts";
import {useWebSocket} from "../web-socket-provide.tsx";

export const useGameServer = () => {
    const [recvData, setRecvData] = useState<Data | null>(null);
    const [sendData, setSendData] = useState<Data | null>(null);
    const webSocket = useWebSocket();
    
    const MessageEventHandler = (event: MessageEvent) => {
        const message = Data.deserialize(new Uint8Array(event.data));
        setRecvData(message);
    }

    const SendData = (data: Data) => {
        webSocket?.ws?.send(data.serializeBinary());
    }

    useEffect(() => {
        const timer = setInterval(() => {
            if (sendData) {
                webSocket?.ws?.send(sendData.serializeBinary());
            }
        }, 16.7);

        webSocket?.ws?.addEventListener("message", MessageEventHandler);

        return () => {
            clearInterval(timer);
            webSocket?.ws?.removeEventListener("message", MessageEventHandler);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recvData,sendData, webSocket?.ws, {setSendData, SendData}]);
}