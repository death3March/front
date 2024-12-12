import { useAtom } from "jotai/react";
import { useCallback } from "react";

import { ServerMessage } from "@/api/server-message_pb";
import { userIdAtom } from "@/shared/store/user-id-atom";

import { messageStateAtom } from "../../store/mesaage-state-atom";

export const useServerMessageHandler = () => {
	const [, setMessageState] = useAtom(messageStateAtom);
	const [, setUserId] = useAtom(userIdAtom);
	return useCallback(
		(data: ServerMessage) => {
			switch (data.type.case) {
				case "playerTurnStart":
					console.log("Player turn start:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "sugorokuMoveUpdate":
					console.log("Sugoroku move update:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "playerMovementDisplay":
					console.log("Player movement display:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "quizStart":
					console.log("Quiz start:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "quizResult":
					console.log("Quiz result:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "otoshidamaEvent":
					console.log("Otoshidama event:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "rankingUpdate":
					console.log("Ranking update:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "gameStart":
					console.log("Game start:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "gameEnd":
					console.log("Game end:", data.type.value);
					setMessageState(data.type.value.$typeName);
					break;
				case "roomJoinResponse":
					console.log("Room join response:", data.type.value.data);
					setMessageState(data.type.value.$typeName);
					setUserId(data.type.value.data?.playerId ?? null);
					break;
				default:
					console.warn("Unknown server message type received:", data);
			}
		},
		[setMessageState, setUserId],
	);
};
