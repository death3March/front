import { atom } from "jotai";

import { TurnEndNotification } from "@/api/client-message_pb";
import {
	GameEnd,
	GameStart,
	OtoshidamaEvent,
	PlayerMovementDisplay,
	PlayerTurnStart,
	QuizResult,
	QuizStart,
	RankingUpdate,
	RoomJoinResponse,
	SugorokuMoveUpdate,
} from "@/api/server-message_pb";

export type MessageState =
	| PlayerTurnStart
	| SugorokuMoveUpdate
	| PlayerMovementDisplay
	| QuizStart
	| QuizResult
	| OtoshidamaEvent
	| RankingUpdate
	| GameStart
	| GameEnd
	| RoomJoinResponse
	| TurnEndNotification;

export const messageStateAtom = atom<MessageState | null>(null);
