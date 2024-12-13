import { redirect } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { useEffect, useState } from "react";

import { ModalContainer } from "@/app/game/components/modals/modal-container";
import { symbols } from "@/app/game/config/slot-symbols";
import { useGameActions } from "@/app/game/hooks/use-game-actions";
import { useTaskProcessor } from "@/shared/hooks/use-task-processor";
import { useWebSocket } from "@/shared/provider/websocket/use-websocket";
import { gameStateAtom } from "@/shared/store/message-state-atom";
import { isTaskActiveAtom, taskQueueAtom } from "@/shared/store/task-atom";
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
	});

	const { processNextTask } = useTaskProcessor({
		onPlayerTurnStart: () => {
			openExclusiveModal("showWhoseTurnModal");
		},
		onPlayerMovementDisplay: () => {
			openExclusiveModal("showSlotModal");
		},
		onQuizStart: () => {
			openExclusiveModal("showQuizModal");
		},
		onOtoshidamaEvent: () => {
			openExclusiveModal("showOtoshidamaModal");
		},
		handleSetTurnUserID: (userID: string) => {
			setTurnUserID(userID);
		},
		handleSetMovementTarget: (target: number) => {
			setMovementTarget(target);
			console.log("target", target);
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
	const [turnUserID, setTurnUserID] = useState("");

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
		if (gameState == "GAME_START" && !isTaskActive && tasks.length > 0) {
			processNextTask(2000);
		}
	}, [processNextTask, tasks, gameState, isTaskActive]);

	if (gameState === "ROOM_JOIN_RESPONSE") {
		return (
			<>
				<Button className="rounded bg-green-500 px-4 py-2 text-white" onClick={startGame}>
					Start Game
				</Button>

				<div className="flex h-full flex-col gap-4">
					<div className="flex-1 overflow-auto">
						<h2 className="pb-4 text-lg font-bold">ゲーム参加者</h2>
						<PlayerList players={participatingUsers} currentUserId={currentUser?.id ?? ""} />
					</div>
					<div>
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
				<div className="flex-1 overflow-auto">
					<Map playerPositions={participatingUsers.map((user) => user.position ?? 0)} />
				</div>
				<div className="mt-8 flex flex-col items-center">
					<ModalContainer
						currentUser={currentUser!}
						modalState={modalState}
						onCloseModal={handleCloseModal}
						onAnswerQuiz={onAnswerQuiz}
						quiz={quiz}
						target={target}
						symbols={symbols}
					/>
				</div>
				<div>
					<Button className="w-full" onClick={onTurnEnd} disabled={turnUserID != currentUser!.id}>
						{turnUserID != currentUser!.id ? "待機中" : "ターン終了"}
					</Button>
				</div>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};
