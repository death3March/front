import { useAtom } from "jotai/react";
import { useCallback } from "react";

import { ServerMessage } from "@/api/server-message_pb";
import { mapSequenceAtom } from "@/shared/store/map-atom";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";

import { messageStateAtom } from "../../store/mesaage-state-atom";

export const useServerMessageHandler = () => {
	const [, setMessageState] = useAtom(messageStateAtom);
	const [currentUser, setUserId] = useAtom(currentUserAtom);
	const [, setParticipatingUsers] = useAtom(participatingUsersAtom);
	const [, setMatSequence] = useAtom(mapSequenceAtom);

	return useCallback(
		(data: ServerMessage) => {
			console.group("Server message received", data.type.case);

			const messageType = data.type.case;

			if (messageType === "playerTurnStart") {
				console.log("Player turn start:", data.type.value);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "sugorokuMoveUpdate") {
				console.log("Sugoroku move update:", data.type.value);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "playerMovementDisplay") {
				const playerId = data.type.value.data?.playerId;
				const newPosition = data.type.value.data?.newPosition as number;

				if (playerId && newPosition) {
					console.log("Setting player position:", playerId, newPosition);
					setParticipatingUsers((prev) =>
						prev.map((user) => (user.id === playerId ? { ...user, position: newPosition } : user)),
					);
					setMessageState(data.type.value.$typeName);
				}
			} else if (messageType === "quizStart") {
				console.log("Quiz start:", data.type.value);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "quizResult") {
				console.log("Quiz result:", data.type.value);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "otoshidamaEvent") {
				console.log("Otoshidama event:", data.type.value);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "rankingUpdate") {
				console.log("Ranking update:", data.type.value);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "gameStart") {
				console.log("Game start:", data.type.value);
				setMatSequence(data.type.value.data?.map?.squares as number[]);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "gameEnd") {
				console.log("Game end:", data.type.value);
				setMessageState(data.type.value.$typeName);
			} else if (messageType === "roomJoinResponse") {
				console.log("Room join response:", data.type.value.data);
				setMessageState(data.type.value.$typeName);
				console.log("current User", currentUser);

				const playerId = data.type.value.data?.playerId;
				const nickname = "testda";

				console.log(playerId);
				if (playerId && nickname) {
					if (currentUser === null) {
						console.log("Setting user ID:", playerId);
						setUserId({
							id: playerId,
							nickname: nickname,
						});
					}

					setParticipatingUsers((prev) => {
						if (prev.some((user) => user.id === playerId)) {
							return prev;
						}
						return [...prev, { id: playerId, nickname }];
					});
				}
			} else {
				console.warn("Unknown server message type received:", data);
			}

			console.groupEnd();
		},
		[setMessageState, setUserId, setParticipatingUsers, setMatSequence, currentUser],
	);
};
