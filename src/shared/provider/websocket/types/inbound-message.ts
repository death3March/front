// Existing message types you had
export interface JoinSuccessMessage {
  type: "joinSuccess";
  // Include other properties as needed
  // e.g. userId?: string;
  //      roomId?: string;
}

export interface ErrorMessage {
  type: "error";
  message: string;
}

// New messages based on your proto definitions
export interface PlayerTurnStartMessage {
  type: "PLAYER_TURN_START";
  data: {
    playerId: number;
  };
}

export interface SugorokuMoveUpdateMessage {
  type: "SUGOROKU_MOVE_UPDATE";
  data: {
    playerId: number;
    stepsMoved: number;
    newPosition: number;
  };
}

export interface PlayerMovementDisplayMessage {
  type: "PLAYER_MOVEMENT_DISPLAY";
  data: {
    playerId: number;
    newPosition: number;
  };
}

export interface QuizStartMessage {
  type: "QUIZ_START";
  data: {
    playerId: number;
    quizQuestion: string;
    options: string[];
  };
}

export interface QuizResultMessage {
  type: "QUIZ_RESULT";
  data: {
    correctPlayerId: number;
    otoshidamaAmount: number;
    message: string;
  };
}

export interface OtoshidamaEventMessage {
  type: "OTOSHIDAMA_EVENT";
  data: {
    playerId: number;
    message: string;
  };
}

// Define the enum for square types
export enum SquareType {
  NORMAL = 0,
  QUIZ = 1,
  OTOSHIDAMA = 2,
  FURIDASHI = 3
}

export interface GameStartMessage {
  type: "GAME_START";
  data: {
    playerIds: number[];
    map: {
      squares: SquareType[];
    };
  };
}

export interface GameEndMessage {
  type: "GAME_END";
  data: {
    playerId: number;
  };
}

export interface RankingUpdateMessage {
  type: "RANKING_UPDATE";
  data: {
    rankings: {
      playerId: number;
      position: number;
    }[];
  };
}

// Finally, combine all inbound message types into a union:
export type InboundMessage =
  | JoinSuccessMessage
  | ErrorMessage
  | PlayerTurnStartMessage
  | SugorokuMoveUpdateMessage
  | PlayerMovementDisplayMessage
  | QuizStartMessage
  | QuizResultMessage
  | OtoshidamaEventMessage
  | RankingUpdateMessage
  | GameStartMessage
  | GameEndMessage;
