// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file server-message.proto (syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file server-message.proto.
 */
export const file_server_message: GenFile =
	/*@__PURE__*/
	fileDesc(
		"ChRzZXJ2ZXItbWVzc2FnZS5wcm90byK3AwoNU2VydmVyTWVzc2FnZRIrCg9wbGF5ZXJUdXJuU3RhcnQYASABKAsyEC5QbGF5ZXJUdXJuU3RhcnRIABIxChJzdWdvcm9rdU1vdmVVcGRhdGUYAiABKAsyEy5TdWdvcm9rdU1vdmVVcGRhdGVIABI3ChVwbGF5ZXJNb3ZlbWVudERpc3BsYXkYAyABKAsyFi5QbGF5ZXJNb3ZlbWVudERpc3BsYXlIABIfCglxdWl6U3RhcnQYBCABKAsyCi5RdWl6U3RhcnRIABIhCgpxdWl6UmVzdWx0GAUgASgLMgsuUXVpelJlc3VsdEgAEisKD290b3NoaWRhbWFFdmVudBgGIAEoCzIQLk90b3NoaWRhbWFFdmVudEgAEicKDXJhbmtpbmdVcGRhdGUYByABKAsyDi5SYW5raW5nVXBkYXRlSAASHwoJZ2FtZVN0YXJ0GAggASgLMgouR2FtZVN0YXJ0SAASGwoHZ2FtZUVuZBgJIAEoCzIILkdhbWVFbmRIABItChByb29tSm9pblJlc3BvbnNlGAogASgLMhEuUm9vbUpvaW5SZXNwb25zZUgAQgYKBHR5cGUiXgoPUGxheWVyVHVyblN0YXJ0EgwKBHR5cGUYASABKAkSIwoEZGF0YRgCIAEoCzIVLlBsYXllclR1cm5TdGFydC5EYXRhGhgKBERhdGESEAoIcGxheWVySWQYASABKAkijQEKElN1Z29yb2t1TW92ZVVwZGF0ZRIMCgR0eXBlGAEgASgJEiYKBGRhdGEYAiABKAsyGC5TdWdvcm9rdU1vdmVVcGRhdGUuRGF0YRpBCgREYXRhEhAKCHBsYXllcklkGAEgASgJEhIKCnN0ZXBzTW92ZWQYAiABKAUSEwoLbmV3UG9zaXRpb24YAyABKAUifwoVUGxheWVyTW92ZW1lbnREaXNwbGF5EgwKBHR5cGUYASABKAkSKQoEZGF0YRgCIAEoCzIbLlBsYXllck1vdmVtZW50RGlzcGxheS5EYXRhGi0KBERhdGESEAoIcGxheWVySWQYASABKAkSEwoLbmV3UG9zaXRpb24YAiABKAUiiQEKCVF1aXpTdGFydBIMCgR0eXBlGAEgASgJEh0KBGRhdGEYAiABKAsyDy5RdWl6U3RhcnQuRGF0YRpPCgREYXRhEhAKCHBsYXllcklkGAEgASgJEhQKDHF1aXpRdWVzdGlvbhgCIAEoCRIPCgdvcHRpb25zGAMgAygJEg4KBmFuc3dlchgEIAEoCSKSAQoKUXVpelJlc3VsdBIMCgR0eXBlGAEgASgJEh4KBGRhdGEYAiABKAsyEC5RdWl6UmVzdWx0LkRhdGEaVgoERGF0YRIQCghQbGF5ZXJJZBgBIAEoCRIYChBvdG9zaGlkYW1hQW1vdW50GAIgASgFEg8KB21lc3NhZ2UYAyABKAkSEQoJaXNDb3JyZWN0GAQgASgIIokBCg9PdG9zaGlkYW1hRXZlbnQSDAoEdHlwZRgBIAEoCRIjCgRkYXRhGAIgASgLMhUuT3Rvc2hpZGFtYUV2ZW50LkRhdGEaQwoERGF0YRIQCghwbGF5ZXJJZBgBIAEoCRIPCgdtZXNzYWdlGAIgASgJEhgKEG90b3NoaWRhbWFBbW91bnQYAyABKAUi8QEKCUdhbWVTdGFydBIMCgR0eXBlGAEgASgJEh0KBGRhdGEYAiABKAsyDy5HYW1lU3RhcnQuRGF0YRq2AQoERGF0YRIRCglwbGF5ZXJJZHMYASADKAkSIAoDbWFwGAIgASgLMhMuR2FtZVN0YXJ0LkRhdGEuTWFwGnkKA01hcBIvCgdzcXVhcmVzGAEgAygOMh4uR2FtZVN0YXJ0LkRhdGEuTWFwLnNxdWFyZVR5cGUiQQoKc3F1YXJlVHlwZRIKCgZOT1JNQUwQABIICgRRVUlaEAESDgoKT1RPU0hJREFNQRACEg0KCUZVUklEQVNISRADIqgBCgdHYW1lRW5kEgwKBHR5cGUYASABKAkSGwoEZGF0YRgCIAEoCzINLkdhbWVFbmQuRGF0YRpyCgREYXRhEjUKDHBsYXllclNjb3JlcxgBIAMoCzIfLkdhbWVFbmQuRGF0YS5QbGF5ZXJTY29yZXNFbnRyeRozChFQbGF5ZXJTY29yZXNFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAU6AjgBIqYBCg1SYW5raW5nVXBkYXRlEgwKBHR5cGUYASABKAkSIQoEZGF0YRgCIAEoCzITLlJhbmtpbmdVcGRhdGUuRGF0YRpkCgREYXRhEi0KCHJhbmtpbmdzGAEgAygLMhsuUmFua2luZ1VwZGF0ZS5EYXRhLlJhbmtpbmcaLQoHUmFua2luZxIQCghwbGF5ZXJJZBgBIAEoCRIQCghwb3NpdGlvbhgCIAEoBSKEAQoQUm9vbUpvaW5SZXNwb25zZRIMCgR0eXBlGAEgASgJEiQKBGRhdGEYAiABKAsyFi5Sb29tSm9pblJlc3BvbnNlLkRhdGEaPAoERGF0YRIQCghwbGF5ZXJJZBgBIAEoCRIQCghuaWNrbmFtZRgCIAEoCRIQCghyb29tQ29kZRgDIAEoCWIGcHJvdG8z",
	);

