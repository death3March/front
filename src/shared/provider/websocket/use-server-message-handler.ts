import { useAtom } from "jotai";
import { useCallback } from "react";

import { ServerMessage } from "@/api/server-message_pb";
import { useTaskQueue } from "@/shared/hooks/use-task-queue";
import { mapSequenceAtom } from "@/shared/store/map-atom";
import { gameStateAtom } from "@/shared/store/message-state-atom";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";
import { handleGameEnd, handleGameStart, handleRoomJoinResponse } from "@/shared/tasks";
import { handleMemberJoin } from "@/shared/tasks/handle-member-join";

export const useServerMessageHandler = () => {
	const { pushTask } = useTaskQueue();
	const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
	const [, setMapSequence] = useAtom(mapSequenceAtom);
	const [, setParticipatingUsers] = useAtom(participatingUsersAtom);
	const [, setGameState] = useAtom(gameStateAtom);

	return useCallback(
		(task: ServerMessage) => {
			switch (task.type.case) {
				case "roomJoinResponse":
					setGameState("ROOM_JOIN_RESPONSE");
					handleRoomJoinResponse({
						data: task.type.value,
						currentUser: currentUser,
						setCurrentUser: setCurrentUser,
						setParticipatingUsers,
					});
					break;
				case "roomMemberData":
					console.log("roomMemberData", task.type.value);
					handleMemberJoin({
						data: task.type.value,
						setParticipatingUsers,
					});
					break;
				// ゲームの軸を担うものはqueueに積まずに即座に処理する
				case "gameStart":
					setGameState("GAME_START");
					handleGameStart({
						data: task.type.value,
						setMapSequence,
					});
					break;
				case "gameEnd":
					setGameState("GAME_END");
					handleGameEnd(task.type.value);
					break;
				default:
					pushTask(task);
			}
		},
		[setGameState, currentUser, setCurrentUser, setParticipatingUsers, setMapSequence, pushTask],
	);
};
