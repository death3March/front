import { useState } from "react";

import { Map } from "@/features/game/components/map";
import { Slot } from "@/features/game/components/slot";
import { DialogWrapper } from "@/shared/components/dialog-wrapper";
import { ClientMessage, RoomJoinRequest } from "@/shared/provider/websocket/pb/client-message";
import { useWebSocket } from "@/shared/provider/websocket/use-websocket";

import { Quiz } from "./components/quiz";
import { QuizModel } from "./types/quiz";

export const GameBoard = () => {
	const { sendMessage } = useWebSocket();

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
		const joinRequestData = new RoomJoinRequest.Data();
		  joinRequestData.playerId = 25212;
		  joinRequestData.roomCode = "121515";
	  
		  const joinRequest = new RoomJoinRequest();
		  joinRequest.data = joinRequestData;
	  
		  const message = new ClientMessage();
		  message.roomJoinRequest = joinRequest;
	  
		  sendMessage(message);
		setShowQuizModal(true);
	};	  

	return (
		<div>
			<Map playerPosition={playerPosition} />

			<div className="mt-8 flex flex-col items-center">
				<div className="flex space-x-4">
					<button className="rounded bg-green-500 px-4 py-2 text-white" onClick={openSlotModal}>
						Open Slot
					</button>
					<button className="rounded bg-green-500 px-4 py-2 text-white" onClick={openQuizModal}>
						Open Quiz
					</button>
				</div>

				<DialogWrapper title="Slot Result" open={showSlotModal} onOpenChange={setShowSlotModal}>
					<Slot target={target} symbols={symbols} />
				</DialogWrapper>

				<DialogWrapper title="Quiz" open={showQuizModal} onOpenChange={setShowQuizModal}>
					<Quiz quiz={quiz} />
				</DialogWrapper>
			</div>
		</div>
	);
};
