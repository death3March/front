import { atom } from "jotai";

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
	| PlayerTurnStart["$typeName"]
	| SugorokuMoveUpdate["$typeName"]
	| PlayerMovementDisplay["$typeName"]
	| QuizStart["$typeName"]
	| QuizResult["$typeName"]
	| OtoshidamaEvent["$typeName"]
	| RankingUpdate["$typeName"]
	| GameStart["$typeName"]
	| GameEnd["$typeName"]
	| RoomJoinResponse["$typeName"];

export const messageStateAtom = atom<MessageState | null>(null);
