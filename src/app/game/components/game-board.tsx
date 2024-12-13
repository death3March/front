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
	const [otoshidama, setOtoshidama] = useState<{
		total: number;
		get: number;
	}>({
		total: 0,
		get: 0,
	});
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
		handleSetOtoshidama: (otoshidama_amount: number) => {
			setOtoshidama((prev) => ({
				total: prev.total + otoshidama_amount,
				get: otoshidama_amount,
			}));
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
				<div className="text-2xl font-bold">
					<p>{currentUser?.nickname ?? ""}</p>
					<p>獲得額: {otoshidama.total}</p>
				</div>
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
						otoshidama={otoshidama}
					/>
				</div>
				<div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-center bg-white shadow-md">
					<div className="w-full px-4">
						<Button
							className="w-full rounded-lg bg-gray-800 font-semibold text-white transition hover:bg-gray-600"
							onClick={onTurnEnd}
							disabled={turnUserID != currentUser!.id}
						>
							{turnUserID != currentUser!.id ? "待機中" : "ターン終了"}
						</Button>
					</div>
				</div>
			</div>
		);
	} else {
		return <div>Loading...</div>;
	}
};
