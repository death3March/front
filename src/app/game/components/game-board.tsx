import { create } from "@bufbuild/protobuf";
import { useAtom } from "jotai/react";
import { useState } from "react";

import { ClientMessageSchema, GameStartRequestSchema } from "@/api/client-message_pb";
import { DialogWrapper } from "@/shared/components/dialog-wrapper";
import { useWebSocket } from "@/shared/provider/websocket/use-websocket";
import { messageStateAtom } from "@/shared/store/mesaage-state-atom";
import { currentUserAtom, participatingUsersAtom } from "@/shared/store/user-id-atom";
import { Button } from "@/shared/ui/button";

import { QuizModel } from "../types/quiz";
import { Map } from "./map";
import { Quiz } from "./quiz";
import { Slot } from "./slot";

export const GameBoard = ({ roomCode }: { roomCode: string }) => {
	const { sendMessage } = useWebSocket();
	const [messageState] = useAtom(messageStateAtom);
	const [currentUser] = useAtom(currentUserAtom);
	const [participatingUsers] = useAtom(participatingUsersAtom);

	// @ts-expect-error setPlayerPositionは後で使う
	const [playerPosition, setPlayerPosition] = useState(0);
	const [showSlotModal, setShowSlotModal] = useState(false);
	const [showQuizModal, setShowQuizModal] = useState(false);
	const [target, setTarget] = useState(0);
	const [quiz, setQuiz] = useState<QuizModel>({
		questions: "",
		options: [],
	});

	const symbols = ["これ", "あ", "3げあ", "4", "5", "6"];

	const openSlotModal = () => {
		setTarget(Math.floor(Math.random() * symbols.length));
		setShowSlotModal(true);
	};

	const openQuizModal = () => {
		setQuiz({
			questions: "パリの首都はどこ？",
			options: ["パリ", "ロンドン", "東京"],
		});

		setShowQuizModal(true);
	};

	const startGame = () => {
		const clientMessage = create(ClientMessageSchema, {
			$typeName: "ClientMessage",
			type: {
				value: create(GameStartRequestSchema, {
					data: {
						playerId: currentUser?.id ?? "",
						roomCode,
					},
				}),
				case: "gameStartRequest",
			},
		});
		sendMessage(clientMessage);
	};

	if (messageState != null) {
		if (messageState == "RoomJoinResponse") {
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
		} else if (messageState == "GameEnd") {
			return <div>Game fineshed</div>;
		} else {
			return (
				<div>
					<Map playerPosition={playerPosition} />

					<div className="mt-8 flex flex-col items-center">
						<div className="flex space-x-4">
							<Button className="rounded bg-green-500 px-4 py-2 text-white" onClick={openSlotModal}>
								Open Slot
							</Button>
							<Button className="rounded bg-green-500 px-4 py-2 text-white" onClick={openQuizModal}>
								Open Quiz
							</Button>
						</div>
						{messageState && <div>{messageState}</div>}
						<DialogWrapper title="Slot Result" open={showSlotModal} onOpenChange={setShowSlotModal}>
							<Slot target={target} symbols={symbols} />
						</DialogWrapper>

						<DialogWrapper title="Quiz" open={showQuizModal} onOpenChange={setShowQuizModal}>
							<Quiz quiz={quiz} />
						</DialogWrapper>
					</div>
				</div>
			);
		}
	} else {
		return <div>Loading...</div>;
	}
};
