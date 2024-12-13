import { PlayerTurnStart } from "@/api/server-message_pb";

export const handlePlayerTurnStart = (data: PlayerTurnStart) => {
	console.log("Player turn start:", data.data);
};
