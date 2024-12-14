import { atom } from "jotai";

type gameState = "ROOM_JOIN_RESPONSE" | "GAME_START" | "GAME_END" | "LOADING";

export const gameStateAtom = atom<gameState>("LOADING");
