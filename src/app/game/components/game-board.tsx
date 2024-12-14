import { redirect } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";

import { ModalContainer } from "@/app/game/components/modals/modal-container";
import { symbols } from "@/app/game/config/slot-symbols";
import { useGameActions } from "@/app/game/hooks/use-game-actions";
import { useTaskProcessor } from "@/shared/hooks/use-task-processor";
import { useWebSocket } from "@/shared/provider/websocket/use-websocket";
import { gameStateAtom } from "@/shared/store/message-state-atom";
import { isTaskActiveAtom, taskProccessingUserIdAtom, taskQueueAtom } from "@/shared/store/task-atom";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";
import { Button } from "@/shared/ui/button";

import { useModal } from "../hooks/use-modal";
import { QuizType } from "../types/quiz";
import { Map } from "./map";
import { PlayerList } from "./player-list";

export const GameBoard = ({ roomCode }: { roomCode: string }) => {
	const { modalState, openExclusiveModal, closeAllModals } = useModal();
	const [target, setMovementTarget] = useState(0);
	const [quiz, setQuiz] = useState<QuizType>({
		questions: "",
		options: [],
		answer: "",
	});
	const [isShowQUizeAnser, setShowQuizeAnswer] = useState(false);

	const [increasedOtoshidama, setIncreasedOtoshidama] = useState(0);

	const { processNextTask } = useTaskProcessor({
		onPlayerTurnStart: () => {
			openExclusiveModal("showWhoseTurnModal");
		},
		onPlayerMovementDisplay: () => {
			openExclusiveModal("showSlotModal");
		},
		onPlayerFuridashitDisplay: () => {
			openExclusiveModal("showFuridashiModal");
		},
		onQuizStart: () => {
			openExclusiveModal("showQuizModal");
		},
		onOtoshidamaEvent: () => {
			openExclusiveModal("showOtoshidamaModal");
		},
		handleSetMovementTarget: (target: number) => {
			setMovementTarget(target);
			console.log("target", target);
		},
		handleSetIncreasedOtoshidama: (amount: number) => {
			setIncreasedOtoshidama(amount);
		},
		handleQuizAnswer: () => {
			setShowQuizeAnswer(true);
		},
		handleSetQuiz: (quiz: QuizType) => {
			setQuiz(quiz);
		},
	});
	const { sendMessage } = useWebSocket();
	const [gameState] = useAtom(gameStateAtom);
	const [currentUser] = useAtom(currentUserAtom);
	const [tasks] = useAtom(taskQueueAtom);
	const [isTaskActive, setIsTaskActive] = useAtom(isTaskActiveAtom);
	const [participatingUsers] = useAtom(participatingUsersAtom);
	const [taskProccessingUserId] = useAtom(taskProccessingUserIdAtom);

	useEffect(() => {
		console.log("Updated currentUser:", currentUser);
	}, [currentUser]);

	const { startGame, onTurnEnd, onAnswerQuiz } = useGameActions({
		sendMessage,
		currentUserId: currentUser?.id ?? "",
		roomCode,
	});

	const handleCloseModal = () => {
		closeAllModals();
		setIsTaskActive(false);
	};

	if (!currentUser) {
		// toast
		redirect({
			to: "/",
			search: {},
		});
	}

	useEffect(() => {
		console.log("Updated proccessingUserId:", taskProccessingUserId);
	}, [taskProccessingUserId]);

	useEffect(() => {
		if (gameState == "GAME_START" && !isTaskActive && tasks.length > 0) {
			processNextTask(2000);
		}
	}, [processNextTask, tasks, gameState, isTaskActive]);

	if (gameState === "ROOM_JOIN_RESPONSE") {
		return (
			<>
				<div className="flex flex-col gap-4">
					<div className="flex-1 overflow-auto">
						<div className="flex items-center justify-between pb-4">
							<h2 className="text-lg font-bold">ゲーム参加者</h2>
							<h3 className="flex items-center justify-end text-lg font-bold">
								<span className="inline-block rounded-md border border-gray-300 bg-gray-100 px-2 py-0.5 font-mono text-gray-800">
									{roomCode}
								</span>
							</h3>
						</div>
						<PlayerList players={participatingUsers} currentUserId={currentUser?.id ?? ""} />
					</div>
					<div className="fixed bottom-8 left-0 w-full px-4">
						<Button className="h-12 w-full" onClick={startGame}>
							Start Game
						</Button>
					</div>
				</div>
			</>
		);
	} else if (gameState === "GAME_END") {
		return <div>Game fineshed</div>;
	} else if (gameState === "GAME_START") {
		return (
			<div className="flex h-full flex-col">
				<div className=" fixed left-4 top-4 z-30 flex items-center rounded-lg bg-white p-2 shadow-md">
					<Coins className="mr-2 size-6 text-yellow-500" />
					<p className="text-lg font-bold text-gray-800">{currentUser?.otoshidama ? currentUser?.otoshidama : 0}円</p>
				</div>

				<div className="flex-1 pt-16">
					<Map
						participatingUsers={participatingUsers}
						playerPositions={participatingUsers.map((user) => user.position ?? 0)}
					/>
				</div>
				<div className="mt-8 flex flex-col items-center">
					<ModalContainer
						isShowQuizeAnser={isShowQUizeAnser}
						setShowQuizeAnswer={setShowQuizeAnswer}
						currentUser={currentUser!}
						participatingUsers={participatingUsers}
						proccessingUserId={taskProccessingUserId}
						modalState={modalState}
						onCloseModal={handleCloseModal}
						onAnswerQuiz={onAnswerQuiz}
						quiz={quiz}
						target={target}
						symbols={symbols}
						increasedOtoshidama={increasedOtoshidama}
					/>
				</div>
				<div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-center bg-transparent shadow-md">
					<div className="flex w-full justify-end px-4">
						{!isTaskActive && (
							<Button
								className="w-fit p-6 text-lg"
								onClick={onTurnEnd}
								disabled={taskProccessingUserId != currentUser!.id}
							>
								{taskProccessingUserId != currentUser!.id ? "待機中" : "ターン終了"}
							</Button>
						)}
					</div>
				</div>
				<p className="fixed bottom-2 left-2 text-xs text-white">design by freepik</p>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};
