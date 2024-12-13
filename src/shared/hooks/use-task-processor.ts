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

type UseTaskProcessorProps = {
	onPlayerTurnStart: () => void;
	onPlayerMovementDisplay: () => void;
	onQuizStart: () => void;
	onOtoshidamaEvent: () => void;
};

export const useTaskProcessor = ({
	onPlayerTurnStart,
	onPlayerMovementDisplay,
	onQuizStart,
	onOtoshidamaEvent,
}: UseTaskProcessorProps) => {
	const { popTask } = useTaskQueue();
	const [tasks] = useAtom(taskQueueAtom);
	const [isTaskActive] = useAtom(isTaskActiveAtom);
	const [, setIsTaskActive] = useAtom(isTaskActiveAtom);
	const [, setParticipatingUsers] = useAtom(participatingUsersAtom);

	// タスクを処理する
	// delayを指定することで、処理までの待ち時間を設定できる
	const processNextTask = useCallback(
		(delay = 2000) => {
			if (tasks.length === 0) {
				console.log("No tasks to process");
				return;
			}
			if (isTaskActive == null) {
				console.log("Task processing is already active");
				return;
			}

			const task = tasks[0];
			const messageType = task.type.case;
			console.group("Processing task:", messageType, task);

			setIsTaskActive(true);

			setTimeout(() => {
				switch (messageType) {
					case "playerTurnStart":
						handlePlayerTurnStart(task.type.value);
						onPlayerTurnStart();
						break;
					case "sugorokuMoveUpdate":
						handleSugorokuMoveUpdate(task.type.value);
						break;
					case "playerMovementDisplay":
						handlePlayerMovementDisplay({
							data: task.type.value,
							setParticipatingUsers,
						});
						onPlayerMovementDisplay();
						break;
					case "quizStart":
						handleQuizStart(task.type.value);
						onQuizStart();
						break;
					case "quizResult":
						handleQuizResult(task.type.value);
						break;
					case "otoshidamaEvent":
						handleOtoshidamaEvent(task.type.value);
						onOtoshidamaEvent();
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
			}, delay);
		},
		[
			tasks,
			isTaskActive,
			popTask,
			setIsTaskActive,
			setParticipatingUsers,
			onPlayerTurnStart,
			onPlayerMovementDisplay,
			onQuizStart,
			onOtoshidamaEvent,
		],
	);

	return { processNextTask };
};