/**
 * @generated from message ServerMessage
 */
export type ServerMessage = Message<"ServerMessage"> & {
	/**
	 * @generated from oneof ServerMessage.type
	 */
	type:
		| {
				/**
				 * @generated from field: PlayerTurnStart playerTurnStart = 1;
				 */
				value: PlayerTurnStart;
				case: "playerTurnStart";
		  }
		| {
				/**
				 * @generated from field: SugorokuMoveUpdate sugorokuMoveUpdate = 2;
				 */
				value: SugorokuMoveUpdate;
				case: "sugorokuMoveUpdate";
		  }
		| {
				/**
				 * @generated from field: PlayerMovementDisplay playerMovementDisplay = 3;
				 */
				value: PlayerMovementDisplay;
				case: "playerMovementDisplay";
		  }
		| {
				/**
				 * @generated from field: QuizStart quizStart = 4;
				 */
				value: QuizStart;
				case: "quizStart";
		  }
		| {
				/**
				 * @generated from field: QuizResult quizResult = 5;
				 */
				value: QuizResult;
				case: "quizResult";
		  }
		| {
				/**
				 * @generated from field: OtoshidamaEvent otoshidamaEvent = 6;
				 */
				value: OtoshidamaEvent;
				case: "otoshidamaEvent";
		  }
		| {
				/**
				 * @generated from field: RankingUpdate rankingUpdate = 7;
				 */
				value: RankingUpdate;
				case: "rankingUpdate";
		  }
		| {
				/**
				 * @generated from field: GameStart gameStart = 8;
				 */
				value: GameStart;
				case: "gameStart";
		  }
		| {
				/**
				 * @generated from field: GameEnd gameEnd = 9;
				 */
				value: GameEnd;
				case: "gameEnd";
		  }
		| {
				/**
				 * @generated from field: RoomJoinResponse roomJoinResponse = 10;
				 */
				value: RoomJoinResponse;
				case: "roomJoinResponse";
		  }
		| { case: undefined; value?: undefined };
};

