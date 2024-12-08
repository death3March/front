import { useCallback } from "react";
import { ServerMessage } from "./pb/server-message";

export const useServerMessageHandler = () => {
    return useCallback((data: ServerMessage) => {
        if (data.has_playerTurnStart) {
            const message = data.playerTurnStart;
            console.log("Player turn start:", message);
        } else if (data.has_sugorokuMoveUpdate) {
            const message = data.sugorokuMoveUpdate;
            console.log("Sugoroku move update:", message);
        } else if (data.has_playerMovementDisplay) {
            const message = data.playerMovementDisplay;
            console.log("Player movement display:", message);
        } else if (data.has_quizStart) {
            const message = data.quizStart;
            console.log("Quiz start:", message);
        } else if (data.has_quizResult) {
            const message = data.quizResult;
            console.log("Quiz result:", message);
        } else if (data.has_otoshidamaEvent) {
            const message = data.otoshidamaEvent;
            console.log("Otoshidama event:", message);
        } else if (data.has_rankingUpdate) {
            const message = data.rankingUpdate;
            console.log("Ranking update:", message);
        } else if (data.has_gameStart) {
            const message = data.gameStart;
            console.log("Game start:", message);
        } else if (data.has_gameEnd) {
            const message = data.gameEnd;
            console.log("Game end:", message);
        } else {
            console.warn("Unknown server message type received:", data);
        }
    }, []);
};
