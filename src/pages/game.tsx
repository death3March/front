import { useParams } from '@tanstack/react-router';

import { GameBoard } from "@/features/game/game-board";
import { gameRoute } from "@/router";
import { Container } from "@/shared/components/container";
import { WebSocketProvider } from "@/shared/provider/websocket/websocket-provider";

export const Game = () => {
    const { roomName } = useParams({ from: gameRoute.id });

	return (
        <WebSocketProvider>
            <Container>
                <h1 className="text-2xl font-bold">Game : {roomName}</h1>
                <GameBoard />
            </Container>
        </WebSocketProvider>
	);
};