/**
 * Describes the message ServerMessage.
 * Use `create(ServerMessageSchema)` to create a new message.
 */
export const ServerMessageSchema: GenMessage<ServerMessage> = /*@__PURE__*/ messageDesc(file_server_message, 0);

/**
 * @generated from message PlayerTurnStart
 */
export type PlayerTurnStart = Message<"PlayerTurnStart"> & {
	/**
	 * "PLAYER_TURN_START"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: PlayerTurnStart.Data data = 2;
	 */
	data?: PlayerTurnStart_Data;
};

/**
 * Describes the message PlayerTurnStart.
 * Use `create(PlayerTurnStartSchema)` to create a new message.
 */
export const PlayerTurnStartSchema: GenMessage<PlayerTurnStart> = /*@__PURE__*/ messageDesc(file_server_message, 1);

/**
 * @generated from message PlayerTurnStart.Data
 */
export type PlayerTurnStart_Data = Message<"PlayerTurnStart.Data"> & {
	/**
	 * @generated from field: string playerId = 1;
	 */
	playerId: string;
};

/**
 * Describes the message PlayerTurnStart.Data.
 * Use `create(PlayerTurnStart_DataSchema)` to create a new message.
 */
export const PlayerTurnStart_DataSchema: GenMessage<PlayerTurnStart_Data> =
	/*@__PURE__*/
	messageDesc(file_server_message, 1, 0);

/**
 * @generated from message SugorokuMoveUpdate
 */
export type SugorokuMoveUpdate = Message<"SugorokuMoveUpdate"> & {
	/**
	 * "SUGOROKU_MOVE_UPDATE"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: SugorokuMoveUpdate.Data data = 2;
	 */
	data?: SugorokuMoveUpdate_Data;
};

/**
 * Describes the message SugorokuMoveUpdate.
 * Use `create(SugorokuMoveUpdateSchema)` to create a new message.
 */
export const SugorokuMoveUpdateSchema: GenMessage<SugorokuMoveUpdate> =
	/*@__PURE__*/
	messageDesc(file_server_message, 2);

/**
 * @generated from message SugorokuMoveUpdate.Data
 */
export type SugorokuMoveUpdate_Data = Message<"SugorokuMoveUpdate.Data"> & {
	/**
	 * @generated from field: string playerId = 1;
	 */
	playerId: string;

	/**
	 * @generated from field: int32 stepsMoved = 2;
	 */
	stepsMoved: number;

	/**
	 * @generated from field: int32 newPosition = 3;
	 */
	newPosition: number;
};

/**
 * Describes the message SugorokuMoveUpdate.Data.
 * Use `create(SugorokuMoveUpdate_DataSchema)` to create a new message.
 */
export const SugorokuMoveUpdate_DataSchema: GenMessage<SugorokuMoveUpdate_Data> =
	/*@__PURE__*/
	messageDesc(file_server_message, 2, 0);

/**
 * @generated from message PlayerMovementDisplay
 */
export type PlayerMovementDisplay = Message<"PlayerMovementDisplay"> & {
	/**
	 * "PLAYER_MOVEMENT_DISPLAY"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: PlayerMovementDisplay.Data data = 2;
	 */
	data?: PlayerMovementDisplay_Data;
};

