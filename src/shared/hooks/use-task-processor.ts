import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

import { QuizType } from "@/app/game/types/quiz";
import { useTaskQueue } from "@/shared/hooks/use-task-queue";
import { showQuizeAnswerAtom } from "@/shared/store/quize-state-atom";
import { isTaskActiveAtom, taskProccessingUserIdAtom, taskQueueAtom } from "@/shared/store/task-atom";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";
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
	onPlayerFuridashitDisplay: () => void;
	onQuizStart: () => void;
	onOtoshidamaEvent: (otoshidama_amount: number) => void;
	handleSetIncreasedOtoshidama: (amount: number) => void;
	handleSetMovementTarget: (target: number) => void;
	handleSetQuiz: (quiz: QuizType) => void;
	handleQuizAnswer: () => void;
};

export const useTaskProcessor = ({
	onPlayerTurnStart,
	onPlayerMovementDisplay,
	onPlayerFuridashitDisplay,
	onQuizStart,
	onOtoshidamaEvent,
	handleSetIncreasedOtoshidama,
	handleSetMovementTarget,
	handleSetQuiz,
	handleQuizAnswer,
}: UseTaskProcessorProps) => {
	const { popTask } = useTaskQueue();
	const [tasks] = useAtom(taskQueueAtom);
	const [isTaskActive, setIsTaskActive] = useAtom(isTaskActiveAtom);
	const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
	const [, setParticipatingUsers] = useAtom(participatingUsersAtom);
	const [, setTaskProccessingUserId] = useAtom(taskProccessingUserIdAtom);
	const [, setShowQuizeAnswer] = useAtom(showQuizeAnswerAtom);

	// 同期を必要とする処理を行う
	useEffect(() => {
		if (tasks.length === 0) {
			return;
		}
		const task = tasks[0];
		const messageType = task.type.case;

		switch (messageType) {
			case "quizResult":
				handleQuizResult({
					data: task.type.value,
					setParticipatingUsers,
					handleSetIncreasedOtoshidama,
					currentUserId: currentUser?.id,
					handleQuizAnswer: handleQuizAnswer,
					setCurrentUser,
				});
				setShowQuizeAnswer(true);
				break;
			default:
				break;
		}
	}, [
		tasks,
		currentUser,
		setParticipatingUsers,
		handleSetIncreasedOtoshidama,
		setCurrentUser,
		setShowQuizeAnswer,
		handleQuizAnswer,
	]);

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
						handlePlayerTurnStart({
							data: task.type.value,
							setTaskProccessingUserId,
						});
						onPlayerTurnStart();
						break;
					case "sugorokuMoveUpdate":
						handleSugorokuMoveUpdate(task.type.value);
						break;
					case "playerMovementDisplay":
						handlePlayerMovementDisplay({
							data: task.type.value,
							setParticipatingUsers,
							handleSetMovementTarget,
							onPlayerMovementDisplay,
							onPlayerFuridashitDisplay,
						});
						break;
					case "quizStart":
						handleQuizStart({
							data: task.type.value,
							handleSetQuiz,
						});
						onQuizStart();
						break;
					case "otoshidamaEvent":
						handleOtoshidamaEvent({
							handleSetIncreasedOtoshidama,
							currentUserId: currentUser?.id,
							setCurrentUser,
							data: task.type.value,
							setParticipatingUsers,
						});
						onOtoshidamaEvent(task.type.value.data!.otoshidamaAmount);
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
			handleSetMovementTarget,
			setTaskProccessingUserId,
			handleSetQuiz,
			handleSetIncreasedOtoshidama,
			onPlayerFuridashitDisplay,
			setCurrentUser,
			currentUser,
		],
	);

	return { processNextTask };
};
