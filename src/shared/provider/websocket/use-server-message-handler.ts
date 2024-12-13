import { useAtom } from "jotai";
import { useCallback } from "react";

import { ServerMessage } from "@/api/server-message_pb";
import { useTaskQueue } from "@/shared/hooks/use-task-queue";
import { mapSequenceAtom } from "@/shared/store/map-atom";
import { messageStateAtom } from "@/shared/store/message-state-atom";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";
import { handleGameEnd, handleGameStart, handleRoomJoinResponse } from "@/shared/tasks";

export const useServerMessageHandler = () => {
	const { pushTask } = useTaskQueue();
	const [currentUser, setUserId] = useAtom(currentUserAtom);
	const [, setMapSequence] = useAtom(mapSequenceAtom);
	const [, setParticipatingUsers] = useAtom(participatingUsersAtom);
	const [, setMessages] = useAtom(messageStateAtom);

	return useCallback(
		(task: ServerMessage) => {
			switch (task.type.case) {
				case "roomJoinResponse":
					setMessages(task.type.value);
					handleRoomJoinResponse({
						data: task.type.value,
						currentUser: currentUser,
						setUserId: setUserId,
						setParticipatingUsers,
					});
					break;
				// ゲームの軸を担うものはqueueに積まずに即座に処理する
				case "gameStart":
					setMessages(task.type.value);
					handleGameStart({
						data: task.type.value,
						setMapSequence,
					});
					break;
				case "gameEnd":
					setMessages(task.type.value);
					handleGameEnd(task.type.value);
					break;
				default:
					pushTask(task);
			}
		},
		[pushTask, currentUser, setUserId, setMapSequence, setParticipatingUsers, setMessages],
	);
};