/**
 * Describes the message PlayerMovementDisplay.
 * Use `create(PlayerMovementDisplaySchema)` to create a new message.
 */
export const PlayerMovementDisplaySchema: GenMessage<PlayerMovementDisplay> =
	/*@__PURE__*/
	messageDesc(file_server_message, 3);

/**
 * @generated from message PlayerMovementDisplay.Data
 */
export type PlayerMovementDisplay_Data = Message<"PlayerMovementDisplay.Data"> & {
	/**
	 * @generated from field: string playerId = 1;
	 */
	playerId: string;

	/**
	 * @generated from field: int32 newPosition = 2;
	 */
	newPosition: number;
};

/**
 * Describes the message PlayerMovementDisplay.Data.
 * Use `create(PlayerMovementDisplay_DataSchema)` to create a new message.
 */
export const PlayerMovementDisplay_DataSchema: GenMessage<PlayerMovementDisplay_Data> =
	/*@__PURE__*/
	messageDesc(file_server_message, 3, 0);

/**
 * @generated from message QuizStart
 */
export type QuizStart = Message<"QuizStart"> & {
	/**
	 * "QUIZ_START"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: QuizStart.Data data = 2;
	 */
	data?: QuizStart_Data;
};

/**
 * Describes the message QuizStart.
 * Use `create(QuizStartSchema)` to create a new message.
 */
export const QuizStartSchema: GenMessage<QuizStart> = /*@__PURE__*/ messageDesc(file_server_message, 4);

/**
 * @generated from message QuizStart.Data
 */
export type QuizStart_Data = Message<"QuizStart.Data"> & {
	/**
	 * @generated from field: string playerId = 1;
	 */
	playerId: string;

	/**
	 * @generated from field: string quizQuestion = 2;
	 */
	quizQuestion: string;

	/**
	 * @generated from field: repeated string options = 3;
	 */
	options: string[];

	/**
	 * @generated from field: string answer = 4;
	 */
	answer: string;
};

/**
 * Describes the message QuizStart.Data.
 * Use `create(QuizStart_DataSchema)` to create a new message.
 */
export const QuizStart_DataSchema: GenMessage<QuizStart_Data> = /*@__PURE__*/ messageDesc(file_server_message, 4, 0);

/**
 * @generated from message QuizResult
 */
export type QuizResult = Message<"QuizResult"> & {
	/**
	 * "QUIZ_RESULT"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: QuizResult.Data data = 2;
	 */
	data?: QuizResult_Data;
};

/**
 * Describes the message QuizResult.
 * Use `create(QuizResultSchema)` to create a new message.
 */
export const QuizResultSchema: GenMessage<QuizResult> = /*@__PURE__*/ messageDesc(file_server_message, 5);

/**
 * @generated from message QuizResult.Data
 */
export type QuizResult_Data = Message<"QuizResult.Data"> & {
	/**
	 * @generated from field: string PlayerId = 1;
	 */
	PlayerId: string;

	/**
	 * @generated from field: int32 otoshidamaAmount = 2;
	 */
	otoshidamaAmount: number;

	/**
	 * @generated from field: string message = 3;
	 */
	message: string;

	/**
	 * @generated from field: bool isCorrect = 4;
	 */
	isCorrect: boolean;
};

/**
 * Describes the message QuizResult.Data.
 * Use `create(QuizResult_DataSchema)` to create a new message.
 */
export const QuizResult_DataSchema: GenMessage<QuizResult_Data> = /*@__PURE__*/ messageDesc(file_server_message, 5, 0);

/**
 * @generated from message OtoshidamaEvent
 */
export type OtoshidamaEvent = Message<"OtoshidamaEvent"> & {
	/**
	 * "OTOSHIDAMA_EVENT"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: OtoshidamaEvent.Data data = 2;
	 */
	data?: OtoshidamaEvent_Data;
};

/**
 * Describes the message OtoshidamaEvent.
 * Use `create(OtoshidamaEventSchema)` to create a new message.
 */
