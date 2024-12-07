import { useWebSocket } from "@/shared/provider/websocket/use-websocket";

export const useWebSocketJoin = () =>{
  const { connectWebSocket, isConnected } = useWebSocket();

  const joinRoom = (room: string) => {
    connectWebSocket(room);
  };
  
  return {
    joinRoom,
    isConnected,
  };
}
