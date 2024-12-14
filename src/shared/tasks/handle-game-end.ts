import { GameEnd } from "@/api/server-message_pb";

export const handleGameEnd = (data: GameEnd) => {
	console.log("Game end:", data.data);
};
