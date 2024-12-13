import { create } from "@bufbuild/protobuf";
import { redirect } from "@tanstack/react-router";
import { useAtom } from "jotai/react";
import { useEffect, useState } from "react";

import {
	ClientMessageSchema,
	GameStartRequestSchema,
	QuizAnswerSchema,
	TurnEndNotificationSchema,
} from "@/api/client-message_pb";
import { DialogWrapper } from "@/shared/components/dialog-wrapper";
import { useWebSocket } from "@/shared/provider/websocket/use-websocket";
import { messageStateAtom } from "@/shared/store/message-state-atom";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";
import { Button } from "@/shared/ui/button";

import { useModal } from "../hooks/use-modal";
import { QuizModel } from "../types/quiz";
import { Map } from "./map";
import { Otoshidama } from "./otoshidama";
import { Quiz } from "./quiz";
import { Slot } from "./slot";

export const GameBoard = ({ roomCode }: { roomCode: string }) => {
	const { sendMessage } = useWebSocket();
	const { modalState, setModalStateWithExclusion } = useModal();
	const [messageState] = useAtom(messageStateAtom);
	const [currentUser] = useAtom(currentUserAtom);
	const [participatingUsers] = useAtom(participatingUsersAtom);
	const [isWaitingTurnEnd, setIsWaitingTurnEnd] = useState(false);
	const [isActionEnd, setIsActionEnd] = useState(false);
	const [isMoved, setIsMoved] = useState(false);

	if (!currentUser) {
		// toast
		redirect({
			to: "/",
			search: {},
		});
	}

	const [target, setTarget] = useState(0);
	const [quiz, setQuiz] = useState<QuizModel>({
		questions: "",
		options: [],
	});

	const symbols = ["1", "2", "3", "4", "5", "6"];

	useEffect(() => {
		if (messageState) {
			if (messageState.$typeName === "PlayerTurnStart") {
				setIsMoved(false);
				setIsWaitingTurnEnd(false);
			}
			if (messageState.$typeName === "PlayerMovementDisplay" && !isMoved) {
				setIsWaitingTurnEnd(false);
				setIsActionEnd(false);
				const playerId = messageState.data?.playerId;
				const newPosition = messageState.data?.newPosition;
				console.log("participatingUsers", participatingUsers);
				if (playerId === currentUser?.id) {
					console.log("setTarget", newPosition);
					setTarget(newPosition!);
					setModalStateWithExclusion(messageState.$typeName);
					setIsMoved(true);
				}
			}

			if (messageState.$typeName === "QuizStart" && !modalState.showSlotModal && !isActionEnd) {
				setQuiz({
					questions: messageState.data?.quizQuestion ?? "",
					options: messageState.data?.options ?? [],
				});
				setModalStateWithExclusion(messageState.$typeName);
			}

			if (messageState.$typeName === "OtoshidamaEvent" && !modalState.showSlotModal && !isActionEnd) {
				setModalStateWithExclusion(messageState.$typeName);
			}

			console.log("messageState", messageState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setModalStateWithExclusion, currentUser?.id, messageState]);

	const startGame = () => {
		const clientMessage = create(ClientMessageSchema, {
			$typeName: "ClientMessage",
			type: {
				value: create(GameStartRequestSchema, {
					data: {
						playerId: currentUser?.id,
						roomCode,
					},
				}),
				case: "gameStartRequest",
			},
		});
		sendMessage(clientMessage);
	};

	const onTurnEnd = () => {
		console.log("onTurnEnd");
		const clientMessage = create(ClientMessageSchema, {
			$typeName: "ClientMessage",
			type: {
				value: create(TurnEndNotificationSchema, {
					data: {
						playerId: currentUser?.id,
					},
				}),
				case: "turnEndNotification",
			},
		});
		sendMessage(clientMessage);
		setIsWaitingTurnEnd(true);
	};

	const onAnswer = (answer: string) => {
		const clientMessage = create(ClientMessageSchema, {
			$typeName: "ClientMessage",
			type: {
				value: create(QuizAnswerSchema, {
					data: {
						playerId: currentUser?.id,
						answer,
					},
				}),
				case: "quizAnswer",
			},
		});
		sendMessage(clientMessage);
		setModalStateWithExclusion("TurnEndNotification");
		setIsActionEnd(true);
	};

	const onOtoshidamaEnd = () => {
		setModalStateWithExclusion("TurnEndNotification");
		setIsActionEnd(true);
	};

	const onSlotEnd = () => {
		setModalStateWithExclusion("TurnEndNotification");
		setIsActionEnd(true);
	};

	if (messageState != null) {
		if (messageState.$typeName === "RoomJoinResponse") {
			return (
				<>
					<Button className="rounded bg-green-500 px-4 py-2 text-white" onClick={startGame}>
						Start Game
					</Button>

					{participatingUsers.map((user) =>
						user.id == currentUser?.id ? (
							<div key={user.id}>{user.nickname} (You)</div>
						) : (
							<div key={user.id}>{user.nickname}</div>
						),
					)}
				</>
			);
		} else if (messageState.$typeName === "GameEnd") {
			return <div>Game fineshed</div>;
		} else {
			return (
				<div className="flex h-full flex-col">
					<div className="flex-1 overflow-auto">
						<Map playerPositions={participatingUsers.map((user) => user.position ?? 0)} />
					</div>
					<div className="mt-8 flex flex-col items-center">
						<DialogWrapper title="Slot Result" open={modalState.showSlotModal}>
							<Slot target={target} symbols={symbols} onSlotEnd={onSlotEnd} />
						</DialogWrapper>

						<DialogWrapper title="Quiz" open={modalState.showQuizModal}>
							<Quiz quiz={quiz} onAnswer={onAnswer} />
						</DialogWrapper>

						<DialogWrapper title="Otoshidama" open={modalState.showOtoshidamaModal}>
							<Otoshidama onOtoshidamaEnd={onOtoshidamaEnd} roomCode={roomCode} />
						</DialogWrapper>
					</div>
					<div>
						<Button className="w-full" onClick={onTurnEnd} disabled={isWaitingTurnEnd}>
							{isWaitingTurnEnd ? "待機中" : "ターン終了"}
						</Button>
					</div>
				</div>
			);
		}
	} else {
		return <div>Loading...</div>;
	}
};
