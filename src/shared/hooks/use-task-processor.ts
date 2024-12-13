import { useAtom } from "jotai";
import { useCallback } from "react";

import { useTaskQueue } from "@/shared/hooks/use-task-queue";
import { isTaskActiveAtom, taskQueueAtom } from "@/shared/store/task-atom";
import { participatingUsersAtom } from "@/shared/store/user-id-atom";
import {
	handleOtoshidamaEvent,
	handlePlayerMovementDisplay,
	handlePlayerTurnStart,
	handleQuizResult,
	handleQuizStart,
	handleRankingUpdate,
	handleSugorokuMoveUpdate,
} from "@/shared/tasks";

export const useTaskProcessor = () => {
	const { popTask } = useTaskQueue();
	const [tasks] = useAtom(taskQueueAtom);
	const [isTaskActive] = useAtom(isTaskActiveAtom);
	const [, setIsTaskActive] = useAtom(isTaskActiveAtom);
	const [, setParticipatingUsers] = useAtom(participatingUsersAtom);

	const processNextTask = useCallback(() => {
		if (tasks.length === 0) {
			console.log("No tasks to process");
			return;
		}
		if (isTaskActive) {
			console.log("Task processing is already active");
			return;
		}

		const task = tasks[0];
		const messageType = task.type.case;
		console.group("Processing task:", messageType, task);

		setIsTaskActive(true);

		switch (messageType) {
			case "playerTurnStart":
				handlePlayerTurnStart(task.type.value);
				break;
			case "sugorokuMoveUpdate":
				handleSugorokuMoveUpdate(task.type.value);
				break;
			case "playerMovementDisplay":
				handlePlayerMovementDisplay({
					data: task.type.value,
					setParticipatingUsers,
				});
				break;
			case "quizStart":
				handleQuizStart(task.type.value);
				break;
			case "quizResult":
				handleQuizResult(task.type.value);
				break;
			case "otoshidamaEvent":
				handleOtoshidamaEvent(task.type.value);
				break;
			case "rankingUpdate":
				handleRankingUpdate(task.type.value);
				break;
			default:
				console.warn("Unknown server message type received:", task);
				break;
		}

		console.groupEnd();

		popTask();
	}, [tasks, isTaskActive, popTask, setIsTaskActive, setParticipatingUsers]);

	return { processNextTask };
};
