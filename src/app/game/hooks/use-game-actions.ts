import { create } from "@bufbuild/protobuf";

import {
	ClientMessage,
	ClientMessageSchema,
	GameStartRequestSchema,
	QuizAnswerSchema,
	TurnEndNotificationSchema,
} from "@/api/client-message_pb";

type Props = {
	sendMessage: (data: ClientMessage) => void;
	currentUserId: string;
	roomCode: string;
};

export function useGameActions({ sendMessage, currentUserId, roomCode }: Props) {
	const startGame = () => {
		const clientMessage = create(ClientMessageSchema, {
			$typeName: "ClientMessage",
			type: {
				value: create(GameStartRequestSchema, {
					data: {
						playerId: currentUserId,
						roomCode,
					},
				}),
				case: "gameStartRequest",
			},
		});
		sendMessage(clientMessage);
	};

	const onTurnEnd = () => {
		const clientMessage = create(ClientMessageSchema, {
			$typeName: "ClientMessage",
			type: {
				value: create(TurnEndNotificationSchema, {
					data: { playerId: currentUserId },
				}),
				case: "turnEndNotification",
			},
		});
		sendMessage(clientMessage);
	};

	const onAnswerQuiz = (answer: string) => {
		const clientMessage = create(ClientMessageSchema, {
			$typeName: "ClientMessage",
			type: {
				value: create(QuizAnswerSchema, {
					data: {
						playerId: currentUserId,
						answer,
					},
				}),
				case: "quizAnswer",
			},
		});
		sendMessage(clientMessage);
	};

	return { startGame, onTurnEnd, onAnswerQuiz };
}