export const OtoshidamaEventSchema: GenMessage<OtoshidamaEvent> = /*@__PURE__*/ messageDesc(file_server_message, 6);

/**
 * @generated from message OtoshidamaEvent.Data
 */
export type OtoshidamaEvent_Data = Message<"OtoshidamaEvent.Data"> & {
	/**
	 * @generated from field: string playerId = 1;
	 */
	playerId: string;

	/**
	 * @generated from field: string message = 2;
	 */
	message: string;

	/**
	 * @generated from field: int32 otoshidamaAmount = 3;
	 */
	otoshidamaAmount: number;
};

/**
 * Describes the message OtoshidamaEvent.Data.
 * Use `create(OtoshidamaEvent_DataSchema)` to create a new message.
 */
export const OtoshidamaEvent_DataSchema: GenMessage<OtoshidamaEvent_Data> =
	/*@__PURE__*/
	messageDesc(file_server_message, 6, 0);

/**
 * @generated from message GameStart
 */
export type GameStart = Message<"GameStart"> & {
	/**
	 * "GAME_START"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: GameStart.Data data = 2;
	 */
	data?: GameStart_Data;
};

/**
 * Describes the message GameStart.
 * Use `create(GameStartSchema)` to create a new message.
 */
export const GameStartSchema: GenMessage<GameStart> = /*@__PURE__*/ messageDesc(file_server_message, 7);

/**
 * @generated from message GameStart.Data
 */
export type GameStart_Data = Message<"GameStart.Data"> & {
	/**
	 * @generated from field: repeated string playerIds = 1;
	 */
	playerIds: string[];

	/**
	 * @generated from field: GameStart.Data.Map map = 2;
	 */
	map?: GameStart_Data_Map;
};

/**
 * Describes the message GameStart.Data.
 * Use `create(GameStart_DataSchema)` to create a new message.
 */
export const GameStart_DataSchema: GenMessage<GameStart_Data> = /*@__PURE__*/ messageDesc(file_server_message, 7, 0);

/**
 * @generated from message GameStart.Data.Map
 */
export type GameStart_Data_Map = Message<"GameStart.Data.Map"> & {
	/**
	 * @generated from field: repeated GameStart.Data.Map.squareType squares = 1;
	 */
	squares: GameStart_Data_Map_squareType[];
};

/**
 * Describes the message GameStart.Data.Map.
 * Use `create(GameStart_Data_MapSchema)` to create a new message.
 */
export const GameStart_Data_MapSchema: GenMessage<GameStart_Data_Map> =
	/*@__PURE__*/
	messageDesc(file_server_message, 7, 0, 0);

/**
 * @generated from enum GameStart.Data.Map.squareType
 */
export enum GameStart_Data_Map_squareType {
	/**
	 * @generated from enum value: NORMAL = 0;
	 */
	NORMAL = 0,

	/**
	 * @generated from enum value: QUIZ = 1;
	 */
	QUIZ = 1,

	/**
	 * @generated from enum value: OTOSHIDAMA = 2;
	 */
	OTOSHIDAMA = 2,

	/**
	 * @generated from enum value: FURIDASHI = 3;
	 */
	FURIDASHI = 3,
}

/**
 * Describes the enum GameStart.Data.Map.squareType.
 */
export const GameStart_Data_Map_squareTypeSchema: GenEnum<GameStart_Data_Map_squareType> =
	/*@__PURE__*/
	enumDesc(file_server_message, 7, 0, 0, 0);

/**
 * @generated from message GameEnd
 */
export type GameEnd = Message<"GameEnd"> & {
	/**
	 * "GAME_END"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: GameEnd.Data data = 2;
	 */
	data?: GameEnd_Data;
};

/**
 * Describes the message GameEnd.
 * Use `create(GameEndSchema)` to create a new message.
 */
export const GameEndSchema: GenMessage<GameEnd> = /*@__PURE__*/ messageDesc(file_server_message, 8);

/**
 * @generated from message GameEnd.Data
 */
export type GameEnd_Data = Message<"GameEnd.Data"> & {
	/**
	 * @generated from field: map<string, int32> playerScores = 1;
	 */
	playerScores: { [key: string]: number };
};

/**
 * Describes the message GameEnd.Data.
 * Use `create(GameEnd_DataSchema)` to create a new message.
 */
export const GameEnd_DataSchema: GenMessage<GameEnd_Data> = /*@__PURE__*/ messageDesc(file_server_message, 8, 0);

/**
 * @generated from message RankingUpdate
 */
export type RankingUpdate = Message<"RankingUpdate"> & {
	/**
	 * "RANKING_UPDATE"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: RankingUpdate.Data data = 2;
	 */
	data?: RankingUpdate_Data;
};

/**
 * Describes the message RankingUpdate.
 * Use `create(RankingUpdateSchema)` to create a new message.
 */
export const RankingUpdateSchema: GenMessage<RankingUpdate> = /*@__PURE__*/ messageDesc(file_server_message, 9);

/**
 * @generated from message RankingUpdate.Data
 */
export type RankingUpdate_Data = Message<"RankingUpdate.Data"> & {
	/**
	 * @generated from field: repeated RankingUpdate.Data.Ranking rankings = 1;
	 */
	rankings: RankingUpdate_Data_Ranking[];
};

/**
 * Describes the message RankingUpdate.Data.
 * Use `create(RankingUpdate_DataSchema)` to create a new message.
 */
export const RankingUpdate_DataSchema: GenMessage<RankingUpdate_Data> =
	/*@__PURE__*/
	messageDesc(file_server_message, 9, 0);

/**
 * @generated from message RankingUpdate.Data.Ranking
 */
export type RankingUpdate_Data_Ranking = Message<"RankingUpdate.Data.Ranking"> & {
	/**
	 * @generated from field: string playerId = 1;
	 */
	playerId: string;

	/**
	 * @generated from field: int32 position = 2;
	 */
	position: number;
};

/**
 * Describes the message RankingUpdate.Data.Ranking.
 * Use `create(RankingUpdate_Data_RankingSchema)` to create a new message.
 */
export const RankingUpdate_Data_RankingSchema: GenMessage<RankingUpdate_Data_Ranking> =
	/*@__PURE__*/
	messageDesc(file_server_message, 9, 0, 0);

/**
 * @generated from message RoomJoinResponse
 */
export type RoomJoinResponse = Message<"RoomJoinResponse"> & {
	/**
	 * "ROOM_JOIN_RESPONSE"
	 *
	 * @generated from field: string type = 1;
	 */
	type: string;

	/**
	 * @generated from field: RoomJoinResponse.Data data = 2;
	 */
	data?: RoomJoinResponse_Data;
};

/**
 * Describes the message RoomJoinResponse.
 * Use `create(RoomJoinResponseSchema)` to create a new message.
 */
export const RoomJoinResponseSchema: GenMessage<RoomJoinResponse> = /*@__PURE__*/ messageDesc(file_server_message, 10);

/**
 * @generated from message RoomJoinResponse.Data
 */
export type RoomJoinResponse_Data = Message<"RoomJoinResponse.Data"> & {
	/**
	 * @generated from field: string playerId = 1;
	 */
	playerId: string;

	/**
	 * @generated from field: string nickname = 2;
	 */
	nickname: string;

	/**
	 * @generated from field: string roomCode = 3;
	 */
	roomCode: string;
};

/**
 * Describes the message RoomJoinResponse.Data.
 * Use `create(RoomJoinResponse_DataSchema)` to create a new message.
 */
export const RoomJoinResponse_DataSchema: GenMessage<RoomJoinResponse_Data> =
	/*@__PURE__*/
	messageDesc(file_server_message, 10, 0);
